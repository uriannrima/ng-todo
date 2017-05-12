var fs = require('fs');

var resources = [
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.min.js',
  { source: 'src/index.aot.html', target: 'index.html' }
].map(function (resource) {
  if (typeof resource == 'object') {
    var path = resource.source.split('/');
    var target = 'aot/dist/' + resource.target;
    fs.createReadStream(resource.source).pipe(fs.createWriteStream(target));
  } else {
    var path = resource.split('/');
    var target = 'aot/dist/' + path[path.length - 1];
    fs.createReadStream(resource).pipe(fs.createWriteStream(target));
  }
});