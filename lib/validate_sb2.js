let ajvSb2;

module.exports = {
    get sb2 () {
        if (process.env.NODE_ENV === 'production') {
            return require('../dist/sb2_schema');
        }

        var Ajv = require('ajv');
        var sb2Defs = require('./sb2_definitions.json');
        var sb2Schema = require('./sb2_schema.json');
        ajvSb2 = ajvSb2 || new Ajv().addSchema(sb2Defs);

        return ajvSb2.compile(sb2Schema);
    },

    get sprite2 () {
        if (process.env.NODE_ENV === 'production') {
            return require('../dist/sprite2_schema');
        }

        var Ajv = require('ajv');
        var sb2Defs = require('./sb2_definitions.json');
        var sprite2Schema = require('./sprite2_schema.json');
        ajvSb2 = ajvSb2 || new Ajv().addSchema(sb2Defs);

        return ajvSb2.compile(sprite2Schema);
    }
};
