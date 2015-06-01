angular.module('starter.controllers', [])

    .controller('PurchaseCtrl', function (purchases, storage) {
        var vm = this;

        vm.item = {
            name: '',
            price: ''
        }

        vm.addPurchase = addPurchase;
        vm.validatePriceInput = validatePriceInput;

        function addPurchase(item) {
            purchases.purchases.push(item);
            storage.insertTransaction(item.name, item.price);
            resetItem();
        }

        function resetItem() {
            vm.item.name = '';
            vm.item.price = '';
        }

        function validKeypress(keyCode) {
            return (keyCode >= 48 && keyCode <= 57) || keyCode === 46;
        }

        function validatePriceInput(event) {
            if (!validKeypress(event.keyCode)) {
                event.preventDefault();
            }
        }
    })

    .controller('DashCtrl', function ($scope, storage) {
        var vm = this;

        vm.transactions = storage.transactions;

        $scope.$on("$ionicView.enter", function(){
            storage.getTransactions();
            vm.transactions = storage.transactions;
        });
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('SettingsCtrl', function () {
        var that = this;
        that.name = 'Aaron';
    });

