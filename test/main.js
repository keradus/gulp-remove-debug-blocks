'use strict';

var removeDebugBlocksPlugin = require('../');
var fs = require('fs');
var should = require('should');
var File = require('vinyl');
require('mocha');

describe('gulp-remove-debug-blocks', function() {
    describe('removeDebugBlocksPlugin()', function() {
        it('should remove debug blocks', function(done) {
            var file = new File({
                path: 'test/fixtures/test.js',
                cwd: 'test/',
                base: 'test/fixtures',
                contents: fs.readFileSync('test/fixtures/test.js')
            });

            var stream = removeDebugBlocksPlugin();
            stream.on('data', function(newFile) {
                should.exist(newFile);
                should.exist(newFile.contents);
                String(newFile.contents).should.equal(fs.readFileSync('test/expected/test.js', 'utf8'));
                done();
            });

            stream.write(file);
            stream.end();
        });
    });
});
