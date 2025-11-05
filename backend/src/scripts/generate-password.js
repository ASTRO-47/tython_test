const bcrypt = require('bcrypt');

const password = 'Makeclean@123'; // You can change this password
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
    console.log('Hashed password:', hash);
});