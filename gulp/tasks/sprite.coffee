config       = require '../config'
paths        = config.paths
expand       = config.expand
handleErrors = config.handleErrors
notify       = config.notify

M         = require 'm-require' # gulp require time
_         = M.require 'underscore'
gulp      = M.require 'gulp'
jade      = M.require 'gulp-jade'
rename    = M.require 'gulp-rename'
plumber   = M.require 'gulp-plumber'
spritesmith  = M.require 'gulp.spritesmith'
mediaqueries = M.require 'gulp-combine-media-queries'

# http://blog.e-riverstyle.com/2014/02/gulpspritesmithcss-spritegulp.html
gulp.task "sprite", ->
  a = gulp.src paths.sprite
    .pipe(plumber(errorHandler: handleErrors))
    .pipe spritesmith
      imgName: 'images/sprite.png'
      cssName: 'css/_helpers/sprite.scss'
      imgPath: '../images/sprite.png'
      algorithm: 'binary-tree'
      cssFormat: 'scss'
      padding: 2

  a.img.pipe gulp.dest paths.SRC
  a.img.pipe gulp.dest paths.DEST
  a.css.pipe gulp.dest paths.SRC

