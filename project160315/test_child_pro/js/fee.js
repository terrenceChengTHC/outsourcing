function fee(){
    this.items = {
        '0-year-30000':'9210',
        '0-year-50000':'15350',
        '0-year-100000':'30700',
        '0-year-200000':'61400',
        '0-year-300000':'92100',
        '1-year-30000':'9438',
        '1-year-50000':'15730',
        '1-year-100000':'31460',
        '1-year-200000':'62920',
        '1-year-300000':'94380',
        '2-year-30000':'9675',
        '2-year-50000':'16125',
        '2-year-100000':'32250',
        '2-year-200000':'64500',
        '2-year-300000':'96750',
        '3-year-30000':'9915',
        '3-year-50000':'16525',
        '3-year-100000':'33050',
        '3-year-200000':'66100',
        '3-year-300000':'99150',
        '4-year-30000':'10164',
        '4-year-50000':'16940',
        '4-year-100000':'33880',
        '4-year-200000':'67760',
        '4-year-300000':'101640',
        '5-year-30000':'10419',
        '5-year-50000':'17365',
        '5-year-100000':'34730',
        '5-year-200000':'69460',
        '5-year-300000':'104190',
        '6-year-30000':'10683',
        '6-year-50000':'17805',
        '6-year-100000':'35610',
        '6-year-200000':'71220',
        '6-year-300000':'106830',
        '7-year-30000':'10950',
        '7-year-50000':'18250',
        '7-year-100000':'36500',
        '7-year-200000':'73000',
        '7-year-300000':'109500',
        '8-year-30000':'11226',
        '8-year-50000':'18710',
        '8-year-100000':'37420',
        '8-year-200000':'74840',
        '8-year-300000':'112260',
        '9-year-30000':'11508',
        '9-year-50000':'19180',
        '9-year-100000':'38360',
        '9-year-200000':'76720',
        '9-year-300000':'115080',
        '10-year-30000':'11799',
        '10-year-50000':'19665',
        '10-year-100000':'39330',
        '10-year-200000':'78660',
        '10-year-300000':'117990',
        '0-month-30000':'828.9',
        '0-month-50000':'1381.5',
        '0-month-100000':'2763',
        '0-month-200000':'5526',
        '0-month-300000':'8289',
        '1-month-30000':'849.42',
        '1-month-50000':'1415.7',
        '1-month-100000':'2831.4',
        '1-month-200000':'5662.8',
        '1-month-300000':'8494.2',
        '2-month-30000':'870.75',
        '2-month-50000':'1451.25',
        '2-month-100000':'2902.5',
        '2-month-200000':'5805',
        '2-month-300000':'8707.5',
        '3-month-30000':'892.35',
        '3-month-50000':'1487.25',
        '3-month-100000':'2974.5',
        '3-month-200000':'5949',
        '3-month-300000':'8923.5',
        '4-month-30000':'914.76',
        '4-month-50000':'1524.6',
        '4-month-100000':'3049.2',
        '4-month-200000':'6098.4',
        '4-month-300000':'9147.6',
        '5-month-30000':'937.71',
        '5-month-50000':'1562.85',
        '5-month-100000':'3125.7',
        '5-month-200000':'6251.4',
        '5-month-300000':'9377.1',
        '6-month-30000':'961.47',
        '6-month-50000':'1602.45',
        '6-month-100000':'3204.9',
        '6-month-200000':'6409.8',
        '6-month-300000':'9614.7',
        '7-month-30000':'985.5',
        '7-month-50000':'1642.5',
        '7-month-100000':'3285',
        '7-month-200000':'6570',
        '7-month-300000':'9855',
        '8-month-30000':'1010.34',
        '8-month-50000':'1683.9',
        '8-month-100000':'3367.8',
        '8-month-200000':'6735.6',
        '8-month-300000':'10103.4'
    }
    fee.prototype.find	= function(id) {
        if(typeof(this.items[id]) == "undefined")
            return false;
        return this.items[id];
    }
}

