const mysql=require('mysql');

var conn = mysql.createConnection({
    host: "database7.mysql.database.azure.com", 
    user: "GaurangSaraswat@database7", 
    password: "Azure@123", 
    database: "database7", 
    port: 3306
});
