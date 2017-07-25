const express = require('express');
const service = express();
const ServiceRegister  = require('./serviceRegister');
const serviceRegister = new ServiceRegister();

service.set('serviceRegister', serviceRegister);

module.exports = service;