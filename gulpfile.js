/**
 * Created by Administrator on 2016/11/2.
 */
/*����*/
/*1. less���� ѹ�� �ϲ�*/
/*2. js�ϲ� ѹ�� ����*/
/*3. image�ĸ���*/
/*4. html��ѹ��*/

//����gulp
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');

//1. less���� ѹ�� �ϲ�
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
//2. js�ϲ�concat  ѹ������uglify
gulp.task('script', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//3. ͼƬ����
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

var htmlmin=require('gulp-htmlmin');
//4. html ��ѹ��
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//����һ��������
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


