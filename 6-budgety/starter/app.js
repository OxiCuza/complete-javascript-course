// BUDGET CONTROLLER
let budgetController = (function () {
    

})();

// UI CONTROLLER
let uiController = (function () {
    

})();

// GLOBAL CONTROLLER
let controller = (function (bdgtCtrl, uiCtrl) {

    let addItem = function () {
        
    }

    document.querySelector('.add__btn').addEventListener('click', addItem);
    
    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13) {
            
            addItem();

        }
        
    })
    
})(budgetController, uiController);