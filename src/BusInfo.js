import React, { useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { theme } from './style/createTheme';
import LandingPage from './components/LandingPage';
import ApiClient from './services/api';

const BusInfo = () => {
  const [userLocation, setUserLocation] = useState({});

  const api = useMemo(() => new ApiClient(), []);

  useEffect(() => {
    const fetchUserCity = async (position) => {
      let city = '';
      try {
        city = await api.location.getUserCity(position);
      } catch (err) {}

      return city;
    };

    if (!('geolocation' in navigator)) alert('你的裝置或瀏覽器不支援定位功能');

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
    });

    return () => navigator.geolocation.clearWatch(id);
  }, [api.location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={{ api, userLocation }}>
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
