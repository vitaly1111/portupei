const { pipe }=require('stdout-stream')
const sprite=require('svg-sprite')

const { src,dest,watch,parallel,series }=require('gulp'),

	scss=require('gulp-sass')(require('sass')),

	concat=require('gulp-concat'),
	browserSync=require('browser-sync').create(),
	uglify=require('gulp-uglify-es').default,
	imagemin=require('gulp-imagemin'),
	del=require('del'),
	notify=require('gulp-notify'),
	sourcemaps=require('gulp-sourcemaps'),
	cleanCSS=require('gulp-clean-css'),
	fileInclude=require('gulp-file-include'),
	svgSprite=require('gulp-svg-sprite'),
	tt2woff=require('gulp-ttf2woff'),
	tt2woff2=require('gulp-ttf2woff2'),
	webpack=require('webpack'),
	webpackStream=require('webpack-stream'),
	tinypng=require('gulp-tinypng-compress')
autoprefixer=require('gulp-autoprefixer');

function styles() {
	return src(['app/scss/**/*.scss',
		'app/vendor/normalize/normalize.css'])
		.pipe(sourcemaps.init())
		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("style.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/css'))

		.pipe(browserSync.stream())
}

/* function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
} */

function images() {
	return src('app/images/**/*')
		.pipe(imagemin(
			[
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75,progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true },
						{ cleanupIDs: false }
					]
				})
			]
		)
		)
		.pipe(dest('dist/images'))
}

function fonts() {
	src('app/fonts/*.ttf')
		.pipe(tt2woff())
		.pipe(dest('app/fonts/'))
	return src('app/fonts/*.ttf')
		.pipe(tt2woff2())
		.pipe(dest('app/fonts/'))
}

function svgSprites() {

	return src('app/images/**/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('app'))
}


function htmlInclude() {
	return src('app/index.html')
		.pipe(fileInclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src('app/js/main.js')
		.pipe(webpackStream({
			output: {
				filename: 'main.js'
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			}
		}))
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error',notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())

}

function stylesBuild() {
	return src('app/scss/**/*.scss')

		.pipe(scss(
			{
				outputStyle: 'compressed'
			}
		).on('error',notify.onError("Error: <%= error.message %>")))
		.pipe(concat("style.min.css"))

		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))

		.pipe(dest('dist/css'))
}

function scriptsBuild() {
	return src('app/js/main.js')
		.pipe(webpackStream({
			output: {
				filename: 'main.js'
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env']
							}
						}
					}
				]
			}
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify().on('error',notify.onError()))
		.pipe(dest('dist/js/'))
}


function tinypngf() {
	return src(['app/images/**/*.{png,jpg,jpeg}'])
		.pipe(tinypng({
			key: 'bCyZdt2Xc2mQLhbZKDW0JjMr9xxcFdJ7',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(dest('dist/images'));
}


function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.html'
	],{ base: 'app' })
		.pipe(dest('dist'))

}
function watching() {
	watch('app/index.html').on('change',htmlInclude);
	watch('app/scss/**/*.scss',styles);
	watch(['app/js/**/*.js','!app/js/main.min.js'],scripts);
	watch('app/images/**/*.svg',svgSprites)
	watch('app/fonts/*.ttf',fonts)

}
function browsersync() {

	browserSync.init({
		server: {
			baseDir: "app/"
		}

	})
}

function clean() {
	return del('dist/*')
}

exports.styles=styles;
exports.watching=watching;
exports.browsersync=browsersync;
exports.scripts=scripts;
exports.images=images;
exports.svgSprites=svgSprites;
exports.fileInclude=htmlInclude;
exports.tinypngf=tinypngf;



exports.build=series(clean,images,build);
exports.default=parallel(htmlInclude,scripts,fonts,styles,browsersync,watching)