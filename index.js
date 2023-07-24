var through     = require('through2'),
    rework      = require('rework'),
    isPresent = require('is-present'),
    hasClassSelector = require('has-class-selector');

function classPrefix(prefix, options) {
  options = options || {};
  var ignored = options.ignored;
  var insertInMiddle = options.insertInMiddle;

  function insertPrefixInMidle(selector, prefix){
    let arrayOfSelectors = selector.split(" ");
    arrayOfSelectors.splice(1, 0, prefix);
    return arrayOfSelectors.join(" ")
  }

  return function prefixRules(styling) {
    styling.rules.forEach(function(rule) {

      if (rule.rules) {
        return prefixRules(rule);
      }

      if (!rule.selectors) return rule;

      rule.selectors = rule.selectors.map(function(selector) {
        var shouldIgnore = false;

        if (hasClassSelector(selector)) {
          // Ensure that the selector doesn't match the ignored list
          if(ignored && ignored.length > 0) {
            for(let i=0; i<ignored.length; i++) {
              if(selector.startsWith(ignored[i])) {
                return selector;
              }
            }
          }

          if(insertInMiddle && insertInMiddle.length > 0) {
            for(let i=0; i<insertInMiddle.length; i++) {
              if(selector.startsWith(insertInMiddle[i])) {
                return insertPrefixInMidle(selector, prefix);
              }
            }
          }

          return prefix+" "+selector;
        } else {
          return selector;
        }
      });
    });
  };
};

module.exports = function(prefix, options) {
  options = options || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (!file.isBuffer()) {
      cb();
    }

    var src = file.contents.toString();
    var css = rework(src, { source: file.path })
        .use(classPrefix(prefix, options)).toString({ sourcemap: true });

    file.contents = new Buffer(css);
    cb(null, file);
  });
};
