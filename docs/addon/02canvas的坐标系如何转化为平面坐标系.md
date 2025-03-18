# canvas的坐标系如何转化为平面坐标系

Canvas默认的坐标系原点是在左上角，x轴向右，y轴向下
平面坐标系通常是原点在中心，y轴向上

考虑将坐标原点放置在左下角，则X轴不变，对应的y值坐标间-canvas的高度
用公式表示为
$$
\begin{cases}
canvas_x = x \\
canvas_y = height - y
\end{cases}
$$
