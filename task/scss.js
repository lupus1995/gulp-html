const { src, dest } = require('gulp');
const path = require('../config/path.js');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));

const scss = () =>
  src(path.scss.src, { sourcemaps: true })
    .pipe(plumber({
        errorHandler: notify.onError()
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(path.scss.dest))

module.exports = scss;
