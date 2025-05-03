import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  Link,
} from '@mui/material';
import NavBar from '../components/navBar';
import { IconButton, Tooltip } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood'; // for independent=true
import GppBadIcon from '@mui/icons-material/GppBad';   // for independent=false


const CountryDetailsPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country:', error);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading || !country) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
        <NavBar/>
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, maxWidth: 1100, width: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
    <Tooltip title={country.independent ? 'Independent Country' : 'Not Independent'}>
      <IconButton sx={{ color: country.independent ? 'green' : 'red' }}>
        {country.independent ? <GppGoodIcon /> : <GppBadIcon />}
        {country.independent ? "Independent" : "Not Independent"}
      </IconButton>
    </Tooltip>
  </Box>

        {/* Top Section */}
        <Grid container spacing={4}>
          {/* Flag */}
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <img
                src={country.flags?.png}
                alt={`${country.name.common} flag`}
                style={{
                  maxWidth: '100%',
                  borderRadius: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              />
            </Box>
          </Grid>

          {/* Country Info */}
          <Grid item xs={12} md={8}>
            <Typography variant="h2" gutterBottom>
              {country.name.common}
            </Typography>
            <Info label="Official Name" value={country.name.official} />
            <Info label="Capital" value={country.capital?.[0] || 'N/A'} />
            <Info label="Region" value={`${country.region} / ${country.subregion}`} />
            <Info label="Population" value={country.population.toLocaleString()} />
            <Info label="Area" value={`${country.area.toLocaleString()} km²`} />
            <Info label="Start of Week" value={country.startOfWeek} />
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* Flag Description */}
        {country.flags?.alt && (
          <Box mb={3}>
            <Typography variant="h4" gutterBottom>
              Flag Description
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>{country.flags.alt}</Typography>
          </Box>
        )}

        {/* Bottom Section: Languages + Maps */}
        <Grid container spacing={4}>
          {/* Languages */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Languages
            </Typography>
            <Box>
              {country.languages ? (
                Object.values(country.languages).map((lang, i) => (
                  <Typography key={i} variant="body2" sx={{ fontSize: '1rem'}}>
                    • {lang}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">N/A</Typography>
              )}
            </Box>
          </Grid>

          {/* Map Links */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Map Links
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem'}}>
              Google Maps:{' '}
              <Link href={country.maps.googleMaps} target="_blank" rel="noopener">
                View on Google Maps
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.1rem'}}>
              OpenStreetMap:{' '}
              <Link href={country.maps.openStreetMaps} target="_blank" rel="noopener">
                View on OpenStreetMap
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    </Box>
  );
};

const Info = ({ label, value }) => (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: '1.1rem'}}>
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );
  

export default CountryDetailsPage;
