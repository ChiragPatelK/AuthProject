const app = require("./app");
require("dotenv").config();
// const sequelize = require("./config/database")
const db = require("./models");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("Database Connected");
        // const data = await db.User.findAll()
        // console.log(data.map(v => v.email));

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error){
        console.log("Database con failed", error.message);      
    }
}

startServer()