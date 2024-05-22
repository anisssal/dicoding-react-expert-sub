import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { act } from 'react-dom/test-utils';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput Component ', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput onLoginSubmitted={() => {}} loading={false} />);

    const emailInput = await screen.getByPlaceholderText('Email');
    // Action
    await userEvent.type(emailInput, 'anis@gmail.com');
    // Assert
    expect(emailInput).toHaveValue('anis@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput onLoginSubmitted={() => {}} loading={false} />);

    const passwordInput = await screen.getByPlaceholderText('Password');
    // Action
    await userEvent.type(passwordInput, 'password');
    // Assert
    expect(passwordInput).toHaveValue('password');
  });

  it('should showing error msg when button login clicked without input', async () => {
    // Arrange
    render(<LoginInput onLoginSubmitted={() => {}} loading={false} />);

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    act(() => {
      loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const emailErrorText = await screen.getByText('Email is required!');
    const passwordErrorText = await screen.getByText('Password is required!');
    // Assert
    expect(emailErrorText).toBeVisible()
    expect(passwordErrorText).toBeVisible()

  });

  it('should showing error msg when email is not valid', async () => {
    // Arrange
    render(<LoginInput onLoginSubmitted={() => {}} loading={false} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    // Action
    await userEvent.type(emailInput, 'anis@');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    act(() => {
      loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const emailErrorText = await screen.getByText('Email not valid!');
    // Assert
    expect(emailErrorText).toBeVisible()
  })


  it('should call onLoginSubmitted function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput onLoginSubmitted={mockLogin} loading={false} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'anis@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    act(() => {
      loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });


    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'anis@gmail.com',
      password: 'password',
    });
  })


  it('should show loading on button when loading arg is true', async () => {
    const {container} = render(<LoginInput onLoginSubmitted={()=>{}} loading />);
    const loadingClassEl = container.querySelector(".MuiLoadingButton-loadingIndicator");
    expect(loadingClassEl).toBeVisible()
  })

});
