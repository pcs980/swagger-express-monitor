const path = require('path');
const { Monitor } = require('@labbsr0x/express-monitor');
const swaggerExpress = require('swagger-express-middleware');

const packageJson = require('./package.json');

const start = async (app) => {
  Monitor.init(app, true, [0.01, 0.05, 0.1, 0.5, 1, 1.5, 5], packageJson.version);

  const swaggerFile = path.join(__dirname, 'swagger.yml');
  await swaggerExpress(swaggerFile, app, (error, middleware) => {
    if (error) {
      console.error('Error on Swagger Express', error);
    }
    app.use(
      middleware.files(),
      middleware.metadata(),
      middleware.parseRequest()
    );
    console.log('Swagger Express done');

    app.listen(3003, () => {
      console.log('App ready');
    });
  });
};

module.exports = {
  start
}
