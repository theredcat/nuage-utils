Utils = require('../lib/utils');

var translation = {
	lang : {
		"_dateFormat" : "dd/mm/yyyy",
		"_timeFormat" : "HH:MM:ss",
		"_timeDateFormat" : "dd/mm/yyyy HH:MM:ss",
	},
	I : function(word){
		return (this.lang[word]) ? this.lang[word] : word;
	}
};

Utils.load(translation);

exports.dates = function(test){
	test.expect(4*3+1);

	// Test the stack
	test.doesNotThrow(function(){
		Utils.formatTime(new Date(1));
	});

	// Test return values
	var dateTests = {
		Friendly32bitsDate : {
			timestamp : 1337426661337,
			time : "13:24:21",
			date : "19/05/2012",
			timedate : "19/05/2012 13:24:21"
		},
		zeroDate : {
			timestamp : 0,
			time : "01:00:00",
			date : "01/01/1970",
			timedate : "01/01/1970 01:00:00"
		},
		smallDate : {
			timestamp : -666133742424242,
			time : "18:19:35",
			date : "22/01/-19139",
			timedate : "22/01/-19139 18:19:35"
		},
		bigDate : {
			timestamp : 666133742424242,
			time : "07:40:24",
			date : "09/12/23078",
			timedate : "09/12/23078 07:40:24"
		}
	}

	for(dateName in dateTests){
		var dateType = dateTests[dateName];
		var date = new Date(dateType.timestamp);
		var tmp;

		tmp = Utils.formatTime(date);
		test.equal( tmp , dateType.time , "formatTime(new Date("+dateType.timestamp+")) = "+tmp+" != "+dateType.time);

		tmp = Utils.formatDate(date);
		test.equal( tmp , dateType.date  , "formatDate(new Date("+dateType.timestamp+")) = "+tmp+" != "+dateType.date);

		tmp = Utils.formatTimeDate(date);
		test.equal( tmp , dateType.timedate , "formatTimeDate(new Date("+dateType.timestamp+")) = "+tmp+" != "+dateType.timedate);
	}
	test.done();
};

exports.humanReadableList = function(test){
	test.expect(2);

	var wordlist = ['good','bad','ying','yang'];

	var tmp = Utils.formatAnd(wordlist);
    test.equal(tmp,'good, bad, ying and yang', 'formatAnd('+wordlist.join(', ')+') = '+tmp);

    var tmp = Utils.formatOr(wordlist);
    test.equal(tmp,'good, bad, ying or yang', 'formatAnd('+wordlist.join(', ')+') = '+tmp);

    test.done();
};