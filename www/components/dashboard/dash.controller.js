angular
    .module('pistachio')
    .controller('DashController', DashController);

function DashController($scope, storage) {
    var vm = this;

    vm.loadingTransactions = false;
    vm.transactions = [];

    $scope.$on("$ionicView.enter", function () {
        getTransactions();
    });

    function getTransactions() {
        vm.loadingTransactions = true;

        storage.getTransactions().then(function(transactions) {
            vm.transactions = angular.copy(transactions);
            vm.loadingTransactions = false;
        });
    }
}