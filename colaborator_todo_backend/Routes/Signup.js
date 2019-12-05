module.exports = (db,signup)=>{
    signup.post('/signup',(req,res)=>{
        db.userdetails.findOrCreate({
            raw:true,
            where:{email: req.body.email}, 
            defaults: req.body
        })   
        .then(([exists, created])=>{
            console.log('signup data saved to database (userdetail table)',exists,created);
            res.json(exists)
        })     
        .catch((err)=>{
            console.log('err in inserting userdetail into userdetail table of database')
            res.json({status_code:404,"message":"err in inserting userdetail into table"})
        })
    })
}