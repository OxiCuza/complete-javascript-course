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

	return {
		addItem: function (types, description, value) {
			let newItem, ID;

			if (data.allItems[types].length > 0) {
				ID =
					data.allItems[types][data.allItems[types].length - 1]
						.id + 1;
			} else {
				ID = 0;
			}

			if (types === "exp") {
				newItem = new Expense(ID, description, value);
			} else {
				newItem = new Income(ID, description, value);
			}

			data.allItems[types].push(newItem);
			return newItem;
		},
	};
})();

// UI CONTROLLER
let UIController = (function () {
	let DOMStr = {
		inputType: ".add__type",
		inputDesc: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn",
		outputExp: ".expenses__list",
		outputInc: ".income__list",
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
		addListItem: function (obj, type) {
			let html, element;

			if (type == "inc") {
				element = DOMStr.outputInc;
				html =
					'<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else {
				element = DOMStr.outputExp;
				html =
					'<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			newHTML = html.replace("%id%", obj.id);
			newHTML = newHTML.replace("%description%", obj.desc);
			newHTML = newHTML.replace("%value%", obj.val);

			document
				.querySelector(element)
				.insertAdjacentHTML("beforeend", newHTML);
		},
		clearFields: function () {
			let DOMInput, DOMInputArr;

			DOMInput = document.querySelectorAll(
				DOMStr.inputDesc + ", " + DOMStr.inputValue
			);

			DOMInput.forEach(function (current) {
				current.value = "";
			});

			DOMInput[0].focus();
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
		let item = bdgtCtrl.addItem(input.type, input.desc, input.value);
		uiCtrl.addListItem(item, input.type);
		uiCtrl.clearFields();
	};

	return {
		init: function () {
			console.log("Application started !!");
			setupEventListeners();
		},
	};
})(BudgetController, UIController);

Controller.init();
