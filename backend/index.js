const app = require('./api');

app.get("/", (req, res) => {
    const jssonResponse = {
        "name": "Rahul",
        "age": 22,
        "address": "Bangalore"
    };
    res.json(jssonResponse);
});
