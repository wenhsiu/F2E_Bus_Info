import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import NearestBusStopCard from './NearestBusStopCard';
import { AppContext } from '../../context/AppContext';

const useStyle = makeStyles((theme) =>
  createStyles({
    content: {
      margin: 0,
    },
  })
);

const SEARCH_BASE = 50;

const SearchContent = () => {
  const classes = useStyle();

  const { userLocation, GPSLoading, api } = useContext(AppContext);

  const [stopInfo, setStopInfo] = useState();
  const [stopInfoLoading, setStopInfoLoading] = useState(true);

  const fetchNearestBusStop = useCallback(
    async (count) => {
      try {
        const result = await api.location.getNearestBusStop({ ...userLocation, radius: count * SEARCH_BASE });
        if (!result) fetchNearestBusStop(count + 1);

        setStopInfo({ ...result, distance: count * SEARCH_BASE });
      } catch (err) {
      } finally {
        setStopInfoLoading(false);
      }
    },
    [api.location, userLocation]
  );

  useEffect(() => {
    if (GPSLoading) return;
    fetchNearestBusStop(1);
  }, [GPSLoading, fetchNearestBusStop, userLocation]);

  return (
    <Grid container spacing={2} className={classes.content}>
      <NearestBusStopCard stopInfo={stopInfo} stopInfoLoading={stopInfoLoading} />
    </Grid>
  );
};

export default SearchContent;
