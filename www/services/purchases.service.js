(function() {
    'use strict';

    angular
        .module('pistachio')
        .service('purchases', purchases);

    function purchases() {
        var self = this;

        self.purchases = [];
    }

});