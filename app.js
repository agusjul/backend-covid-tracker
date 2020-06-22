const express = require("express");
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')

const db = require ("./config/db");
const User = require("./models/User");

app.get("/", (req,res) => res.send ("respon berhasil"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

db.authenticate().then(() =>
 console.log ("berhasil terkoneksi dengan database")
);


app.post("/crud", async (req,res) => {
    try {
        const { name, permintaan, tanggal, keterangan } = req.body;
        const newUser = new User({
            name,
            permintaan,
            tanggal,
            keterangan
        });

        await newUser.save();

        res.json(newUser);

    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.get("/crud", async (req, res)=>{
    try {
        const getAllUser = await User.findAll({})

        res.json(getAllUser)
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.get("/crud/:id", async (req,res)=>{
    try {
        const id = req.params.id

        const getUser = await User.findOne({
            where: {id:id}
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
})

app.delete("/crud/:id", async (req,res) =>{
    try {
        const id = req.params.id;

        const deleteUser = await User.destroy({
            where : {id:id}
        });

        res.json("berhasil di hapus")
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});

app.put("/crud/:id", async (req,res) =>{
    try {
        const {name, permintaan, tanggal, keterangan} = req.body;
        const id = req.params.id;

        const updateUser = await User.update({
            name,
            permintaan,
            tanggal,
            keterangan
        },{where : {id:id}});

        await updateUser;

        res.json("berhasil di update");
    } catch (err) {
        console.error(err.massage);
        res.status(500).send("server error");
    }
});


app.listen(8000, ()=> console.log("port berjalan di 8000"));