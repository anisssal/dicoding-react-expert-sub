import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

const borderColor = '#b2b2b2';
const errorBorderColor = '#d32f2f';
const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100% !important',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: '0.25em',
    width: 'fit-content',
    height: '2em',
    margin: '-1em 0.5em 0em 0.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1.4375em',
    fontFamily: 'Roboto',
  },
  childrenContainer: {
    padding: '1px 14px',
  },
  errorTextStyle: {
    color: '#d32f2f',
    lineHeight: 1.5,
    fontSize: '0.75rem',
    fontFamily: 'Roboto',
    fontWeight: 400,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '3px',
    marginRight: '14px',
    marginBottom: 0,
    marginLeft: '14px',
  },
};

export default function OutlinedDiv({ children, label, error }) {
  return (
    <Stack spacing={0.2} direction="column" width="100%" sx={{ mb: 1.5 }}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          borderLeft: `1px solid ${error ? errorBorderColor : borderColor}`,
          borderBottom: `1px solid ${error ? errorBorderColor : borderColor}`,
          borderRight: `1px solid ${error ? errorBorderColor : borderColor}`,
          borderRadius: '5px',
        }}
      >
        <div style={styles.header}>
          <div
            style={{
              borderTop: `1px solid ${error ? errorBorderColor : borderColor}`,
              width: '1em',
              borderTopLeftRadius: '5px',
            }}
          />
          {label && (
            <div style={styles.headerTitle}>
              {label && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: error ? errorBorderColor : '#637381',
                  }}
                >
                  {label}
                </span>
              )}
            </div>
          )}
          <div
            style={{
              borderTop: `1px solid ${error ? errorBorderColor : borderColor}`,
              width: '1em',
              flexGrow: 2,
              borderTopRightRadius: '5px',
            }}
          />
        </div>
        <div style={styles.childrenContainer}>{children}</div>
      </Box>
      {!!error && (
        <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained" style={styles.errorTextStyle}>
          {error}
        </p>
      )}
    </Stack>
  );
}

OutlinedDiv.defaultProps = {
  error: null,
};

OutlinedDiv.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};
