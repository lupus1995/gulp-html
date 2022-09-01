const { src, dest } = require('gulp');
const path = require('../config/path.js');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const css = () =>
  src(path.css.src, { sourcemaps: true })
    .pipe(plumber(plumber({
        errorHandler: notify.onError()
    })))
    .pipe(autoprefixer())
    .pipe(dest(path.css.dest))

module.exports = css;
