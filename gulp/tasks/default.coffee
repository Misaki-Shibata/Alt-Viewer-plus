gulp        = require 'gulp'
#browserSync = require 'browser-sync'
# runSequence = require 'run-sequence'

#gulp.task 'default', ->
  #runSequence(
  #['title', 'sass', 'browserify', 'jade', 'watch']
    #['sass', 'browserify', 'copy'],
    #'deploy',
    #'browser-sync',
    #'watch'
  #)
# gulp.task 'default', ['title', 'sass', 'browserify', 'jade', 'watch']
gulp.task 'default', ['coffee', 'watch']
gulp.task "sprite", ['sprite']
gulp.task "imagemin", ['imagemin']