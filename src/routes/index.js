const { Router } = require('express');
const router = Router();
const dictionary = require('../words.js');
let jsonNenek = require('../public/dictionary.json');

// Get all diccionary
router.get("/", (req, res) => {
    res.render("index")
});

// Get all diccionary
router.get("/all", (req, res) => {
    res.render("dictionary", {
        title: 'Diccionario',
        words: jsonNenek
    })
});

router.get("/dictionary", (req, res) => {
    res.send(dictionary.allDictionary())
});

router.get("/es/:query", (req, res) => {
    parseSearch("pal_esp", req.params.query, res)
})

router.get("/tk/:query", (req, res) => {
    parseSearch("pal_tenek", req.params.query, res)
})

function parseSearch(type, query, res) {
    var index = searchname(jsonNenek, query, type);
    if(index.length < 1) {
        const data = {
            error: 404,
            message: "Not Found"
        }
        res.status(404).send(data)
    } else {
        res.status(200).send(index)
    }
}

var searchname = function(json, query, index){
    var array = []
    for (let value of json) {
        if (value[index].toLowerCase().indexOf(query.toLowerCase())>-1) {
            console.log(value)
            const data = {
                id: value['_id'],
                number_word: value['num_pal'],
                query: query,
                tenek_word: value['pal_tenek'],
                spanish_word: value['pal_esp'],
                description: value['significado']
            }
            array.push(data)
        }
    }
    return array;
}

module.exports = router