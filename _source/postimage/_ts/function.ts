/// <reference path="jquery.d.ts" />
class Ball {
	private posX: number;
	private posY: number;
	private x1: number;
	private y1: number;
	private x2: number;
	private y2: number;
	private spdX: number = 0;
	private spdY: number = 0;
	private isHold: boolean = false;
	private timerToken: number;
	public isSupportTouch: boolean = ('ontouchstart' in window);
	public dom: HTMLElement;

	constructor( _dom: HTMLElement, x: number, y: number, public size: number) {

		// this.isSupportTouch = ('ontouchstart' in window);
		console.log("isSupportTouch:" +this.isSupportTouch);

		this.posX = x;
		this.posY = y;

		this.dom = _dom;

		var EVENTNAME_TOUCHSTART:string = this.isSupportTouch ? 'touchstart' : 'mousedown';
		var EVENTNAME_TOUCHMOVE:string = this.isSupportTouch ? 'touchmove' : 'mousemove';
		var EVENTNAME_TOUCHEND:string = this.isSupportTouch ? 'touchend' : 'mouseup';

		// プレスイベント
		this.dom.addEventListener(EVENTNAME_TOUCHSTART, this.onPress,false);
		this.dom.addEventListener(EVENTNAME_TOUCHMOVE, this.enterFrame,false);
		this.dom.addEventListener(EVENTNAME_TOUCHEND, this.onRelease,false);

		this.timerToken = setInterval((e) => this.enterFrame(e),33);
	}

	private enterFrame = (e: any): void => {
		if (this.isHold === true) {
			// console.log(e);
			var clX: number = (this.isSupportTouch ? e.changedTouches[0].clientX : e.pageX);
			var clY: number = (this.isSupportTouch ? e.changedTouches[0].clientY : e.pageY);

			this.x1 = this.x2;
			this.y1 = this.y2;
			// this.x2 = this.posX;
			// this.y2 = this.posY;
			this.x2 = clX;
			this.y2 = clY;
			this.spdX = (this.x2 - this.x1);
			this.spdY = (this.y2 - this.y1);

			// this.isSupportTouch = ('ontouchstart' in window);
			// console.log(this.isSupportTouch);
			// console.log("clY:" +clY);
			var _posX: number = (clX - this.size * 0.5);
			var _posY: number = (clY - this.size * 0.5);
			console.log("_posX:" +_posX);
			this.dom.style.left = _posX+"px";
			this.dom.style.top = _posY+"px";
		} else {
			// console.log(this.spdX);
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

			this.dom.style.left = this.posX+"px";
			this.dom.style.top = this.posY+"px";
		}
	}
	private onPress = (e :any) => {
		console.log("onPress");
		if(e !== null){
			e.preventDefault();
		}
		this.isHold = true;

		clearInterval(this.timerToken);
	}
	private onRelease = () => {
		console.log("onRelease");
		this.isHold = false;

		this.timerToken = setInterval((e) => this.enterFrame(e),33);
	}
}
$(document).ready(() => {

});
