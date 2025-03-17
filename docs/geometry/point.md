# PointGeometry

> **类** 几何形状点

## 属性

|名称|类型|描述|
| - | - | - |
| \_point | [Vec2](https://jsextends.github.io/matrixjsDoc/api/vec2.html) | 存放点的位置信息|

## 初始化一个点

```js
/**
 * 创建一个二维坐标系上的点
 * @param {Number} x
 * @param {Number} y
 */
const pointGeo = new PointGeometry(10, 24);
```

## 静态方法

### fromVec2

```js
/**
 * 从Vec2创建一个点
 * @param {Vec2} vec2
 * @return {PointGeometry}
 */
const pointGeo3 = PointGeometry.fromVec2(new Vec2())
```

## 实例方法

### set

```js
/**
 * 设置坐标值
 * @param {Number} x
 * @param {Number} y
 */
pointGeo.set(12, 23);
```

### setWithVec2

```js
/**
 * 设置坐标值使用二维向量
 * @param {Vec2} vec2
 */
pointGeo.set(new Vec2());
```

### get

```js
/**
 * 或者某个维度的坐标值 有效值x|y
 * @param {String} axis
 * @returns {Number}
 */
const x = pointGeo.get("x");
```

### copy

```js
/**
 * 从一个对象复制相对应的坐标信息
 * @param {PointGeometry|Vec2} point
 */
const pointGeo2 = new PointGeometry(11, 12);
pointGeo2.copy(pointGeo);
```

### clone

```js
/**
 * 克隆一个Point
 * @returns {PointGeometry}
 */
const pointGeo3 = pointGeo.clone();
```

### toString

```js
/**
 * 转化为字符串显示
 * @returns {String}
 */
const str = pointGeo.toString();
```
