import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { theme } from './style/createTheme';
import LandingPage from './components/LandingPage';
import ApiClient from './services/api';
import { useTranslation } from 'react-i18next';
import SearchPage from './components/SearchPage';

const BusInfo = () => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState({});
  const [GPSLoading, setGPSLoading] = useState(true);

  const api = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const fetchUserCity = async (position) => {
      let cityInfo = {};
      try {
        cityInfo = await api.location.getUserCity(position);
      } catch (err) {}

      return cityInfo;
    };

    if (!('geolocation' in navigator)) {
      alert(t('#common.noGPS'));
      setGPSLoading(false);
      return;
    }

    const id = navigator.geolocation.getCurrentPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const cityInfo = await fetchUserCity(location);

      setUserLocation({
        ...location,
        ...cityInfo,
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
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default BusInfo;
