const { src, dest } = require('gulp');
const path = require('../config/path.js');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel')

const js = () =>
  src(path.js.src, { sourcemaps: true })
    .pipe(plumber(plumber({
        errorHandler: notify.onError()
    })))
    .pipe(babel())
    .pipe(dest(path.js.dest))

module.exports = js;
