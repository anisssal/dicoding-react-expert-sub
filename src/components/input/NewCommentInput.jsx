import { Box, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import OutlinedDiv from '../OutlinedDiv';
import loading from '../Loading.jsx';

export default function NewCommentInput({
  isLoading,
  onCommentSubmitted,
  inputId,
}) {
  const [newComment, setNewComment] = useState('');
  const [showBtnGroup, setShowBtnGroup] = useState(false);

  function onCommentChange(event) {
    setNewComment(event.target.innerHTML);
    setShowBtnGroup(true);
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    onCommentSubmitted(newComment);
  }

  function onCancelClick() {
    setShowBtnGroup(false);
    const inputEl = document.getElementById(inputId);
    inputEl.innerHTML = '';
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack direction="column" alignItems="flex-end">
        <OutlinedDiv label="Comment">
          <Box
            id={inputId}
            className="contentEditableInput"
            onInput={(e) => onCommentChange(e)}
            contentEditable
            data-placeholder="Add a comment..."
          />
        </OutlinedDiv>
        {showBtnGroup && (
          <Stack direction="row">
            <Button
              variant="text"
              onClick={() => onCancelClick()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              disabled={newComment.length === 0}
              loading={isLoading}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </LoadingButton>
          </Stack>
        )}
      </Stack>
    </form>
  );
}
NewCommentInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onCommentSubmitted: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
};
