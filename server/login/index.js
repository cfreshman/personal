const express = require('express');
const model = require('./model');

const json = (res, promise) => promise
    .then(data => { console.log(data); res.json(data); })
    .catch(error => { console.log(error); res.json({ error }) } );

const routes = express.Router();
routes.post('/', (req, res) => {
    console.log(req.body);
    let {user, pass} = req.body;
    json(res, model.login(user, pass));
});
routes.post('/signup', (req, res) => {
    let {user, pass} = req.body;
    console.log(user, pass);
    json(res, model.signup(user, pass));
});
routes.post('/verify', (req, res) => {
    let {user, token} = req.body;
    console.log(user, token);
    json(res, model.check(user, token));
});
routes.post('/change-pass', (req, res) => {
    let {user, currPass, newPass} = req.body;
    json(res, model.changePass(user, currPass, newPass));
});

async function auth(req) {
    let { auth } = req.body;
    if (auth) {
        let result = await model.check(auth.user, auth.token);
        if (result.ok) return auth.user;
    }
    return false;
}

module.exports = {
    routes,
    model,
    auth,
}