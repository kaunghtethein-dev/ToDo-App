const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

var items = [];

app.get("/",function(request,response){

    var today = new Date();

    var dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    // Change the date to this format (Example: Thursday, June 7)
    var day = today.toLocaleDateString("en-us",dateOptions);

    // Javascript Object to pass into response.render()
    var data = {
        kindOfDay:day,
        newItem: items
    }
   
    // Pass the 'data' object to lists.ejs
    response.render("lists",data);

})

app.post("/",function(request,response){
    var newItem = request.body.newTask;
    items.push(newItem);
    response.redirect("/");
})

app.listen("3000",function(){
    console.log("Server is running.")
})