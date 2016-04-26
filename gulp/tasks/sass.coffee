config       = require '../config'
paths        = config.paths
expand       = config.expand
handleErrors = config.handleErrors

M         = require 'm-require'                    # gulp require time
gulp      = M.require 'gulp'
plumber   = M.require 'gulp-plumber'
sass      = M.require 'gulp-sass'
sourcemaps= M.require 'gulp-sourcemaps'
transform = M.require 'vinyl-transform'
rename    = M.require 'gulp-rename'


gulp.task "sass", ->
  gulp.src paths.css
  .pipe(plumber(errorHandler: handleErrors))
  # expanded
  .pipe sourcemaps.init()
    .pipe(sass({outputStyle: "expanded" }))
  .pipe(sourcemaps.write()).on('error', handleErrors)
  .pipe gulp.dest paths.DEST
  # minify
  .pipe(sass({outputStyle: "compact"}))
  .pipe(rename((path)->
    path.basename += '.min'
  ))
  .pipe gulp.dest paths.DEST
