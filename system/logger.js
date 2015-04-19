var winston = require('winston');
var _       = require('underscore');

module.exports = function(app) {

    var _env = app.get('env');
    var _c   = app.config[_env].logger; // logger config

    winston.emitErrs = true;
    var logger = new winston.Logger({exitOnError: false});

    // add transport
    logger.add(winston.transports[_c.transport], _c.options);

    return logger;

};

