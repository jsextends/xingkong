# LineGeometry

> **类** 几何形状线

## 属性

|名称|类型|描述|
| - | - | - |
| \_startPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 存放点的位置信息|
| \_endPoint | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 存放点的位置信息|

## 初始化一个线

```js
/**
 * 创建一个二维坐标系上的点
 * @param {Vec2} start
 * @param {Vec2} end
 */
const lineGeo = new LineGeometry(Vec2.fromValues(1,3), Vec2.fromValues(2,8));
```

## 实例方法

### setStart

```js
/**
 * 设置线段的起点坐标
 * @param {Vec2} point
 */
```

### setEnd

```js
/**
 * 设置线段的终点坐标
 * @param {Vec2} point
 */
```

### getStart

```js
/**
 * 获取线段的起点坐标
 * @returns {Vec2}
 */
```

### getEnd

```js
/**
 * 获取线段的终点坐标
 * @returns {Vec2}
 */
```

### getLength

```js
/**
 * 获取线段的长度
 * @returns {Number}
 */
```

### getSlopeIntercept

```js
/**
 * 获取直线的斜截式方程信息
 * @returns {Object}
 */
```

### getNormal

```js
/**
 * 获取直线方程的一般式
 * @returns {Number[]}
 */
```

### copy

```js
/**
 * 从一个对象复制相对应的坐标信息
 * @param {LineGeometry} point
 */
```

### clone

```js
/**
 * 克隆一个Point
 * @returns {LineGeometry}
 */
const lineGeo3 = lineGeo.clone();
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = lineGeo.toString();
```
