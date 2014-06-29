var DateFormat = require('dateformat');

var Utils = function(){};

Utils.prototype = {
	_translation : false,

	load : function(translation){
		if(!this._translation){
			this._translation = translation;
		}
	},
	_formatTimeDate : function(timestamp,format){
		if(timestamp instanceof Date)
			timestamp = timestamp.getTime();

		if(timestamp==parseInt(timestamp))
			return DateFormat(timestamp, format);
		else
			throw new Error('timestamp must be a Date object or a int Timestamp');
		
	},
	formatTime : function(timestamp){
		if(!this._translation)
			return timestamp;

		return this.formatTimeDate(timestamp, this._translation._timeFormat);
	},
	formatDate : function(timestamp){
		if(!this._translation)
			return timestamp;

		return DateFormat(timestamp, this._translation._dateFormat);
	},
	formatTimeDate : function(timestamp){
		if(!this._translation)
			return timestamp;

		return DateFormat(timestamp, this._translation._timeDateFormat);
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
