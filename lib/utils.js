var DateFormat = require('dateformat');

var Utils = function(){};

Utils.prototype = {
	_translation : false,

	load : function(translation){
		if(!this._translation){
			this._translation = translation;
		}
	},
	formatTime : function(timestamp){
		if(!this._translation)
			return timestamp;
		return DateFormat(timestamp*1000, this._translation._timeFormat);
	},
	formatDate : function(timestamp){
		if(!this._translation)
			return timestamp;
		return DateFormat(timestamp*1000, this._translation._dateFormat);
	},
	formatTimeDate : function(timestamp){
		if(!this._translation)
			return timestamp;
		return DateFormat(timestamp*1000, this._translation._dateTimeFormat);
	},
	formatAnd : function(list){
		if(!Array.isArray(v))
			throw new Error("parameter must be an array");

		if(list.length == 1)
			return list[0];

		var lastElement = list.pop();

		return list.join(', ')+" "+this._translation.I('and')+" "+lastElement;
	}
}

module.exports = exports = new Utils();
