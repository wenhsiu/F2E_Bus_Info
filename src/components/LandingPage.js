import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import Button from './common/Button';
import Chip from './common/Chip';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as SpotIcon } from '../assets/spot_icon_white.svg';
import { AppContext } from '../context/AppContext';

const useStyle = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: theme.colors.blackPearl,
      height: '100vh',
      margin: 0,
    },
    searchButton: {
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
  const { userLocation } = useContext(AppContext);

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
          <Typography color="textSecondary">你目前定位於</Typography>
        </Grid>
        <Grid item>
          <Chip label={userLocation.city} />
        </Grid>
      </Grid>
      <Grid item>
        <Button className={classes.searchButton} label="開始探索！" />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
