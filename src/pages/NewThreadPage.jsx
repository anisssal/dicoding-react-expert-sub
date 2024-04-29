import { Box, Card, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '../components/fragments/NewThreadInput';
import {asyncPostThread} from "../store/threads/action";
import {resetPostThread} from "../store/threads/threads_slice";

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postThreadLoading , postThreadSuccess } = useSelector((states) => states.threads);

  function onSubmitThread({ title, body, category }) {
    dispatch(asyncPostThread({ title, body, category }))
  }

  useEffect(() => {
    dispatch(resetPostThread())
  }, [dispatch]);


  useEffect(() => {
    if (postThreadSuccess) navigate('/');
  }, [postThreadSuccess, navigate]);


  return (
    <Box>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1, margin: 1 }}
      >
        <Card sx={{ p: 5, margin: 10, width: 1, maxWidth: '50%' }}>
          <Stack spacing={2}>
            <h2>Create new thread</h2>
            <NewThreadInput
              onThreadSubmitted={({ title, category, body }) => {
                onSubmitThread({ title, category, body });
              }}
              loading={postThreadLoading}
            />
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default NewThreadPage;
