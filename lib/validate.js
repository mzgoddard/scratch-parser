var validateSb2 = require('./validate_sb2');
var validateSb3 = require('./validate_sb3');

module.exports = function (isSprite, input, callback) {
    if (isSprite ? input.spriteInfo : input.info) {
        var isValidSb2 = (isSprite ? validateSb2.sprite2 : validateSb2.sb2)(input);

        if (isValidSb2) {
            input.projectVersion = 2;
            return callback(null, input);
        }
    }

    var isValidSb3 = (isSprite ? validateSb3.sprite3 : validateSb3.sb3)(input);
    if (isValidSb3) {
        input.projectVersion = 3;
        return callback(null, input);
    }

    var validationErrors = {
        validationError: 'Could not parse as a valid SB2 or SB3 project.',
        sb2Errors: validateSb2.errors,
        sb3Errors: validateSb3.errors
    };

    callback(validationErrors);
};
