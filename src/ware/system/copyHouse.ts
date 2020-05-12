let ware: any = {};
export class CopyHouse {
	/**
	 * @description 获取copy
	 * @date 2020-05-08
	 * @param {string} key 键名
	 * @returns
	 * @memberof Copes
	 */
	public getCopy(key: string) {
		if (ware[key]) {
			return ware[key];
		} else {
			return false;
		}
	}
	/**
	 * @description 存放copy
	 * @date 2020-05-08
	 * @param {string} key 存储键名
	 * @param {*} item 存储内容
	 * @returns {number}
	 * @memberof Copes
	 */
	public setCopy(key: string, item: any): boolean {
		let double = ware[key] ? true : false;
		Object.defineProperty(ware, key, {
			writable: true,
			enumerable: true,
			value: item,
		});
		double &&
			console.warn(
				"2 A warning has arisen that you may be using duplicate keys in ne-copy"
			);
		return double;
	}
}
