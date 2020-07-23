// BUDGET CONTROLLER
let BudgetController = (function () {
	let Expense = function (id, description, value) {
		(this.id = id), (this.desc = description), (this.val = value);
	};

	let Income = function (id, description, value) {
		(this.id = id), (this.desc = description), (this.val = value);
	};

	let data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
	};
})();

// UI CONTROLLER
let UIController = (function () {
	let DOMStr = {
		inputType: "add__type",
		inputDesc: "add__description",
		inputValue: "add__value",
		inputBtn: "add_btn",
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMStr.inputType).value,
				desc: document.querySelector(DOMStr.inputDesc).value,
				value: document.querySelector(DOMStr.inputValue).value,
			};
		},
		getDOMStr: function () {
			return DOMStr;
		},
	};
})();

// GLOBAL CONTROLLER
let Controller = (function (bdgtCtrl, uiCtrl) {
	let setupEventListeners = function () {
		let DOMStr = uiCtrl.getDOMStr();
		document
			.querySelector(DOMStr.inputBtn)
			.addEventListener("click", addItem);
		document.addEventListener("keypress", function (event) {
			if (event.keyCode === 13) {
				addItem();
			}
		});
	};

	let addItem = function () {
		let input = uiCtrl.getInput();
	};

	return {
		init: function () {
			setupEventListeners();
		},
	};
})(BudgetController, UIController);

Controller.init();
