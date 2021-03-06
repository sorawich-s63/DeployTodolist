const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();


/*var corsOptions = {
    origin: "*"
};*/

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

//parse requests of constent-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// //drop the table if it already exist
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

//simple route 
app.get("/", (req, res) => {
    res.redirect("/todo");
});

require("./app/routes/todo.routes")(app);

app.use(express.static(path.join(__dirname, '../build')))

app.use((req,res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

