import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import HomePage from './pages/HomePage';
import MyAppBar from './components/appbar/AppBar';
import { asyncPreloadProcess } from './store/common/common_action';
import LoginPage from './pages/LoginPage';
import { signOut } from './store/auth/auth_slice';
import BackdropLoader from './components/BackdropLoader';
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import {HOME_ROUTE, LOGIN_ROUTE, NEW_THREAD_ROUTE, REGISTER_ROUTE} from "./utils/route-name";
import NewThreadPage from "./pages/NewThreadPage";

function App() {
  const { authUser } = useSelector((states) => states.auth);
  const { isPreload, globalLoading } = useSelector((states) => states.common);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);


  const onSignOut = () => {
    dispatch(signOut());
  };

  if (isPreload) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <BackdropLoader loading={globalLoading} />
      <MyAppBar user={authUser} onSignOut={onSignOut} />
      <Box
        component="main"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100%"
      >
        <Toolbar />
        <Box flex={1}>
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            <Route path={NEW_THREAD_ROUTE} element={<NewThreadPage />} />
            <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
