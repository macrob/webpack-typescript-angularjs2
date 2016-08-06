var path = require('path');
var check = require('check-types');




/**
 * @author: @AngularClass
 */

var ROOT = path.resolve(__dirname, '..', '..');

const ENV = process.env.NODE_ENV || 'default';

module.exports =
{
	env: function () {
		return ENV;
	},

	root: function(pth)
	{
		return path.resolve(ROOT, pth);
	},

  getOpt: function()
  {
		return this.getCliOpt(process.argv);
  },

	getCliOpt: function (options, param = '--env') {


		for (var i = 0; i < options.length; i++) {

			if (options[i] === param) {

				return options[i + 1];
			}
		}

		return null;
	}
}
