import { Box, Card, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/fragments/LoginInput';
import { REGISTER_ROUTE } from '../utils/route-name';
import { loginUser } from '../store/auth/auth_action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginLoading, loginSuccess } = useSelector((states) => states.auth);

  function onLogin({ email, password }) {
    dispatch(loginUser({ email, password }));
  }

  useEffect(() => {
    if (loginSuccess) navigate('/');
  }, [loginSuccess, navigate]);

  return (
    <Box>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, margin: 1 }}
      >
        <Card sx={{ p: 5, margin: 10, width: 1, maxWidth: 420 }}>
          <Stack spacing={2}>
            <h2>Login</h2>

            <LoginInput
              onLoginSubmitted={({ email, password }) => {
                onLogin({ email, password });
              }}
              loading={loginLoading}
            />

            <p>
              Don&apos;t have an account?
              <Link href={REGISTER_ROUTE} underline="none" >
                Register
              </Link>
            </p>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default LoginPage;
