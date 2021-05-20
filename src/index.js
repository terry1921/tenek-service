const { response } = require('express');
const app = require('./app')

app.listen(app.get('port'), function() {
    console.log(`Server started on port ${app.get('port')}`);
});