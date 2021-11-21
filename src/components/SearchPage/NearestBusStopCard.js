import React from 'react';
import { Grid, Typography, CircularProgress, Card } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Button from '../common/Button';
import { ReactComponent as BusStopIcon } from '../../assets/bus_stop_icon.svg';
import { ReactComponent as DistanceIcon } from '../../assets/distance_icon.svg';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const useStyle = makeStyles((theme) =>
  createStyles({
    content: {
      margin: 0,
    },
    container: {
      margin: 0,
    },
    card: {
      width: 324,
      padding: '16px 12px 16px 26px',
      backgroundColor: theme.colors.blackPearl,
    },
    loading: {
      textAlign: 'center',
    },
    cardText: {
      fontSize: 12,
    },
    button: {
      minHeight: 48,
      width: 152,
    },
  })
);

const NearestBusStopCard = ({ stopInfo, stopInfoLoading }) => {
  const classes = useStyle();
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
        <Card className={classes.card}>
          {stopInfoLoading ? (
            <Grid className={classes.loading}>
              <CircularProgress color="secondary" />
            </Grid>
          ) : (
            <Grid container alignItems="flex-end" spacing={2}>
              <Grid item sm={12} xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <BusStopIcon />
                  </Grid>
                  <Grid item>
                    <Typography color="textSecondary" className={classes.cardText}>
                      {t('#searchPage.nearStop')}
                    </Typography>
                  </Grid>
                </Grid>
                {stopInfo && <Typography color="textSecondary">{stopInfo.StopName}</Typography>}
              </Grid>
              <Grid item xs>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <DistanceIcon />
                  </Grid>
                  <Grid item>
                    <Typography color="textSecondary" className={classes.cardText}>
                      {t('#searchPage.distance')}
                    </Typography>
                  </Grid>
                </Grid>
                {stopInfo && (
                  <Typography color="textSecondary">
                    {t('#searchPage.numMeters', { num: stopInfo.distance })}
                  </Typography>
                )}
              </Grid>
              <Grid item xs>
                <Button label={t('#searchPage.viewSights')} className={classes.button} />
              </Grid>
            </Grid>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

NearestBusStopCard.propTypes = {
  busInfo: PropTypes.object,
  busInfoLoading: PropTypes.bool,
};

export default NearestBusStopCard;
