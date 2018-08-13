"use strict";


const gulp = require("gulp"), 
    sass = require("gulp-sass"), 
    pug = require("gulp-pug"), 
    browserSync = require('browser-sync').create();


const reload = browserSync.reload;


const srcPath = {
    templates:{
        src: "./src/views/**/*.pug", 
        dist: "./dist"
    }, 
    styles:{
        src: "./src/assets/styles/**/*.scss",
        dist: "./dist/assets/styles"
    }, 
    images:{
        src: "./src/assets/images/**",
        dist: "./dist/assets/images"
    },
    root : "./dist"

}

gulp.task('default', gulp.series(
    gulp.parallel(styles,templates,copyImage), 
    gulp.parallel(watch, server)
));


function watch(){
    gulp.watch(srcPath.styles.src,styles);
    gulp.watch(srcPath.templates.src, templates);
}


function styles(){
    return gulp.src(srcPath.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(srcPath.styles.dist));
}

function templates(){
    return gulp.src(srcPath.templates.src)
        .pipe(pug())
        .pipe(gulp.dest(srcPath.templates.dist));
}

function server() {
    browserSync.init({
        server: srcPath.root
    });
    browserSync.watch(srcPath.root + '/**/*.*', browserSync.reload);
}

function copyImage(){
    return gulp.src(srcPath.images.src)
        .pipe(gulp.dest(srcPath.images.dist));
}

exports.styles = styles;
exports.templates = templates;
exports.copyImage = copyImage;