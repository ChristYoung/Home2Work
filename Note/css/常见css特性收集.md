* background-attachment:fixed; //固定背景图,常用来做视差滚动
* text-decoration：line-through ; //文字中间加上了划线
* image-set()可以根据用户设备的分辨率匹配合适的图像  
示例  ~

	<code>
	div {
		background-image: image-set( "test.png" 1x, "test-2x.png" 2x, "test-print.png" 600dpi );
	}
	</code>
<p>
   上述代码将会为普通屏幕使用 test.png，为高分屏使用 test-2x.png，如果更高的分辨率则使用 test-print.png，比如印刷。
</p>	
