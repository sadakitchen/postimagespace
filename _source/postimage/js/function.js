/// <reference path="jquery.d.ts" />
var Ball = (function () {
    function Ball(_dom, x, y, size) {
        var _this = this;
        this.size = size;
        this.spdX = 0;
        this.spdY = 0;
        this.isHold = false;
        this.isSupportTouch = ('ontouchstart' in window);
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
                if (_this.posX > 500 - _this.size / 2) {
                    _this.posX = 500 - _this.size / 2;
                    _this.spdX = _this.spdX * -1;
                }
                if (_this.posX < 0 + _this.size / 2) {
                    _this.posX = 0 + _this.size / 2;
                    _this.spdX = _this.spdX * -1;
                }
                if (_this.posY > 400 - _this.size / 2) {
                    _this.posY = 400 - _this.size / 2;
                    _this.spdY = _this.spdY * -1;
                }
                if (_this.posY < 0 + _this.size / 2) {
                    _this.posY = 0 + _this.size / 2;
                    _this.spdY = _this.spdY * -1;
                }
                _this.posX += _this.spdX;
                _this.posY += _this.spdY;
                _this.dom.style.left = _this.posX + "px";
                _this.dom.style.top = _this.posY + "px";
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
        // this.isSupportTouch = ('ontouchstart' in window);
        console.log("isSupportTouch:" + this.isSupportTouch);
        this.posX = x;
        this.posY = y;
        this.dom = _dom;
        var EVENTNAME_TOUCHSTART = this.isSupportTouch ? 'touchstart' : 'mousedown';
        var EVENTNAME_TOUCHMOVE = this.isSupportTouch ? 'touchmove' : 'mousemove';
        var EVENTNAME_TOUCHEND = this.isSupportTouch ? 'touchend' : 'mouseup';
        // プレスイベント
        this.dom.addEventListener(EVENTNAME_TOUCHSTART, this.onPress, false);
        this.dom.addEventListener(EVENTNAME_TOUCHMOVE, this.enterFrame, false);
        this.dom.addEventListener(EVENTNAME_TOUCHEND, this.onRelease, false);
        this.timerToken = setInterval(function (e) { return _this.enterFrame(e); }, 33);
    }
    return Ball;
})();
$(document).ready(function () {
});
