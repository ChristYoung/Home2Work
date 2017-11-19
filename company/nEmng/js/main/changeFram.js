function changeFrame(){
	setTimeout(function(){
		var oFrame = document.getElementById("myView");
		var oSectuion = document.getElementById("iframe-container-1");
		var H = oFrame.contentWindow.document.body.offsetHeight;
		oFrame.height = oSectuion.style.height = H+'px';
	},380);
}
