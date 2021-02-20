import { login } from './LoginApi';

const originalFetch = global.window.fetch;
let fetch;

beforeAll(() => {
  fetch = global.window.fetch = jest.fn();
});

afterAll(() => {
  global.window.fetch = originalFetch;
})

describe('LoginApi', () => {
  test('send POST request to /login resource and successful response', async () => {
    fetch.mockImplementation(() => {
      return {
        json: () => null,
        ok: true,
      };
    });
    const credentials = { email: 'email@valid.pl', password: 'Password1' };
    const result = await login(credentials);
    expect(fetch).toBeCalledWith('/login', {
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
    expect(result).toBe(null);
  });

  test('send /login request with wrong credentials', async () => {
    fetch.mockImplementation(() => {
      return {
        json: () => ['error'],
        ok: false,
      };
    });
    const credentials = { email: 'wrong@email.pl', password: 'WrongPassword1' };
    const result = await login(credentials);
    expect(result).toEqual({ errors: ['error'] });
  });
})
