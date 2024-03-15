const connectToMongo = require("./db.js");
const express = require("express");
connectToMongo();

const app = express();
const port = 8080;

app.use(express.json()); //used to get object from GET req (req.body)
// if we want to use req.body, then this middleware has to be used
app.use("/api/notes", require("./routes/notes.js"));
app.use("/api/auth", require("./routes/auth.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
