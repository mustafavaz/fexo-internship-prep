const {make_logger} = require('../../shared/logger');
const config = require('../../shared/config');

const logger = make_logger({category: 'order-api'});
logger.info(`Starting order-api on port: ${config.order_api.port}`);

