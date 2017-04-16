Page({
	data:{},
	onLoad:function(){
		wx.scanCode({
			success:function(){
				wx.showToast({
					title:'成功调用'
				});
			},
			fail:function(){
				wx.showToast({
					title:'调用失败'
				});
			},
			complete:function(){
				wx.showToast({
					title:'调用完成',
					mask:true
				});
			}
		});
	},
	scan:function(e){
		console.log(e);
	}
});