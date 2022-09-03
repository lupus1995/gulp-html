const { src, dest } = require('gulp');
const app = require('../config/app.js');
const path = require('../config/path.js');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

const font = () =>
  src(path.font.src)
    .pipe(plumber({
        errorHandler: notify.onError()
    }))
    .pipe(newer(path.font.dest))
    .pipe(fonter(app.fonter))
    .pipe(dest(path.font.dest))
    .pipe(ttf2woff2())
    .pipe(dest(path.font.dest))

module.exports = font;
