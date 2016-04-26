config       = require '../config'
paths        = config.paths
expand       = config.expand
handleErrors = config.handleErrors

M         = require 'm-require'                   # gulp require time
_         = M.require 'underscore'
gulp      = M.require 'gulp'
jade      = M.require 'gulp-jade'
rename    = M.require 'gulp-rename'
plumber   = M.require 'gulp-plumber'

gulp.task "jade", ->
  # gulp.src paths.html # とりあえず.jadeをコンパイルする場合
  gulp.src "./src/index.jade"
  .pipe(plumber(errorHandler: handleErrors))
  .pipe jade pretty: true
  .pipe expand "html"
  .pipe gulp.dest paths.DEST
  .pipe gulp.dest paths.CHANGED

