const { MongoClient } = require("mongodb");
let mongodb = require("mongodb");
let express = require("express");
let app = express();
let db;
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
let connectionString =
  "mongodb+srv://vikendica:vikendica@cluster0.hayml.mongodb.net/zaDogovore?retryWrites=true&w=majority";
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
MongoClient.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    db.collection("slobodanDatum").find();
    app.listen(port);
  }
);
app.get("/", function (req, res) {
  db.collection("slobodanDatum")
    .find()
    .toArray()
    .then((result) => {
      res.render("index.ejs", { result });
    });
});

app.post("/post-item", function (req, res) {
  if (
    req.body.ime == "Brosonja" ||
    req.body.ime == "Brojke" ||
    req.body.ime == "Debroljko"
  ) {
    db.collection("slobodanDatum").insertOne(
      { datum: req.body.datum, vreme: req.body.vreme, ime: req.body.ime },
      () => {
        res.redirect("/");
      }
    );
  } else {
    res.redirect("/");
  }
});
app.post("/remove-item-brojke", (req, res) => {
  db.collection("slobodanDatum").deleteOne({ ime: "Brojke" }, () => {
    res.redirect("/");
  });
});
app.post("/remove-item-debroljko", (req, res) => {
  db.collection("slobodanDatum").deleteOne({ ime: "Debroljko" }, () => {
    res.redirect("/");
  });
});
app.post("/remove-item-brosonja", (req, res) => {
  db.collection("slobodanDatum").deleteOne({ ime: "Brosonja" }, () => {
    res.redirect("/");
  });
});
