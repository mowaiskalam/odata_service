const express = require('express');
const app = express();
const routes = require('./routes');
const service = require('./service/odata');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// API routes
app.use('/api', routes);

// index page
app.get('/', async (req, res) => {
    const peoples = await service.getPeoples();
    res.render('home', {
        peoples
    });
});

// get people detail
app.get('/people/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const people = await service.getPeopleByUsername(username);
        res.render('people', {
            success: true,
            edit: false,
            errorMsg: false,
            people
        });
    } catch (ex) {
        res.render('people', {
            success: false,
            edit: false,
            errorMsg: false,
            error: ex.message
        })
    }
});

// get people detail edit page
app.get('/people/:username/edit', async (req, res) => {
    const username = req.params.username;
    try {
        const people = await service.getPeopleByUsername(username);
        res.render('people', {
            success: true,
            edit: true,
            errorMsg: false,
            people
        });
    } catch (ex) {
        res.render('people', {
            success: false,
            edit: false,
            errorMsg: false,    
            error: ex.message
        })
    }
});

app.listen(process.env.PORT || 8080);
console.log('Server is listening on port 8080');