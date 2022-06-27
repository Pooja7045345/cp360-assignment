const emailValidator = (email) => {
	let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	var count = (email.match(/.com/g) || []).length;
	if (reg.test(email) === false) {
		return 'invalid';
	} else {
		if (count === 1) {
			return 'valid';
		} else {
			return 'invalid';
		}
	}
}
const passwordValidator = (password) => {
	if (/^\d+$/.test(password) === true) { return true; } else { return false; }
}
const passwordSumValidator = (password) => {
	let sum = 0;
	let passwordArr = [...password];
	passwordArr.forEach((elem) => {
		sum += parseInt(elem);
	});
	let final = sum.toString()
	if (final === '10') { return true; } else { return false; }
}


const formateOption = (optionList) => {
	if (typeof optionList[0] === 'object') {
		return optionList;
	} else {
		let optionArr = []
		optionList.forEach((elem) => {
			let options = {
				title: elem,
				id: elem.toLowerCase(),
			}
			optionArr.push(options);
		})
		return optionArr;
	}
}

const selectedOptionHandler = (selectedOptions)=>{
	let title = [];
	selectedOptions.forEach((option)=>{
		title.push(option.title)
	})
	let final_arr = title.join()
	return final_arr;
}

export { emailValidator, passwordValidator, passwordSumValidator, formateOption, selectedOptionHandler };