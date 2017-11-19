$(function() {
	var
		$addPeopleWrap = $('.add-people-wrap'),
		$saveAll = $('.saveAll'),
		$addOrgBtn = $('#add-org-btn'),
		$peopleItems = $('.people-items'),
		$confirmSelDep = $('#confirmSelDep'),
		$confirmDelDep = $('#confirmDelDep'),
		$departSelRow = $('.departSelRow'),
		$departDelRow = $('.departDelRow'),
		addOrgTemplate = '<form name="" class="orgForm"><div class="people-wrap">' +
		'<div class="orgItems orgName">' +
		'<span class="people-tit">门诊科室类名:</span>' +
		'<input type="text" class="form-control orgNameInput" name="" id="" value="" />' +
		'<button type="button" class="btn btn-primary sel-deps">选择科室</button>' +
		'<button type="button" class="btn btn-danger del-deps">删除科室</button>'+
		'<button type="button" class="btn btn-danger del-org">删除</button>' +
		'</div>' +
		'<div class="orgItems orgDeps"></div></div></form>';

	function removeArrByValue(arr, val) { //删除depsArr中指定depId的数据
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].depId == val) {
				arr.splice(i, 1);
				break;
			}
		}
	};

	function clearModal() {} //科室弹出框消失时执行的方法

	function isFinished() { //判断科室类名是否为空
		var $orgNameInput = $('.orgNameInput');
		if($orgNameInput.length != 0) {
			for(var i = 0, len = $orgNameInput.length; i < len; i++) {
				if($orgNameInput[i].value == '') {
					new witonAlert().init({
						type: 'error',
						msg: '请先输入正确的科室类名'
					});
					$orgNameInput[i].focus();
					return false;
				}
			}
		}
		return true;
	};

	function depNameModalShow() { //当选择科室弹出框弹出时显示的科室名称
		var depNameStr = '';
		if(depsArr.length != 0) {
			depsArr.forEach(function(item, value) { //depsArr是vm页面上的全局变量
				depNameStr += '<div class="col-sm-4">' +
					'<div class="checkbox">' +
					'<label><input type="checkbox" class="checkDepName" data-depName="' + item.depName + '" name="" id="" value="' + item.depId + '" /> ' + item.depName + '</label>' +
					'</div></div>';
			});
			$departSelRow.html(depNameStr);
		} else {
			new witonAlert().init({
				type: 'error',
				msg: '已经没有科室可供选择'
			});
			return false;
		}
		return true;
	};

	function depNameSelModalShow(obj) { //当删除科室弹出框弹出时显示的内容
		var depSelectedNameStr = '',
			depSelectedNameDom = obj.find('.depItemsName');
		if(depSelectedNameDom.length != 0) {
			depSelectedNameDom.each(function(i, e) {
				depSelectedNameStr += '<div class="col-sm-4">' +
					'<div class="checkbox">' +
					'<label><input type="checkbox" class="checkDelDepName" data-depName="' + $(e).attr('data-depname') + '" name="" id="" value="' + $(e).attr('data-id') + '" /> ' + $(e).attr('data-depname') + '</label>' +
					'</div></div>';
			});
			$departDelRow.html(depSelectedNameStr);
		} else {
			new witonAlert().init({
				type: 'error',
				msg: '没有科室可以删除'
			});
			return false;
		}
		return true;
	};

	function saveAllConfig() { //保存所有的配置
		if(!isFinished()) return;
		var $orgForm = $('.orgForm'),
		     jsons = [];
		$orgForm.each(function(i, e) {
			var _This = $(e);
			var $depItemsName = _This.find('.depItemsName'),
			     orgList = [];
			if($depItemsName.length == 0){
				orgList = null;
			} else {
				$depItemsName.each(function(i, e) {
					var depItemJson = {
						"id": $(e).attr('data-id'),
						"name": $(e).attr('data-depname')
					};
					orgList.push(depItemJson);
				});
			}
			var depClassJson = {
				"name": _This.find('.orgNameInput').val(),
				"list": orgList
			};
			jsons.push(depClassJson);
		});
		console.log(JSON.stringify(jsons));
	};

	$addOrgBtn.on('click', function() { //新增门诊科室类名
		if(!isFinished()) return;
		$(addOrgTemplate).insertAfter($addPeopleWrap);
	});

	$peopleItems.on('click', '.sel-deps', function() { //选择科室
		var _this = $(this);
		if(!depNameModalShow()) return;
		$('#departSelModal').modal('show');
		$confirmSelDep.off().on('click', function() {
			var str = '',
				$checkedDep = $('.checkDepName').filter(':checked');
			$('#departSelModal').modal('hide');
			if($checkedDep.length == 0) return;
			$checkedDep.each(function(i, e) {
				str += '<span class="depItemsName" data-id="' + $(e).val() + '" data-depName="' + $(e).attr('data-depName') + '">' + $(e).attr('data-depName') + '</span>';
				removeArrByValue(depsArr, $(e).val());
			});
			_this.parent().siblings('.orgDeps').append($(str));
		});
	});

	$peopleItems.on('click', '.del-deps', function() { //删除科室
		var _this = $(this);
		var selectedDom = _this.parent().siblings('.orgDeps');
		if(!depNameSelModalShow(selectedDom)) return;
		$('#departDelModal').modal('show');
		$confirmDelDep.off().on('click', function() {
			var $checkedDelDep = $('.checkDelDepName').filter(':checked');
			$('#departDelModal').modal('hide');
			if($checkedDelDep.length == 0) return;
			$checkedDelDep.each(function(i, e) {
				ThisVal = $(e).val();
				selectedDom.find('.depItemsName').each(function(i, e) {
					if($(e).attr('data-id') == ThisVal) {
						$(e).remove();
						depsArr.push({
							depName: $(e).attr('data-depName'),
							depId: $(e).attr('data-id')
						});
					}
				});
			});
		});
	});

	$saveAll.on('click', function() { //调用保存配置的函数
		saveAllConfig();
	});
});