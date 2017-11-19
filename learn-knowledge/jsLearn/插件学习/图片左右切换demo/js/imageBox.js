/**
 * Created with JetBrains WebStorm.
 * User: WinKi
 * Date: 13-9-12
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */
(function ($) {                 //点击图片放大的插件
    $.fn.myImageBox = function (option) {
        var defaults = {
            marked: true
        };
        var options = $.extend(defaults, option);

        $(this).click(function () {
            var url = $(this).attr("href");
            setImg(url);
            marked();
            return false;
        });

    };
    function init() {
        $('<div class="imageBox_bg"><img class="bigImg"/></div>').appendTo('body');
        $('.imageBox_bg').css({
                position: "absolute",
                padding: "2px",
                zIndex: 1003,
                display: "none"
            }
        ).before('<div class="mark"></div>');
        $('.mark').css({
                position: "absolute",
                top: 0,
                backgroundColor: "#777",
                zIndex: 1002,
                left: 0,
                display: " none"
            }
        )
    }
    function divCenter(url) {
        var top = ($(window).height() - $('.imageBox_bg').height()) / 2 + $(document).scrollTop(), 
            left = ($(window).width() - $('.imageBox_bg').width()) / 2 + $(document).scrollLeft();
        $('.bigImg').attr("src", url);
        $('.imageBox_bg').css({
            top: top,
            left: left
        }).stop().fadeIn(500);
    }
    function setImg(url) {
        var getimg = new Image();
        var imgh, imgw;
        getimg.onload = function () {
            imgh = getimg.height;
            imgw = getimg.width;

            var trueW = imgw * (400 / imgh);
            if (imgh > 400) {
                $('.imageBox_bg').css({height: 400, width: trueW});
                $('.bigImg').css({height: 400, width: trueW});
            }
            else {
                $('.imageBox_bg').css({height: imgh, width: imgw });
                $('.bigImg').css({height: imgh, width: imgw});
            }
            divCenter(url);
        };
        getimg.src = url;
    }

    function marked() {
        $('.mark').css({
            height: document.documentElement.scrollHeight,
            width: document.documentElement.scrollWidth
        }).show().animate({opacity: 0.6}, 0);
    }

    function TurnToHide() {
        $('.mark').stop().fadeOut(300);
        $('.imageBox_bg').stop().fadeOut(300);
    }

    $(function(){           //在所有dom元素加载完毕后进行初始化
        init();
        $('.imageBox_bg').click(function () {
            TurnToHide();
        });
        $('.mark').click(function () {
            TurnToHide();
        });
    });
})(jQuery);