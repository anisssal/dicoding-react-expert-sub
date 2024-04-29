import { Avatar, CardHeader, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import { DETAIL_THREAD_ROUTE } from '../../utils/route-name';
import { postedAt } from '../../utils/index';
import userShape from '../../data/types/user-shape';

export default function ThreadCardHeader({ id, user, title, createdAt }) {
  return (
    <CardHeader
      avatar={
        <Avatar
          aria-label="user-avatar"
          src={user?.avatar}
        />
      }
      title={
        <Link
          underline="hover"
          color="inherit"
          href={`${DETAIL_THREAD_ROUTE}/${id}`}
        >
          <Typography variant="subtitle2">{title}</Typography>
        </Link>
      }
      subheader={
        <Typography
          variant="caption"
          dangerouslySetInnerHTML={{
            __html: `By ${user?.name} &#x2022; ${postedAt(createdAt)}`,
          }}
        />
      }
    />
  );
}

ThreadCardHeader.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
