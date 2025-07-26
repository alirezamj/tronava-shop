import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg}));
        return res.status(400).json({
            message: 'validation failed',
            errors: extractedErrors
        });
    }
    next();
};

export default validateRequest;