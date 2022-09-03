const { src, dest } = require('gulp');
const path = require('../config/path.js');
const app = require('../config/app.js');

const fileInclude = require('gulp-file-include');
const notify = require('gulp-notify');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const webpHtml = require('gulp-webp-html');

const html = () =>
  src(path.html.src)
    .pipe(plumber({
        errorHandler: notify.onError()
    }))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(htmlmin(app.htmlmin))
    .pipe(dest(path.html.dest))

module.exports = html;
