文章取自
http://blog.jobbole.com/44662/

# 打印样式CSS的技巧和要点 #

针对打印的样式，而不是屏幕显示样式
首先，我们需要使用媒体查询（media query）针对打印样式设置

   `@media print {}`

重新针对打印写CSS样式是没有必要的，我们只需要针对差异设置打印的样式覆盖掉之前的默认样式,
大多数的浏览器会自动根据打印更改颜色，以节省打印原料，但是我们还是尽可能的手工设置一下,<br />
    `@media print { body { color: #000; background: #fff; } }`

对于打印，大多数情况下我们不需要打印整个页面，只需要打印一个简洁的能够突出需要信息的页面，那么我们将不相关的部分隐藏掉（如：导航条、背景图片).
/* Default styles */
<code> 
>`h1 {`
>   `color: #fff;`
>   `background: url(banner.jpg);`
>`}`

>`@media print {`

>   `h1 {`

>`color: #000;`
  
>  `background: none;`
  
>   `}`
   
>   `nav, aside {`
   
>  `display: none;`
  
>   `}`
>
>`}`
</code>

在编写打印样式表的时候，你要注意要使用厘米或者英寸作为单位而不是屏幕像素单位，实际的单位对打印非常有用。
为了保证打印样式有用，写CSS样式使打印的内容距离纸张边缘，看起来更好，需要使用 `@page` 这个语法：<br />
<code>
@media print {
   h1 {
      color: #000;
      background: none;
   }
   nav, aside {
      display: none;
   }
   body, article {
      width: 100%;
      margin: 0;
      padding: 0;
   }
   @page {
      margin: 2cm;
   }
}
</code>
为了保证不被跨页打印，如一个标题和内容在页面底部被分开：<br />
`h2, h3 { page-break-after: avoid; }`
另一中情况是要防止图片过宽而超出纸张边缘：<br />
`img {max-width: 100% !important;}`
第三个要点是确保 articles 文章标签的内容，在新的一页开始：<br />
`article {page-break-before: always;}`
最后，还要注意列表和图片不被分开在不同的页：
ul, img {
   page-break-inside: avoid;
}

扩展打印样式里的超链接
如果直接打印，超链接将只是一点文字，而不会出现链接的网址，这样来说，是没有意义的
我们可以将url链接展示在打印的页面上，我们可以使用:after伪类来实现而不影响周围的元素布局：<br />
<code>
@media print {
   article a {
      font-weight: bolder;
      text-decoration: none;
   }
   article a[href^=http]:after {
      content:&quot; &lt;&quot; attr(href) &quot;&gt; &quot;;
   }
}
</code>
