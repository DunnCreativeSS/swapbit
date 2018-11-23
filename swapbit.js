var request = require('request');
var smoke = require('./lib')
const express = require('express')
const app = express()
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb");
  /*
  dbo.createCollection("invoices", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");

  }); */
  var myquery = {invoice: 'b15bc4d2e7903f53a959e24825ba73f3'}
    dbo.collection("invoices").findOne({}, function(err, result) {
      if (err) {throw err}
  console.log(result)

});
});

var bodyParser = require('body-parser')
  app.use('/assets', express.static(__dirname + '/assets'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.get('/prices', function(req, res){
  console.log(req.query.amt)
  console.log('get prices');
  prices(req.query.amt, req.query.coin, res);
});
 function prices(amount, coin,res2 ){
  try{
  console.log(coin)
  console.log(amount)
  var amount2 = parseFloat(amount)
  console.log('lala')
  if (coin == "EOS"){
var {Apis} = require("bitsharesjs-ws")
let wsString = "wss://bitshares.openledger.info/ws";

Apis.instance(wsString, true).init_promise.then((res) => {
    console.log("connected to:", res[0].network);

   Apis.instance().db_api().exec( "get_order_book", [ 'BTS', coin,50] ).then((res) => {
var bidsA = []
var asksA = []
for (var a in res.bids){
  console.log(res.bids[a])
  bidsA.push({price: parseFloat(res.bids[a].price), quote: parseFloat(res.bids[a].quote)})
}
for (var a in res.asks){
  asksA.push({price: parseFloat(res.asks[a].price), quote: parseFloat(res.asks[a].quote)})
}
bidsA.sort(function(a,b){return b.price - a.  price;});

var doit = doLoop(0, 0, amount2, bidsA, 0, true)
console.log(amount2)
console.log(doit)
if (doit.price == 0){
  console.log('0')
  res2.json({p:doit.price})
}else{
console.log(amount2)
console.log(doit.amt)
res2.json({p:amount2 * (doit.amt/amount2)})
   
  } });
})
  } else {
    console.log('else prices');

  request.get('https://big.one/api/v2//markets/'+coin+'-EOS/depth', function (error, response, body) {
try {
let res = JSON.parse(body).data; // Print the HTML for the Google homepage.
var bidsA = []
var asksA = []
for (var a in res.bids){
  bidsA.push({price: parseFloat(res.bids[a].price), amount: parseFloat(res.bids[a].amount)})
}
for (var a in res.asks){
  asksA.push({price: parseFloat(res.asks[a].price), amount: parseFloat(res.asks[a].amount)})
}
bidsA.sort(function(a,b){return b.price - a.price;});
console.log(bidsA)
var doit = doLoop2  (0, 0, amount2, bidsA, 0, true)
console.log(amount2)
console.log(doit)
if (doit.price == 0){
  console.log('0')
  res2.json({p:doit.price})
}else{
console.log(amount2)
console.log(doit.amt)
res2.json({p:amount2 * (doit.amt/amount2)})
   
  }
}catch (err){console.log(err)}});                                                                    
 } 
}
catch(err){
  console.log(err)
}}
function doLoop(index, amt, target, bidsA, base, once){

  var count = 0;
  for (var s in bidsA){
    if (count >= index){
      base = base + bidsA[s].quote
      amt = amt + bidsA[s].price * bidsA[s].quote
      if (amt <= target){
        once = false;
        console.log('amt: ' + amt)
        return doLoop(index + 1, amt, target, bidsA, base, once)
      }
      else {
        if (once){
          console.log('once')
             return {amt: target, price:bidsA[s].price, base:base}

        }
        if (amt < target){
          console.log('amt')
          return {amt: amt, price:bidsA[s].price, base:base}
        }
        else {
          console.log('target')
          return {amt: target, price:bidsA[s].price, base:base}
        }
      }
    }
    count++;
  }
  return {amt:0, price:0}
  
  
}function doLoop2(index, amt, target, bidsA, base, once){

  var count = 0;
  for (var s in bidsA){
    if (count >= index){
      base = base + bidsA[s].amount
      let amtOld = amt
      amt = amt + bidsA[s].amount
      if (amt <= target){
        once = false;
        console.log('amt: ' + amt)
        return doLoop2(index + 1, amt, target, bidsA, base, once)
      }
      else {
        if (once){
          console.log('once')
             return {amt: target, price:bidsA[s].price, base:base}

        }
        else{
          console.log('amt')
          return {amt: amtOld, price:bidsA[s].price, base:base}
        }
      }
    }
    count++;
  }
  return {amt:0, price:0}
  
  
}

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  console.log('lala');
    
 res.render('pages/index', {
  address: '1',
  input: '1'
});
});
app.get('/app.html', function(req, res) {
  console.log('lala');

 res.render('pages/app', {
  address: '1',
  input: '1'
});});

