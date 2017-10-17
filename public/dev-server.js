var connect = require('connect');
var ss = require('serve-static');
const dirname = ".";

connect().use(ss(dirname)).listen(8080,function(){
    console.log("Running on 8080..");
});