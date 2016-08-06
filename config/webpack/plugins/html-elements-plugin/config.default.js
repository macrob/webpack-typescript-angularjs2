var util = require(process.env.PWD+'/config/etc/util.js');

const headStatic = require(util.root('src/config/head'));

module.exports = {
  headStatic: headStatic,
  head: {
    link: [
      {
        chunksName: "app"
      }
    ],
    script: [
      {
        chunksName: "polyfills",
        type: "text/javascript"
      }
    ]
  },
  footer: {
    script: [
      {
        chunksName: "vendor",
        type: "text/javascript"
      }, {
        chunksName: "app",
        type: "text/javascript"
      }
  ]
  }
}
