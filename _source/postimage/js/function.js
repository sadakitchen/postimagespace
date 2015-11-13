/// <reference path="jquery.d.ts" />
var Ball = (function () {
    function Ball(x, y, _size) {
        this.spdX = 0;
        this.spdY = 0;
        this.isHold = false;
        this.posX = x;
        this.posY = y;
        this.size = _size;
    }
    Ball.prototype.enterFrame = function () {
        if (this.isHold === true) {
            this.x1 = this.x2;
            this.y1 = this.y2;
            this.x2 = this.posX;
            this.y2 = this.posY;
            this.spdX = (this.x2 - this.x1);
            this.spdY = (this.y2 - this.y1);
        }
        else {
            if (this.posX > 500 - this.size / 2) {
                this.posX = 500 - this.size / 2;
                this.spdX = this.spdX * -1;
            }
            if (this.posX < 0 + this.size / 2) {
                this.posX = 0 + this.size / 2;
                this.spdX = this.spdX * -1;
            }
            if (this.posY > 400 - this.size / 2) {
                this.posY = 400 - this.size / 2;
                this.spdY = this.spdY * -1;
            }
            if (this.posY < 0 + this.size / 2) {
                this.posY = 0 + this.size / 2;
                this.spdY = this.spdY * -1;
            }
            this.posX += this.spdX;
            this.posY += this.spdY;
        }
    };
    Ball.prototype.onPress = function () {
        this.isHold = true;
    };
    Ball.prototype.onRelease = function () {
        this.isHold = false;
    };
    return Ball;
})();
$(document).ready(function () {
});
