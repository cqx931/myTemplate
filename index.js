var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');

var images = require('metalsmith-project-images');
var collections = require('metalsmith-collections');
var ignore = require('metalsmith-ignore');
const imagemin = require('metalsmith-imagemin');
var _ = require('lodash');

function getFilesWithImages(files, imagesKey) {
  imagesKey = imagesKey || 'images';
  return _.chain(files)
    .map(function(file, index, files) {
      var obj = {}
      obj[index] = file[imagesKey];
      return obj
    })
    .filter(function(file, index, files) {
      var key = Object.keys(file)[0]
      return !_.isUndefined(file[key]);
    })
    .value()
}

var metalsmith = new Metalsmith(__dirname)
  .metadata({
    name: "My name",
    description: "This is a website template.",
    url: "chenqianxun.com",
    bio: "a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(ignore([
    // 'projects/*/*.wav'
 ])) //tmp: don't include file?
  .use(images({
  	pattern: 'projects/*/*.md'
  }))
  .use(markdown())
  .use(collections({
    projects: {
      sortBy: 'year',
    }
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }]
  }))
  .build(function(err, files) {
    if (err) { throw err; }
    var filesWithImages = getFilesWithImages(files);
    //console.log(filesWithImages);
  });
