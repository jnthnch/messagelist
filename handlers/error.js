function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Sorry, something went wrong."
    }
  });
}

module.exports = errorHandler;
