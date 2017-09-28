var $modalDialog = $('#modalDialog'),
	$bodyContent = $('#bodyContent'),
	$modalTitle = $('#modalTitle'),
	$modalConfirmBtn = $('#modalConfirmBtn'),
	$delete_btn = $('.delete_btn')
    $forbid_btn = $('.forbid_btn'),
    $enable_btn = $('.enable_btn'),
    $editMchModal = $('#editMchModal'),
    $addMchModal = $('#addMchModal'),
	$addMchForm = $('#addMchForm'),
	$editMchForm = $('#editMchForm'),
	$ConfirmAddMchBtn = $('#ConfirmAddMchBtn'),
	$ConfirmEditMchBtn = $('#ConfirmEditMchBtn'),
	$set_default = $('.set_default'),
	$edit_mchBtn = $('.edit_mchBtn'),
	$add_mchBtn = $('.add_mchBtn');

var serverUrl = $('#serverUrl').val();

var addMchValidator = new FormValidator('addMchForm',[
    {name:'alias',display:rblanguage.group.businessname,rules:'required'},
    {name:'pid',display:'PID',rules:'required'},
    {name:'key',display:rblanguage.group.privatekey,rules:'required'},
    {name:'ways',display:rblanguage.group.scope,rules:'required'}
],false,function(errs,event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});

var editMchValidator = new FormValidator('editMchForm',[
    {name:'alias',display:rblanguage.group.businessname,rules:'required'},
    {name:'privateKey',display:rblanguage.group.privatekey,rules:'required'},
    {name:'ways',display:rblanguage.group.scope,rules:'required'}
],false,function(errs,event) {
	if(errs.length > 0) {
		new autoMsg({
			type: 'error',
			msg: errs[0].message
		});
		$('#' + errs[0].id).focus();
	}
});

$add_mchBtn.on('click', function() {
	$addMchModal.modal('show');
	$ConfirmAddMchBtn.off().on('click', function() {
		if(addMchValidator._validateForm()) {
			var _data = {};
			$addMchModal.modal('hide');
			$addMchForm.serializeArray().map(function(x) {
				_data[x.name] = x.value;
			});
			_data.supportWxPay = $('#add_wx').prop('checked') == true ? 'Y' : 'N';
			_data.supportAliPay = $('#add_aliPay').prop('checked') == true ? 'Y' : 'N';
			$.post(serverUrl + '/group/school/accountAdd.htm', _data, function(data) {
				if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.admin.successmsg,callBack:function(){
                  	window.location.href = window.location.href;
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			},'json');
		}
	});
});

$edit_mchBtn.on('click', function() {
	$('#edit_alias').val($(this).attr('data-alias')); //获取数据至弹出框中
	$('#edit_PID').val($(this).attr('data-pid'));
	$('#edit_privateKey').val($(this).attr('data-key'));
	$('#mechId').val($(this).attr('data-id'));
	if($(this).attr('data-supportWxPay') == 'Y') {
		$('#edit_wx').prop('checked',true);
	} else {
		$('#edit_wx').prop('checked',false);
	};
	if($(this).attr('data-supportAliPay') == 'Y') {
		$('#edit_aliPay').prop('checked',true);
	} else {
		$('#edit_aliPay').prop('checked',false);
	};
	
	$editMchModal.modal('show');
	$ConfirmEditMchBtn.on('click', function() {
		if(editMchValidator._validateForm()) {
			var _data = {};
			$editMchModal.modal('hide');
			$editMchForm.serializeArray().map(function(x) {
				_data[x.name] = x.value;
			});
			_data.supportWxPay = $('#edit_wx').prop('checked') == true ? 'Y' : 'N';
			_data.supportAliPay = $('#edit_aliPay').prop('checked') == true ? 'Y' : 'N';
			$.post(serverUrl + '/group/school/accountUpdate.htm', _data, function(data) {
				if(data.success) {
                  new autoMsg({type:'success',msg:rblanguage.bank.editmsg,callBack:function(){
                  	window.location.href = window.location.href;
                  }});
				} else {
                  new autoMsg({type:'error',msg:data.resultMsg});
				}
			},'json');
		}
	});
});

$forbid_btn.on('click', function() {
	var id = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.admin.disable);
	$bodyContent.html(rblanguage.group.disablebusiness);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.get(serverUrl + '/group/school/accountUpdateStatus.ajax',{id:id,status:'E'},function(data) {
			if(data.success) {
                new autoMsg({type:'success',msg:rblanguage.admin.disablemsg,callBack:function() {
                  	window.location.href = window.location.href;
                }});
			} else {
                new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$enable_btn.on('click', function() { 
	var id = $(this).attr('data-id');
	$.get(serverUrl + '/group/school/accountUpdateStatus.ajax',{id:id,status:'D'},function(data) {
		if(data.success) {
            new autoMsg({type:'success',msg:rblanguage.admin.enablemsg,callBack:function() {
              	window.location.href = window.location.href;
            }});
		} else {
          new autoMsg({type:'error',msg:data.resultMsg});
		}
	},'json');
});

$delete_btn.on('click', function() {
	var id = $(this).attr('data-id');
	$modalDialog.modal('show');
	$modalTitle.html(rblanguage.bank.del);
	$bodyContent.html(rblanguage.group.delschooltip);
	$modalConfirmBtn.off().on('click', function() {
		$modalDialog.modal('hide');
		$.post(serverUrl + '/group/school/accountDelete.ajax', {id:id}, function(data) {
			if(data.success) {
	            new autoMsg({type:'success',msg:rblanguage.bank.delmsg,callBack:function() {
	              	window.location.href = window.location.href;
	            }});
			} else {
	          new autoMsg({type:'error',msg:data.resultMsg});
			}
		},'json');
	});
});

$set_default.on('click', function() {
    var id = $(this).val(),
         schoolId = $('#schoolId').val();
    $.get(serverUrl + '/group/school/accountSetDefault.ajax', {id:id, schoolId:schoolId}, function(data) {
    	if(data.success) {
            new autoMsg({type:'success',msg:rblanguage.group.setmsg,callBack:function() {
              	window.location.href = window.location.href;
            }});
		} else {
          new autoMsg({type:'error',msg:data.resultMsg,callBack:function() {
            	window.location.href = window.location.href;
          }});
		}
    },'json');
});