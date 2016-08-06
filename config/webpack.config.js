var util = require('./etc/util');


switch (util.env()) {
case 'prod':
case 'production':

	module.exports = require('./webpack/webpack.prod');
	break;
case 'test':
case 'testing':

	module.exports = require('./webpack/webpack.test');
	break;
case 'dev':
case 'development':
default:
console.log('test');
	module.exports =  require('./webpack/webpack.dev');
}
