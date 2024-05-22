export const paths = {
  src: {
    html: "src/templates/*.html",
    scss: "src/scss/*.scss",
    js: "src/js/*.js",
    img: "src/img/**/*.+(png|jpg|jpeg|gif|svg|webp|ico|xml|webmanifest)",
    fonts: "src/fonts/*.+(woff|woff2|ttf)",
    svg: "src/svg/*.svg",
    misc: "src/misc/**/*",
  },
  build: {
    html: "dist",
    css: "dist/css",
    js: "dist/js",
    img: "dist/img",
    fonts: "dist/fonts",
    misc: "dist",
  },
  watch: {
    all: "dist",
    html: "src/templates/**/*.html",
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
    img: "src/img/**/*.+(png|jpg|jpeg|gif|svg|webp|ico|xml|webmanifest)",
    fonts: "src/fonts/*.+(woff|woff2|ttf)",
    svg: "src/svg/*.svg",
    misc: "src/misc/**/*",
  },
};
