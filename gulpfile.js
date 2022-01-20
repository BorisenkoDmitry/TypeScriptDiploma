const {src, dest, series, watch, parallel} = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const pug = require('gulp-pug');
const clean = require('gulp-clean');
const cleanCss = require("gulp-clean-css");
const browser = require("browser-sync").create();
const img = require("gulp-image");
const svg = require("gulp-svg-sprite");
const webpp = require('gulp-webp');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify-es').default;
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const script = () => {
  return src([
    './src/js/**.js'
  ])
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(concat('app.js'))

    .pipe(dest('dist/js'))
    .pipe(browser.stream())
}
const script2 = () => {
    return src(['./src/js/components/**/*.js'])
    // .pipe(babel({presets: ['@babel/env']}))
    // .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('dist/js/plugins'))
    .pipe(browser.stream())
}

const styles = () => {
    return src('src/scss/style.scss')

    .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
    // .pipe(concat('style.css'))
    // .pipe(autoprefixer({
    //     cascade: false,
    // }))
    // .pipe(cleanCss({
    //     level: 2
    // }))
    .pipe(gcmq())
    .pipe(dest('./dist/css'))
    .pipe(browser.stream())
}
const fonts = () => {
    return src('./src/fonts/woff/*')
    .pipe(dest('./dist/fonts'))
}
const fontsWoff = () => {
    return src('./src/fonts/ttf/*')
      .pipe(fonter({
 
          formats: ['woff']
        }))
      .pipe(dest('./dist/fonts'))
  };
  const fontsWoff2 = () =>  {
    return src('./src/fonts/ttf/*')
      .pipe(ttf2woff2())
      .pipe(dest('./dist/fonts'));
  };

const cleaner = () => {
    return src('./dist/')
    .pipe(clean());
}

const svgSprite = () => {
    return src('src/svg/**.svg')
    .pipe(svg({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/img'))
}
const svgCopy = () => {
    return src('src/svg/files/*.svg')
    .pipe(dest('dist/img'))
}
const image = () => {
    return src('src/img/jpg/*')
    .pipe(img())
    .pipe(dest('dist/img'));
}
const webP = () => {
    return src('src/img/webp/*')
    .pipe(webpp())
    .pipe(dest('dist/img'));
}
const watchFiles = () => {
    browser.init({
        server: {
            baseDir: "./dist"
        }
    });
}
const html = () => {
    return src("src/index.pug")
    .pipe(pug({pretty: true}))
    .pipe(dest("./dist/"))
    .pipe(browser.stream())
}
watch("src/**/*.pug", html);
watch("src/**/*.scss", styles);
watch("src/svg/*.svg", svgSprite);
watch("src/svg/files/*.svg", svgCopy);
watch("src/img/jpg/*", image);
watch("src/img/webp/*", webP);
watch("src/fonts/ttf/*", fontsWoff)
watch("src/fonts/ttf/*", fontsWoff2)
watch("src/js/**.js", script)
watch('./src/js/components/**/*.js', script2)

watch("src/fonts/woff/*", fonts)



exports.default = series(cleaner, parallel(styles, html, image, webP,svgSprite, svgCopy, fontsWoff, fontsWoff2, fonts, script, script2), watchFiles)