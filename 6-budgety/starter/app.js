// BUDGET CONTROLLER
let BudgetController = (function () {
	let Expense = function (id, description, value) {
		(this.id = id),
			(this.desc = description),
			(this.val = value),
			(this.percentage = -1);
	};

	Expense.prototype.calcPercentage = function (totalIncome) {
		if (totalIncome > 0) {
			this.percentage = Math.round((this.val / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};

	// Expense.prototype.getPercentage = function () {
	// 	return this.percentage;
	// };

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
		deleteBudget: function (type, id) {
			let idArr, index;

			idArr = data.allItems[type].map(function (current) {
				return current.id;
			});
			index = idArr.indexOf(id);

			if (index != -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		calculateBudget: function () {
			calculate("inc");
			calculate("exp");
		},
		calculatePercentages: function () {
			data.allItems.exp.forEach(function (current) {
				current.calcPercentage(data.totals.inc);
			});
		},
		getPercentages: function () {
			let allPercentage = data.allItems['exp'].map(function (current) {
				return current.percentage;
			});

			return allPercentage;
		},
		getData: function () {
			return {
				totalExp: data.totals["exp"],
				totalInc: data.totals["inc"],
				budget: data.budget,
				percentage: data.percentage,
			};
		},
		item: function(){
			return data;
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
		outputExpPercLabel: ".item__percentage",
	};

	formatNumber = function(type, num) {
		let int, dec, arrNum;

		num = Math.abs(num);
		num = num.toFixed(2);
		arrNum = num.split('.');
		int = arrNum[0];
		dec = arrNum[1];

		if(int.length > 3){
			int = `${int.substr(0, int.length-3)},${int.substr(int.length-3, 3)}`;
		}

		return `${type == 'inc' ? '+' : '-'} ${int}.${dec}` 
	}

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
					'<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			newHTML = html.replace("%id%", obj.id);
			newHTML = newHTML.replace("%description%", obj.desc);
			newHTML = newHTML.replace("%value%", formatNumber(type, obj.val));

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
			let type;

			obj.budget > 0 ? type = "inc" : type = "exp";

			document.querySelector(DOMStr.outputBdgtLabel).textContent = formatNumber(type, obj.budget);
			document.querySelector(DOMStr.outputIncLabel).textContent = formatNumber("inc", obj.totalInc);
			document.querySelector(DOMStr.outputExpLabel).textContent = formatNumber("exp", obj.totalExp);
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
		displayPercentage: function (allPercentage) {
			let elements = document.querySelectorAll(
				DOMStr.outputExpPercLabel
			);

			for (let index = 0; index < elements.length; index++) {
				elements[index].textContent = allPercentage[index] + " %";
			}
		},
		deleteListItem: function (elementID) {
			let element = document.getElementById(elementID);

			element.parentNode.removeChild(element);
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

	let updatePercentages = function () {
		// calculate the percentages in budget controller
		bdgtCtrl.calculatePercentages();

		// return the percentages
		let allPercentage = bdgtCtrl.getPercentages();

		// update percentage in UI controller
		uiCtrl.displayPercentage(allPercentage);
	};

	let addItem = function () {
		let input, item;

		input = uiCtrl.getInput();
		if (input.desc !== "" && !isNaN(input.value) && input.value > 0) {
			item = bdgtCtrl.addItem(input.type, input.desc, input.value);
			uiCtrl.addListItem(item, input.type);
			uiCtrl.clearFields();
			updateBudget();
			updatePercentages();
		}
	};

	let deleteItem = function (event) {
		let elementID, splitID, type, ID;

		elementID =
			event.target.parentNode.parentNode.parentNode.parentNode.id;
		if (elementID) {
			splitID = elementID.split("-");
			type = splitID[0];
			ID = parseInt(splitID[1]);

			bdgtCtrl.deleteBudget(type, ID);
			uiCtrl.deleteListItem(elementID);
			updateBudget();
			updatePercentages();
		}
	};

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
