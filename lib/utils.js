var DateFormat = require('dateformat');

var Utils = function(){};

Utils.prototype = {
	_translation : false,

	load : function(translation){
		if(!this._translation){
			this._translation = translation;
		}
	},

	_formatTimeDate : function(date,format){

		if(!(date instanceof Date))
			throw new Error('date parameter must be a Date object');

		return DateFormat(date, this._translation.I(format));
	},
	formatTime : function(date){
		return this._formatTimeDate(date, '_timeFormat');
	},
	formatDate : function(date){
		return this._formatTimeDate(date, '_dateFormat');
	},
	formatTimeDate : function(date){
		return this._formatTimeDate(date, '_timeDateFormat');
	},

	_formatAndOr : function(list,andOr){
		list = list.slice(0);

		if(!Array.isArray(list))
			throw new Error("parameter must be an array");

		if(list.length == 1)
			return list[0];

		var lastElement = list.pop();

		return list.join(', ')+" "+this._translation.I(andOr)+" "+lastElement;
	},
	formatAnd : function(list){
		return this._formatAndOr(list,'and');
	},
	formatOr : function(list){
		return this._formatAndOr(list,'or');
	}
}

module.exports = exports = new Utils();
