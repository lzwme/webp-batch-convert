;(function(doc, domain) {
    var stor = window.localStorage;

    // 添加 webp 支持标识
    function addSupportWebp() {
        doc.documentElement.className += 'webps';
        window._webps = 'A'; // 用于全局对象引用
        if (stor) {
            stor._webps = 'A';
        } else {
            doc.cookie = "webps=A; max-age=31536000; domain=" + domain;
        }
    }

    // 判断 localStorage 或 cookie 中是否有 webps=A
    if (stor && stor._webps !== 'A' || !/(^|;\s?)webps=A/.test(doc.cookie)) {
        var image = new Image();

        image.onload = function() {
            1 === image.width && addSupportWebp();
        };

        // 一张支持alpha透明度的webp的图片，使用base64编码
        image.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';
    } else {
        addSupportWebp();
    }
}(window.document, 'meizu.com'));
