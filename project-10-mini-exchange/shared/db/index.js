const { Pool } = require('pg');
const {make_query_builder} = require('./query-builder');
const {make_logger} = require('../logger');
const config = require('../config');
const pool = new Pool(config.pg);

const logger = make_logger({category: 'db'});
const query = make_query_builder({pool: pool, logger: logger});
module.exports = { pool, query };

