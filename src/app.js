const geocode = require('./utils/utils.js')
const forecast= require('./utils/utilsforecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')//nota: pra fazer o site funcionar com partials vc tem que redefinir as extensões que o nodemon exerga usando -e jbs,hbs
const { title } = require('process')

const app = express()

app.set('view engine', 'hbs')//falando pro app usar view engine do hbs

const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))//definindo o diretorio estatico do servidor
app.set('views', viewPath)//definindo o caminho da nova pasta view(templates), com essa linha aqui nao temos o problema de ter que rodar o comando no diretorio correto
hbs.registerPartials(partialsPath)//definindo caminho dos partials para o hbs

app.get('', (req, res) => {
    res.render('index', {//importante rodar o comando do diretorio webserver para funcionar pq o render vai procurar por default a pasta views de onde o comando for iniciado
        title: 'Weather',
        name: 'Leandro'
    })
})


app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name: 'Leandro'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'Aqui você pode encontrar ajuda',
        name:'Leandro',
        title:'Ajuda'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            msg : 'Address required!'
        })
    }
    const command = req.query.address
    geocode(command,(error,{longitude,latitude,location} = {})=>{//valor default usado aqui "={}"
        if(error){
             return res.send({msg:error})//usando o return para parar o uso da função caso dê erro mas o return msm n vai ser usado
        }
        forecast(longitude, latitude, (error, forecastData) => {
             if(error){
                  return res.send({msg:error})
             }     
             res.send({
                address:req.query.address,
                location:location,
                forecast:forecastData
            })
        })
   })
    
})

app.get('/help/*',(req,res) =>{//caso o usuario esteja procurando a pagina de help mas n acha
    res.render('notfound',{
        text:'Help article not found',
        title:'Pagina help não encontrada',
        name:'Leandro'
    })
})

app.get('*',(req,res)=>{//tem que ficar no final pq o express tem que testar os outros primeiro
    res.render('notfound',{
        text:'page not found!',
        title:'Error 404',
        name:'Leandro'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})