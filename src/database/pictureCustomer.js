
const mongoose = require("mongoose");

const database='foto_persona';

mongoose.connect(`mongodb://localhost:27017/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;