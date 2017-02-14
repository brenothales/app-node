var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  concat = require( 'gulp-concat' ),
  stylus = require( 'gulp-stylus' ),
  cssmin = require( 'gulp-cssmin' ),
  minify = require( 'gulp-minify' ),
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  nodemon = require('gulp-nodemon');




 
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});



//

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    
    script: 'app.js',

    
    watch: ['app.js']
  })
    .on('start', function onStart() {
      
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  
  browserSync({


    proxy: 'http://localhost:3000',

    port: 4000,

    browser: ['google-chrome']
  });
});

gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('server', ['browser-sync'], function () {
  gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('public/**/*.css',  ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
});

// concatenando os arquivos js
gulp.task( 'js', function() {

  gulp.src( [
    'bower_components/angular/angular.min.js',
  ] )
    .pipe( concat( 'angular.js' ) )
    .pipe( gulp.dest( 'app/js' ) );


  gulp.src( 'app/**/*js' )
    .pipe( concat( 'application.js' ) )
    .pipe( gulp.dest( 'public/assets/js/' ));

});

// construindo os arquivos de CSS
gulp.task( 'css', function() {

  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
    .pipe( stylus( {compress: true} ) )
    .pipe( concat( 'application.css' ) )
    .pipe( gulp.dest( 'public/assets/css/' ) );

   gulp.src('bower_components/font-awesome/css/font-awesome.css')
    .pipe( stylus( {compress: true} ) )
    .pipe( concat( 'font.css' ) )
    .pipe( gulp.dest( 'public/assets/css/' ) );

    gulp.src( 'bower_components/font-awesome/fonts/**/*' )
      .pipe( gulp.dest( 'public/assets/fonts' ) );
 

});





gulp.task('compress', function() {
  gulp.src('public/assets/js/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/assets/js'))
});


// build for development
gulp.task( 'default', ['server', 'nodemon', 'js', 'css', 'sass:watch', 'sass:watch', 'compress'] );