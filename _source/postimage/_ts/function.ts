/// <reference path="jquery.d.ts" />
/// <reference path="EventDispatcher.ts"/>
class Ball extends events.EventDispatcher {
	private posX: number;
	private posY: number;
	private stageW: number;
	private stageH: number;
	private x1: number;
	private y1: number;
	private x2: number;
	private y2: number;
	private isHold: boolean = false;
	private timerToken: number;
	public isSupportTouch: boolean = ('ontouchstart' in window);

	private EVENTNAME_TOUCHSTART:string = this.isSupportTouch ? 'touchstart' : 'mousedown';
	private EVENTNAME_TOUCHMOVE:string = this.isSupportTouch ? 'touchmove' : 'mousemove';
	private EVENTNAME_TOUCHEND:string = this.isSupportTouch ? 'touchend' : 'mouseup';
	public dom: HTMLElement;

	constructor( _dom: HTMLElement, 
							x: number, y: number,
							private spdX: number, private spdY: number,
							public size: number, public color: string) {
		super();
		// this.isSupportTouch = ('ontouchstart' in window);
		console.log("isSupportTouch:" +this.isSupportTouch);

		this.posX = x;
		this.posY = y;

		this.dom = _dom;

		this.dom.style.left = this.posX+"px";
		this.dom.style.top = this.posY+"px";

		
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
			if (this.posX > this.stageW - this.size * 0.5) {
				this.posX = this.stageW - this.size * 0.5;
				this.spdX = this.spdX * -1;
			}
			if (this.posX < 0 + this.size * 0.5) {
				this.posX = 0 + this.size * 0.5;
				this.spdX = this.spdX * -1;
			}
			if (this.posY > this.stageH - this.size * 0.5) {
				this.posY = this.stageH - this.size * 0.5;
				this.spdY = this.spdY * -1;
			}
			if (this.posY < 0 - this.size) {
				this.posY = 0 - this.size;
				// this.spdY = this.spdY * -1;
				this.dom.removeEventListener(this.EVENTNAME_TOUCHMOVE,this.enterFrame,false);
				clearInterval(this.timerToken);

				// send milkcococa by EventDispatcher
				// window.sendBall(ball);
				this.dispatchEvent(new events.Event("sended"));
			}
			this.posX += this.spdX;
			this.posY += this.spdY;

			this.dom.style.left = (this.posX - this.size * 0.5)+"px";
			this.dom.style.top = (this.posY - this.size * 0.5)+"px";
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
	public setRect = (w :number, h:number) => {
		console.log("setRect: w:"+w + " h:"+h);
		this.stageW = w;
		this.stageH = h;
	}
	public start = () => {
		// プレスイベント
		this.dom.addEventListener(this.EVENTNAME_TOUCHSTART, this.onPress, false);
		this.dom.addEventListener(this.EVENTNAME_TOUCHMOVE, this.enterFrame,false);
		this.dom.addEventListener(this.EVENTNAME_TOUCHEND, this.onRelease,false);

		this.timerToken = setInterval((e) => this.enterFrame(e),33);
	}
}
$(document).ready(() => {

});
