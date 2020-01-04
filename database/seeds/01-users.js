const bcrypt = require('bcryptjs');

const {hashRounds} = require('../../constants');

exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'user1', password: bcrypt.hashSync('qaz', hashRounds)},
        {username: 'user2', password: bcrypt.hashSync('wsx', hashRounds)},
        {username: 'user3', password: bcrypt.hashSync('edc', hashRounds)}
      ]);
    });
};

