const { src, dest, watch, parallel } = require('gulp')
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const log = require('fancy-log');
const rename = require('gulp-rename');

function buildEJS(done) {
    return src('src/pages/*.ejs')
        .pipe(ejs().on('error', (err) => { console.log(err.message); done() }))
        .pipe(dest('dist/'))
}

exports.ejs = buildEJS;

function buildSASS() {
    return src('src/theme/base.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename('style.css'))
        .pipe(dest('dist/css/'))
}

exports.sass = buildSASS;

exports.default = parallel(buildEJS, buildSASS);
watch('src/pages/**/*', buildEJS);
watch('src/theme/**/*', buildSASS);
