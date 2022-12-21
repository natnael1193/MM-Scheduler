import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 100, height: 40, ...sx }}>
    <img
      src="https://i0.wp.com/addishomefinder.com/wp-content/uploads/2019/09/cropped-Addis-Home-Finder-logo-scaled-middle.png?fit=128%2C70&ssl=1"
      loading="lazy"
      alt="logo"
      style={{ width: '200px', height: '50px' }}
    />
  </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
