console.log('Oi, eu sou o app.js')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()//evita refresh do console
    const location = search.value
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{//fetch api client side, then é uma promesa
        response.json().then((data)=>{
            if(data.msg){
                messageOne.textContent=data.msg
                return
            }
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        })
    })
})

