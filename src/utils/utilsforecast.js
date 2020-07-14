const request = require('request')
const forecast = (longitude,latitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=deb067f3fff06b923ce881e41652a663&query='+latitude+','+longitude+''
    request({url,json:true},(error,{body})=>{
         if(error){
              callback('Não foi possivel conectar-se ao serviço',undefined)
         }else if(body.error){
              callback('Não foi possivel encontrar o local',undefined)
         }else{
              callback(undefined,
                   'Temperatura atual: '+body.current.temperature+' Sensação termica: '+body.current.feelslike+' Velocidade do vento: '+body.current.wind_speed+' É de dia? '+(body.current.is_day=='yes'?'sim':'não')
              )
         }
    })
}
module.exports= forecast