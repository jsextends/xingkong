
/**
 * 点与其他几何形状的关系
 * @readonly
 * @enum {String}
 * @property {String} POINTPOSITION.INNER - 在内部
 * @property {String} POINTPOSITION.OUTER - 在外部
 * @property {String} POINTPOSITION.BORDER - 在边界
 */
export const POINTPOSITION = {
    INNER: "inner",  
    OUTER: "outer",
    BORDER: "border",
}

/**
 * 直线与其他几何形状的关系
 * @readonly
 * @enum {String}
 * @property {String} LINEPOSITION.INTERSECT - 相交
 * @property {String} LINEPOSITION.TANGENCY - 相切
 * @property {String} LINEPOSITION.SEPARATION - 相离
 * @property {String} LINEPOSITION.PARALLEL - 平行
 * @property {String} LINEPOSITION.VERTICAL - 垂直
 */
export const LINEPOSITION = {
    INTERSECT: "intersect",  
    TANGENCY: "tangency",
    SEPARATION: "separation",
    PARALLEL: "parallel",
    VERTICAL: "vertical"
}