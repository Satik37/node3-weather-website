const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for EXpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engien and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Testing Name'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'the same testing guy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need some help?',
        helpText: 'Some random useful stuff',
        name: 'still the same testing guy'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast ) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    res.send({
        forecast: '23 Degrees',
        location: 'Somewhere',
        address: req.query.address
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message404: 'Error 404. Can\'t load the help article.' ,
        name: 'still the same guy. Nothing new.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message404: 'Error 404',
        name: 'blame yourself.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}); 