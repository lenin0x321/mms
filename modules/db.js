const {Client} = require('pg');
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "lenin@123",
    database: "postgres"
})
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});