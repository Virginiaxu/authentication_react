const mongoose = require('mongoose');
const express = require('express');
const User = require("../models/user");
const Todo = require("../models/todo");

const router = new express.Router();

/*router.get('/dashboard/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id);
  res.status(200).json({
    message: `You're authorized to see this secret message, ${id}`
  });
});*/

router.get('/dashboard/:id', (req, res)=> {
  User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      }
      Todo.find().where('userId').equals(foundUser._id).exec(function(err, todos){
        if (err) {
          console.log(err);
        }

        console.log("the first todo is "+ todos)
        res.status(200).send(todos);    
      })
  })
});

router.post('/dashboard/:id', (req, res)=> {
    const content = req.body.text;
    console.log("this is "+ content);
    const userId = req.params.id;
    const newTodo = {
      text: content,
      done: false,
      userId: userId
    }
  Todo.create(newTodo, function(err, newTodo) {
    if (err) {
      console.log(err);
    }
    console.log("new todo is " + newTodo);
    /*User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      }
      console.log("the user is "+ foundUser);
      Todo.find().where('userId').equals(foundUser._id).exec(function(err, todos){
        if (err) {
          console.log(err);
        }
        console.log("the updated todos are "+ todos);
        res.status(200).send(todos);    
      })
    })*/
  })
});

router.put('/dashboard/:id', (req, res)=> {
  //const ObjectId = mongoose.Types.ObjectId;
  console.log("the id here is "+ req.body.id);
  Todo.findById(req.body.id, function(err, todo){
    if(err){
      res.status(500).send(err);
    }else{
      todo.text = req.body.text;
      todo.done = req.body.done;
      todo.userId = req.params.id;
      todo.save(function (err, todo) {
        if (err) {
          res.status(500).send(err)
        }
        res.send(todo);
      });
    }
  })
  /*Todo.findOneAndUpdate(
    { _id: new ObjectId(req.body.id)}, 
    { text: req.body.text, done: req.body.done })
    .then(() => 
      console.log("updated success")
    )*/
});
    
router.delete('/dashboard/:id', (req, res) => {
  
  const ObjectId = mongoose.Types.ObjectId;
  //console.log("the id to be deleted is "+ req.params.todoId);

  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    //if(err)console.log("hahaha!!!!")
    //var response = {
    //    message: "Todo successfully deleted",
     //   id: todo._id
    //};
    res.send(todo);
  })
})
  /*Todo.find({ _id: req.params.todoId }).remove()
    .then((err)=>{
      if(err) console.log(err)
      User.findById(req.params.id, function(err, foundUser) {
      if (err) {
        console.log(err);
      }
      Todo.find().where('userId').equals(foundUser._id).exec(function(err, todos){
        if (err) {
          console.log(err);
        }
        res.status(200).send(todos);    
      })
    })
  })*/


module.exports = router;
