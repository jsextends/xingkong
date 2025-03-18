/**
 * 点与其他几何形状的关系
 * @readonly
 * @enum {String}
 * @property {String} POINTRELATION.INNER - 在内部
 * @property {String} POINTRELATION.OUTER - 在外部
 * @property {String} POINTRELATION.BORDER - 在边界
 */
export const POINTRELATION = {
    INNER: "inner",  
    OUTER: "outer",
    BORDER: "border",
}

/**
 * 直线与其他几何形状的关系
 * @readonly
 * @enum {String}
 * @property {String} LINERELATION.INTERSECT - 相交
 * @property {String} LINERELATION.TANGENCY - 相切
 * @property {String} LINERELATION.SEPARATION - 相离
 * @property {String} LINERELATION.PARALLEL - 平行
 * @property {String} LINERELATION.VERTICAL - 垂直
 */
export const LINERELATION = {
    INTERSECT: "intersect",  
    TANGENCY: "tangency",
    SEPARATION: "separation",
    PARALLEL: "parallel",
    VERTICAL: "vertical"
}

/**
 * 矩形与其他几何形状的关系
 * @readonly
 * @enum {String}
 * @property {String} RECTRELATION.INTERSECT - 相交
 * @property {String} RECTRELATION.SEPARATION - 相离
 * @property {String} RECTRELATION.CONTAIN - 包含
 */
export const RECTRELATION = {
    INTERSECT: "intersect",
    SEPARATION: "separation",
    CONTAIN: "contain"
}