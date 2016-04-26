M      = require 'm-require'      # gulp require time
_      = M.require 'underscore'
rename = M.require 'gulp-rename'
notify = M.require 'gulp-notify'


DEST = "./dest"
SRC = "./src"
CHANGED = "./__modified"

# ファイルタイプごとに無視するファイルなどを設定
paths =
    DEST:    "#{DEST}"
    SRC:     "#{SRC}"
    CHANGED: "#{CHANGED}"
    js: ["#{SRC}/**/*.coffee", "!#{SRC}/**/_**/*.coffee", "!#{SRC}/**/_*.coffee", "!./node_modules/**/*", "!./gulp/**/*", "!./gulpfile.coffee"]
    jsw: ["#{SRC}/**/*.coffee", "#{SRC}/views/_templates/*jade"                 , "!./node_modules/**/*", "!./gulp/**/*", "!./gulpfile.coffee"]
    jslib: ["#{SRC}/**/*.js"]
    css: ["#{SRC}/**/*.scss", "!#{SRC}/**/sprite*.styl", "!#{SRC}/**/_**/*.scss", "!#{SRC}/**/_*.scss"]
    cssw: ["#{SRC}/**/*.scss"]
    img: ["#{SRC}/**/*.{png, jpg, gif}", "!#{SRC}/**/sprite/**/*.png"]
    html: ["#{SRC}/**/*.jade", "!#{SRC}/**/_**/*.jade", "!#{SRC}/**/_*.jade"]
    htmlw: ["#{SRC}/**/*.jade"]
    sprite: "#{SRC}/**/sprite/**/*.png"

# Common function
handleErrors = (err) ->
  notify.onError(
    title: 'Gulp'
    subtitle: 'Failure!'
    message: 'Error: <%= error.message %>'
    sound: 'Glass') err
  @emit 'end'
  
expand = (ext)-> rename (path) -> _.tap path, (p) -> p.extname = ".#{ext}"
print = (filename) -> console.log(filename)

module.exports =
  paths: paths
  handleErrors: handleErrors
  expand: expand
  print: print
  