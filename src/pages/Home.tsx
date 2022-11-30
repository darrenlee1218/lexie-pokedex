import React, { ChangeEvent } from 'react';
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import PokemonCard from '../components/PokemonCard';
import PokemonTypeIcon from '../components/PokemonTypeIcon';
import { Field, usePokemonContext, PokemonType } from '../components/Contexts/PokemonProvider';
import { Search, FavoriteBorder, Favorite, Close } from '@mui/icons-material';

const Home: React.FC = () => {
  const {
    pokemon,
    query,
    search,
    favourites,
    addFavourite,
    removeFavourite,
    filters,
    addFilter,
    removeFilter,
    types,
    setTypes,
  } = usePokemonContext();

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    search(event.target.value);
  }

  const handleToggleFavourites = () => {
    if (filters[Field.favourite]) {
      removeFilter(Field.favourite);
    } else {
      addFilter(Field.favourite, true);
    }
  };

  const onSelectChange = (e: SelectChangeEvent<string[]>) => {
    const value = e?.target?.value;
    if (!Array.isArray(value)) return;
    if (value[0] === 'none') value.shift();
    setTypes(value as PokemonType[]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1">
        What Pokemon <br />
        are you looking for?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          pt: 4,
          pb: 2,
        }}
      >
        <TextField
          id="pokemon-search"
          placeholder="Search Pokemon"
          variant="outlined"
          value={query}
          onChange={handleQueryChange}
          InputProps={{
            sx: { pr: 0 },
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => search('')}>
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          startIcon={filters[Field.favourite] ? <Favorite /> : <FavoriteBorder />}
          color={filters[Field.favourite] ? 'primary' : 'secondary'}
          sx={{
            flexShrink: 0,
            ml: '2rem',
          }}
          onClick={handleToggleFavourites}
        >
          My Favourites ({favourites.length})
        </Button>
      </Box>

      <Select
        className="my-select"
        onChange={onSelectChange}
        labelId="label"
        id="select"
        value={types.length ? [...types] : ['none']}
        multiple
        sx={{
          mb: '1rem',
        }}
      >
        <MenuItem key={'none'} value="none" disabled>
          {
            <>
              <PokemonTypeIcon type={'grass' as PokemonType} />
              <span>Type</span>
            </>
          }
        </MenuItem>
        {Object.keys(PokemonType).map((type, index) => (
          <MenuItem key={index} value={type}>
            {
              <>
                <PokemonTypeIcon type={type as PokemonType} />
                <span>{type}</span>
              </>
            }
          </MenuItem>
        ))}
      </Select>

      <Grid container spacing={2}>
        {pokemon.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PokemonCard
              pokemon={pokemon}
              isFavourite={favourites.includes(pokemon.name)}
              onAddFavourite={() => addFavourite(pokemon)}
              onRemoveFavourite={() => removeFavourite(pokemon)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
