class ErrorHanlder {
  responseError = (response, error) => {
    return response.status(400).json(error);
  };

  hasError = (item) => item.hasOwnProperty('error');

  mountError = (message) => ({
    error: message,
  });
}
export default new ErrorHanlder();
