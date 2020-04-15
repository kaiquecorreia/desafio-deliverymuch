import ErrorHandler from '../../../src/app/error/ErrorHandler';
import httpMocks from 'node-mocks-http';

describe('Errors', () => {
  it('should return error response', () => {
    const response = httpMocks.createResponse();
    const error = { error: 'Test error' };
    const responseError = ErrorHandler.responseError(response, error);

    const data = JSON.parse(responseError._getData());
    expect(responseError.statusCode).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Test error');
  });

  it('should verify is has error property', () => {
    const withError = { error: 'Test' };
    const withoutError = 'Teste';

    const resultWithError = ErrorHandler.hasError(withError);
    expect(resultWithError).toBeTruthy();

    const resultWithoutError = ErrorHandler.hasError(withoutError);
    expect(resultWithoutError).toBeFalsy();
  });

  it('should return error with message', () => {
    const message = 'Test';
    const mountedError = ErrorHandler.mountError(message);
    expect(mountedError).toHaveProperty('error');
    expect(mountedError.error).toBe('Test');
  });
});
