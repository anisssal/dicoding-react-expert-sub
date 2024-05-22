import PropTypes from 'prop-types';
import { Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import useStringInput from '../../hooks/useInput';
import OutlinedDiv from '../OutlinedDiv';

function NewThreadInput({ onThreadSubmitted, loading }) {
  const [title, setTitle] = useStringInput();
  const [category, setCategory] = useStringInput();
  const [body, setBody] = useState();
  const [errorTitle, setErrorTitle] = useState('');
  const [errorBody, setErrorBody] = useState('');

  function onBodyChange(event) {
    setBody(event.target.innerHTML);
  }
  function clearError() {
    setErrorTitle('');
    setErrorBody('');
  }

  function isInputValidated() {
    clearError();
    let hasError;
    if (!title) {
      setErrorTitle('Title is required!');
      hasError = true;
    }
    if (!body) {
      setErrorBody('Content is required!');
      hasError = true;
    }
    return !hasError;
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    if (!isInputValidated()) return;
    onThreadSubmitted({ title, body, category });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={3}>
        <TextField name="title" label="Title" value={title} onChange={setTitle} error={!!errorTitle} helperText={errorTitle} />
        <TextField name="category" label="Category" value={category} onChange={setCategory} />

        <OutlinedDiv label="Content" error={errorBody}>
          <div id="input-thread__body"  data-testid="new-thread-body-input" className="content-editable-input" onInput={onBodyChange} contentEditable data-placeholder="Input your content here" />
        </OutlinedDiv>

        <LoadingButton loading={loading} sx={{ mt: 4 }} fullWidth size="large" type="submit" variant="contained" color="primary">
          Post
        </LoadingButton>
      </Stack>
    </form>
  );
}

NewThreadInput.propTypes = {
  onThreadSubmitted: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NewThreadInput;
