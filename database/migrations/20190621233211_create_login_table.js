exports.up = async function(knex, Promise) {
    await knex.schema.createTable('Login', tbl =>{
        tbl.increments()
        tbl.string('fullname').notNullable()
        tbl.string('username').notNullable().unique()
        tbl.string('password').notNullable()
        tbl.boolean('instructor').notNullable().defaultTo(true) //true = instructor
      
    })
  
};

exports.down = function(knex, Promise) {

    return knex.scheme.
    dropTableifExists('Login')
    
};