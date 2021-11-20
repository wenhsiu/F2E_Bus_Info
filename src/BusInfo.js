import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { theme } from './style/createTheme';
import LandingPage from './components/LandingPage';
import ApiClient from './services/api';
import { useTranslation } from 'react-i18next';

const BusInfo = () => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState({});
  const [GPSLoading, setGPSLoading] = useState(true);

  const api = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const fetchUserCity = async (position) => {
      let city = '';
      try {
        city = await api.location.getUserCity(position);
      } catch (err) {}

      return city;
    };

    if (!('geolocation' in navigator)) {
      alert(t('#common.noGPS'));
      setGPSLoading(false);
      return;
    }

    const id = navigator.geolocation.watchPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const city = await fetchUserCity(location);

      setUserLocation({
        ...location,
        city,
      });
      setGPSLoading(false);
    });

    return () => navigator.geolocation.clearWatch(id);
  }, [api.location, t]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={{ api, userLocation, GPSLoading }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default BusInfo;
