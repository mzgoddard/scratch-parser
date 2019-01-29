let ajvSb3;

module.exports = {
    get sb3 () {
        if (process.env.NODE_ENV === 'production') {
            return require('../dist/sb3_schema');
        }

        var Ajv = require('ajv');
        var sb3Defs = require('./sb3_definitions.json');
        var sb3Schema = require('./sb3_schema.json');
        ajvSb3 = ajvSb3 || new Ajv().addSchema(sb3Defs);

        return ajvSb3.compile(sb3Schema);
    },

    get sprite3 () {
        if (process.env.NODE_ENV === 'production') {
            return require('../dist/sprite3_schema');
        }

        var Ajv = require('ajv');
        var sb3Defs = require('./sb3_definitions.json');
        var sprite3Schema = require('./sprite3_schema.json');
        ajvSb3 = ajvSb3 || new Ajv().addSchema(sb3Defs);

        return ajvSb3.compile(sprite3Schema);
    }
};
