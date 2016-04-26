config       = require '../config'
paths        = config.paths
print        = config.print
expand       = config.expand
handleErrors = config.handleErrors

M          = require 'm-require'                    # gulp require time
_          = M.require 'underscore'
gulp       = M.require 'gulp'
rename     = M.require 'gulp-rename'
plumber    = M.require 'gulp-plumber'
transform  = M.require 'vinyl-transform'
coffee     = M.require 'gulp-coffee'

gulp.task 'coffee', ->
  gulp.src paths.js
    .pipe coffee()
    .pipe gulp.dest paths.DEST