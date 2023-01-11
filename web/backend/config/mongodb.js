import mongoose from "mongoose";

let database={
    name: 'mobileBuilderDB',
    debug: false
}

mongoose.set('debug', database.debug); // for ananlysing the query.
mongoose.set('strictQuery',false);

let options = {
    useNewUrlParser: true,
    useUnifiedTopology:true
};
export default function DB() {
    console.log("in connect")
    // mongoose runs only on 27017 port
    mongoose.connect('mongodb://127.0.0.1:27017/' + database.name, options, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connected to ' + database.name);
        }
    });
}