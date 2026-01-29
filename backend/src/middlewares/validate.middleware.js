module.exports = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            const formattedErrors = {};
            if (!error.issues) {
                return res.status(500).json({ message: "Unknown validation error" });
            }
            error.issues.forEach((err) => {
                const field = err.path[0];
                formattedErrors[field] = err.message;
            });
            return res.status(400).json({
                message: "Validation failed",
                // errors: error.issues,
                errors: formattedErrors,
            });
        }
    };
};