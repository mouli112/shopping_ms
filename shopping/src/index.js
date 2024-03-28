const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');
const StartServer = async() => {

    const app = express();
    const channel = await CreateChannel();
    await databaseConnection();
    
    await expressApp(app,channel);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();