var config = require('config');

module.exports =
{
	"port": config.get("lite-server.port"),
	"host": config.get("lite-server.host"),
	"files": [config.get("build")+"**/*.{html,htm,css,js}"],
	"server": {
		"baseDir": config.get("build")
	}
}
