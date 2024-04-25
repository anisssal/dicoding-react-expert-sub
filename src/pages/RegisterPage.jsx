import { Card, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '../utils/route-name';
import RegisterInput from '../components/input/RegisterInput';
import { toastSuccess } from '../utils/toast';
import {registerUser} from "../store/auth/auth_action";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerSuccess } = useSelector(
    (states) => states.auth
  );

  async function onRegister({ name, email, password }) {
    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (!registerSuccess) return;
    navigate(LOGIN_ROUTE);
    toastSuccess('Register success, please login!');
  }, [registerSuccess, navigate]);

  return (
    <section>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, margin: 1 }}
      >
        <Card
          sx={{
            p: 5,
            margin: 10,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack spacing={2}>
            <h2>Register New User</h2>
            <RegisterInput
              onRegisterSubmitted={({ name, email, password }) =>
                onRegister({ name, email, password })
              }
              loading={registerLoading}
            />
            <p>
              Already have an account?
              <Link href={LOGIN_ROUTE} underline="none">
                Login
              </Link>
            </p>
          </Stack>
        </Card>
      </Stack>
    </section>
  );
}

export default RegisterPage;
