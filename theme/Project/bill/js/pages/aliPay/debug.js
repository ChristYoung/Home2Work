var debug_config = {
	_debug: false,
	_listeners: function(k) {
		if(this._debug) {
			if(typeof k == 'object') {
				alert(JSON.stringify(k));
				console.log(k);
			}
		} else {
			return;
		}
	}
};