import { Avatar, Box, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OutlinedDiv from '../OutlinedDiv';
import userShape from '../../data/types/user-shape';
import { LOGIN_ROUTE } from '../../utils/route-name';

const inputCommentId = 'input-comment';

export default function NewCommentInput({ authUser, onCommentSubmitted }) {
  const [newComment, setNewComment] = useState('');
  const [showBtnGroup, setShowBtnGroup] = useState(false);
  const navigate = useNavigate();
  const { postCommentSuccess, postCommentLoading: isLoading } = useSelector((states) => states.detailThread);

  useEffect(() => {
    if (postCommentSuccess) {
      setShowBtnGroup(false);
      const inputEl = document.getElementById(inputCommentId);
      inputEl.innerHTML = '';
    }
  }, [postCommentSuccess]);

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
    const inputEl = document.getElementById(inputCommentId);
    inputEl.innerHTML = '';
  }

  if (!authUser) {
    return (
      <Button variant="outlined" sx={{ mx: '16px' }} onClick={() => navigate(LOGIN_ROUTE)}>
        Sign in to give a comment
      </Button>
    );
  }
  return (
    <Stack direction="row" spacing={1} sx={{ pl: '16px', pr: '16px', mt: '16px,' }}>
      <Avatar aria-label="user-avatar" src={authUser?.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={onSubmitHandler}>
          <Stack direction="column" alignItems="flex-end">
            <OutlinedDiv label="Comment">
              <Box id={inputCommentId} className="content-editable-input" onInput={(e) => onCommentChange(e)} contentEditable data-placeholder="Add a comment..." />
            </OutlinedDiv>
            {showBtnGroup && (
              <Stack direction="row">
                <Button variant="text" onClick={() => onCancelClick()} disabled={isLoading}>
                  Cancel
                </Button>
                <LoadingButton disabled={newComment.length === 0} loading={isLoading} size="large" type="submit" variant="contained" color="primary">
                  Submit
                </LoadingButton>
              </Stack>
            )}
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
NewCommentInput.propTypes = {
  authUser: PropTypes.shape(userShape),
  onCommentSubmitted: PropTypes.func.isRequired,
};

NewCommentInput.defaultProps = {
  authUser : null
}
