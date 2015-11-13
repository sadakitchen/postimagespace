/// <reference path="jquery.d.ts" />
class Ball{
	private posX: number;
	private posY: number;
	private x1: number;
	private y1: number;
	private x2: number;
	private y2: number;
	private size: number;
	private spdX: number = 0;
	private spdY: number = 0;
	private isHold: boolean = false;

	constructor(x: number, y: number, _size: number) {
		this.posX = x;
		this.posY = y;
		this.size = _size;
	}

	public enterFrame():void
	{
		if (this.isHold === true) {
			this.x1 = this.x2;
			this.y1 = this.y2;
			this.x2 = this.posX;
			this.y2 = this.posY;
			this.spdX = (this.x2 - this.x1);
			this.spdY = (this.y2 - this.y1);
		} else {
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
	}
	public onPress():void
	{
		this.isHold = true;
	}
	public onRelease():void
	{
		this.isHold = false;
	}
}
$(document).ready(() => {
	
});
