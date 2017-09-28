var $clearConfigBtn = $('#clearConfigBtn'),
     $copyBtn = $('.copyBtn'),
	serverUrl = $('#serverUrl').val();
$clearConfigBtn.on('click', function() {
	$.post(serverUrl + '/school/config/auth/ali/clear.ajax', {}, function(json) {
		if(json.success) {
			window.location.href = window.location.href;
		} else {
			new autoMsg({type: 'error', msg: json.resultMsg});
		}
	}, 'json');
});

function copyHref(copyBtnId) { 
	var clipboard = new Clipboard('#'+copyBtnId);
	clipboard.on('success', function(e) {
		new autoMsg({type: 'success', msg: rblanguage.school.copysuccess,delay:800});
	    e.clearSelection();
	});
}

for (var i=0; i<$copyBtn.length; i++) {
	copyHref('copyBtn_'+i);
}