'use strict';

var through = require('through2');

module.exports = function() {
    return through.obj(function(file, enc, callback) {
        if (file.isBuffer()) {
            file.contents = new Buffer(
                String(file.contents).replace(/\/\*\s*debug:start\s*\*\/[\s\S]*?\/\*\s*debug:stop\s*\*\//g, "")
            );
        }

        return callback(null, file);
    });
};
