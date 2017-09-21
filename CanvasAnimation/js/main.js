//页面命名空间
/*
	项目名称：canvas粒子爆炸
	作者：junjie_jiang
	github:hyyqcweb
	最后更新：2017/8/23
*/
var Canvas = {};

Canvas.anim = {
	//init 初始化
	init:function(){
		var canvas = document.getElementById("canvas");
		this.ctx = canvas.getContext("2d"); //this指向是Canvas
		// console.log(this);
		//使画布能适应屏幕的大小
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		//全部字母存储字符串
		this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		//获取宽高
		this.cw = canvas.width;
		this.ch = canvas.height;
		//创建位置的数组
		this.places = [];

	},
	// render 执行函数
	render:function(){
		var place = {
			x : this.cw / 2,
			y : this.ch,
			//特征
			character : this.letters[Math.floor(Math.random()*this.letters.length)],
			// alert(character)
			//速度值
			xSpeed : (Math.random()*20)-10,
			ySpeed : (Math.random()*20)-10

		};
		this.places.push(place);
		this.draw();
	},
	// draw 绘制
	draw:function(){
		 this.fadeCanvas();
		var placeCount = this.places.length;
		//var place = this.places[0];
		//console.log(placeCount);
		var c = this.ctx;
		for(var i=0;i < placeCount; i++) {
		 	var place = this.places[i];

		 	c.font = "12px sans-serif";
			c.fillStyle = "green";
			c.fillText(place.character,place.x,place.y);

			place.x += place.xSpeed;
			place.y += place.ySpeed;
			place.y *= 0.98;
		}
	},
	//fadeCanvas 复位可以说是清除
	fadeCanvas:function(){
		this.ctx.fillStyle = "rgba(0,0,0,.3)";
		this.ctx.fillRect(0,0,this.cw,this.ch);
		
	}
}
Canvas.anim.init();
setInterval(function(){
	Canvas.anim.render();
},13);
