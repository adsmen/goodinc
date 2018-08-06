"use strict";


const gulp = require("gulp"), 
    sass = require("gulp-sass"), 
    pug = require("gulp-pug");



const srcPath = {
    templates:{
        src: "./src/views/**/*.pug", 
        dist: "./dist"
    }, 
    styles:{
        src: "./src/assets/styles/**/*.scss",
        dist: "./dist/assets/styles"
    }
}

gulp.task('default', gulp.series(
    gulp.parallel(styles,templates), 
    gulp.parallel(watch)
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

exports.styles = styles;
exports.templates = templates;