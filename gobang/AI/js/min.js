var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var overFlow = document.getElementById("overflow");
var oP = document.getElementsByTagName("p")[0];
var chessBoard = [];
for(var i = 0 ; i < 15 ; i++){
	chessBoard[i] = [];
	for(var j = 0 ; j < 15 ; j++){
		chessBoard[i][j] = 0;
	}
}
var wins = [];
for(var i = 0 ; i<15 ; i++){
	wins[i] = [];
	for(var j = 0 ; j<15 ; j++){
		wins[i][j] = [];
	}
}
var count = 0;
for(var i = 0 ; i < 15 ; i++){
	for(var j = 0 ; j < 11 ; j++){
		for(var k = 0 ; k < 5 ; k++)
		{
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
for(var i = 0 ; i < 15 ; i++){
	for(var j = 0 ; j < 11 ; j++){
		for(var k = 0 ; k < 5 ; k++)
		{
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
for(var i = 0 ; i < 11 ; i++){
	for(var j = 0 ; j < 11 ; j++){
		for(var k = 0 ; k < 5 ; k++)
		{
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
for(var i = 0 ; i < 11 ; i++){
	for(var j = 14 ; j > 3 ; j--){
		for(var k = 0 ; k < 5 ; k++)
		{
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
var myWin = []; // 我方
var computerWin = [];  // 电脑

for(var i = 0 ; i < count ; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}
var over = false;
onload = function(){
	drawChess();
}
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
var me = true;  //为了改变棋子的颜色 
chess.onclick = function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var ev = e || event;
	var x = ev.offsetX;
	var y = ev.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if( chessBoard[i][j] == 0 )
	{
		onStep(i,j,me);
		chessBoard[i][j] = 1;
		for(var k = 0; k<count; k++){
			if(wins[i][j][k])
			{
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] ==5)
				{
					 oP.innerHTML = "You Win!";
					 oP.style.color="#ererer";
					over = true;
				}
			}
	  }
	  if(!over){
		me = !me;
	  	computerAI();
	  }
	}
}
var  computerAI = function(){
	var myScore = []; // 我方的得分
	var computerScore = []; // 计算机方的得分
	var max = 0;
	var u = 0;
	var v = 0;
	for(var i = 0; i<15;i++)
	{
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0;j<15;j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for(var i = 0;i<15;i++){
		for(var j = 0;j<15;j++){
			if(chessBoard[i][j] == 0)
			{
				for(var k =0;k<count;k++){
					if(wins[i][j][k]) 
					{
						if(myWin[k] == 1) // 我方
						{
							myScore[i][j] += 200;
						}else if(myWin[k] == 2)
						{
							myScore[i][j] += 600;
						}
						else if(myWin[k] == 3)
						{
							myScore[i][j] += 2000;
						}
						else if(myWin[k] == 4)
						{
							myScore[i][j] += 10000;
						}

						if(computerWin[k] == 1)  // 计算机方
						{
							computerScore[i][j] += 300;
						}else if(computerWin[k] == 2)
						{
							computerScore[i][j] += 1000;
						}
						else if(computerWin[k] == 3)
						{
							computerScore[i][j] += 4000;
						}
						else if(computerWin[k] == 4)
						{
							computerScore[i][j] += 50000;
						}
					}

				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v])
					{
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v])
					{
						u = i;
						v = j;
					}
				}
			}
		}
	}
	onStep(u,v,false);
		chessBoard[u][v] = 2;
		for(var k = 0; k<count; k++){
				if(wins[u][v][k])
				{
					computerWin[k]++;
					myWin[k] = 6;
					if(computerWin[k] ==5)
					{
						 oP.innerHTML = "Computer Win!";
						 oP.style.color="#ererer";
						over = true;
					}
				}
		  }
		  if(!over){
			me = !me;
		  }
}