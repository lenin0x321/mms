const express = require('express');
const app = express();
const cors = require('cors');

const {readdirSync} = require('fs');
const cookieParser = require('cookie-parser');
const csrf  = require('csurf')
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
const csrfprotection = csrf({ cookie: true });


readdirSync('./Routers').map((r)=>{app.use('/api',require(`./Routers/${r}`))});
app.use(csrfprotection);
app.get('/api/csrf-token',(req,res)=>{
    res.json({csrfToken: req.csrfToken()})
})
app.listen(process.env.port,()=>{
    console.log(`Server is runing on port ${process.env.port}`);
});