// Utility.js

function whenReady(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var parseHTML = function (str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
};

var Effect = {
    hide: function (el) {
        el.style.display = 'none';
    },
    show: function (el) {
        el.style.display = '';
    },
    fadeIn: function (el) {
        el.style.opacity = 0;

        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }
};

var Style = {
    addClass: function (el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    },
    removeClass: function (el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },
    hasClass: function (el, className) {
        if (el.classList)
            el.classList.contains(className);
        else
            new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },
    toggleClass: function (className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            el.className = classes.join(' ');
        }
    }
};

var Trigger = {
    _: function (eventName, cargoObj) {
        if (window.CustomEvent) {
            var event = new CustomEvent(eventName, {
                detail: cargoObj
            });
        } else {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, cargoObj);
        }

        el.dispatchEvent(event);
    },
    custom: function (eventName) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);
        el.dispatchEvent(event);
    }
};

var Extend = {
    _: function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    },
    deep: function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    }
};

var Convert = {
    jsonToUri: function (data) {
        let list = [];
        for (let i in data) {
            list.push(i + '=' + data[i]);
        }
        return list.join('&');
    },
    tokenToUserId: function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var result = JSON.parse(window.atob(base64));
        console.log(result.preferred_username);
        return result.preferred_username;
    }
};