const request = require('request')
const geocode = (address,callback) =>{
    geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGVhbmRyb2ZsIiwiYSI6ImNrY2FscWFjcTFjMm8yenF0eTlxNDc0YmQifQ.pb2RmfvLr-zz2EtHBrN5kA&limit=1'
    //com enconde nao teremos problemas com caracteres especiais
    request({url:geourl,json:true},(error,{body})=>{//acessando inline propriedade body
         
         if(error){
              callback ('Não foi possivel conectar ao serviço', undefined)//pode ser omitido o undefined
         }else if(body.features.length === 0){
              callback('Não foi possivel encontrar',undefined)
         }else{
              callback (undefined,{
                   location: body.features[0].place_name,
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0]
              })
         }
    })
}

module.exports= geocode
