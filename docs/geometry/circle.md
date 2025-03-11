---
title: 几何形状_圆
outline: deep
---

# CircleGeometry

> **类** 几何形状圆

## 属性

|名称|类型|描述|
| - | - | - |
| \_center | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 圆心|
| \_radius | Number | 圆半径|

## 初始化一个圆

```js
/**
 * 创建一个二维坐标系上的圆
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius 圆的半径
 */
const circleGeo = new CircleGeometry(10, 24, 12);
```

## 静态方法

### fromVec2AndValue

```js
/**
 * 从一个二维向量和半径创建一个几何圆
 * @param {Vec2} Vec2 
 * @param {Number} radius 
 * @returns 
 */

const circleGeo2 = CircleGeometry.fromVec2AndValue(Vec2.fromValues(2,4), 12);
```

## 实例方法

### setCenter

```js
/**
 * 设置圆心坐标值
 * @param {Number} x
 * @param {Number} y
 */
circleGeo.setCenter(12, 23);
```

### setRadius

```js
/**
 * 设置圆半径
 * @param {Number} radius
 */
circleGeo.setRadius(12);
```

### getCenter

```js
/**
 * 获取圆心坐标值
 * @returns {Vec2} 
 */
const center = circleGeo.getCenter();
```

### getRadius

```js
/**
 * 获取圆半径
 * @returns {Number} 
 */
const r = circleGeo.getRadius(12);
```

### copy

```js
/**
 * 复制一个圆的相关信息
 * @param {CircleGeometry} circleGeometry
 */
```

### clone

```js
/**
 * 克隆一个圆
 * @returns {CircleGeometry}
 */
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = circleGeo.toString();
```
