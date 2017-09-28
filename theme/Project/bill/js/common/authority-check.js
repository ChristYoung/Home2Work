function authorityCheck(requestUrl) {
	var roleId = $(this).attr('data-id');
	var roleName = $(this).attr('data-name');
	$.get(requestUrl, {
		roleId: roleId
	}, function(data) {
		var html = '';
		var resList = data.resList;
		resList.forEach(function(item, index) {
			var sonList = item.sonList;
			html += '<tr><th style="width: 100px; vertical-align: top;">' + item.name + '</th><td>';
			if(item.checked == 'Y') {
				sonList.forEach(function(sonItem, index) {
					if(sonItem.checked == 'Y') {
						var son3List = sonItem.sonList; //三级菜单,三级权限
						html += '<span><b class="f_main">✔</b> ' + sonItem.name + '</span>';
						if(son3List.length > 0) {
							son3List.forEach(function(son3Item, index) {
								if(son3Item.checked == 'Y') {
									html += '<span><b class="f_main">✔</b> ' + son3Item.name + '</span>';
								} else {
									html += '<span><b class="f_anger">✘</b> ' + son3Item.name + '</span>';
								}
							});
						}
					} else {
						var son3List = sonItem.sonList;
						html += '<span><b class="f_anger">✘</b> ' + sonItem.name + '</span>';
						if(son3List.length > 0) {
							son3List.forEach(function(son3Item, index) {
								html += '<span><b class="f_anger">✘</b> ' + son3Item.name + '</span>';
							});
						}
					}
				});
			} else { //一级菜单没有勾选,则所有下级菜单都是未选中状态
				sonList.forEach(function(sonItem, index) {
					var son3List = sonItem.sonList;
					html += '<span><b class="f_anger">✘</b> ' + sonItem.name + '</span>';
					if(son3List.length > 0) {
						son3List.forEach(function(son3Item, index) {
							html += '<span><b class="f_anger">✘</b> ' + son3Item.name + '</span>';
						});
					}
				});
			}
			html += '</td>';
			html += '</tr>';
		});
		$('#modal_roleName').html(roleName);
		$('#authority_view tbody').html(html);
		$('#viewRole').modal('show');
	}, 'json');
}