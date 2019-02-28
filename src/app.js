const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//declaration
const CURRENT_API_VERSION = 'v1';
const APIs_URL = `/api/${CURRENT_API_VERSION}`;
const APIs_PATH_ROUTERS = `.${APIs_URL}/routers`;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.enable('strict routing');

fs.readdirSync(APIs_PATH_ROUTERS).forEach(file => {
    app.use(`${APIs_URL}/${path.basename(file, '.js')}`, require(`${APIs_PATH_ROUTERS}/${file}`));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
