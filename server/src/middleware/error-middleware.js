export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKENED ERROR"
    const extraDetails = err.extraDetails || "Error from Backened"
1

    return res.status(status).json({message, extraDetails});
} 