const request =require("request");      //request module
const cheerio = require("cheerio");     //using cheerio library for parsing
const chalk = require("chalk");         //for styling

//creating the arrays to store the scrape content
let creator = [];
let title = [];
let links = [];
let tags = [];
let time = [];
let upload = []; 
let blogs = [];

function search(tag)
{
    creator.length=0; title.length=0; links.length=0; tags.length=0; time.length=0; upload.length=0; blogs.length=0;

    if(tag.length===0){
        console.log(chalk.gray("Search bar empty"));
        return;
    }

    request(`https://medium.com/tag/${tag}/latest`, cb);

    function cb( error, response, html) { //callback function 
        if(error) {
            console.log('error:',error);
        }
        else {         
            let $=cheerio.load(html);

            $('h3').each((i,el)=>{
                if(i>=1 && i<=10)
                    blogs.push($(el).text());
            });

            $('h2').each((i,el)=>{
                if(i<10)title.push($(el).text());
            });
  
            $('h4').each((i,el)=>{
                if($(el).attr().class!=undefined && $(el).attr().class.length==38)
                        creator.push($(el).text());
            });

            $('a').each((i,el)=>{
               
                if($(el).attr().class!=undefined && $(el).attr().class.length==44 && $(el).children().length==1 && $(el).children().children().length==2) {
                    links.push($(el).attr('href'));
                }
            });
           
            $('a').each((i,el)=>{
                if($(el).attr().class!=undefined && $(el).attr().class.length==2 && $(el).children().length==1 && tags.includes($(el).text())!=true) {
                    tags.push($(el).text());
                }
            });

            $('p').each((i,el)=>{
                let temp=$(el).text();
                if($(el).attr().class.length==34)
                    upload.push(temp);
            });
          
            $('span').each((i,el)=>{
                let temp=$(el).text();
                if($(el).attr().class!=undefined && $(el).attr().class.length==13 && temp.length>1)
                    time.push(temp);  
            });
        
        }
    }    
}

function getjson()
{   
    let object = { "creator":creator, "title":title, "links":links, "tags":tags, "time":time, "upload":upload, "blogs":blogs };
    console.log(chalk.black(object));
    return object;
}

module.exports = {search , getjson};