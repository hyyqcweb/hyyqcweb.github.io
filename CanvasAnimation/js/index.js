var Canvas = {};
Canvas.anim = {
	init:function(){
		var canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.cw = canvas.width;
		this.ch = canvas.height;
		this.places = [];
	},
	render:function(){
		var place = {
			x : this.cw / 2,
			y : this.ch,
			character : this.letters[Math.floor(Math.random()*this.letters.length)],
			xSpeed : (Math.random()*20)-10,
			ySpeed : (Math.random()*20)-10
		};
		this.places.push(place);
		this.draw();
	},
	draw:function(){
		this.fadeCanvas();
		var placeCount = this.places.length;
		var c = this.ctx;
		for(var i=0;i<placeCount;i++){
			var place = this.places[i];
			c.font = "18px sans-serif";
			c.fillStyle = "green";
			c.shadowBlur = 20;
			// c.shadowColor="#841576";
			c.fillText(place.character,place.x,place.y);
			place.x +=place.xSpeed;
			place.y +=place.ySpeed;
			place.y *=0.99;
		}
	},
	fadeCanvas:function(){
		this.ctx.fillStyle = "rgba(0,0,0,.3)";
		this.ctx.fillRect(0,0,this.cw,this.ch);
	}
};
Canvas.anim.init();
setInterval(function(){
	Canvas.anim.render();
},10);