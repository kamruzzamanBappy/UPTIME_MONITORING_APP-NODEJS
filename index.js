 /* 
 *title: UPTIME MONITORING APP
 *Decription: A Restful API to monitor up or down time of user deined links
 
 
 */
//dependencies

 const http = require('http');
 const url = require('url');
 const {StringDecoder} = require('string_decoder')

 //buffer ka kivaba data i convert korbo? NODE er core module nibo

 //app object -module scaffolding
 const app = {};

 //configuration

 app.config = {
    port:3000
 }

 //create server

 app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
    });
 };


 //handle Req Response

 app.handleReqRes = (req, res) =>{
//request handling
//get the url and parsed it
const parsedUrl = url.parse(req.url,true);
const path = parsedUrl.pathname;
const trimmedPath = path.replace(/^\/+\/+$/g,'');
// start or end er unwanted / remove korba


const method = req.method.toLowerCase();
// routing korta gela jana projon user kon method a amaka request koracha,GET,POST,PUT. ei method ta ka sob somoy small leter a nicchi

const queryStringObject = parsedUrl.query;
//query string parameter hisaba kiva ba nibo. ex:?a=5&b=6??? query string use for get request


const headersObject = req.headers;

//headers? jokhon ami request pathai,request er url charao aro besh kichu jinish add hoi, oneksomoy server theka asa, er satha nijer meta data add kora jai header a.


const decoder = new StringDecoder('utf-8')

// decoder name a ekta object create korchi.utf-8 pass korchi, StringDecoder ka decode kort bolchi,utf-8 hoccha encoding

let realData = '';

// jehatu buffer asta thakba tai blank nichi

req.on('data', (buffer) =>{
realData += decoder.write(buffer);
});

//kivaba buffer pabo? event er madhoma, data event hisaba listen korchi, callback hisaba buffer pailam
//post request er jonno request er bdy ta data send korta hoba. FORM a submit data body hisaba.Body er data direct asa na, string akara asa,buffer hisaba receive kori,tarpor orgina data ta convert kori
//buffer er encoding holo utf-8,decoder.write ka use kora  buffer data hota thakba, realData er vitor dhukta thakba
// jokhon buffer sesh hoba eta ka end korta hoba


req.on('end', () =>{
   realData +=decoder.end();
//buufer sesh hola end korlam, write ka off korlam

console.log(realData);

   //response handle
   res.end('Hello world');
})




 }



 // start the server

 app.createServer();