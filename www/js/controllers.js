angular.module('starter.controllers', [])

    .controller('PurchaseCtrl', function (purchases) {
        var vm = this;

        vm.addPurchase = addPurchase;

        function addPurchase(purchaseItem) {
            var item = {
                name: 'Item ' + (purchases.purchases.length + 1),
                value: purchaseItem
            };

            purchases.purchases.push(item);
        }
    })

    .controller('DashCtrl', function (purchases) {
        var vm = this;

        vm.purchases = purchases.purchases;
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

