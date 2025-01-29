const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);
    res.json({
        msg: "Error Occured",
        error: err
    })
}

module.exports = {
    errorHandlerMiddleware
}