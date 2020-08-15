const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // import multer and the ImageStorage engine
const _ = require('lodash');
const path = require('path');
const multer = require('multer');
const ImageStorage = require('../helpers/ImageStorage');

// setup a new instance of the ImageStorage engine 
const storage = ImageStorage({
	square: true,
	responsive: true,
	greyscale: true,
	quality: 90
});

const limits = {
	files: 1, // allow only 1 file per request
	fileSize: 1024 * 1024, // 1 MB (max file size)
};

const fileFilter = function(req, file, cb) {
	// supported image file mimetypes
	var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

	if (_.includes(allowedMimes, file.mimetype)) {
		// allow supported image files
		cb(null, true);
	} else {
		// throw error for invalid files
		cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
	}
};

// setup multer
const upload = multer({
	storage: storage,
	limits: limits,
	fileFilter: fileFilter
});

app.post('/upload', upload.single(process.env.IMAGE_FIELD), function(req, res, next) {

	var files;
	var file = req.file.filename;
	var matches = file.match(/^(.+?)_.+?\.(.+)$/i);

	if (matches) {
		files = _.map(['lg', 'md', 'sm'], function(size) {
			return matches[1] + '_' + size + '.' + matches[2];
		});
	} else {
		files = [file];
	}

	files = _.map(files, function(file) {
		var port = req.app.get('port');
		var base = req.protocol + '://' + req.hostname + (port ? ':' + port : '');
		var url = path.join(req.file.baseUrl, file).replace(/[\\\/]+/g, '/').replace(/^[\/]+/g, '');

		return (req.file.storage == 'local' ? base : '') + '/' + url;
	});

	res.json({
		images: files
	});

});
  };
