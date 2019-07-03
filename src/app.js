const express = require('express');
const path = require('path');
const hbs = require('hbs');

const publicDirPath = path.join(__dirname, '../public');
const geocode = require('./misc').geocode;
const forecast = require('./misc').forecast;
const partials = path.join(__dirname, '../views/partials');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirPath));
hbs.registerPartials(partials);
app.set('view engine','hbs');

app.get('',(req, res)=>{
    res.render('index',{
        name:'Siddharth',
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Siddharth'
    });
});
app.get('/weather',(req,res)=>{
    const address = req.query.address ;
    if(!address){
        return res.send({
            error:'searchfield is required'
        })
    }else{
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:'type in valid location'
            })
        }else{
            forecast(latitude,longitude,(error,response)=>{
                if (error) {
                    return res.send({
                        error: error
                    })
                }else{
                    return res.send({
                        location,
                        weather:response,
                        address
                    })
                }
            })
        }
    })
    }
}) 
//needs to come at last
app.get('*',(req, res)=>{
    res.render('404')
})
app.listen(port)