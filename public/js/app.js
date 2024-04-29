console.log('Client side JS file is loaded!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const messageOne = document.querySelector('#message-1');

messageOne.textContent = 'From JavaScript';