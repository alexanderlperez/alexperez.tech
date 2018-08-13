const { src, dest, watch, parallel } = require('gulp')
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const log = require('fancy-log');
const rename = require('gulp-rename');
const bs = require('browser-sync').create();
const changed = require('gulp-changed');

function buildEJS(done) {
    const DEST = 'dist/';
    return src('src/pages/*.ejs')
        .pipe(changed(DEST))
        .pipe(ejs({}, {}, { ext: '.html' })
            .on('error', (err) => { 
                console.log(err.message); 
                done();
            }))
        .pipe(dest(DEST))
}

exports.ejs = buildEJS;

function buildSASS() {
    const DEST = 'dist/css/';
    return src('src/theme/*')
        .pipe(changed(DEST))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(DEST))
}

exports.sass = buildSASS;

exports.default = parallel(buildEJS, buildSASS);
watch('src/pages/**/*', buildEJS);
watch('src/theme/**/*', buildSASS);