app.post('/form1', (req, res) => {
  
var input = req.body.input;
var output = req.body.output;
var account = req.body.account;
var amt = parseFloat(req.body.amt);


});
var port = 80;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.get('/getaddress', (req, res) => {
let input = req.query.input;
request('https://api.paybear.io/v2/' + input + '/payment/http%3A%2F%2Fburstytools.trade%2Fpaybear%2Fcallback?token=sec97452dbe86fd2176012d9e840c4c8857', function (err, data){
data = JSON.parse(data.body).data;
res.json({address: data.address})
});
});
app.post('/paybear/callback', (req, res) => {
  if(req.body) {
  var data = req.body;
  console.log(data);
  var invoice = data.invoice;
  //save data.confirmations - number of confirmations to DB
  console.log('invoice: ' + invoice);
  if(data.confirmations >= data.maxConfirmations) {
    var amountPaid = data.inTransaction.amount / Math.pow(10, data.inTransaction.exp);
    //compare $amountPaid with order total
    //compare $invoice with one saved in the database to ensure callback is legitimate
    //mark the order as paid
      var myquery = { invoice: invoice};
	  console.log(myquery);
  dbo.collection("invoices").find(myquery).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    request('https://api.coinmarketcap.com/v2/listings/', function(err, data3) {
    data3 = JSON.parse(data3.body)

    for (var d in data3.data){  
      if (data3.data[d].symbol == result[0].output){
      
request('https://api.coinmarketcap.com/v2/ticker/' + data3.data[d].id + '/', function(err, data) {
      data = JSON.parse(data.body)
console.log(data.data)
    var price = (data.data.quotes.USD.price);
  
  request('https://api.coinmarketcap.com/v2/listings/', function(err, data3) {
    data3 = JSON.parse(data3.body)
    for (var d in data3.data){
      if (data3.data[d].symbol == result[0].input){
                
          request('https://api.coinmarketcap.com/v2/ticker/' + data3.data[d].id + '/', function(err, data2) {
            data2 = JSON.parse(data2.body);

          amt = (data2.data.quotes.USD.price) * amountPaid;
          
          var toGet = ((amt / price) * fees);
          request('/prices?amt=' + toGet + '&coin=' + result[0].output, function(data4){
                      console.log(data4)

    var newvalues = { $set: {paid: true, amountPaid: amountPaid } };
    dbo.collection("invoices").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
          const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch');                            // node only; not needed in browsers
const { TextDecoder, TextEncoder } = require('text-encoding');  // node, IE11 and IE Edge Browsers
const defaultPrivateKey = "5JonUqtAC3MPnw3R43hd29uBDtvQxQNQJrzmmciGYjt3ovJa6pp"; // useraaaaaaaa
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc('https://jungle.eosio.cr:443', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
//testnet
result[0].output = 'TIB';
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: 'hexadecimal1',
        permission: 'owner',
      }],
      data: {
        from: 'hexadecimal1',
        to: result[0].account,
        quantity: toGet.toFixed(4) + ' ' + result[0].output,
        memo: '',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  console.dir(result);
  console.log('eos tx result: ' + result);
})();

          /*
          smoke.broadcast.transfer('5JEScui6K9F9nx6yDTTfraYQYqd7CnRP3Ar5ya7tbHYLPuodB6n', 'tfw.club', result[0].account, toGet, 'Payment from SwapIT', function(err, result) {
              console.log(err, result);
          }); */
        })

                  });
        });
      }
    }
  });
  

});
}
}
});
  });


    res.send(invoice); //stop further callbacks
  } else {
    console.log('waiting');
    res.send('waiting for confirmations');
  }
} else {
  console.log('error');
  res.send('error');
}
})
app.post('/form2', (req, res) => {

var input = req.body.input;
var output = req.body.output;
var account = req.body.account;
console.log(input)
console.log(output)
console.log(account)
request('https://api.paybear.io/v2/' + input + '/payment/http%3A%2F%2Fburstytools.trade%2Fpaybear%2Fcallback?token=sec97452dbe86fd2176012d9e840c4c8857', function (err, data4){
data4 = JSON.parse(data4.body).data;
console.log(data4);
  var myobj = { account: account, address: data4.address, invoice: data4.invoice, input: input, output: output, paid: false};
  dbo.collection("invoices").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
   res.json({
  address: data4.address,
  input: input
});

//res.send('send an amount of ' + input + ' to: ' + data4.address);
});
});
var fees = 0.95;