var events;
(function (events) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
            this.listeners = {};
        }
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var e;
            var type;
            if (event instanceof Event) {
                type = event.type;
                e = event;
            }
            else {
                type = event;
                e = new Event(type);
            }
            if (this.listeners[type] !== null) {
                e.currentTarget = this;
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    try {
                        listener.handler(e);
                    }
                    catch (error) {
                        if (window.console) {
                            console.error(error.stack);
                        }
                    }
                }
            }
        };
        EventDispatcher.prototype.addEventListener = function (type, callback, priolity) {
            if (priolity === void 0) { priolity = 0; }
            if (this.listeners[type] === null || this.listeners[type] === undefined) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(new EventListener(type, callback, priolity));
            this.listeners[type].sort(function (listener1, listener2) {
                return listener2.priolity - listener1.priolity;
            });
        };
        EventDispatcher.prototype.removeEventListener = function (type, callback) {
            if (this.hasEventListener(type, callback)) {
                for (var i = 0; i < this.listeners[type].length; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.equalCurrentListener(type, callback)) {
                        listener.handler = null;
                        this.listeners[type].splice(i, 1);
                        return;
                    }
                }
            }
        };
        EventDispatcher.prototype.clearEventListener = function () {
            this.listeners = {};
        };
        EventDispatcher.prototype.containEventListener = function (type) {
            if (this.listeners[type] === null)
                return false;
            return this.listeners[type].length > 0;
        };
        EventDispatcher.prototype.hasEventListener = function (type, callback) {
            if (this.listeners[type] === null)
                return false;
            for (var i = 0; i < this.listeners[type].length; i++) {
                var listener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        };
        return EventDispatcher;
    })();
    events.EventDispatcher = EventDispatcher;
    var EventListener = (function () {
        function EventListener(type, handler, priolity) {
            if (type === void 0) { type = null; }
            if (handler === void 0) { handler = null; }
            if (priolity === void 0) { priolity = 0; }
            this.type = type;
            this.handler = handler;
            this.priolity = priolity;
        }
        EventListener.prototype.equalCurrentListener = function (type, handler) {
            if (this.type === type && this.handler === handler) {
                return true;
            }
            return false;
        };
        return EventListener;
    })();
    var Event = (function () {
        function Event(type, value) {
            if (type === void 0) { type = null; }
            if (value === void 0) { value = null; }
            this.type = type;
            this.value = value;
        }
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY = "changeProperty";
        return Event;
    })();
    events.Event = Event;
})(events || (events = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="jquery.d.ts" />
/// <reference path="EventDispatcher.ts"/>
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(_dom, x, y, spdX, spdY, size, color) {
        var _this = this;
        _super.call(this);
        this.spdX = spdX;
        this.spdY = spdY;
        this.size = size;
        this.color = color;
        this.isHold = false;
        this.isSupportTouch = ('ontouchstart' in window);
        this.EVENTNAME_TOUCHSTART = this.isSupportTouch ? 'touchstart' : 'mousedown';
        this.EVENTNAME_TOUCHMOVE = this.isSupportTouch ? 'touchmove' : 'mousemove';
        this.EVENTNAME_TOUCHEND = this.isSupportTouch ? 'touchend' : 'mouseup';
        this.enterFrame = function (e) {
            if (_this.isHold === true) {
                // console.log(e);
                var clX = (_this.isSupportTouch ? e.changedTouches[0].clientX : e.pageX);
                var clY = (_this.isSupportTouch ? e.changedTouches[0].clientY : e.pageY);
                _this.x1 = _this.x2;
                _this.y1 = _this.y2;
                // this.x2 = this.posX;
                // this.y2 = this.posY;
                _this.x2 = clX;
                _this.y2 = clY;
                _this.spdX = (_this.x2 - _this.x1);
                _this.spdY = (_this.y2 - _this.y1);
                // this.isSupportTouch = ('ontouchstart' in window);
                // console.log(this.isSupportTouch);
                // console.log("clY:" +clY);
                var _posX = (clX - _this.size * 0.5);
                var _posY = (clY - _this.size * 0.5);
                console.log("_posX:" + _posX);
                _this.dom.style.left = _posX + "px";
                _this.dom.style.top = _posY + "px";
            }
            else {
                // console.log(this.spdX);
                if (_this.posX > _this.stageW - _this.size * 0.5) {
                    _this.posX = _this.stageW - _this.size * 0.5;
                    _this.spdX = _this.spdX * -1;
                }
                if (_this.posX < 0 + _this.size * 0.5) {
                    _this.posX = 0 + _this.size * 0.5;
                    _this.spdX = _this.spdX * -1;
                }
                if (_this.posY > _this.stageH - _this.size * 0.5) {
                    _this.posY = _this.stageH - _this.size * 0.5;
                    _this.spdY = _this.spdY * -1;
                }
                if (_this.posY < 0 - _this.size) {
                    _this.posY = 0 - _this.size;
                    // this.spdY = this.spdY * -1;
                    _this.dom.removeEventListener(_this.EVENTNAME_TOUCHMOVE, _this.enterFrame, false);
                    clearInterval(_this.timerToken);
                    // send milkcococa by EventDispatcher
                    // window.sendBall(ball);
                    _this.dispatchEvent(new events.Event("sended"));
                }
                _this.posX += _this.spdX;
                _this.posY += _this.spdY;
                _this.dom.style.left = (_this.posX - _this.size * 0.5) + "px";
                _this.dom.style.top = (_this.posY - _this.size * 0.5) + "px";
            }
        };
        this.onPress = function (e) {
            console.log("onPress");
            if (e !== null) {
                e.preventDefault();
            }
            _this.isHold = true;
            clearInterval(_this.timerToken);
        };
        this.onRelease = function () {
            console.log("onRelease");
            _this.isHold = false;
            _this.timerToken = setInterval(function (e) { return _this.enterFrame(e); }, 33);
        };
        this.setRect = function (w, h) {
            console.log("setRect: w:" + w + " h:" + h);
            _this.stageW = w;
            _this.stageH = h;
        };
        this.start = function () {
            // プレスイベント
            _this.dom.addEventListener(_this.EVENTNAME_TOUCHSTART, _this.onPress, false);
            _this.dom.addEventListener(_this.EVENTNAME_TOUCHMOVE, _this.enterFrame, false);
            _this.dom.addEventListener(_this.EVENTNAME_TOUCHEND, _this.onRelease, false);
            _this.timerToken = setInterval(function (e) { return _this.enterFrame(e); }, 33);
        };
        // this.isSupportTouch = ('ontouchstart' in window);
        console.log("isSupportTouch:" + this.isSupportTouch);
        this.posX = x;
        this.posY = y;
        this.dom = _dom;
        this.dom.style.left = this.posX + "px";
        this.dom.style.top = this.posY + "px";
    }
    return Ball;
})(events.EventDispatcher);
$(document).ready(function () {
});
