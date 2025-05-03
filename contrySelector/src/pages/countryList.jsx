import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Card, CardContent, CardMedia, Typography,Checkbox,FormControlLabel,Button,InputAdornment } from '@mui/material';
import NavBar from '../components/navBar';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';



const CountryPage = () => {
    console.log("comes");
    
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]); // To store filtered countries after region selection
  const [filterRegion, setFilterRegion] = useState('');
  const [filterIndependent, setFilterIndependent] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      let url = '';
      let needsClientSideRegionFilter = false;
      let needsClientSideQueryFilter = false;
  
      // Decide the base URL depending on filters
      if (filterIndependent) {
        url = 'https://restcountries.com/v3.1/independent?status=true';
        if (filterRegion && query) {
          needsClientSideRegionFilter = true;
          needsClientSideQueryFilter = true;
        } else if (filterRegion) {
          needsClientSideRegionFilter = true;
        } else if (query) {
          needsClientSideQueryFilter = true;
        }
      } else if (query) {
        url = `https://restcountries.com/v3.1/name/${query}`;
        if (filterRegion) {
          needsClientSideRegionFilter = true;
        }
      } else if (filterRegion) {
        url = `https://restcountries.com/v3.1/region/${filterRegion}`;
      } else {
        url = 'https://restcountries.com/v3.1/all';
      }
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (!Array.isArray(data)) {
          setFilteredCountries([]);
          return;
        }
  
        let results = data;
  
        // Apply region filter manually if needed
        if (needsClientSideRegionFilter) {
          results = results.filter((country) => country.region === filterRegion);
        }
  
        // Apply query filter manually if needed
        if (needsClientSideQueryFilter) {
          results = results.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
        }
  
        setFilteredCountries(results);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setFilteredCountries([]);
      }
    };
  
    const debounceTimeout = setTimeout(() => {
      fetchCountries();
    }, 400);
  
    return () => clearTimeout(debounceTimeout);
  }, [query, filterRegion, filterIndependent]);
  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(new Set(storedFavorites));
  }, []);
  
  const handleRegionChange = (event) => {
    setFilterRegion(event.target.value); // Set region filter
  };
  const handleCardClick = (countryName) => {
    console.log("clicked",countryName);
    
    navigate(`/countryDetailsPage/${countryName}`); // Navigate to the country details page
  };

  const toggleFavorite = (countryName) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(countryName)) {
      updatedFavorites.delete(countryName);
    } else {
      updatedFavorites.add(countryName);
    }
  
    setFavorites(updatedFavorites);
    // Save to localStorage as an array
    localStorage.setItem('favorites', JSON.stringify(Array.from(updatedFavorites)));
  };
  
  
  return (
    <Box sx={{  backgroundColor: 'rgba(0, 90, 187, 0.31)' }}>
      <NavBar />
      
      {/* Search and Filter Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, pt: 5 }}>
      <TextField
  label="Search Country"
  variant="filled"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  sx={{
    width: '80%',
    '& .MuiFilledInput-root': {
      borderRadius: '15px',
      backgroundColor: '#fff',
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#fff',
    },
  }}
  InputProps={{
    endAdornment: query && (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setQuery('')}
          edge="end"
          size="small"
          sx={{ visibility: query ? 'visible' : 'hidden' }}
        >
          <CancelIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>


       

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <FormControl variant="filled" sx={{ width: '23%' }}>
          <InputLabel id="region-label">Filter by Region</InputLabel>
          <Select
            labelId="region-label"
            id="region-select"
            value={filterRegion}
            onChange={handleRegionChange}
            label="Filter by Region"
            sx={{
              borderRadius: '15px',
              backgroundColor: '#fff',
              '& .MuiSelect-select': {
                borderRadius: '15px',
              },
              '&.Mui-focused .MuiSelect-select': {
                backgroundColor: '#fff',
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
            <MenuItem value="Antarctic">Antarctic</MenuItem>

          </Select>
        </FormControl>

        <FormControlLabel
            control={
                <Checkbox
                checked={filterIndependent}
                onChange={(e) => setFilterIndependent(e.target.checked)}
                sx={{ color: 'black','& .MuiSvgIcon-root': { fontSize: 28 }}}
                />
            }
            label="Independent Only"
            sx={{ color: 'black', ml: 2 ,'& .MuiFormControlLabel-label': {
      fontSize: '1.25rem', // Adjust label font size
      fontWeight: 500,    // Optional: make it bolder
    },}}
        />
        <FormControlLabel
            control={
                <Checkbox
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                sx={{ color: 'black','& .MuiSvgIcon-root': { fontSize: 28 }}}
                fontSize='Large'
                />
            }
            label="Show Favorites Only"
            sx={{ color: 'black', ml: 2 ,'& .MuiFormControlLabel-label': {
      fontSize: '1.25rem', // Adjust label font size
      fontWeight: 500,    // Optional: make it bolder
    },}}
        />
        <Button
            variant="contained"
            color="secondary"
            onClick={() => {
                setQuery('');
                setFilterRegion('');
                setFilterIndependent(false);
                setShowFavoritesOnly(false);
            }}
            sx={{ ml: 2, borderRadius: '15px', height: '56px' }}
            >
            Clear Filters
        </Button>


      </Box>

      {/* Display results */}
      {filteredCountries.filter((country) => {
        if (!showFavoritesOnly) return true;
        return favorites.has(country.name.common);
        }).length === 0 ? (

        <Typography variant="h6" align="center" color="white" sx={{ mt: 6 }}>
          No countries found.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
          {filteredCountries
        .filter((country) => {
            if (!showFavoritesOnly) return true;
            return favorites.has(country.name.common);
        })
        .map((country, index) => (

            <Grid item key={index}>
              <Card
                sx={{
                  width: 280,
                  minHeight: 320,
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  position: 'relative', // allow absolute positioning inside
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onClick={() => handleCardClick(country.ccn3)}
              >
                <IconButton
  aria-label={`toggle favorite for ${country.name.common.toLowerCase()}`}
  onClick={(e) => {
    e.stopPropagation(); // prevent triggering card click
    toggleFavorite(country.name.common);
  }}
  sx={{
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: favorites.has(country.name.common) ? 'red' : 'grey',
  }}
>
  {favorites.has(country.name.common)
    ? <FavoriteIcon fontSize="large" />
    : <FavoriteBorderIcon fontSize="large" />
  }
</IconButton>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flags?.png}
                  alt={`${country.name.common} flag`}
                  sx={{ objectFit: 'cover', borderRadius: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
                  <Typography variant="body2"><strong>Population:</strong> {country.population.toLocaleString()}</Typography>
                  <Typography variant="body2"><strong>Region:</strong> {country.region}</Typography>
                  <Typography variant="body2">
                    <strong>Languages:</strong>{' '}
                    {country.languages
                      ? (() => {
                          const langs = Object.values(country.languages);
                          const displayed = langs.slice(0, 3).join(', ');
                          const suffix = langs.length > 3 ? '...' : '';
                          return displayed + suffix;
                        })()
                      : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CountryPage;
