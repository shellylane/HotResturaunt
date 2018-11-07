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

// {
//     name: "joe",
//     phoneNumber: "555-555-5555",
//     email: "noreply@noplace.com",
//     uniqueId: "1155"
// }

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

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});


app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
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

    if (tables.length >= maxTables) {
        waitlist.push(newtable);
        
    } else {
        tables.push(newtable);
    }
    console.log(tables);
    console.log(waitlist);
    console.log("table length " + tables.length);
    console.log("waitlist lenght " + waitlist.length);
    res.json({
        tables,
        waitlist
    })

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listeing on http://localhost:" + PORT);
});
