# gulp-dynamic-class-container

Gulp plugin to dynamically add parent/container class to generated CSS.

## Installation

```
npm install --save gulp-dynamic-class-container
```

### Using the `insertInMiddle` option:

```js
var gulp        = require('gulp'),
    classPrefix = require('gulp-dynamic-class-container');

gulp.task('prefix', function() {
  return gulp.src('my-file.css')
  .pipe(classPrefix('.containerClass', {insertInMiddle:["body", "html"]}))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['prefix']);
```

## License

MIT

## Acknowledgements

Gulp wrapper for <https://github.com/johnotander/rework-class-prefix>.
Original implementation with some limited capability <https://github.com/johno/gulp-class-prefix>.

Crafted with <3 by Primoz Skerbis
