import { fireEvent, render } from '@testing-library/react';
import App, { LOGGED_IN_KEY } from './App';

jest.mock('./Login/components/Login', () => ({ onSuccess }) => <button onClick={onSuccess}>Login</button>);

beforeEach(() => {
  global.window.localStorage.removeItem(LOGGED_IN_KEY);
})

describe('App', () => {
  test('renders login form when unauthenticated and handles loggin in', () => {
    const { queryByText } = render(<App />);
    const login = queryByText('Login');

    expect(login).toBeTruthy();
    fireEvent.click(login);
    expect(queryByText('Logout')).toBeTruthy();
    expect(global.window.localStorage.getItem(LOGGED_IN_KEY)).toBe('1');
  });

  test('renders logout button when authenticated and handled logging out', () => {
    global.window.localStorage.setItem(LOGGED_IN_KEY, 1);
    const { queryByText } = render(<App />);
    const logout = queryByText('Logout');

    expect(logout).toBeTruthy();
    fireEvent.click(logout);
    expect(queryByText('Login')).toBeTruthy();
    expect(global.window.localStorage.getItem(LOGGED_IN_KEY)).toBe(null);
  });
})
