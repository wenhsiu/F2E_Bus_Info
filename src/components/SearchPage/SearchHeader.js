import React, { useContext } from 'react';
import { Grid, Typography, CircularProgress, Input } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Chip from '../common/Chip';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as SpotIcon } from '../../assets/spot_icon.svg';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

const useStyle = makeStyles((theme) =>
  createStyles({
    header: {
      backgroundColor: theme.colors.blackPearl,
      margin: 0,
    },
    container: {
      margin: 0,
    },
    logo: {
      height: 40,
    },
    spotIcon: {
      margin: theme.spacing(1.5),
    },
    input: {
      borderRadius: 28,
      backgroundColor: theme.colors.solitude,
      height: 48,
      width: 314,
    },
  })
);

const SearchHeader = () => {
  const classes = useStyle();
  const { userLocation, GPSLoading } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} className={classes.header}>
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
          <Logo className={classes.logo} />
        </Grid>
        <Grid item container justifyContent="center" spacing={1}>
          <Grid item>
            <Typography color="textSecondary">{t('#searchPage.currentCity')}</Typography>
          </Grid>
          <Grid item>
            {GPSLoading ? <CircularProgress color="secondary" size={26} /> : <Chip label={userLocation.CityName} />}
          </Grid>
        </Grid>
        <Grid item>
          <Input
            startAdornment={<SpotIcon className={classes.spotIcon} />}
            className={classes.input}
            disableUnderline={true}
            placeholder={t('#searchPage.enterBusNum', { city: userLocation.CityName })}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchHeader;
