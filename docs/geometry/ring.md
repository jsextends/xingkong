# RingGeometry

> **类** 几何形状圆环

## 属性

|名称|类型|描述|
| - | - | - |
| \_center | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 圆环心|
| \_innerRadius | Number | 圆环内半径|
| \_outerRadius | Number | 圆环外半径|

## 初始化一个圆环

```js
/**
 * 创建一个二维坐标系上的圆环
 * @param {Number} x 圆心x轴坐标
 * @param {Number} y 圆心y轴坐标
 * @param {Number} innerRadius 圆环内半径
 * @param {Number} outerRadius 圆环外半径
 */
const ringGeo = new RingGeometry(10, 24, 12, 21);
```

## 静态方法

### fromVec2

```js
/**
 * 从一个二维向量和半径创建一个几何圆环
 * @param {Vec2} Vec2 
 * @param {Number} radius 
 * @returns 
 */

const ringGeo2 = RingGeometry.fromVec2(Vec2.fromValues(2,4), 12, 31);
```

## 实例方法

### setCenter

```js
/**
 * 设置圆环心坐标值
 * @param {Number} x
 * @param {Number} y
 */
ringGeo.setCenter(12, 23);
```

### setInnerRadius

```js
/**
 * 设置圆环的内半径
 * @param {Number} innerRadius
 */
ringGeo.setInnerRadius(12);
```

### setOuterRadius

```js
/**
 * 设置圆环的外半径
 * @param {Number} outerRadius
 */
ringGeo.setOuterRadius(12);
```

### getCenter

```js
/**
 * 获取圆环心坐标值
 * @returns {Vec2} 
 */
const center = ringGeo.getCenter();
```

### getInnerRadius

```js
/**
 * 获取圆环的内半径
 * @returns {Number} 
 */
const r = ringGeo.getInnerRadius();
```

### getOuterRadius

```js
/**
 * 获取圆环的外半径
 * @returns {Number} 
 */
const r = ringGeo.getOuterRadius();
```

### copy

```js
/**
 * 复制一个圆环的相关信息
 * @param {RingGeometry} RingGeometry
 */
```

### clone

```js
/**
 * 克隆一个圆环
 * @returns {RingGeometry}
 */
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = ringGeo.toString();
```
