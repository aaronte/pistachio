angular
    .module('pistachio')
    .controller('PurchaseController', PurchaseController);

function PurchaseController(purchases, storage) {
    var vm = this;

    vm.item = {
        name: '',
        price: ''
    };

    vm.addPurchase = addPurchase;
    vm.getTags = getTags;
    vm.selectItem = selectItem;

    function addPurchase(item) {
        purchases.purchases.push(item);
        storage.insertTransaction(item.name, item.price);
        resetItem();
    }

    function resetItem() {
        vm.item.name = '';
        vm.item.price = '';
    }

    function getTags(query) {
        return [{id: "1", name: query + "1", view: "view: " + query + "1"},
            {id: "2", name: query + "2", view: "view: " + query + "2"},
            {id: "3", name: query + "3", view: "view: " + query + "3"}];
    }

    function selectItem(callback) {
        vm.item.name = callback.item.name;
    }
}

