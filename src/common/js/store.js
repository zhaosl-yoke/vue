/**
 * Created by yi on 2016-12-28.
 */
/*localStorage存储的是字符串，取到的值也是字符串*/
export function savaToLocal(id, key, value) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
	    seller = {};
	    seller[id] = {};
	} else {
	    seller = JSON.parse(seller);
	    if (!seller[id]) {
	      	seller[id] = {};
	    }
	}
  	seller[id][key] = value;
  	window.localStorage.__seller__ = JSON.stringify(seller);
}
export function loadFromlLocal(id, key, def) {
	/*def是传入的默认值*/
  	let seller = window.localStorage.__seller__;
  	if (!seller) {
    	return def;
  	}
  	/*取出来的是字符串，需要先转换成json对象*/
  	seller = JSON.parse(seller)[id];
  	if (!seller) {
    	return def;
  	}
  	let ret = seller[key];
  	return ret || def;
}
