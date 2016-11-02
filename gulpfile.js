/**
 * Created by Administrator on 2016/11/2.
 */
/*任务*/
/*1. less编译 压缩 合并*/
/*2. js合并 压缩 混淆*/
/*3. image的复制*/
/*4. html的压缩*/

//载入gulp
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');

//1. less编译 压缩 合并
gulp.task('style', function () {
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
//2. js合并concat  压缩混淆uglify
gulp.task('script', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//3. 图片复制
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

var htmlmin=require('gulp-htmlmin');
//4. html 的压缩
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//启动一个服务器
var browserSync = require('browser-sync');
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['dist']
        }
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/js/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});


