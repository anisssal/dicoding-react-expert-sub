import PropTypes from 'prop-types';

import { InputAdornment, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import useStringInput from '../../hooks/useInput';
import { validateEmail } from '../../utils/utils';

function RegisterInput({ onRegisterSubmitted, loading }) {
  const [name, setName] = useStringInput();
  const [email, setEmail] = useStringInput();
  const [password, setPassword] = useStringInput();
  const [confirmPassword, setConfirmPassword] = useStringInput();

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPass, setErrorConfirmPass] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function clearError() {
    setErrorName('');
    setErrorPassword('');
    setErrorConfirmPass('');
    setErrorEmail('');
  }

  function isInputValidated() {
    clearError();
    let hasError;
    if (!name) {
      setErrorName('Name is required!');
      hasError = true;
    }
    if (!email) {
      setErrorEmail('Email is required!');
      hasError = true;
    }
    if (email && !validateEmail(email)) {
      setErrorEmail('Email is not valid');
      hasError = true;
    }
    if (!password) {
      setErrorPassword('Password is required!');
      hasError = true;
    }
    if (!confirmPassword) {
      setErrorConfirmPass('Confirm password is required!');
      hasError = true;
    }

    if (password && password.length < 6) {
      setErrorPassword('Password must be more than 6 character!');
      hasError = true;
    }
    if (password && confirmPassword && confirmPassword !== password) {
      setErrorConfirmPass('Confirm Password and password must be same!');
      hasError = true;
    }
    return !hasError;
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    if (!isInputValidated()) return;
    onRegisterSubmitted({ name, email, password });
  }

  return (
    <form className="register-form-input" onSubmit={onSubmitHandler}>
      <Stack spacing={3} sx={{ mt: 2 }}>
        <TextField name="name" label="Name" value={name} onChange={setName} error={!!errorName} helperText={errorName} />
        <TextField name="email" label="Email" value={email} onChange={setEmail} error={!!errorEmail} helperText={errorEmail} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          error={!!errorPassword}
          helperText={errorPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirm-password"
          label="Confirmation Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={!!errorConfirmPass}
          helperText={errorConfirmPass}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton loading={loading} sx={{ mt: 4 }} fullWidth size="large" type="submit" variant="contained" color="primary">
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegisterSubmitted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RegisterInput;
