const express=require("express");
const app=express();
const morgan=require('morgan');

require('./database/pictureCustomer');

app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routers/pictureRouter'))
app.listen(app.get('port'),() => {
    console.log( `server on port ${app.get('port')}`);
});