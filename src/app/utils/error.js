export const responseError = (response, error) => {
  return response.status(400).json({ error });
};

export const verifyError = (item) => item.hasOwnProperty('error');

export const mountError = (message) => ({
  error: message,
});
