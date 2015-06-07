angular
    .module('pistachio')
    .service('storage', storage);

storage.$inject = ['$cordovaSQLite', '$q'];

function storage($cordovaSQLite, $q) {
    var self = this;
    var DB_NAME = 'pistachio.db';
    //var DB = $cordovaSQLite.openDB({ name: DB_NAME });
    var DB = window.openDatabase(DB_NAME, '1.0', 'Cordova Demo', 200000);
    var TRANSACTIONS_SCHEMA = '(vendor_name, amount, date)';
    var VENDORS_SCHEMA = '(vendor_name, date_added)';

    self.transactions = [];
    self.vendors = [];

    self.setUp = setUp;

    self.insertTransaction = insertTransaction;
    self.getTransactions = getTransactions;

    self.insertPayee = insertPayee;
    self.getPayee = getPayee;

    function setUp() {
        var query = {
            dropTransactionsTable: 'DROP TABLE IF EXISTS transactions',
            createTransactionsTable: 'CREATE TABLE IF NOT EXISTS transactions ' + TRANSACTIONS_SCHEMA,
            dropVendorsTable: 'DROP TABLE IF EXISTS vendors',
            createVendorsTable: 'CREATE TABLE IF NOT EXISTS vendors' + VENDORS_SCHEMA
        };

        // Uncomment if you want to drop your current 'transactions' table
        //$cordovaSQLite.execute(DB, query.dropTable);

        $cordovaSQLite.execute(DB, query.createTransactionsTable).then(function() {}, logError);
        $cordovaSQLite.execute(DB, query.createTransactionsTable).then(function() {}, logError);
    }

    function insertTransaction(vendorName, price) {
        var query = 'INSERT INTO transactions ' + TRANSACTIONS_SCHEMA + ' VALUES (?, ?, ?)';

        $cordovaSQLite.execute(DB, query, [vendorName, price, Date.now()]).then(function(result) {
            console.log(result);
        }, logError);
    }

    function getTransactions() {
        var deferredPromise = $q.defer();
        var query = 'SELECT * FROM transactions';

        $cordovaSQLite.execute(DB, query).then(function(result) {
            self.transactions = angular.copy(result.rows);
            deferredPromise.resolve(result.rows);
        });

        return deferredPromise.promise;
    }

    function insertPayee(payeeName) {
        var query = 'INSERT INTO vendors ' + VENDORS_SCHEMA + 'VALUES (?, ?)';
        $cordovaSQLite.execute(DB, query, [payeeName, Date.now()]).then(function() {}, logError);
    }

    function getPayee() {
        var deferredPromise = $q.defer();
        var query = 'SELECT * FROM vendors';

        $cordovaSQLite.execute(DB, query).then(function(result) {
            self.vendors = angular.copy(result.rows);
            deferredPromise.resolve(result.rows);
        });

        return deferredPromise.promise;
    }

    function logError(error) {
        console.log(error);
    }
}