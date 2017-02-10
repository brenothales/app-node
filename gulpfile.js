var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  concat = require( 'gulp-concat' ),
  stylus = require( 'gulp-stylus' ),
  cssmin = require( 'gulp-cssmin' ),
  minify = require( 'gulp-minify' );

// Fazer refresh na página enquanto desenvolve
var browserSync = require("browser-sync").create();

  gulp.task("serve", function(){
    browserSync.init({
      server:{
        baseDir:'./'
      }
    });
    gulp.watch("./index.html").on("change", browserSync.reload);

});


// concatenando os arquivos do angularjs e chart em um único arquivos script.js
gulp.task( 'js', function() {

  gulp.src( [
    'bower_components/angular/angular.js',
  ] )
    .pipe( concat( 'script.js' ) )
    .pipe( gulp.dest( 'assets/js' ) );


  gulp.src( 'app/**/*js' )
    .pipe( concat( 'application.js' ) )
    .pipe( gulp.dest( 'assets/js/' ));

});

// construindo os arquivos de CSS
gulp.task( 'css', function() {

  gulp.src( 'assets/stylus/app.styl' )
    .pipe( stylus( {compress: true} ) )
    .pipe( concat( 'application.css' ) )
    .pipe( gulp.dest( 'assets/css/' ) );

  // gulp.src( 'bower_components/weather-icons/css/weather-icons.min.css' )
      // .pipe( concat( 'icons.css' ) )
      // .pipe( gulp.dest( 'assets/css' ) );

  // gulp.src( 'bower_components/weather-icons/font/**/*' )
      // .pipe( gulp.dest( 'assets/font' ) );

});


// Otimizar imagens para melhor carregamento da app.
gulp.task('build-image', function() {

  gulp.src('assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images'));
});


gulp.task('compress', function() {
  gulp.src('assets/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('assets/js'))
});

// Watch
gulp.task('watch', function() {

  gulp.watch( 'app/**/*js', ['js'] );
  gulp.watch( 'assets/stylus/**/*.styl', ['css'] );

});

// build for development
gulp.task( 'default', ['serve', 'js', 'css', 'watch'] );