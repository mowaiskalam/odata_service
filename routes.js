const express = require('express');
const router = express.Router();
const service = require('./service/odata');

router
  .get('/ping', function(req, res){
    res.send('api hit');
  });

router
  .get('/people', async (req, res) => {
      try {
        const searchText = req.query.searchText;
        let peoples;
        if (!searchText) {
            peoples = await service.getPeoples();
        } else {
            const [fNamePeoples, lNamePeoples] = await Promise.all([
                service.getPeoples('FirstName', searchText),
                service.getPeoples('LastName', searchText),
            ]);
            peoples = fNamePeoples.concat(lNamePeoples)
        }
        res.render('home', {
            peoples
        });
      } catch (ex) {
          res.status(400);
          res.send({
            message: ex.message
          });
      }
  });

router
  .get('/people/:username', async (req, res) => {
      try {
        const username = req.params.username;
        const people = await service.getPeopleByUsername(username);
        res.send(people);
      } catch (ex) {
        res.status(400);
        res.send({
          message: ex.message
      });
    }
  });

// need to use `PUT` but html form only support 'GET' and 'POST' method
router
  .post('/people/:username', async (req, res) => {
      const username = req.params.username;
      try {
        const body = req.body;
        await service.updatePeople(username, body);
        const people = await service.getPeopleByUsername(username);
        res.render('people', {
            success: true,
            edit: false,
            errorMsg: false,
            people
        });
      } catch (ex) {
        const people = await service.getPeopleByUsername(username);
        res.render('people', {
            success: true,
            edit: false,
            people,
            errorMsg: ex.message
        });
    }
  });
 
module.exports = router;