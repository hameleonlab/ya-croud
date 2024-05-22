import gulp from "gulp";
import browserSync from "browser-sync";
import { paths } from "./paths.js";
import rename from "gulp-rename";
import GulpUglify from "gulp-uglify";
import babel from "gulp-babel";
import gulpInclude from "gulp-include";
import webpack from 'webpack-stream';

export const scriptsDev = () => {
  return gulp
    .src(paths.src.js)
    .pipe(webpack())
    .pipe(gulpInclude())
    .pipe(gulp.dest(paths.build.js))
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(gulp.dest(paths.build.js))
    .pipe(browserSync.stream());
};

gulp.task("scriptsDev", scriptsDev);

export const scriptsProd = () => {
  return gulp
    .src(paths.src.js)
    .pipe(webpack())
    .pipe(gulpInclude())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest(paths.build.js))
    .pipe(GulpUglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(gulp.dest(paths.build.js));
};

gulp.task("scriptsProd", scriptsProd);
