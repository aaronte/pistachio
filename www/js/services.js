angular.module('starter.services', [])

    .service('purchases', function () {
        var vm = this;

        vm.purchases = [];
    })

    .service('storage', function () {
        var vm = this;
        var DB_NAME = 'Database';
        var DB_VERSION = '1.0';
        var DB_DISPLAY_NAME = 'Pistachio';
        var DB_SIZE = 200000;
        var TRANSACTIONS_SCHEMA = '(vendor_name, amount)';

        vm.transactions = [];

        vm.setUp = setUp;
        vm.insertTransaction = insertTransaction;

        function setUp() {
            var db = openDatabase();
            db.transaction(populateDB, errorCB, successCB);
        }

        function populateDB(tx) {
            //tx.executeSql('DROP TABLE IF EXISTS transactions'); DROP TABLE EVERY TIME
            tx.executeSql('CREATE TABLE IF NOT EXISTS transactions ' + TRANSACTIONS_SCHEMA);
        }

        function insertTransaction(vendor_name, amount) {
            var db = openDatabase();
            db.transaction(insertToDB, errorCB, successCB);

            function insertToDB(tx) {
                var INSERT_STATEMENT = 'INSERT INTO transactions ';
                tx.executeSql(INSERT_STATEMENT + TRANSACTIONS_SCHEMA + ' VALUES (\'' + vendor_name + '\', ' + amount + ')');
            }
        }

        function successCB() {
            var db = openDatabase();
            db.transaction(queryDB, errorCB);
        }

        function queryDB(tx) {
            tx.executeSql('SELECT * FROM transactions', [], querySuccess, errorCB);
        }

        function openDatabase() {
            return window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
        }

        function querySuccess(tx, results) {
            vm.transactions = angular.copy(results.rows);
            console.log('Returned rows = ' + results.rows.length);

            if (!results.rowsAffected) {
                console.log('No rows affected!');
                return false;
            }
            console.log('Last inserted row ID = ' + results.insertId);
        }

        function errorCB(err) {
            if (err.code || err.message) {
                console.log('Error processing SQL: ' + err.code, err.message);
            }
        }
    })

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
