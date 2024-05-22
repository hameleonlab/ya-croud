import gulp from "gulp";
import ghPages from 'gulp-gh-pages';

export const ghpages = () => {
  return gulp.src('./dist/**/*').pipe(ghPages());
};

gulp.task("ghpages", ghpages);
