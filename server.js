const express = require('express')
const {Sequelize , Op} = require('sequelize')
const cors = require('cors');
const db = require('./db')
const studentModel =  require('./models/Students')



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



db.authenticate()
.then(data=>console.log('db connection success'))
.catch(err=>console.log('db connection error'))



db.sync()
.then(res=>console.log('synced success'))
.catch(err=>console.log('sync error'))


app.listen(3001,()=>{
    console.log("server running at port 3001");
})

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.post('/students', async  (req,res)=> {
    try{
     const result = await studentModel.create(req.body)
     res.json(result)
     
    } catch(e) {
        console.log(e)
    }
})

app.get('/students', async (req,res)=>{
    try {
       
          var options = {
                where : {
                    [Op.or]:[
                        { 'name': { [Op.like]: '%' + req.query.search + '%' } },
                        { 'email': { [Op.like]: '%' + req.query.search + '%' } },
                        { 'degree': { [Op.like]: '%' + req.query.search + '%' } },
                        { 'phone': { [Op.like]: '%' + req.query.search + '%' } }
                        
                    ]
                }
          };
          let users =[]
        if(req.query.search) {
             users = await studentModel.findAll(options)
        }
        else {
             users = await studentModel.findAll()
        }
        res.json(users)
    } catch(e) {
      console.log(e)
    }
})