config       = require '../config'
paths        = config.paths
# expand       = config.expand
# handleErrors = config.handleErrors

M         = require 'm-require'                   # gulp require time
_         = M.require 'underscore'
gulp      = M.require 'gulp'
# jade      = M.require 'gulp-jade'
# rename    = M.require 'gulp-rename'
plumber   = M.require 'gulp-plumber'
imagemin  = M.require 'gulp-imagemin'
pngcrush  = M.require 'imagemin-pngcrush'
pngquant  = M.require 'imagemin-pngquant'


gulp.task "imagemin", ->
  gulp.src paths.img
  .pipe imagemin use: [pngcrush(), pngquant()] # これでも 端末毎のカラープロファイルによって違いが出る。画像がある。
  # .pipe imagemin use: [pngcrush({reduce: true}), pngquant({quality: 80-100, speed: 1})] ←これでも荒くなる
  # .pipe imagemin use: [pngcrush({reduce: true})]
  # .pipe imagemin use: [pngquant({quality: 80-100, speed: 1})]
  .pipe gulp.dest paths.DEST