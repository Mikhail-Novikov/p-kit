import browsersync from 'browser-sync';
import gulp from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import gulpIf from 'gulp-if';
import rev from 'gulp-rev';
import gulpSass from 'gulp-sass';
import lightningcss from 'postcss-lightningcss';
import * as dartSass from 'sass';
import { isDevelopment } from '../utils.js';

const sass = gulpSass(dartSass);

export const compileSass = () =>
  gulp
    .src('src/styles/styles.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'SASS',
          message: 'Error: <%= error.message %>',
        }),
      }),
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        lightningcss({
          lightningcssOptions: {
            minify: !isDevelopment,
          },
        }),
      ]),
    )
    .pipe(gulpIf(!isDevelopment, rev()))
    .pipe(gulp.dest('build/css'))
    .pipe(gulpIf(!isDevelopment, rev.manifest('css-rev-manifest.json', { merge: true })))
    .pipe(gulpIf(!isDevelopment, gulp.dest('build/css')))
    .pipe(browsersync.stream());

export const compileUiKitSass = () =>
  gulp
    .src(['src/styles/ui-kit.scss'])
    .pipe(
      plumber({
        errorHandler: notify.onError('SASS Error: <%= error.message %>'),
      }),
    )
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browsersync.stream());
