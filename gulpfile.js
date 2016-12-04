var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', () => {
  gulp.src('src/index.js')
    .pipe(babel({ plugins: ['transform-class-properties', 'transform-react-jsx'] }))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist'));
  gulp
    .src('src/style.css')
    .pipe(gulp.dest('dist'));
});
