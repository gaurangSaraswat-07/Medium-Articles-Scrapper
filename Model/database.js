const mysql=require('mysql');

var conn = mysql.createConnection({
    host: "database7.mysql.database.azure.com", 
    user: "GaurangSaraswat@database7", 
    password: "Azure@123", 
    database: "database7", 
    port: 3306
});

conn.connect(function(error){
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }
});

let tag=[];
let date=[];

function processing() {

    date.length=0;
    tag.length=0;
    conn.query("select tag from information order by id desc",function(error,data){
        if(!!error){
            console.log('Error in the Query');
        }
        else {
            console.log('Query Success');
            for(let i=0;i<data.length;i++) {
                tag.push(data[i].tag);
            }
         
        }
    });
    conn.query("select date from information order by id desc", function(error,data){
        if(!!error){
            console.log('Error in the Query');
        }
        else {
            console.log('Successful Query');
            
            for(let i=0;i<data.length;i++) {
                date.push(data[i].date);
            }   
        }

    });
}

function display() {
    let obj={ "tag":tag, "date":date }
    return obj;
}

function insert(tag) {
    let tdate= new Date;
    let s=`insert into information (tag,date) values (${JSON.stringify(tag)},${JSON.stringify(tdate).slice(0,11)+"\""})`;
    conn.query(s ,function(error){
        if(!!error){
            console.log('Query error');
        }
        else {
            console.log('Insert Success');
        }
    });
}
module.exports = {insertquery,displayquery,processquery};








