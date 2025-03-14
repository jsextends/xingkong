# 快速开始

## 概述

### canvas坐标系统

Canvas的默认坐标系原点是在左上角，x轴向右延伸，y轴向下延伸，这与数学中的第一象限坐标系（原点在左下角，y轴向上）不同， 这与数学上的平面坐标不符合，因此需要将其转换，以便于使用更直观的数学公式进行计算或绘图

用三维矩阵表示为
$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & -1 & H-1 \\
0 & 0 & 1
\end{bmatrix}
$$

## 形状(geometry)

> 主要是各种几何形状的数学表达式，相关得计算函数库主要来自于[matrixjs](https://jsextends.github.io/matrixjsDoc/)

- [点](./geometry/point.md)
- [圆](./geometry/circle.md)
- [矩形](./geometry/rect.md)
- [椭圆](./geometry/ellipse.md)
- [扇形](./geometry/sector.md)
- [圆环](./geometry/ring.md)

## 图形(graphics)

> 在几何形状的数学表达式之上加入了一些绘制所需的样式信息等

- [基类](./graphics/base.md)

## display
