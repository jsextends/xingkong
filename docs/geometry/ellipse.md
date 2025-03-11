---
title: 几何形状_椭圆
outline: deep
---

# EllipseGeometry

> **类** 几何形状椭圆

## 属性

|名称|类型|描述|
| - | - | - |
| \_center | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 椭圆圆心坐标|
| \_majorRadius | Number | 椭圆的长半径 |
| \_shortRadius | Number | 椭圆的短半径 |

## 初始化一个椭圆

```js
/**
 * 创建一个二维坐标系上的椭圆
 * @param {Number} x
 * @param {Number} y
 */
const ellipseGeo = new EllipseGeometry(10, 24, 4, 5);
```

## 静态方法

### fromVec2

```js
/**
 * 从Vec2创建一个椭圆
 * @param {Vec2} vec2 椭圆心的二维坐标
 * @param {Number} majorRadius 椭圆的长半径
 * @param {Number} shortRadius 椭圆的短半径
 * @return {EllipseGeometry}
 */
const ellipseGeo2 = EllipseGeometry.fromVec2(new Vec2(), 4,5)
```

## 实例方法

### setCenter

```js
/**
 * 设置坐标值
 * @param {Number} x
 * @param {Number} y
 */
ellipseGeo.setCenter(12, 23);
```

### setCenterWithVec2

```js
/**
 * 设置坐标值使用二维向量
 * @param {Vec2} vec2
 */
ellipseGeo.setCenterWithVec2(new Vec2());
```

### getCenter

```js
/**
 * 获取椭圆的圆心坐标
 * @returns {Vec2}
 */
const center = ellipseGeo.getCenter();
```

### setMajorRadius

```js
/**
 * 设置椭圆的长半轴
 * @param {Number} majorRadius 
 */
ellipseGeo.setMajorRadius(12);
```

### setShortRadius

```js
/**
 * 设置椭圆的短半径
 * @param {Number} shortRadius 
 */
ellipseGeo.setShortRadius(10);
```

### getMarjorRadius

```js
/**
 * 获取椭圆的长半径
 * @returns {Number}
 */
const r = ellipseGeo.getMarjorRadius();
```

### getShortRadius

```js
/**
 * 获取椭圆的短半径
 * @returns {Number}
 */
const r = ellipseGeo.getShortRadius();
```

### copy

```js
/**
 * 复制一个椭圆的相关信息
 * @param {RectGeometry} rectGeometry
 */
```

### clone

```js
/**
 * 克隆一个椭圆
 * @returns {RectGeometry}
 */
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = ellipseGeo.toString();
```
