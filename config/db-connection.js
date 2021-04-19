const mongoose = require('mongoose');
const connetionString = process.env.MONGO_DB_URI;
mongoose
    .connect(connetionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Database connected...');
    })
    .catch((err) => {
        console.error(err);
    });
