// require fs and puppeteer
const express = require('express')
const generateTheme = require('./service/generateImage')
const path = require("path");
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.set('view engine', 'ejs');
app.set()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/page',(req,res)=>{
    res.render('pages/index')

})



app.use('/',async (req,res)=>{
let {theme,author,title,image} = req.query
    res.setHeader('Content-Type', `image/png`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(await generateTheme(author,image,title,theme))
})


app.listen(80,()=>console.log('Listening to port 3000'))
