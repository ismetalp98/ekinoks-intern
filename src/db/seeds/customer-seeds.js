exports.seed = function (knex, Promise) {
    const { PasswordUtility } = require('../../utility/passwordUtility');
    return knex('user').del()
        .then(function () {
            return knex('user').insert([
                {
                    'name': 'ismet',
                    'email': 'user1@gmail.com',
                    'phone': '05252234567',
                    'address': 'yenisehir mh.',
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'customer'
                },
                {
                    'name': 'alp',
                    'email': 'user2@gmail.com',
                    'phone': '05362234567',
                    'address': 'servergazi mh.',
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'customer'
                },
                {
                    'name': 'eren',
                    'email': 'user3@gmail.com',
                    'phone': '05452234567',
                    'address': 'alsancak mh.',
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'customer'
                },
                {
                    'name': 'ezgi',
                    'email': 'user4@gmail.com',
                    'phone': '05452234533',
                    'address': 'dörtyol mh.',
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'customer'
                },
                {
                    'name': 'lena',
                    'email': 'user5@gmail.com',
                    'phone': '05452231234',
                    'address': 'çinar mh.',
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'customer'
                },
                {
                    'name': 'kebap restaurant',
                    'owner_name': 'alp',
                    'email': 'test2@gmail.com',
                    'phone': '05252234567',
                    'address': 'yenisehir mh.',
                    'pin_code': 1234,
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'vendor'
                },
                {
                    'name': 'pizza restaurant',
                    'owner_name': 'ismet',
                    'email': 'test1@gmail.com',
                    'phone': '05362234567',
                    'address': 'servergazi mh.',
                    'pin_code': 1234,
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'vendor'
                },
                {
                    'name': 'pasta restaurant',
                    'owner_name': 'eren',
                    'email': 'test3@gmail.com',
                    'phone': '05452234567',
                    'address': 'alsancak mh.',
                    'pin_code': 1234,
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'vendor'
                },
                {
                    'name': 'desert restaurant',
                    'owner_name': 'lena',
                    'email': 'test4@gmail.com',
                    'phone': '05452234533',
                    'address': 'dörtyol mh.',
                    'pin_code': 1234,
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'vendor'
                },
                {
                    'name': 'pide restaurant',
                    'owner_name': 'ezgi',
                    'email': 'test5@gmail.com',
                    'phone': '05452231234',
                    'address': 'çinar mh.',
                    'pin_code': 1234,
                    'password': PasswordUtility.generatePassword('test123'),
                    'role': 'vendor'
                },
                {
                    'name': 'admin',
                    'email': 'admin@gmail.com',
                    'phone': '05452231234',
                    'address': 'admin',
                    'password': PasswordUtility.generatePassword('admin123'),
                    'role': 'admin'
                }
            ]);
        });
};
