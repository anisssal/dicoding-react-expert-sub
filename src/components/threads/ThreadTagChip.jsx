import { Icon } from '@iconify/react';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';

export default function ThreadTagChip({ category }) {
  return <Chip icon={<Icon icon="mdi:tag" />} label={category} />;
}

ThreadTagChip.propTypes = {
  category: PropTypes.string.isRequired,
};
