M         = require 'm-require'                    # gulp require time
gulp      = M.require 'gulp'
gt        = M.require 'gulp-title'
gulpTitle = require('../../package.json').name

gulp.task 'title', ->
  aryTitle = [
    gulpTitle
    'Doom'
    'bright_green'
  ]
  gtFnc = ->

  gt = new gt
  gt.go aryTitle, gtFnc
  return
