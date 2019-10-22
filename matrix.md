# 仿射变换(Affine Transformation)

------

**仿射变换**, 又称**仿射**映射, 是指在几何中, 一个向量空间进行一次线性**变换**并接上一个平移, **变换**为另一个向量空间。

### 1. 概念分类

> * 缩放 ( Scale )
> * 平移 ( Transform )
> * 旋转 ( Rotate )

### 2. 图形展示

![Affine Transformation example image ](https://vei-oss1.atvideo.cc/photo_relay_album/1_5819d9aa86ecbd1ce44b639c56b3e84e.jpg)

### 3. 图形解析

##### 注: 从左到右依次排列分析
> * 左1代表是**没有变化**的初始坐标点 (1, 0, 0, 0, 1, 0, 0, 0, 1)
```
	初始状态(没有变化) 数学矩阵(转换): 
			|1 0 0|		|a c e|
			|0 1 0| => 	|b d f|
			|0 0 1|		|0 0 1|

			------------------------------------
			应用矩阵公式: matrix(1,0,0,1,0,0)
			------------------------------------
			结合demo示例(初始化): 
			<script src="./affine.js"></script> // 导入
			let matrix = new Affine(); // 初始化对象
			let anchor = { x: 0, y: 0 };
		    let position = { x: 0, y: 0};
		    let zoom = { x: 1, y: 1 }; 
		    let rotation = 0; 
		    matrix.set(anchor, position,  zoom, rotation);
```
![左1示例](https://vei-oss1.atvideo.cc/photo_relay_album/1_e34d3cef5841ea842e13902184a16512.jpg)
> * 左2代表**平移**之后的坐标点 (1, 0, X, 0, 1, Y, 0, 0, 1)
```
	平移 数学矩阵: 
			|a c e|	  |x|	|ax cy e|  
			|b d f| · |y| = |bx dy f|
			|0 0 1|	  |1|	|0  0  1|

			------------------------------------
			x' = ax+cy+e (x点坐标, 水平)
			y' = bx+dy+f (y点坐标, 垂直)
			------------------------------------
			举例: X = 10, Y = 10
			x' = ax+cy+e+10
			y' = bx+dy+f+10
			------------------------------------
			应用矩阵公式: matrix(1,0,0,1,10,10)
			------------------------------------
			结合demo示例(平移): 
			let moveMatrix = new Affine();
		    position = { x: 10, y: 10 };
		    zoom = { x: 1, y: 1 };
		    rotation = 0;
		    moveMatrix.set(anchor, position, zoom, rotation);
		    matrix.multiply(moveMatrix);

```
![左2示例](https://vei-oss1.atvideo.cc/photo_relay_album/1_f695995ef5bc5d673682cae22ca432b4.jpg)
> * 左3代表**缩放**之后的坐标点 (W, 0, 0, 0, H, 0, 0, 0, 1)
```
	缩放 数学矩阵: 
				|w 0 0|
				|0 h 0|
				|0 0 1|

				------------------------------------
				举例: W = 2, H = 2   (w,h 均为倍数)
				------------------------------------
				应用矩阵公式: matrix(2,0,0,2,0,0)
				------------------------------------
				结合demo示例(缩放): 
				let scaleMatrix = new Affine();
			    anchor = {x: 0, y : 0};
			    position = {x: 0, y: 0};
			    zoom = {x: 2, y: 2};
			    rotation = 0;
			    scaleMatrix.set(anchor, position, zoom, rotation);
			    matrix.premultiply(scaleMatrix);
```
![左3示例](https://vei-oss1.atvideo.cc/photo_relay_album/1_006c942f7e1c2b4f42268d6819f28bec.jpg)
> * 左4代表**旋转**之后的坐标点 (cosθ, sinθ, 0, -sinθ, cosθ, 0, 0, 0, 1)
```
	旋转 数据矩阵:
				|cosθ -sinθ 0|	   |x|	 |xcosθ-ysinθ|
				|sinθ cosθ  0|	·  |y| = |xsinθ+ycosθ|
				|0	  0		1|	   |1|	 |	   1	 |

				------------------------------------
				x' = xcosθ-ysinθ
				y' = xsinθ+ycosθ
				------------------------------------
				举例: 顺时针方向旋转 45° (sin45°, cos45°) => (0.707, 0.707)
				------------------------------------
				应用矩阵公式: matrix(0.707, 0.707, -0.707, 0.707, 0, 0)
				------------------------------------
				结合demo示例(旋转): 
				let rotationMatrix = new Affine();
			    anchor = {x: 0, y:0};
			    position = { x: 0, y: 0 };
			    zoom = { x: 1, y: 1 }; 
			    rotation = 45;
			    rotationMatrix.set(anchor, position, zoom, rotation);
			    matrix.premultiply(rotationMatrix);
```
![左4示例](https://vei-oss1.atvideo.cc/photo_relay_album/1_28c25e432a9384feadcc66486fd5a5b1.jpg)

### 4. 概念理解

> * 经过对坐标轴的**缩放**, **旋转**, **平移**后的原坐标在新坐标域中的值
> * 简单来说就是 **仿射变换 = 线性变换 + 平移**

### [demo下载](https://vei-oss1.atvideo.cc/photo_relay_album/1_1fa8e0192e730ddd2fd1c174f855fa00.zip)


