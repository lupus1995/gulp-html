const { src, dest } = require('gulp');
const app = require('../config/app.js');
const path = require('../config/path.js');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const rename = require("gulp-rename");
const through2 = require('through2');
const Jimp = require('jimp');

const cropImage = (cb) => {
  [480, 720, 1080, 1366, 1920, 2560].forEach(size => {
    return src(path.img.src)
      .pipe(plumber({
        errorHandler: notify.onError()
      }))
      .pipe(
        through2.obj(async function (file, _, cb) {
          if (file.isBuffer()) {
            const img = await Jimp.read(file.contents);
            
            const smallImg = img
              .resize(size, Jimp.AUTO).quality(80);
            
            const content = await smallImg
              .getBufferAsync(Jimp.AUTO);

            file.contents = Buffer.from(content);
          }
          cb(null, file);
        })
      )
      .pipe(rename(function (path) {
        path.basename = `${path.basename}@${size}`;
      }))
      .pipe(dest(path.img.dest))
      .pipe(src(path.img.src))
      .pipe(newer(path.img.dest))
      .pipe(webp())
      .pipe(imagemin(app.imagemin))
      .pipe(dest(path.img.dest))
  });

  cb();
}

const img = () =>
  src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.img.dest))

module.exports = { img, cropImage };
