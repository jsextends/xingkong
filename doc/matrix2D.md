# 2维坐标使用3阶仿射变换矩阵进行变换

## 矩阵相乘 

> 三阶矩阵A和B乘法按照定义，第$C_{ij}$项等于$A_{ik}$乘以$B_{kj}$，再对k从1到3求和。

### 矩阵 A
$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} 
\end{bmatrix}
$$

### 矩阵 B
$$
\begin{bmatrix}
b_{11} & b_{12} & b_{13} \\
b_{21} & b_{22} & b_{23} \\
b_{31} & b_{32} & b_{33} 
\end{bmatrix}
$$

### 矩阵A * 矩阵B

$$
\begin{bmatrix}
a_{11} * b_{11} + a_{12} * b_{21} + a_{13} * b_{31} & a_{11} * b_{12} + a_{12} * b_{22} + a_{13} * b_{32} & a_{11} * b_{13} + a_{12} * b_{23} + a_{13} * b_{33} \\
a_{21} * b_{11} + a_{22} * b_{21} + a_{23} * b_{31} & a_{21} * b_{12} + a_{22} * b_{22} + a_{23} * b_{32} & a_{21} * b_{13} + a_{22} * b_{23} + a_{23} * b_{33} \\
a_{31} * b_{11} + a_{32} * b_{21} + a_{33} * b_{31} & a_{31} * b_{12} + a_{32} * b_{22} + a_{33} * b_{32} & a_{31} * b_{13} + a_{32} * b_{23} + a_{33} * b_{33}
\end{bmatrix}
$$

### 矩阵B * 矩阵A
$$
\begin{bmatrix}
b_{11} * a_{11}+ b_{12} * a_{21} + b_{13} * a_{31} & b_{11} * a_{12}  + b_{12} * a_{22} + b_{13} * a_{32} & b_{11} * a_{13} + b_{12} * a_{23} + b_{13} * a_{33} \\
b_{21} * a_{11}+ b_{22} * a_{21} + b_{23} * a_{31} & b_{21} * a_{12}  + b_{22} * a_{22} + b_{23} * a_{32} & b_{21} * a_{13} + b_{22} * a_{23} + b_{23} * a_{33} \\
b_{31} * a_{11}+ b_{32} * a_{21} + b_{33} * a_{31} & b_{31} * a_{12}  + b_{32} * a_{22} + b_{33} * a_{32} & b_{31} * a_{13} + b_{32} * a_{23} + b_{33} * a_{33} \\
\end{bmatrix}
$$

## 3维仿射变换矩阵

$$
\begin{bmatrix}
a & c & tx \\
b & d & ty \\
0 & 0 & 1 
\end{bmatrix}
$$

### 矩阵A * 矩阵B 化简为

$$
\begin{bmatrix}
a_{11} * b_{11} + a_{12} * b_{21} & a_{11} * b_{12} + a_{12} * b_{22} & a_{11} * b_{13} + a_{12} * b_{23} + a_{13} \\
a_{21} * b_{11} + a_{22} * b_{21} & a_{21} * b_{12} + a_{22} * b_{22} & a_{21} * b_{13} + a_{22} * b_{23} + a_{23} \\
b_{31} & b_{32} & 1
\end{bmatrix}
$$

### 矩阵B * 矩阵A 化简为
$$
\begin{bmatrix}
b_{11} * a_{11}+ b_{12} * a_{21}  & b_{11} * a_{12}  + b_{12} * a_{22} & b_{11} * a_{13} + b_{12} * a_{23} + b_{13} \\
b_{21} * a_{11}+ b_{22} * a_{21} & b_{21} * a_{12}  + b_{22} * a_{22} & b_{21} * a_{13} + b_{22} * a_{23} + b_{23} \\
a_{31} & a_{32} & 1 \\
\end{bmatrix}
$$

### 旋转 

> 三维仿射变换中负责旋转的是

$$
\begin{bmatrix}
a & c \\
b & d 
\end{bmatrix}
$$

目标图形绕原点旋转$\theta$， 矩阵表示**矩阵C**

$$
\begin{bmatrix}
\cos \theta & -\sin \theta & 0 \\
\sin \theta & \cos \theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

### 矩阵A旋转$\theta$表示为 矩阵A * 矩阵C

$$
\begin{bmatrix}
a_{11} * \cos \theta + a_{12} * \sin \theta & -a_{11} * \sin \theta + a_{12} * \cos \theta & 0 \\
a_{21} * \cos \theta + a_{22} * \sin \theta & -a_{21} * \sin \theta + a_{22} * \cos \theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

### 缩放 

$$
\begin{bmatrix}
s_x & 0 & 0 \\
0 & s_y & 0 \\
0 & 0 & 1 \\
\end{bmatrix}
$$

### 矩阵A缩放表示为 矩阵A * 缩放矩阵

$$
\begin{bmatrix}
a_{11} * s_x & a_{12} * s_y  & 0 \\
a_{21} * s_x & a_{22} * s_y  & 0 \\
a_{31} * s_x & a_{32} * s_y  & 1
\end{bmatrix}
$$

### 平移 

$$
\begin{bmatrix}
1 & 0 & tx \\
0 & 1 & ty \\
0 & 0 & 1 \\
\end{bmatrix}
$$

### 矩阵A缩放表示为 矩阵A * 平移矩阵

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{11} * tx + a_{12} * ty + a_{13} \\
a_{21} & a_{22} & a_{21} * tx + a_{22} * ty + a_{23} \\
a_{31} & a_{32} & a_{31} * tx + a_{32} * ty + a_{33}
\end{bmatrix}
$$

## 逆矩阵

[矩阵的逆](https://blog.csdn.net/zzj_continue/article/details/111023014)


## 点通过矩阵计算
$$
\begin{bmatrix}
x \\
y \\
1 
\end{bmatrix}
\begin{bmatrix}
a & c & tx \\
b & d & ty \\
0 & 0 & 1 \\
\end{bmatrix}
\text{=}
\begin{bmatrix}
x * a + y * c + tx \\
x * b + y * d + ty \\
1
\end{bmatrix}
$$

