'use strict';

/**
 * 解决 ajax 请求中 对应 id 的引用问题
 *
 * 如：
 * {
 *         user_id: 1,
 *         group_id: 2    ,
 *         [model]_id: 3
 * }
 * 将处理成：
 * {
 *         user: {...},
 *         user_id: 1,
 *         group: {...},
 *         group_id: 2,
 *         [model]: {...}
 *         [model]_id: 3
 * }
 *
 */
angular.module('services').factory('Reference', [
    '$q', '$timeout', 'Flash', 'Errors', 'Setting', function ($q, $timeout, Flash, Errors, Setting) {

        var api_error_tips = {
            500 : '服务器内部错误，有人要扣奖金了～',
            502 : '服务器正在更新，请稍后再试。',
            504 : '服务器正在更新，请稍候再试。',
            400 : '服务器/页面接口请求不匹配，前端要扣工资了～',
            404 : '请求的数据接口不存在'
        };

        var api_error_handlers = {
            502: function(error){
                return;
            }
        };

        var handleBasicErrors = function(error){

            var msg = [
                '[', error.status,']', error.statusText, ' - <em>', error.config && error.config.url || '','</em>'
            ].join('');

            //request cancel 不提醒错误
            if(error.status!=0){
                $timeout(function(){
                    Flash.fail().timeout(5000).send(api_error_tips[error.status] || msg);
                }, 1000);
            }

            var handler = api_error_handlers[error.status];
            if(angular.isFunction(handler)){
                handler(error);
            }

        }

        var handleErrors = function(error, errorCallback){
            if(errorCallback && angular.isFunction(errorCallback)){
                errorCallback.call(null, error) !== false && handleBasicErrors(error);
            }else{
                handleBasicErrors(error);
            }
        };


        /**
         * 移除返回值中已包含要注入的属性的 handler
         * @param result 服务器端返回值
         * @param handlers 注入处理器
         * @param isArray 返回值是否为数组列表
         */
        var removeReference = function(result, handlers, isArray){
            var new_handlers = {};
            if(result.data){
                angular.forEach(handlers || {}, function(handler, name){
                    var item = result.data;
                    if(!!isArray){
                        item = angular.isArray(item) ? item[0] : result.data.list;
                        item = angular.isArray(item) ? item[0] : item;
                    }
                    if(item && angular.isUndefined(item[name])){
                        new_handlers[name] = handler;
                    }
                });
            }
            return new_handlers;
        };

        /**
         * 代理执行 method 方法，处理引用问题，统一处理错误输出
         * @param method 被代理的方法
         * @param args  代理方法传入参数
         * @param handlers  处理引用问题的 handlers
         * @param isArray  返回值是否为数组
         * @returns {*}
         */
        var agent = function(method, args, handlers, isArray){
            if(!method){
                console.error('[Reference] method to be agent does not exist!');
                return;
            }
            //处理 API 方法所需参数
            var slice = Array.prototype.slice;
            var len = args ? args.length : 0;
            var arg = slice.call(args, 0, len - 1);

            //剥离 callback 回调方法
            var callback = slice.call(args, len - 1, len)[0];
            if(!angular.isFunction(callback)){
                callback = undefined;
            }

            var deferred = $q.defer();
            var agent_promise = deferred.promise;

            var errorCallback = null;

            var finallyCallback = null;

            var defaultCallback = function(value){
                return value;
            };

            agent_promise.catch = function(callback){
                errorCallback = callback;
                return this.then(null, callback);
            };

            agent_promise.finally = function(callback){

                finallyCallback = callback;

                function makePromise(value, resolved) {
                    var result = $q.defer();
                    if (resolved) {
                        result.resolve(value);
                    } else {
                        result.reject(value);
                    }
                    return result.promise;
                }

                function handleCallback(value, isResolved) {
                    var callbackOutput = null;
                    try {
                        callbackOutput = (callback ||defaultCallback)();
                    } catch(e) {
                        return makePromise(e, false);
                    }
                    if (callbackOutput && isFunction(callbackOutput.then)) {
                        return callbackOutput.then(function() {
                            return makePromise(value, isResolved);
                        }, function(error) {
                            return makePromise(error, false);
                        });
                    } else {
                        return makePromise(value, isResolved);
                    }
                }

                return this.then(function(value) {
                    return handleCallback(value, true);
                }, function(error) {
                    return handleCallback(error, false);
                });
            };

            //执行 API 方法
            var rtn = method.apply(this, !angular.isFunction(callback) ? args : arg);
            var promise = getPromise(rtn);

            promise.catch(function(error){
                return handleErrors(error, errorCallback);
            });

            //API 方法 ajax 返回结果后处理 id 引用问题
            promise.then(function(result){

                if (result.code === -1) return;

                if(result.code!=0 && errorCallback && angular.isFunction(errorCallback)){
                    errorCallback(null, result) !== false  && Errors.handle(result);
                    return;
                };

                if(result.code!=0){
                    Errors.handle(result);
                    finallyCallback && finallyCallback(null, result);
                    return;
                };

                //返回值中已包含要注入的属性，则不再注入。
                handlers = removeReference(result, handlers, isArray);

                if($.isEmptyObject(handlers)){
                    callback && callback(result);
                    deferred.resolve(result);
                    return;
                }

                var success = function(r){
                    if(!result.data.list)
                        result.data = r;
                    else
                        result.data.list = r;
                    callback && callback(result);
                };

                //执行引用处理方法
                var inner_promise = !!isArray ?
                    doArrayResolve(result.data.list || result.data, handlers, success) :
                    doResolve(result.data.list || result.data, handlers,success);

                //引用处理方法 ajax 返回结果后完成 agent
                inner_promise.then(function(r){
                    if(!result.data.list)
                        result.data = r;
                    else
                        result.data.list = r;
                    deferred.resolve(result);
                });
            });

            promise.finally(function(){
                finallyCallback && finallyCallback();
            });

            return agent_promise;
        };


        /**
         * 代理API中所有方法，代理过后的方法直接返回 promise 对象（无论 $resource OR $http 或其他提供 promise 返回的方法）
         * @param API  需要代理的 API 对象
         * @param methods 解决 id 引用的 handlers
         * @param actions API 中的所有 action 配置
         * @returns {*} 扩展并代理的 API 对象
         */
        var agentAll = function(API, methods, actions){

            var API3 = {
                methods: methods,
                resolve: resolve
            };

            var acts = angular.copy(actions);

            if(!$.isEmptyObject(methods)){
                angular.forEach(methods, function(hanlders, method_name){
                    if(acts && acts[method_name])
                        delete acts[method_name];
                    var isArray = angular.copy(hanlders.isArray);
                    if(typeof isArray !== 'undefined'){
                        delete hanlders.isArray;
                    }
                    var method = angular.copy(API[method_name]);
                    API3[method_name] = function(){
                        var promise =  agent(method, arguments,hanlders, isArray);
                        return promise;
                    };
                });
            }

            //统一代理出错
            if(acts){
                angular.forEach(acts, function(opt, method_name){

                    var method = angular.copy(API[method_name]);

                    API3[method_name] = function(){

                        return agent(method, arguments);

                    };
                });
            }

            return angular.extend(API, API3);
        };


        /**
         * 根据API 对应 method 提供的规则，解决 ajax 返回的结果的 id 引用
         * @param method api.js 中 api 方法，该 method 必须定义了 id 引用处理的 handler
         * @param data 带 id 引用的 ajax 返回数据
         * @param callback 回调方法
         * @returns {*} promise 返回
         */
        var resolve = function(method, data, callback){

            var deferred = $q.defer();
            var isArray = angular.isArray(data);

            var handlers = this.methods[method];

            //执行引用处理方法
            var inner_promise = isArray ? doArrayResolve(data, handlers, callback) : doResolve(data, handlers,callback);

            //引用处理方法 ajax 返回结果后完成 agent
            inner_promise.then(function(r){
                deferred.resolve(r);
            });

            return deferred.promise;
        };

        var getPromise = function($resouceOr$httpReturn){
            var promise = {};
            try{
                promise = $resouceOr$httpReturn.$promise || $resouceOr$httpReturn;
            }catch(e){
                promise = $resouceOr$httpReturn;
            }
            return promise || {};
        }

        /**
         * 解决单个返回值中的引用问题
         * @param item 待处理的 ajax 返回值
         * @param handlers  处理引用问题的 handlers
         * @param callback  处理后的回调
         * @returns {*} 返回处理的 promise 对象
         */
        var doResolve = function (item, handlers,callback) {

            var deferred = $q.defer();
            var promises = [];
            var data = angular.copy(item);

            if(item && !$.isEmptyObject(handlers)) {
                angular.forEach(handlers, function (handler, name) {
                    var promise = getPromise(handler.call(this, item));
                    var key = name.split('_')[0];
                    if (!promise.then) {
                        data[key] = promise;
                    } else {
                        promises.push(promise);
                        promise.then(function (result) {
                            if (typeof result.code === 'undefined' || result.code == 0)
                                data[key] = result.data || result;
                        });
                    }
                });
            }else{
                $timeout(function(){
                    deferred.resolve(data);
                },30);
            }

            $q.all(promises).then(function(){
                callback && callback(data);
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        /**
         * 处理列表返回值的引用问题
         * @param array 待处理的 ajax 列表返回值
         * @param handlers  处理引用问题的 handlers
         * @param callback  处理后的回调
         * @returns {*} 返回处理的 promise 对象
         */
        var doArrayResolve = function(array, handlers, callback){

            var deferred = $q.defer();

            var promises = [];
            var data = [];

            angular.forEach(array, function(item, i){
                var promise = doResolve(item, handlers);
                promises.push(promise);
                promise.then(function(result){
                    data[i] = (result);
                });
            });

            $q.all(promises).then(function(){
                callback && callback(data);
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        return {
            agent: agent,
            agentAll: agentAll,
            resolve: resolve,
            getPromise: getPromise
        }
    }
]);
