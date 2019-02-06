var pify = require('pify');

var unpack = pify(require('./lib/unpack'));
var parse = pify(require('./lib/parse'));
var validate = pify(require('./lib/validate'));

/**
  * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
  * will return a valid Scratch project object with appended metadata.
  * @param {Buffer | string} input    Buffer or string representing project
  * @param {boolean}         isSprite Whether this is a sprite (true) or whole project (false)
  * @param {Function}        callback Returns error or project data
  */
module.exports = function (input, isSprite, callback) {
    // Unpack the input and further transform the json portion by parsing and
    // validating it.
    var toUnpack = unpack(input, isSprite);
    /* global Promise */
    Promise.all([
        toUnpack
            .then(function (unpackedProject) {
                return unpackedProject[0];
            })
            .then(parse)
            // TODO is there a better way to pass this arg than partially
            // applying this function?
            .then(validate.bind(null, isSprite)),
        toUnpack
            .then(function (unpackedProject) {
                return unpackedProject[1];
            })
    ])
        .then(callback.bind(null, null), callback);
};
