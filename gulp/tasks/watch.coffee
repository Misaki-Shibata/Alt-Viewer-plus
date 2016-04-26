config    = require '../config'
paths     = config.paths 

M         = require 'm-require'                    # gulp require time
gulp      = M.require 'gulp'
watch     = M.require 'gulp-watch'

gulp.task 'watch', ->
  watch paths.jsw,   -> gulp.start ['coffee']
  # watch paths.jsw,   -> gulp.start ['browserify']
  # watch paths.cssw,  -> gulp.start ['sass']
  # watch paths.htmlw, -> gulp.start ['jade']
