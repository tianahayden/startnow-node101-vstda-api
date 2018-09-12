const express = require('express');
const morgan = require('morgan');
var bodyParser = require("body-parser");

const app = express();

// add your code here

// USE BODY-PARSER AS MIDDLE-WARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// MOCK DATA HERE

var mData = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];


var successStatus = {
    status: 'ok'
};




// REQUEST FOR PATH ' / '

app.get('/', (req, res) => {
    res.send(successStatus);

});



// REQUEST FOR PATH ' /api/TodoItems '

app.get('/api/TodoItems', (req, res) => {
    res.send(mData);

});



// REQUEST FOR PATH ' /api/TodoItems/:number '

app.get('/api/TodoItems/:number', (req, res) => {

    var selectedItem;

    if (mData[req.params.number] !== undefined) {
        for (i = 0; i < mData.length; i++) {
            if (mData[i].todoItemId == req.params.number) {
                selectedItem = mData.splice(i, 1);
            }
            else {
                console.log("still looking");
            }
        }

        res.send(selectedItem[0])

    }
    else {
        res.send('No to do item with that number');
    }


});




// CREATE A SINGLE TO DO ITEM

app.post('/api/TodoItems', function (req, res) {

    // User adds object with name and priority
    // I create item ID and add completed = false
    // Push that object to my list


    var newItem = { todoItemId: mData.length, name: req.body.name, priority: req.body.priority, completed: false };
    mData.push(newItem);
    res.status(201).send(newItem);


})





// DELETE A SINGLE TO DO ITEM

app.delete('/api/TodoItems/:number', function (req, res) {

    // look in each index. If todo item equals params number, then give me the index of that value. If not, don't do anything

    var removedItem;

    for (i = 0; i < mData.length; i++) {
        if (mData[i].todoItemId == req.params.number) {
            removedItem = mData.splice(i, 1)
            console.log(mData);
        }
        else {
            console.log("still looking");
        }
    }


    res.send(removedItem[0])

})






module.exports = app;
