---
title: 几何形状_矩形
outline: deep
---

# RectGeometry

> **类** 几何形状矩形

## 属性

|名称|类型|描述|
| - | - | - |
| \_ltPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 左上角坐标|
| \_lbPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 左下角坐标|
| \_rtPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 右上角坐标|
| \_rbPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 右下角坐标|
| \_centerPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 中心点坐标|
| \_width | Number  | 长度(宽度)|
| \_height | Number | 宽度(高度)|

## 初始化一个矩形

```js
/**
 * 创建一个二维坐标系上的矩形
 * @param {Vec2} 矩形左上角坐标
 * @param {Number} width 矩形宽度
 * @param {Number} height 矩形高度
 */
const rectGeo = new RectGeometry(Vec2.fromValues(12,23), 24, 12);
```

## 静态方法

### fromPointsVec2

```js
/**
 * 从2个坐标创建一个矩形
 * @param {Vec2} leftTopPoint 
 * @param {Vec2} rightBottomPoint 
 * @returns 
 */
const rectGeo2 = RectGeometry.fromPointsVec2(Vec2.fromValues(2,4), Vec2.fromValues(12,24));
```

### fromPointVec2

```js
/**
 * 从1个坐标和2个数字创建一个矩形
 * @param {Vec2} leftTopPoint 
 * @param {Number} width 矩形宽度
 * @param {Number} height 矩形高度
 * @returns 
 */
const rectGeo3 = RectGeometry.fromPointsVec2(Vec2.fromValues(2,4), 12, 24);
```

## 实例方法

### setSize

```js
/**
 * 设置矩形大小
 * @param {Number} x
 * @param {Number} y
 */
rectGeo.setSize(12, 23);
```

### getWidth

```js
/**
 * 获取矩形的长度
 * @returns {Number}
 */
const w = rectGeo.getWidth();
```

### setWidth

```js
/**
 * 设置矩形的长度
 *  @param {Number} width
 */
rectGeo.setWidth(23);
```

### getHeight

```js
/**
 * 获取矩形的宽度
 * @returns {Number} 
 */
const h = rectGeo.getHeight();
```

### setHeight

```js
/**
 * 设置矩形的长度
 *  @param {Number} height
 */
rectGeo.setHeight(23);
```

### getLeftTopPoint

```js
/**
 * 获取矩形的左上角坐标
 * @returns {Vec2}
 */
const vec2 = rectGeo.getLeftTopPoint();
```

### getLeftBottomPoint

```js
/**
 * 获取矩形的左下角坐标
 * @returns {Vec2}
 */
const vec2 = rectGeo.getLeftBottomPoint();
```

### getRightTopPoint

```js
/**
 * 获取矩形的右上角坐标
 * @returns {Vec2}
 */
const vec2 = rectGeo.getRightTopPoint();
```

### getRightBottomPoint

```js
/**
 * 获取矩形的右下角坐标
 * @returns {Vec2}
 */
const vec2 = rectGeo.getRightBottomPoint();
```

### getCenter

```js
/**
 * 获取矩形的中心坐标
 * @returns {Vec2}
 */
const vec2 = rectGeo.getCenter();
```

### getArea

```js
/**
 * 获取矩形的面积
 * @returns {Number}
 */
const vec2 = rectGeo.getArea();
```

### getPerimeter

```js
/**
 * 获取矩形的周长
 * @returns {Number}
 */
const vec2 = rectGeo.getPerimeter();
```

### copy

```js
/**
 * 复制一个矩形的相关信息
 * @param {RectGeometry} rectGeometry
 */
```

### clone

```js
/**
 * 克隆一个矩形
 * @returns {RectGeometry}
 */
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = rectGeo.toString();
```
