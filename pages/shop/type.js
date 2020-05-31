   !function () {
            function a() {
                var clientWidth = document.documentElement.clientWidth > 640 ? 640 : document.documentElement.clientWidth;
                document.documentElement.style.fontSize = clientWidth / 7.5 + "px";
 
                //适应字体调整
                var div = document.createElement("div");
                div.style.width = "7.5rem";
                document.documentElement.appendChild(div);
                document.documentElement.style.fontSize = document.documentElement.style.fontSize.replace("px", "") * clientWidth / div.clientWidth + "px";
                document.documentElement.removeChild(div);
            }
            var b = null;
            window.addEventListener("resize", function () {
                clearTimeout(b), b = setTimeout(a, 300)
            }, !1), a()
        }(window);
    var doing = true;
    var category = -1;
    //滚动触发菜单栏
    function pageScroll() {
        var _scrollTop = $(".categoryBox").scrollTop();
        var _height = -(document.documentElement.clientHeight || $(window).height()) / 2 + 25;
        var index = 1;
        $(".categoryList").each(function() {
            _height += $(this).height();
            if(_height > _scrollTop) {
                return;
            }
            index++;
        });
        $(".menu .menuItem").removeClass("selected");
        $(".menu .menuItem:nth-child(" + index + ")").addClass("selected");
    }
    $(function () {
        var _category = window.location.search.match(/[\?&]category=(\d+)&?/);
        if (null != _category) {
            category = _category[1];
        }
        //点击菜单定位
//      $(".menu").on("click", ".menuItem", function () {
//      	alert("")
//          doing = false;
//          var self = $(this);
//          if (!self.hasClass("selected")) {
//              category = self.attr("category");
//              $(".menu .menuItem").removeClass("selected");
//              self.addClass("selected");
//              $(".categoryBox").scrollTop(self.attr("scroll"));
//          }
//          setTimeout(function() {
//              doing = true;
//          }, 100)
//      });
        
        //回退定位高度
        if (!$.os.android || ignorePhoneModel.indexOf(getPhoneModel()) == -1) {
            window.onpopstate = function (event) {
                if (null != event.state && 'undefined' != typeof event.state.scrollTop) {
                    $("body").scrollTop(event.state.scrollTop);
                }
            };
        }
        // 初始化左边栏选项
        $(".menu .menuItem[category='" + category + "']").addClass('selected');
        $(".categoryList[category='" + category + "']").show();
        //计算各分类高度
        var _dataHeight = -50;
        $(".categoryList").each(function(i, item) {
            if(i == 0) {
                $(".menu .menuItem:nth-child(" + (1) + ")").attr("scroll", 0);
            } else {
                $(".menu .menuItem:nth-child(" + (i + 1) + ")").attr("scroll", _dataHeight);
            }
            _dataHeight += $(item).height();
        });
        //页面滚动
        $(".categoryBox").on('scroll', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(doing) {
                pageScroll();
            }
        });
        pageScroll();
        //加载lazy图片
        $.picLazyLoad({
            seletctor: ".lazyLoad",
            scrollArea: $(".categoryBox"),
            threshold: 45
        });
//    $(".menuItem[category='-1']").click();
// 		 $("#aa1").click();
    });
    
//================================
 var maskIsHide = true;//阻止
    var pushState = null;
 
    // 获取手机型号
    var ignorePhoneModel = ['sm-g9200', 'sm-g9208', 'sm-c7000', 'notSupport'];
    function getPhoneModel() {
        if(typeof history.pushState == "undefined") {
            return "notSupport";
        }
        var UA = navigator.userAgent;
        var model = '';
        try {
            var _model = UA.match(/;\s?([^;]+)\s?Build/i);
            if(_model) {
                _model = _model[1];
                model = _model.trim();
            }
        } catch (e) {
        }
        return model.toLowerCase();
    }
 
    window.onpopstate = function (event) {
        if ($.os.android && ignorePhoneModel.indexOf(getPhoneModel()) == -1) {
            if (pushState && pushState.backevent) {
                $(document.body).trigger(pushState.backevent);
            }
            pushState = event.state;
        }
        $(document).trigger('history:back', event.state);
    };
 
    function pushStateEvent(e) {
        if ($.os.android && ignorePhoneModel.indexOf(getPhoneModel()) == -1) {
          pushState = {backevent: e};
          history.pushState(pushState, document.title, "?backevent=" + pushState.backevent.replace(/#/g, ""));
        }
    }
 
    //阻止touchmove事件
    $('body').on('touchmove', function (e) {
        if (!maskIsHide){
            e.preventDefault();
        }
    });
 
    function wptAlert(msg, callback, onlyBtnClose) {
        maskIsHide = false;
    }
 
    //跳转
    function wptRedirect(url, time){
        time = typeof time == 'undefined' ? ($.os.android ? 200 : 0) : time;
        if (time > 0) {
            setTimeout(function() {
                $(document).trigger("wptLoading_view:hide");
                location.href = url;
            }, time);
        } else {
            $(document).trigger("wptLoading_view:hide");
            location.href = url;
        }
    }