const { src, dest } = require('gulp')
const ejs = require('gulp-ejs');
const log = require('fancy-log');

// merge ejs
// transpile sass

function buildEJS() {
    return src('src/pages/*.ejs')
        .pipe(ejs().on('error', log))
        .pipe(dest('dist/'))
}

exports.ejs = buildEJS;
