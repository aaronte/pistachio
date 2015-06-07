angular.module('starter.services', ['ngCordova'])

    .service('purchases', function () {
        var vm = this;

        vm.purchases = [];
    })

    .service('storage', function ($cordovaSQLite, $q) {
        var vm = this;
        var DB_NAME = 'pistachio.db';
        //var DB = $cordovaSQLite.openDB({ name: DB_NAME });
        var DB = window.openDatabase(DB_NAME, '1.0', 'Cordova Demo', 200000);
        var TRANSACTIONS_SCHEMA = '(vendor_name, amount)';

        vm.transactions = [];

        vm.setUp = setUp;
        vm.insertTransaction = insertTransaction;
        vm.getTransactions = getTransactions;

        function setUp() {
            var query = {
                dropTable: 'DROP TABLE IF EXISTS transactions',
                createTable: 'CREATE TABLE IF NOT EXISTS transactions ' + TRANSACTIONS_SCHEMA
            };

            $cordovaSQLite.execute(DB, query.createTable).then(createSuccess, logError);

            function createSuccess(result) {
                console.log(result);
            }
        }

        function insertTransaction(vendorName, price) {
            var query = 'INSERT INTO transactions ' + TRANSACTIONS_SCHEMA + ' VALUES (?, ?)';

            $cordovaSQLite.execute(DB, query, [vendorName, price]).then(function(result) {
                console.log(result);
            }, logError);
        }

        function getTransactions() {
            var deferredPromise = $q.defer();
            var query = 'SELECT * FROM transactions';

            $cordovaSQLite.execute(DB, query).then(function(result) {
                vm.transactions = angular.copy(result.rows);
                deferredPromise.resolve(result.rows);
            });

            return deferredPromise.promise;
        }

        function logError(error) {
            console.log(error);
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
