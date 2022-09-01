const { parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();

const path = require('./config/path.js');

const clear = require('./task/clear.js');
const html = require('./task/html.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const font = require('./task/font.js')

const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
}

const watcher = () => {
    watch(path.html.watch, html).on('all', browserSync.reload);
    watch(path.scss.watch, scss).on('all', browserSync.reload);
    watch(path.js.watch, js).on('all', browserSync.reload);
    watch(path.img.watch, img).on('all', browserSync.reload);
    watch(path.font.watch, font).on('all', browserSync.reload);
};

exports.html = html;
exports.watcher = watcher;
exports.clear = clear;
exports.scss = scss;
exports.js= js;
exports.img = img;
exports.font = font;

exports.dev = series(
    clear,
    parallel(html, scss, js, img, font),
    parallel(watcher, server));