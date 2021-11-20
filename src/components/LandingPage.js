import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import Button from './common/Button';
import Chip from './common/Chip';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as SpotIcon } from '../assets/spot_icon_white.svg';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: theme.colors.blackPearl,
      height: '100vh',
      margin: 0,
    },
    startButton: {
      lineHeight: '44px',
      width: 306,
    },
    spotIcon: {
      color: theme.colors.white,
    },
  })
);

const LandingPage = () => {
  const classes = useStyle();
  const { userLocation, GPSLoading } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Grid
      item
      container
      className={classes.container}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Logo />
      </Grid>
      <Grid item container justifyContent="center" spacing={1}>
        <Grid item>
          <SpotIcon className={classes.spotIcon} />
        </Grid>
        <Grid item>
          <Typography color="textSecondary">{t('#landingPage.location')}</Typography>
        </Grid>
        <Grid item>
          {GPSLoading ? <CircularProgress color="secondary" size={26} /> : <Chip label={userLocation.city} />}
        </Grid>
      </Grid>
      <Grid item>
        <Button className={classes.startButton} label={t('#landingPage.start')} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
