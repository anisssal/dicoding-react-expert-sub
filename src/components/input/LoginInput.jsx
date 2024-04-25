import PropTypes from 'prop-types';
import { InputAdornment, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { validateEmail } from '../../utils/utils';
import useStringInput from '../../hooks/useInput';

function LoginInput({ onLoginSubmitted, loading }) {
  const [email, setEmail] = useStringInput();
  const [password, setPassword] = useStringInput();
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function clearError() {
    setErrorPassword('');
    setErrorEmail('');
  }

  function isInputValidated() {
    clearError();
    let hasError;
    if (!email) {
      setErrorEmail('Email is required!');
      hasError = true;
    }
    if (email && !validateEmail(email)) {
      setErrorEmail('Email not valid!');
      hasError = true;
    }
    if (!password) {
      setErrorPassword('Password is required!');
      hasError = true;
    }
    return !hasError;
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    if (!isInputValidated()) return;
    onLoginSubmitted({ email, password });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={setEmail}
          error={!!errorEmail}
          helperText={errorEmail}
        />
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
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          loading={loading}
          sx={{ mt: 4 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
}

LoginInput.propTypes = {
  onLoginSubmitted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginInput;
