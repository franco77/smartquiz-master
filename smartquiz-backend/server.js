const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const compression = require('compression');

const register = require ('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');

// For Local Testing
const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost', //localhost for now
        user: 'postgres',
        password: 'asd',
        database: 'quizmaster'
    }
});

// For Heroku Deployments
// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL, //localhost for now
//         ssl: true
//     }
// });

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(compression());

const PORT = process.env.PORT || 3008;

// app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server hosted on "http://localhost:${PORT}/`)
})

app.post('/login', (req, res) => { login.handleLogin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => { profile.handleProfileFetch (req, res, db)})

app.put('/imageCount', (req, res) => { profile.incrementImageCount(req, res, db)})

