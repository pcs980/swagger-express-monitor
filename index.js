'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const createMiddleware = require('swagger-express-middleware');
const { Monitor } = require('@labbsr0x/express-monitor');
const packageJson = require('./package.json');

const app = express();

Monitor.init(app, true, [0.01, 0.05, 0.1, 0.5, 1, 1.5, 5], packageJson.version);

// Endpoint definido separadamente
app.get('/manual', (req, res, next) => {
  return res.status(200).json({
    manual: true
  });
});

// Preparar endpoints com o middleware Swagger
const swaggerFile = path.join(__dirname, 'api/swagger.yml');
createMiddleware(swaggerFile, app, (error, middleware) => {
  if (error) {
    console.error('Error on Swagger Express', error);
  }
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest()
  );
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    const controllerName = req.swagger.path['x-swagger-router-controller'];
    const operationId = req.swagger.operation['operationId'];
    console.log(`Run ${controllerName}[${operationId}]`);

    const controller = require(`./api/${controllerName}`);
    controller[operationId](req, res);

    next();
  });
  console.log('Swagger Express done');

  app.listen(3003, () => {
    console.log('App ready');
  });
});

