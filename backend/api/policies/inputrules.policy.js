const { Validator } = require('node-input-validator')

const ValidateInput = async (req_body, rule) => {
    const v = await new Validator(req_body, rule).check()
    return v
}

module.exports = ValidateInput;