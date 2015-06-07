angular
    .module('pistachio')
    .controller('DashController', DashController);

function DashController($scope) {
    var self = this;


    $scope.$on("$ionicView.enter", function () {
    });
}