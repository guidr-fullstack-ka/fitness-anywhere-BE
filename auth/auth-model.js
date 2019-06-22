const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    findUsers,
    findBy,
    addUser}

    
    async function addUser(user){
        const [id]= await db('Login').insert(user);
        return await db('Login').where({id}).first();
    }

    function findUsers(){
        return db('Login')
    }

    function findBy(filter) {
        return db('Login').where(filter);
      }