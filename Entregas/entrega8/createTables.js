const { optionsSqlite3 } = require('./DB/conecctionsStrs/connSqlite3.js');
const { optionsMariaDB } = require('./DB/conecctionsStrs/connMariaDB.js');


let knexMDB =require('knex')(optionsMariaDB);

knexMDB.schema.createTable('productos', table =>{
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbnail')
})

knexMDB.destroy();

let knexSQL =require('knex')(optionsSqlite3);

knexSQL.schema.createTable('mensajes', table =>{
    table.increments('id')
    table.string('user')
    table.string('msg')
    table.date('date')
})

knexSQL.destroy();