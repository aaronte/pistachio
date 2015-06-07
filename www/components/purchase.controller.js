angular
    .module('pistachio')
    .controller('PurchaseController', PurchaseController);

function PurchaseController(purchases) {
    var self = this;

    self.item = {
        name: '',
        price: ''
    };

    self.addPurchase = addPurchase;
    self.validatePriceInput = validatePriceInput;

    function addPurchase(item) {
        purchases.purchases.push(item);
        storage.insertTransaction(item.name, item.price);
        resetItem();
    }

    function resetItem() {
        self.item.name = '';
        self.item.price = '';
    }

    function validKeypress(keyCode) {
        return (keyCode >= 48 && keyCode <= 57) || keyCode === 46;
    }

    function validatePriceInput(event) {
        if (!validKeypress(event.keyCode)) {
            event.preventDefault();
        }
    }
}

