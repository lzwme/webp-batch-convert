;(function(doc) {
    var canUseWebp = (function() {
      var elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      } else {
        return false;
      }
    })();

    if (canUseWebp) {
        doc.documentElement.className += ' webps';
        // 用于全局对象引用
        window._webps = 'A';
    }
}(window.document));
