const { Router } = require('express');
const router = Router();
let jsonNenek = require('../public/neneks.json');

// Get all diccionary
router.get("/dictionary", (req, res) => {
    res.render("dictionary", {
        title: 'Diccionario',
        words: jsonNenek
    })
});

router.get("/es/:query", (req, res) => {
    var index = searchname(jsonNenek, req.params.query, "pal_esp");
    if(index == -1) {
        const data = {
            error: 404,
            message: "Not Found"
        }
        res.send(data)
    } else {
        res.send(index)
    }
})

router.get("/tk/:query", (req, res) => {
    var index = searchname(jsonNenek, req.params.query, "pal_tenek");
    if(index.length < 1) {
        const data = {
            error: 404,
            message: "Not Found"
        }
        res.send(data)
    } else {
        res.send(index)
    }
})

var searchname = function(json, query, index){
    var array = []
    for(var i = 0; i < json.length; i++) {
        if (json[i][index].indexOf(query)>-1){
            const data = {
                id: json[i]['_id'],
                number_word: json[i]['num_pal'],
                query: query,
                tenek_word: json[i]['pal_tenek'],
                spanish_word: json[i]['pal_esp'],
                description: json[i]['significado']
            }
            array.push(data)
        }
    }
    return array;
}

module.exports = router