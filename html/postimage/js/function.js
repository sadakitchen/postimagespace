/// <reference path="jquery.d.ts" />
var Ball = (function () {
    function Ball(_dom, x, y, size, color) {
        var _this = this;
        this.size = size;
        this.color = color;
        this.spdX = 0;
        this.spdY = 0;
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
})();
$(document).ready(function () {
});
