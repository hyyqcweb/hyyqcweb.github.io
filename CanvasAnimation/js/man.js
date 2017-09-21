var Canvas = {};
Canvas.anim = {
	init:function(){
		var canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.w = canvas.width;
		this.h = canvas.height;
		this.places = [];
	},
	render:function(){
		var place ={
			x : this.w / 2,
			y : this.h / 2,
			character : this.letters[Math.floor(Math.random()*this.letters.length)],
			xSpeed : (Math.random()*20) - 10,
			ySpeed : (Math.random()*20) - 10
		};
		this.place.push(places);
		this.draw();
	},
	draw:function(){
		this.
	},
	fade:function(){

	}
}
