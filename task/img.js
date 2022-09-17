const { src, dest } = require('gulp');
const app = require('../config/app.js');
const path = require('../config/path.js');
const sharp = require('sharp')

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rename = require("gulp-rename");
const through2 = require('through2');

const sizes = [
  {
    size: 480,
  },
  {
    size: 720,
  },
  {
    size: 1080,
  },
  {
    size: 1366,
  },
  {
    size: 1920
  },
  {
    size: 2560,
  }
];

const sizes2x = [
  {
    size: 960,
  },
  {
    size: 1140,
  },
  {
    size: 2160,
  },
  {
    size: 2732,
  },
  {
    size: 3840,
  },
  {
    size: 5120,
  }
]

const thumbnails = [
  // размеры дл простых экранов
  ...[313, 403, 640, 373, 387, 279].map((item, index) => ({
    path: path.img.srcThumbnails,
    size: sizes[index].size,
    value: item,
  })),
  // размеры для ретина экранов
  ...[626, 806, 1280, 746, 774, 558].map((item, index) => ({
    path: path.img.srcThumbnails,
    size: sizes2x[index].size,
    value: item,
  }))
]

const backgroundBlock = [
  // размеры дл простых экранов
  ...[480, 720, 1080, 1366, 1920, 2560].map((item, index) => ({
    path: path.img.srcBackgroundBlock,
    size: sizes[index].size,
    value: item,
  })),
  // размеры для ретина экранов
  ...[960, 1440, 2160, 2732, 3840, 5120].map((item, index) => ({
    path: path.img.srcBackgroundBlock,
    size: sizes2x[index].size,
    value: item,
  }))
];

const cropImage = (cb) => {
  backgroundBlock.forEach(image => {
    return src(image.path)
      .pipe(
        through2.obj(async function (file, _, cb) {
          if (file.isBuffer()) {
            const content = await sharp(file.contents)
              .resize(image.value).jpeg({ quality: 100, progressive: true }).toBuffer();

            file.contents = Buffer.from(content);
          }
          cb(null, file);
        })
      )
      .pipe(rename(function (path) {
        path.basename = `${path.basename}@${image.size}`;
      }))
      .pipe(dest(path.img.dest))
  })

  thumbnails.forEach(image => {
    return src(image.path)
      .pipe(
        through2.obj(async function (file, _, cb) {
          if (file.isBuffer()) {
            const content = await sharp(file.contents)
              .resize(image.value).jpeg({ quality: 100, progressive: true }).toBuffer();

            file.contents = Buffer.from(content);
          }
          cb(null, file);
        })
      )
      .pipe(rename(function (path) {
        path.basename = `${path.basename}@${image.size}`;
      }))
      .pipe(dest(path.img.dest))
  })

  return cb();
}

const img = () =>
  src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.img.dest))

module.exports = { img, cropImage };
