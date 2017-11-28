/*
 此组件依赖lodash库
 * */

function selectEnterpriseContact(selectedListOnpage,fn) {
	var server = $('#server').val(),
	     requestUrl = '';
	
	 // console.log('组件接受的来自页面的数据--------', selectedListOnpage);
	var selectedList = null; // 保存已被选中的人或者部门,alreadySelectedList为具体页面上已经选中的人员
	if(selectedListOnpage == '' || selectedListOnpage == 'all') {
		selectedList = [];
	} else {
		selectedList = JSON.parse(selectedListOnpage);
	}
	// console.log('生成的selectedList数组-------', selectedList);
	
	var $resultList = $('#result-list'),
	     $selectEnterpriseContactWindow = $('#selectEnterpriseContactWindow'),
	     $selectWindowBody = $('#selectWindowBody'),
	     $selectEnterpriseContactConfirmBtn = $('#selectEnterpriseContactConfirmBtn'),
	     $selectedWrap = $('#selectedWrap');
	
	function initView() { // 根据页面上已经选中的人员来初始化弹窗
		// console.log('initView渲染dom的list------', selectedList);
		$selectedWrap.html('');
		$resultList.html('');
		$('.j-listItem').removeClass('active');
		updateViewBySelectedList(selectedList);
	};
	initView(); // 初始化
	
	function updateViewBySelectedList(list) { // 更新上方已选人的视图
		var selectedTemplate = '';
		// console.log('updateViewBySelectedList渲染dom的list------', selectedList);
		list.forEach(function(item, index) { 
			selectedTemplate += '<span class="label_bar bar_warn selected-item j-selected-item"><i data-id="'+item.id+'" data-name="'+item.name+'" data-type="'+item.type+'" class="del-selected j-del-selected f_anger">✘</i>'+item.name+'</span>';
		});
		$selectedWrap.html($(selectedTemplate));
	};
	
	function updateViewHookSelectedList(list) { // 更新下方已选人是否打钩的视图
		$resultList.find('.j-result-listItem.itemSelected').each(function(i,e) {
			var _thisId = $(e).data('id'),
			     isIn = _.findIndex(list, 'id', _thisId);
			if(isIn != -1) {
				$(e).addClass('itemSelected').find('.j-result-listItemHook').show();
			} else {
				$(e).removeClass('itemSelected').find('.j-result-listItemHook').hide();
			}
		});
	};
	
	function updateSelectedList(list,listItem,type) { // 根据selectedList操作更新已选人数的视图
		if(type == 'remove') { // 删除
			_.remove(list, function(n) {
				return n.id == listItem.id;
			});
		} else { // 新增
			list.push(listItem);
		}
		list = _.uniq(list,'id'); // 根据id对数组进行去重
		console.log(list);
		updateViewBySelectedList(list);
	};
	
	$selectEnterpriseContactWindow.modal({backdrop: 'static', show: true}); // 显示弹窗
	$selectEnterpriseContactWindow.on('hidden.bs.modal', function() {
		$selectWindowBody.off();
	});
	
	$selectWindowBody.on('click', '.j-result-listItem', function() { // 选人,并将选择的结果放在顶部显示区域
		var id = $(this).data('id'), accid = $(this).data('accid')?$(this).data('accid'):'', name = $(this).data('name');
		if($(this).hasClass('itemSelected')) {
			$(this).removeClass('itemSelected').find('.j-result-listItemHook').hide();
			updateSelectedList(selectedList,{id: id, accid: accid, name: name},'remove');
		} else {
			$(this).addClass('itemSelected').find('.j-result-listItemHook').show();
			updateSelectedList(selectedList,{id: id, accid: accid, name: name},'add');
		}
	});
	
	$selectWindowBody.on('click', '#addAllBtn', function() { // 选择全体成员
		var selectedTemplateAll = '<span class="label_bar bar_warn selected-item j-selected-item j-allPeopleSelected"><i class="del-selected j-del-selected f_anger">✘</i>全体成员</span>';
		$resultList.find('.j-result-listItem').removeClass('itemSelected').find('.j-result-listItemHook').hide();
        $selectedWrap.html($(selectedTemplateAll));
	});
	
	$selectWindowBody.on('click', '.j-del-selected', function() { // 删除已选中的人
		var id = $(this).data('id'),accid = $(this).data('accid')?$(this).data('accid'):'', name = $(this).data('name');
		updateSelectedList(selectedList,{id: id, accid: accid, name: name},'remove');	  
		updateViewHookSelectedList(selectedList);
	});
	
	$selectWindowBody.on('click', '.j-listItem', function() { // 根据部门或者标签查找具体的人或部门
		var isSelectByDep = false; // 判断是通过部门还是标签选人
		$('.j-listItem').removeClass('active');
		if($(this).hasClass('active')) { 
			return;
		} else {
			$(this).addClass('active');
		}
		var id = $(this).data('id');
		var name = $(this).html();
		if($(this).hasClass('j-depListItem')) { // 通过部门选人
			isSelectByDep = true;
			requestUrl = '/wx/qyh/getContacts.json?depId=';
		} else { // 通过标签选人
			requestUrl = '/wx/qyh/getContacts.json?tagId=';
		}
		$.ajax({type: 'get', url: server + requestUrl + id, async: true, dataType: 'json',
			success: function(data) {
				var result = data.getContactsResult;
				if(result.success) {
					var depList = result.depList, empList = result.empList, resultListTemplate = '';
					if(depList.length == 0 && empList.length == 0) {
						resultListTemplate = '<li class="result-listItem j-nodata">暂无数据~</li>'
					} else {
						if(isSelectByDep) { // 如果通过部门选人,deplist本应为空,然后在deplist中加一个被选的这个部门,用来做全选
							depList.push({"id": parseInt(id), "name": name});
						}
						depList.forEach(function(item,index) {
							var isSelected = _.findIndex(selectedList, 'id', item.id); // 该人员或者部门是否已经在页面上被选中
							if(isSelected != -1) {
								resultListTemplate += '</li><li data-id="'+item.id+'" data-name="'+item.name+'" data-type="dep" class="result-listItem j-result-listItem itemSelected">'+
						                                '<span class="result-listItemHook j-result-listItemHook">✔</span>'+
						                                '<span class="result-listItemName j-result-listItemName">'+item.name+'</span>'+
						                              '</li>';
							} else {
								resultListTemplate += '</li><li data-id="'+item.id+'" data-name="'+item.name+'" data-type="dep" class="result-listItem j-result-listItem">'+
						                                '<span class="result-listItemHook j-result-listItemHook" style="display:none;">✔</span>'+
						                                '<span class="result-listItemName j-result-listItemName">'+item.name+'</span>'+
						                              '</li>';
							}
						});     
						empList.forEach(function(item,index) {
							var isSelected = _.findIndex(selectedList, 'id', item.id);
							if(isSelected != -1) {
								resultListTemplate += '<li data-id="'+item.id+'" data-accid="'+item.accid+'" data-name="'+item.name+'" data-type="emp" class="result-listItem j-result-listItem itemSelected">'+
							                                '<span class="result-listItemHook j-result-listItemHook">✔</span>'+
							                                '<span class="result-listItemName j-result-listItemName">'+item.name+'</span>'+
							                              '</li>';
							} else {
								resultListTemplate += '<li data-id="'+item.id+'" data-accid="'+item.accid+'" data-name="'+item.name+'" data-type="emp" class="result-listItem j-result-listItem">'+
							                                '<span class="result-listItemHook j-result-listItemHook" style="display:none;">✔</span>'+
							                                '<span class="result-listItemName j-result-listItemName">'+item.name+'</span>'+
							                              '</li>';
							}
						});
					}
					$resultList.html(resultListTemplate);
				}
			}
		});
	});
	
	$selectWindowBody.on('click', '.j-all', function() { // 部门和标签的展开和收缩
		if($(this).hasClass('slideDown')) {
			$(this).next().slideUp(200);
			$(this).removeClass('slideDown');
		} else {
			$(this).next().slideDown(200);
			$(this).addClass('slideDown');
		}
	});
	
	//	$selectWindowBody.on('click', '.j-selectAll', function() { // 全选
//		var $nextAll = $(this).nextAll();
//		if($(this).hasClass('itemAllSelected')) { // 反选
//			$(this).removeClass('itemAllSelected').find('.j-result-listItemHook').hide();
//			$nextAll.removeClass('itemSelected').find('.j-result-listItemHook').hide();
//			$nextAll.each(function(i,e) {
//			  var id = $(e).data('id'), accid = $(e).data('accid')?$(e).data('accid'):'', name = $(e).data('name');
//			  updateSelectedList(selectedList,{id: id, accid: accid, name: name},'remove');
//		    });
//		} else {
//			$(this).addClass('itemAllSelected').find('.j-result-listItemHook').show();
//			$nextAll.addClass('itemSelected').find('.j-result-listItemHook').show();
//			$nextAll.each(function(i,e) {
//			  var id = $(e).data('id'), accid = $(e).data('accid')?$(e).data('accid'):'', name = $(e).data('name');
//			  updateSelectedList(selectedList,{id: id, accid: accid, name: name},'add');
//		    });
//		}
//	});
	
	$selectEnterpriseContactConfirmBtn.on('click', function() { // 点击确认的回调
		var res = '';
		if($selectedWrap.find('.j-allPeopleSelected').length != 0) { // 如果是全体成员,则传一个"all"给后台
			res = 'all';
	    } else {
	    	res = JSON.stringify(selectedList);
	    }
		fn && fn(res);
		$selectEnterpriseContactWindow.modal('hide');
	});
};

		
		