const express = require('express');
const router = express.Router();

const upload = require('../services/file-upload');

const singleUpload = upload.single('image');

module.exports = (db,fileUpload,knex,checkToken)=>{
    fileUpload.post('/file-upload/:id',(req,res)=>{
        singleUpload(req,res,(err)=>{
            if(err){
                return res.status(422).send({errors:[{title:"file upload error",detail:err.message}]})
            }
            db.files.create({
                todo_id: req.params.id,
                file: req.file.location
            })
            .then((data) =>{
                console.log("Url uploaded into database",data)
                db.files.findAll({
                    attributes: ['file'],
                    where: {todo_id: req.params.id}
                })
                .then((result)=>{
                    // console.log('result',result)
                    res.json(result)
                })
                .catch((err)=>{
                    console.log({status:404,message:"err in fetching url from database",Error:err})
                })
            })
            .catch((err)=>{
                console.log('error in inserting url into dagabaase',err)
            })
        })
    })

    // getting all urls of a todo.............
    fileUpload.get('/getFiles/:id',(req,res)=>{
        db.files.findAll({
            attributes: ['file'],
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            // console.log('result',result)
            res.json(result)
        })
        .catch((err)=>{
            console.log({status:404,message:"err in fetching url from database",Error:err})
        })
    })

    // adding comment to a todo and updating to comment table
    fileUpload.post('/comment:id',(req,res)=>{
        db.comments.create({
            todo_id: req.params.id,
            comment: req.body.comment
        })
        .then((data) => {
            db.comments.findAll({
                raw: true,
                where: {todo_id: req.params.id}
            })
            .then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                console.log('err in getting all comments from db',err)
            })
        })
    })

    // getting comment in in will mount 
    fileUpload.get('/comment:id',(req,res)=>{
        db.comments.findAll({
            raw: true,
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log('err in getting all comments from db',err)
        })
    })

    // posting subComments
    fileUpload.post('/subComment/:id/:comment_id',(req,res)=>{
        db.sub_comments.create({
            todo_id: req.params.id,
            sub_comment: req.body.subComment,
            comment_id: req.params.comment_id
        })
        .then((data) => {
            db.sub_comments.findAll({
                raw: true,
                where: {todo_id: req.params.id}
            })
            .then((result)=>{
                console.log(result)
                res.send(result)
            })
            .catch((err)=>{
                console.log('err in getting all subComments from db',err)
            })
        })
    })

    fileUpload.get('/getSubComment:id',(req,res)=>{
        db.sub_comments.findAll({
            raw: true,
            where: {todo_id: req.params.id}
        })
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log('err in getting all subComments from db',err)
        })
        })
} 