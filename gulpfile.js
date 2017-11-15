var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var scss = require('gulp-scss');
var runSequence = require('run-sequence');

gulp.task('transfarImage', function(){
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./app/images/'))
});

gulp.task('minimizeImage', function(){
  return gulp.src(['./app/images/**/*'])
    .pipe($.imagemin())
    .pipe(gulp.dest('./app/'));
});

// gulp.task('compile-js', function(){
//   return gulp.src('./src/js/*')
//     .pipe($.plumber({
//       errorHandler: $.notify.onError('<%= error.message %>')
//     }))
//     .pipe($.babel())
//     .pipe(gulp.dest('./app/js/'));
// })

gulp.task('transfar-html', function () {
  return gulp.src('./src/template/*.html')
    .pipe(gulp.dest('./app'));
})

// gulp.task('compile-haml', function () {
//   return gulp.src(['./src/haml/*.haml', './src/haml/**/*.haml'])
//     .pipe($.plumber({
//       errorHandler: $.notify.onError('<%= error.message %>')
//     }))
//     .pipe($.rubyHaml())
//     // .pipe($.htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('./app'));
// });

// gulp.task('inject-html', function () {
//   return gulp.src(['./app/*.html'])
//     .pipe($.plumber({
//       errorHandler: $.notify.onError('<%= error.message %>')
//     }))
//     .pipe($.fileInclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe($.htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('./app/'));
// })

gulp.task('compile-scss', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe($.autoprefixer({
      browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
      cascade: false
    }))
    .pipe($.scss())
    .pipe(gulp.dest('./app/css/'))
})

gulp.task('compile', ['compile-scss', 'transfar-html', 'transfarImage']);

gulp.task(
  'watch',
  function() {
    gulp.watch('src/**/*', ['compile']);
    // gulp.watch('app/*', ['inject-html']);
  }
);

gulp.task(
  'webserver',
  function() {
    return gulp.src('./app')
      .pipe($.webserver({
        open: true
      }));
  }
);

gulp.task('development', function(callback) {
  runSequence('compile', 'watch', 'webserver', callback);
});

// gulp.task('production', function(callback) {
//   runSequence('compile', 'inject-html', callback);
// });
