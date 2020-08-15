
let express = require('express');
const createError = require('http-errors');
express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/library.routes')(app);
require('./routes/scoutingInfo.routes')(app);
require('./routes/scoutingRequest.routes')(app);
require('./routes/masterclass.routes')(app);
require('./routes/operation.routes')(app);
require('./routes/exam.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
