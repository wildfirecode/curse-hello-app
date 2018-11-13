/**
 * Created by admin on 2017/8/23.
 */

export function validateName(str) {
	return !!str.match(/^[\u4e00-\u9fa5]{2,4}$/);
}

export function has2BChar(str) {
	return str.match(/[^\x00-\xff]/);
}

export function validateIdCard(str) {
	let result = false;
	//15位和18位身份证号码的正则表达式
	let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

	//如果通过该验证，说明身份证格式正确，但准确性还需计算
	if (reg.test(str)) {
		if (str.length == 18) {
			let strWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
			let strY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
			let strWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
			for (let i = 0; i < 17; i++) {
				strWiSum += str.substring(i, i + 1) * strWi[i];
			}

			let strMod = strWiSum % 11;//计算出校验码所在数组的位置
			let strLast = str.substring(17);//得到最后一位身份证号码

			//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
			if (strMod == 2) {
				result = strLast == "X" || strLast == "x";
			} else {
				//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
				result = strLast == strY[strMod];
			}
		}
	}
	return result;
}

export function filterEmoji(str) {
	return str.replace(/\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g, '');
}
