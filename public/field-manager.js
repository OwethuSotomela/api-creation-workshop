function FieldManager (fields) {

	function getValues() {
		Object.keys(fields).forEach(field => {
			const fieldElem = document.querySelector(`.${field}`);
			const value = fieldElem.value;
			fields[field] = value;
		});
		return fields;
	}

	function clear() {
		Object.keys(fields).forEach(field => {
			const fieldElem = document.querySelector(`.${field}`);
			fieldElem.value = '';
		});
	}

	return {
		clear,
		getValues
	}
}