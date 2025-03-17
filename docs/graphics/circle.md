# CircleGraphics

> **类** 几何图形圆类 继承于几何图形基础类[base](./base.md)

## 属性

type = "Circle"

## 初始化一个圆

```js
/**
 * 创建一个二维坐标系上的圆
* @param {Number} x 圆心x轴坐标
* @param {Number} y 圆心y轴坐标
* @param {Number} radius 圆的半径
* @param {String} [id] 椭圆的唯一标识
 */
const circleGra = new CircleGraphics(10, 24, 12);
```

## 静态方法

### fromVec2

```js
/**
 * 从一个二维向量和半径创建一个几何圆
 * @param {Vec2} Vec2 
 * @param {Number} radius 圆的半径
 * @param {String} [id] 椭圆的唯一标识
 * @returns 
 */
const circleGra2 = CircleGraphics.fromVec2(Vec2.fromValues(2,4), 12);
```

## 实例方法

### setGeomerty

```js
/**
 * 设置几何形状
 * @param {Number} x 圆心x轴坐标
 * @param {Number} y 圆心y轴坐标
 * @param {Number} radius 圆的半径
 */
```

### setGeomertyWithVec2

```js
/**
 * 设置几何形状
 * @param {Vec2} Vec2 
 * @param {Number} radius 圆的半径
 */
```
