// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// types
import { ThemeMode } from 'types/config';
import { FormattedMessage } from 'react-intl';

// Asset
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


// ==============================|| PROFILE MENU - UPGRADE PLAN CARD ||============================== //

const WalletCard = () => {
  const theme = useTheme();

  const cardSX = {
    content: '""',
    position: 'absolute',
    width: 200,
    height: 200,
    borderColor: '#0782C6'
  };

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.light,
        my: 2,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          border: '19px solid ',
          borderRadius: '50%',
          top: '65px',
          right: '-150px',
          ...cardSX
        },
        '&:before': {
          border: '3px solid ',
          borderRadius: '50%',
          top: '145px',
          right: '-70px',
          ...cardSX
        }
      }}
    >
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Stack direction={"row"} spacing={20} alignItems="center">
              <Typography variant="h4">Số dư khả dụng</Typography>
              <Tooltip title="Lịch sử giao dịch" placement="top">
                <IconButton size="small" onClick={() => { }} sx={{
                  border: '2px solid #0782C6',
                  borderRadius: '10%',
                  padding: '0.5px',
                  zIndex: 10  
                }}>
                  <ArrowOutwardIcon color="primary" sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <FormattedMessage id="$499" />
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle2"
              color={theme.palette.mode === ThemeMode.DARK ? 'textSecondary' : 'grey.900'}
              sx={{ opacity: theme.palette.mode === ThemeMode.DARK ? 1 : 0.6 }}
            >
              70% discount for 1 years <br />
              subscriptions.
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row">
              <AnimateButton>
                <Link sx={{ textDecoration: 'none' }} href="https://links.codedthemes.com/hsqll" target="_blank">
                  <Button variant="contained" sx={{ boxShadow: 'none', bgcolor: "#0782C6" }}>
                    Nạp thêm
                  </Button>
                </Link>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
