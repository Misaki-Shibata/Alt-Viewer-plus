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
browserify = M.require 'browserify'

gulp.task 'browserify', ->
  bundler = (options) ->
    transform (filename) ->
      b = browserify _.extend options, {}

      # watch
      b.add filename

      # transform
      b.transform 'coffeeify'
      b.transform 'jadeify'
      b.transform 'stylify'
      b.transform 'debowerify'

      # events
      b.on 'bundle', print.bind null, 'BUNDLE ' + filename
      b.on 'error', -> console.log "error"
      b.on 'log', -> console.log arguments
      b.on 'update', ->
        console.log "asdasd"
        bundle()

      b.bundle()

  bundle = ->
    gulp.src paths.js
    .pipe(plumber(errorHandler: handleErrors))
    .pipe bundler extensions: ['.coffee']
    .pipe expand "js"
    #.pipe uglify()
    .pipe gulp.dest paths.DEST
    .pipe gulp.dest paths.CHANGED

  bundle()
