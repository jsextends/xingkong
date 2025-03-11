---
title: 几何形状_扇形
outline: deep
---

# SectorGeometry

> **类** 几何形状扇形

## 属性

|名称|类型|描述|
| - | - | - |
| \_center | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 扇形圆心坐标|
| \_radius | Number | 扇形的半径 |
| \_startAngle | Number | 扇形起始弧度值 |
| \_endAngle | Number | 扇形结束弧度值 |
| \_isClockwise | Boolean | 是否沿着顺时针方向绘制 |

## 初始化一个扇形

```js
/**
 * 创建一个二维坐标系上的扇形
* @param {Number} x 扇形的圆心x坐标
* @param {Number} y 扇形的圆心y坐标
* @param {Number} radius 扇形的半径
* @param {Number} startAngle 扇形起始弧度值
* @param {Number} endAngle 扇形结束弧度值
* @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
 */
const sectorGeo = new SectorGeometry(10, 24, Math.PI / 4, Math.PI / 5);
```

## 静态方法

### fromVec2

```js
/**
 * 从Vec2创建一个扇形
 * @param {Vec2} vec2 扇形心的二维坐标
 * @param {Number} radius 扇形的半径
 * @param {Number} startAngle 扇形起始弧度值
 * @param {Number} endAngle 扇形结束弧度值
 * @param {Boolean} [isClockwise=false] 是否沿着顺时针方向绘制
 * @return {SectorGeometry}
 */
const sectorGeo2 = SectorGeometry.fromVec2(new Vec2(), 4,5)
```

## 实例方法

### setClockWise

```js
/**
 * 设置是否沿着顺时针方向绘制
 * @param {Boolean} isClockwise
 */
sectorGeo.setClockWise(false);
```

### getClockWise

```js
/**
 * 返回是否沿着顺时针方向绘制
 *  @returns {Boolean}
 */
const clockWise = sectorGeo.getClockWise();
```

### setStartAngle

```js
/**
 * 设置扇形起始弧度值
 * @param {Nubmer} startAngle
 */
sectorGeo.setStartAngle(Math.PI / 3);
```

### getStartAngle

```js
/**
 * 获取扇形起始弧度值
 *  @returns {Number}
 */
const angle = sectorGeo.getStartAngle();
```

### setEndAngle

```js
/**
 * 设置扇形结束弧度值
 * @param {Nubmer} endAngle
 */
sectorGeo.setEndAngle(Math.PI / 3);
```

### getEndAngle

```js
/**
 * 获取扇形结束弧度值
 *  @returns {Number}
 */
const angle = sectorGeo.getEndAngle();
```

### setRadius

```js
/**
 * 设置圆半径
 * @param {Nubmer} radius
 */
sectorGeo.setRadius(12);
```

### getRadius

```js
/**
 * 获取圆的半径
 *  @returns {Number}
 */
const r = sectorGeo.getRadius();
```

### setCenter

```js
/**
 * 设置坐标值
 * @param {Number} x
 * @param {Number} y
 */
sectorGeo.setCenter(12, 23);
```

### setCenterWithVec2

```js
/**
 * 设置坐标值使用二维向量
 * @param {Vec2} vec2
 */
sectorGeo.setCenterWithVec2(new Vec2());
```

### getCenter

```js
/**
 * 获取扇形的圆心坐标
 * @returns {Vec2}
 */
const center = sectorGeo.getCenter();
```

### setMajorRadius

```js
/**
 * 设置扇形的长半轴
 * @param {Number} majorRadius 
 */
sectorGeo.setMajorRadius(12);
```

### setShortRadius

```js
/**
 * 设置扇形的短半径
 * @param {Number} shortRadius 
 */
sectorGeo.setShortRadius(10);
```

### getMarjorRadius

```js
/**
 * 获取扇形的长半径
 * @returns {Number}
 */
const r = sectorGeo.getMarjorRadius();
```

### getShortRadius

```js
/**
 * 获取扇形的短半径
 * @returns {Number}
 */
const r = sectorGeo.getShortRadius();
```

### copy

```js
/**
 * 复制一个扇形的相关信息
 * @param {SectorGeometry} SectorGeometry
 */
```

### clone

```js
/**
 * 克隆一个扇形
 * @returns {SectorGeometry}
 */
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = sectorGeo.toString();
```
