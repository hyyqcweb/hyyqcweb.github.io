// 获取
var chess = document.getElementById('chess');
var context = chess.getContext('2d');

// 二维数组 判断其黑白棋落子 不让其变色
var chessBoard = [];
for(var i = 0 ; i < 15 ; i++){
	chessBoard[i] = [];
	for(var j = 0 ; j < 15 ; j++){
		chessBoard[i][j] = 0;
	}
}

//初始化
onload = function(){
	drawChess();
	// onStep(0,0,true);
	// onStep(1,1,false);   测试用的
}

// 棋盘绘制
context.strokeStyle = "#BFBFBF";  // 绘制的颜色
var drawChess = function(){
	for(var i = 0; i<15; i++)
	{
		context.moveTo( 15 + i*30 , 15 );
		context.lineTo (15 + i*30 , 435);
		context.stroke();
		context.moveTo( 15 , 15 + i*30 );
		context.lineTo ( 435 , 15 + i*30 );
		context.stroke();
	}
}

// 棋子绘制  i,j 棋盘上的索引 me 黑棋还是白棋
var onStep = function(i,j,me)
{
	context.beginPath();
	context.arc( 15 + i*30,15 + j*30,13,0,2*Math.PI );
	var gradient = context.createRadialGradient( 15 + i*30 - 2 , 15 + j*30 + 2 , 13 , 15 + i*30 - 2 , 15 + j*30 + 2 , 20 );
	if( me ){   // 黑棋
		gradient.addColorStop( 0 , "#0A0A0A" );
		gradient.addColorStop( 1 , "#636766" );
	}else{		// 白棋
		gradient.addColorStop( 0 , "#D1D1D1" );
		gradient.addColorStop( 1 , "#F9F9F9" );
	}
	context.fillStyle = gradient;
	context.fill();
	context.stroke();
	context.closePath();
}

// 落子
var me = true;  //为了改变棋子的颜色 
chess.onclick = function(e){
	var ev = e || event;
	
	var x = ev.offsetX;
	var y = ev.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if( chessBoard[i][j] == 0 )
	{
		onStep(i,j,me);
		if(me){
			chessBoard[i][j] = 1; 
		}else{
			chessBoard[i][j] = 2;
		}
		me = !me;
	}
	/*没有if判断时，会出现双击变色的情况*/
	//onStep(i,j,true);
	// onStep(i,j,me);
	// me = !me;
}