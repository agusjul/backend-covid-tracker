const Sequelize = require ("sequelize");
const db = require("../config/db");

const User = db.define(
    "appointment",
    {
        name : {type:Sequelize.STRING},
        permintaan : {type:Sequelize.STRING},
        tanggal : {type:Sequelize.DATEONLY},
        keterangan : {type:Sequelize.TEXT}

    },
    {
        freezeTableName : true
    }
);

module.exports = User;