angular.module('starter.controllers', [])

    .controller('PurchaseCtrl', function (purchases, storage) {
        var vm = this;

        vm.price = '';

        vm.addPurchase = addPurchase;

        function addPurchase(purchaseItem) {
            var transactionName = 'Item ' + (purchases.purchases.length + 1);
            var item = {
                name: transactionName,
                value: purchaseItem
            };

            purchases.purchases.push(item);
            storage.insertTransaction(transactionName, purchaseItem);
            vm.price = '';
        }
    })

    .controller('DashCtrl', function ($scope, storage) {
        var vm = this;

        vm.transactions = storage.transactions;

        $scope.$on("$ionicView.enter", function(){
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

