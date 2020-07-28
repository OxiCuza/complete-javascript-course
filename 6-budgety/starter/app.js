// BUDGET CONTROLLER
let BudgetController = (function () {
	let Expense = function (id, description, value) {
		(this.id = id), (this.desc = description), (this.val = value);
	};

	let Income = function (id, description, value) {
		(this.id = id), (this.desc = description), (this.val = value);
	};

	let calculate = function (type) {
		let sum = 0;

		data.allItems[type].forEach(function (current) {
			sum += current.val;
		});

		data.totals[type] = sum;
		data.budget = data.totals["inc"] - data.totals["exp"];

		if (data.totals["inc"] > 0) {
			data.percentage = Math.round(
				(data.totals["exp"] / data.totals["inc"]) * 100
			);
		} else {
			data.percentage = -1;
		}
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
		budget: 0,
		percentage: -1,
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
		calculateBudget: function () {
			calculate("inc");
			calculate("exp");
			console.log(data);
		},
		getData: function () {
			return {
				totalExp: data.totals["exp"],
				totalInc: data.totals["inc"],
				budget: data.budget,
				percentage: data.percentage,
			};
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
		inputContainer: ".container",
		outputExp: ".expenses__list",
		outputInc: ".income__list",
		outputBdgtLabel: ".budget__value",
		outputIncLabel: ".budget__income--value",
		outputExpLabel: ".budget__expenses--value",
		outputPercentageLabel: ".budget__expenses--percentage",
	};

	return {
		getInput: function () {
			return {
				type: document.querySelector(DOMStr.inputType).value,
				desc: document.querySelector(DOMStr.inputDesc).value,
				value: parseFloat(
					document.querySelector(DOMStr.inputValue).value
				),
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
					'<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else {
				element = DOMStr.outputExp;
				html =
					'<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			newHTML = html.replace("%id%", obj.id);
			newHTML = newHTML.replace("%description%", obj.desc);
			newHTML = newHTML.replace("%value%", obj.val);

			document
				.querySelector(element)
				.insertAdjacentHTML("beforeend", newHTML);
		},
		clearFields: function () {
			let DOMInput;

			DOMInput = document.querySelectorAll(
				DOMStr.inputDesc + ", " + DOMStr.inputValue
			);

			DOMInput.forEach(function (current) {
				current.value = "";
			});

			DOMInput[0].focus();
		},
		displayBudget: function (obj) {
			document.querySelector(DOMStr.outputBdgtLabel).textContent =
				obj.budget;
			document.querySelector(DOMStr.outputIncLabel).textContent =
				obj.totalInc;
			document.querySelector(DOMStr.outputExpLabel).textContent =
				obj.totalExp;
			if (obj.percentage > 0) {
				document.querySelector(
					DOMStr.outputPercentageLabel
				).textContent = obj.percentage + " %";
			} else {
				document.querySelector(
					DOMStr.outputPercentageLabel
				).textContent = "--";
			}
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
		document
			.querySelector(DOMStr.inputContainer)
			.addEventListener("click", deleteItem);
	};

	let updateBudget = function () {
		// calculate the budget in badget controller
		bdgtCtrl.calculateBudget();

		// return the budget
		let budget = bdgtCtrl.getData();

		// update budget in ui controller
		uiCtrl.displayBudget(budget);
	};

	let addItem = function () {
		let input, item;

		input = uiCtrl.getInput();
		if (input.desc !== "" && !isNaN(input.value) && input.value > 0) {
			item = bdgtCtrl.addItem(input.type, input.desc, input.value);
			uiCtrl.addListItem(item, input.type);
			uiCtrl.clearFields();
			updateBudget();
		}
	};

	let deleteItem = function (event) {
		let elementID, splitID, type, ID;

		elementID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if (elementID) {
			splitID = elementID.split('-');
			type = splitID[0];
			ID = splitID[1];
		}

	}

	return {
		init: function () {
			console.log("Application started !!");
			uiCtrl.displayBudget({
				totalExp: 0,
				totalInc: 0,
				budget: 0,
				percentage: -1,
			});
			setupEventListeners();
		},
	};
})(BudgetController, UIController);

Controller.init();
