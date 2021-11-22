import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Card, List, ListItem, ListItemText, Divider, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';

const useStyle = makeStyles((theme) =>
  createStyles({
    content: {
      padding: 8,
    },
    container: {
      margin: 0,
    },
    card: {
      border: `2px solid ${theme.colors.goldenYellow}`,
      backgroundColor: theme.colors.solitude,
      padding: theme.spacing(1, 2),
      marginRight: theme.spacing(1),
    },
    list: {
      width: 324,
    },
    text: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  })
);

const formatBusList = (passedBus, estimateTime) => {
  return passedBus.map((bus, index) => ({
    destinationStopName: {
      en: bus.DestinationStopNameEn,
      zh_TW: bus.DestinationStopNameZh,
    },
    departureStopName: {
      en: bus.DepartureStopNameEn,
      zh_TW: bus.DepartureStopNameZh,
    },
    routeId: bus.RouteID,
    estimateTime: Math.ceil(estimateTime[index].EstimateTime / 60),
    routeName: { zh_TW: bus.RouteName.Zh_tw, en: bus.RouteName.En },
  }));
};

const NearestBusStopBusList = ({ stopInfo, stopInfoLoading }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { api, userLocation, GPSLoading } = useContext(AppContext);

  const [busList, setBusList] = useState([]);

  useEffect(() => {
    const fetchBusList = async () => {
      try {
        const passedBus = await api.bus.getStopBusList(userLocation.City, stopInfo.StationID);
        const estimateTime = await api.bus.getStopBusEstimateTime(userLocation.City, stopInfo.StationID);

        setBusList(formatBusList(passedBus, estimateTime));
      } catch (err) {}
    };

    if (stopInfoLoading || GPSLoading) return;
    if (!stopInfo.StationID || !userLocation.City) return;

    fetchBusList();
  }, [GPSLoading, api.bus, stopInfo, stopInfoLoading, userLocation.City]);

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
      <List component="nav" className={classes.list}>
        {busList.map((bus) => {
          return (
            <React.Fragment key={bus.routeId}>
              <ListItem button>
                <ListItemIcon>
                  <Card variant="outlined" className={classes.card}>
                    {t('#searchPage.estimateTime', { min: bus.estimateTime })}
                  </Card>
                </ListItemIcon>
                <ListItemText>
                  <Typography>{bus.routeName[language]}</Typography>
                  <Typography className={classes.text}>{bus.destinationStopName[language]}</Typography>
                </ListItemText>
              </ListItem>
              <Divider variant="middle" />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
};

NearestBusStopBusList.propTypes = {
  busInfo: PropTypes.object,
  busInfoLoading: PropTypes.bool,
};

export default NearestBusStopBusList;
