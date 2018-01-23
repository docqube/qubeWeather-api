'use strict';

module.exports = function(app) {
    const controller = require('../controller/');
    const config = require('../config/config.json');
    
    app.route(config.url + '/')
        .get(controller.welcome);

    app.route(config.url + '/data')
        .put(controller.data_new);
    
    app.route(config.url + '/:sensor')
        .get(controller.data_get_newest);

    app.route(config.url + '/:sensor/:start/:end')
        .get(controller.data_get);
};
