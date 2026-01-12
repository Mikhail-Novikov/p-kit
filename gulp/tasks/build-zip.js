import gulp from 'gulp';
import zip from 'gulp-zip';
import { rmSync } from 'node:fs';
import config from '../../config.js';

const cleanZip = (done) => {
  rmSync('build/*.zip', {
    force: true,
    recursive: true,
  });
  done();
};

const buildZip = () => {
  const projectName = config.projectName;
  const zipFileName = `${projectName}-${new Date().toISOString().slice(0, 10)}.zip`;

  return gulp
    .src('build/**/*', { base: 'build' })
    .pipe(zip(zipFileName))
    .pipe(gulp.dest('build'));
};

export const archive = gulp.series(cleanZip, buildZip);
