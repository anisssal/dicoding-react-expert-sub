import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import {act} from "react-dom/test-utils";
import RegisterInput from "./RegisterInput";

expect.extend(matchers);

describe('RegisterInput Component ', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);

    const nameInput = await screen.getByPlaceholderText('Name');
    // Action
    await userEvent.type(nameInput, 'anis');
    // Assert
    expect(nameInput).toHaveValue('anis');
  });
  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);

    const emailInput = await screen.getByPlaceholderText('Email');
    // Action
    await userEvent.type(emailInput, 'anis@gmail.com');
    // Assert
    expect(emailInput).toHaveValue('anis@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);

    const passwordInput = await screen.getByPlaceholderText('Password');
    // Action
    await userEvent.type(passwordInput, 'password');
    // Assert
    expect(passwordInput).toHaveValue('password');
  })

  it('should handle confirm password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);

    const cPasswordInput = await screen.getByPlaceholderText('Confirmation Password');
    // Action
    await userEvent.type(cPasswordInput, 'password');
    // Assert
    expect(cPasswordInput).toHaveValue('password');
  });

  it('should showing error msg when button login clicked without any input', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);

    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    act(() => {
      registerButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    const nameErrorText = await screen.getByText('Name is required!');
    const emailErrorText = await screen.getByText('Email is required!');
    const passwordErrorText = await screen.getByText('Password is required!');
    const cPasswordErrorText = await screen.getByText('Confirm password is required!');

    // Assert
    expect(nameErrorText).toBeVisible()
    expect(emailErrorText).toBeVisible()
    expect(passwordErrorText).toBeVisible()
    expect(cPasswordErrorText).toBeVisible()

  });

  it('should showing error msg when email is not valid', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    // Action
    await userEvent.type(emailInput, 'anis@');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    act(() => {
      registerButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    const emailErrorText = await screen.getByText('Email is not valid');
    // Assert
    expect(emailErrorText).toBeVisible()
  })


  it('should showing error msg when password input less than 6 char', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);
    const passInput = await screen.getByPlaceholderText('Password');
    // Action
    await userEvent.type(passInput, 'pass');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    act(() => {
      registerButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    const errorText = await screen.getByText('Password must be more than 6 character!');
    // Assert
    expect(errorText).toBeVisible()
  })

  it('should showing error msg when confirm password does not match password', async () => {
    // Arrange
    render(<RegisterInput onRegisterSubmitted={() => {}} loading={false} />);
    const passInput = await screen.getByPlaceholderText('Password');
    const cPassInput = await screen.getByPlaceholderText('Confirmation Password');

    // Action
    await userEvent.type(passInput, 'password');
    await userEvent.type(cPassInput, 'pass212');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    act(() => {
      registerButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    const errorText = await screen.getByText('Confirm Password and password must be same!');
    // Assert
    expect(errorText).toBeVisible()
  })

  it('should call onRegisterSubmitted function when login button is clicked and inputs valid', async () => {
    // Arrange
    const mockReg = vi.fn();
    render(<RegisterInput onRegisterSubmitted={mockReg} loading={false} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'anis');

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'anis@gmail.com');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password');

    const cPasswordInput = await screen.getByPlaceholderText('Confirmation Password');
    await userEvent.type(cPasswordInput, 'password');

    const btn = await screen.getByRole('button', { name: 'Register' });

    // Action
    act(() => {
      btn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });

    // Assert
    expect(mockReg).toBeCalledWith({
      name: 'anis',
      email: 'anis@gmail.com',
      password: 'password',
    });
  })


  it('should show loading on button when loading arg is true', async () => {
    const {container} = render(<RegisterInput onRegisterSubmitted={()=>{}} loading />);
    const loadingClassEl = container.querySelector(".MuiLoadingButton-loadingIndicator");
    expect(loadingClassEl).toBeVisible()
  })

});
