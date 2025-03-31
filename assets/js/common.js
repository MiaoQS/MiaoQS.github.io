// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });
})


// 使导航栏滑动进行变色
// window.addEventListener("scroll", function () {
//     const navbar = document.getElementById("mainNavbar");
//     if (window.scrollY > 50) {
//       navbar.classList.add("scrolled-navbar", "navbar-dark");
//       navbar.classList.remove("bg-transparent", "navbar-light");
//     } else {
//       navbar.classList.add("bg-transparent", "navbar-light");
//       navbar.classList.remove("scrolled-navbar", "navbar-dark");
//     }
//   });
  
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNavbar");
    const isLightTextPage = document.body.classList.contains("text-mode-light");

    if (window.scrollY > 50) {
        // 向下滑动：正常变为 dark 字体
        navbar.classList.add("scrolled-navbar", "navbar-dark");
        navbar.classList.remove("bg-transparent", "navbar-light");
    } else {
        // 回到顶部：
        if (isLightTextPage) {
            // Contact 页面 → 保持白色字体
            navbar.classList.add("bg-transparent", "navbar-dark");
            navbar.classList.remove("scrolled-navbar", "navbar-light");
        } else {
            // 其他页面 → 恢复默认黑色字体
            navbar.classList.add("bg-transparent", "navbar-light");
            navbar.classList.remove("scrolled-navbar", "navbar-dark");
        }
    }
});
  
  