var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var merge = require('merge2');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sh = require('shelljs');
var sassdoc = require('sassdoc');
var karma = require('gulp-karma');

/*Path Files*/
var paths = {
    htmlTemplates: 'src/**/*.html',
    appTypescript: ['src/**/*.ts', '!src/typings/**/*.*', '!platforms/**/*.*'],
    appJs: ['src/**/*.js', 'src/**/*.js.map'],
    outputJs: 'www/js/',
    appSass: ['src/**/**/*.scss'],
    inputSass: 'src/app/theme/finApp.scss',
    outputSass: 'www/css',
    sassdocOptions: {dest: './www/css/doc'}
};

gulp.task('default', ['sass', 'copy-js', 'copy-html', 'ts']);

/**
 * SASS to CSS - based on http://www.sitepoint.com/simple-gulpy-workflow-sass/
 * @desc This task take app.scss and transform this to .css, after that put each new .css into App_Web -> dist -> styles
 */

var sassOptions = {
    errLogToConsole: true
};

gulp.task('sass', function() {
  gulp
    .src(paths.inputSass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.outputSass))
    //TODO: research more in detail minifyCss so that I have some errors
    // If I uncomments below block.
    // .pipe(minifyCss({keepSpecialComments : 0})
    // .on('error', sass.logError))
    // .pipe(rename({ extname: '.min.css' }))
    // .pipe(gulp.dest(paths.outputSass))
    // .on('end', done);
});

/*
 * Sass Doc - http://sassdoc.com/
 */

gulp.task('sassdoc', function () {
    return gulp
      .src(input)
      .pipe(sassdoc(paths.sassdocOptions))
      .resume();
});

/*
 * TypeScript to Javascript
 */
//var paths = {
//    appTypescript: ['**/*.ts', '!node_modules/**/*.*', '!App_Web/typings/**/*.*']
//}

var tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
    noExternalResolve: true,
    sortOutput: true
}); // loads our configuration

gulp.task('ts', function() {
    var tsResult = tsProject.src(paths.appTypescript) // load all files from our pathspecification
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject)) // transpile the files into .js
        .pipe(concat('application.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.outputJs));

    //return tsResult.js.pipe(gulp.dest('')).on('end', done); // save the .js in the same place as the original .ts-file
    //return tsResult.js.pipe(gulp.dest(paths.outputJs)).on('end', done); // save the .js in the same place as the original .ts-file
});

/*
 * TsLint (TypeScript)
 */
gulp.task('ts-lint', function () {
    return gulp.src(paths.appTypescript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});


/*
 * Watch Sass
 */
gulp.task('watch', function() {
    gulp.watch(paths.appSass, ['sass']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    /*gulp.watch(paths.appTypescript, ['ts']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });*/
    gulp.watch(paths.htmlTemplates, ['copy-html']).on('change', function (event){
        console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
    });
    /*gulp.watch(paths.appJs, ['copy-js']).on('change', function (event){
        console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
    });*/
    //gulp.watch(paths.sass, ['sass']);
});

/*
 * Copy html templates and Paste in www/templates folder
 */
 gulp.task('copy-html', function() {
    gulp.src(paths.htmlTemplates)
    // Perform minification tasks, etc here
    .pipe(gulp.dest('www/templates/'));
});

/*
 * Copy JS and Paste in www/js folder
 */
 gulp.task('copy-js', function() {
    gulp.src(paths.appJs)
    // Perform minification tasks, etc here
    .pipe(gulp.dest(paths.outputJs));
});

/*
 * Karma Unit Test
 */
gulp.task('test', function () {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
      .pipe(karma({
          configFile: 'karma.config.js',
          action: 'run'
      }))
      .on('error', function (err) {
          // Make sure failed tests cause gulp to exit non-zero
          console.log(err);
          this.emit('end'); //instead of erroring the stream, end it
      });
});

gulp.task('autotest', function () {
    return gulp.watch(['App_Web/app/**/*.js', 'App_Web/components/**/*.js', 'App_Web/app/**/*.spec.js'], ['test']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
