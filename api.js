var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var lodash = require('lodash');

var store = {};

router.get('/', function (req, res) {
    res.send(fs.readFileSync(path.join(__dirname, './index.html'), 'ascii'));
});


router.get('/api/upload', function (req, res) {
    if(req.query.id && req.query.time && req.query.loc){
        if(store[req.query.id]){
            store[req.query.id].push({
                time: req.query.time,
                loc: req.query.loc
            });
        }else{
            store[req.query.id] = [{
                time: req.query.time,
                loc: req.query.loc
            }];
        }
        res.status(200).send('success');
    }else{
        var error = new Error('Invalid request');
        res.status(500).send(error);
    }
});

router.get('/api/download', function (req, res) {
    if(req.query.id){
        var data = [];
        if(req.query.id === 'huni'){
            data = lodash.keys(store);
            data = lodash.chain(store).keys().map(function(val){return {id: val}}).value();
        }else if(store[req.query.id]){
            data = store[req.query.id];
            data = lodash.orderBy(data, ['time'], ['asc']);
        }
        res.status(200).send(data);
    }else{
        var error = new Error('Invalid request');
        res.status(500).send(error);
    }
});


router.get('/api/reset', function (req, res) {
    if(req.query.id){
        store[req.query.id] = [];
        res.status(200).send('success');
    }else{
        var error = new Error('Invalid request');
        res.status(500).send(error);
    }
});

module.exports = router;