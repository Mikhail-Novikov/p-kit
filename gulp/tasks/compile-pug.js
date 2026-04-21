/* global */
import gulp from 'gulp';
import data from 'gulp-data';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import prettyHtml from 'gulp-pretty-html';
import pug from 'gulp-pug';
import { readFileSync } from 'node:fs';
import { PrettyHtmlConfig } from '../configs.js';
import { isDevelopment } from '../utils.js';
import { getClassesToBlocksList } from './get-blocks-from-html.js';

export const compilePug = () =>
  gulp
    .src(['src/pages/**/*.pug', '!src/pages/**/layout{,s}/**/*.pug'])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'PUG',
          message: 'Error: <%= error.message %>',
        }),
      }),
    )
    .pipe(
      data(() => {
        const dataJson = JSON.parse(
          readFileSync('./src/data/data.json', 'utf8'),
        );
        let cssFile = 'styles.css';
        if (!isDevelopment) {
          try {
            const manifest = JSON.parse(
              readFileSync('build/css/css-rev-manifest.json', 'utf8'),
            );
            cssFile = manifest['styles.css'] || cssFile;
          } catch (e) {}
        }
        return { ...dataJson, cssFile };
      }),
    )
    .pipe(pug())
    .pipe(getClassesToBlocksList())
    .pipe(prettyHtml(PrettyHtmlConfig))
    .pipe(gulp.dest('build'));
