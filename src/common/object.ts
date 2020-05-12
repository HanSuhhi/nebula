/**
 * @description 对象深拷贝
 * @date 2020-05-07
 * @param {Object} initalObj 需要拷贝的对象
 * @returns {Object} 返回拷贝对象
 */
export function deepClone(initalObj: Object): any {
	var obj = {};
	try {
		obj = JSON.parse(JSON.stringify(initalObj));
	} catch (e) {
		console.error("1 所创建子节点不可为undefind");
	}
	return obj;
}
