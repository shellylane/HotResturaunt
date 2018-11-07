// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const maxTables = 5;


let tables = [

];

let waitlist = [

]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve.html", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});


app.get("/tables.html", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays waitlist
app.get("/api/waitlist/", function (req, res) {
    return res.json(waitlist);

});

// add new table
app.post("/api/tables", function (req, res) {

    let newtable = req.body;

    if (tables.length > 5) {
        tables.push(newtable);
    } else {
        waitlist.push(newtable);
    }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
