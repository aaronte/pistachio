angular
    .module('pistachio')
    .controller('DashController', DashController);

function DashController($scope, storage) {
    var self = this;

    self.transactions = storage.transactions;

    $scope.$on("$ionicView.enter", function () {
        storage.getTransactions();
        self.transactions = storage.transactions;
    });
}