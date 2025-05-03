import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import CountryDetailsPage from './countryDetailsPage';

const mockCountry = {
  name: { common: 'Testland', official: 'The Testland Republic' },
  capital: ['Test City'],
  region: 'Test Region',
  subregion: 'Test Subregion',
  population: 123456,
  area: 654321,
  startOfWeek: 'monday',
  flags: {
    png: 'https://flagcdn.com/test.png',
    alt: 'Testland flag description',
  },
  languages: { eng: 'English', tst: 'Testish' },
  maps: {
    googleMaps: 'https://maps.google.com/test',
    openStreetMaps: 'https://openstreetmap.org/test',
  },
  independent: true,
};

describe('CountryDetailsPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockCountry]),
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(
      <MemoryRouter initialEntries={['/country/Testland']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders country details after fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/country/Testland']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Testland');
    });

    expect(screen.getByText(/The Testland Republic/)).toBeInTheDocument();
    expect(screen.getByText(/Test City/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region \/ Test Subregion/)).toBeInTheDocument();
    expect(screen.getByText(/123,456/)).toBeInTheDocument();
    expect(screen.getByText(/654,321 km²/)).toBeInTheDocument();
    expect(screen.getByText(/monday/)).toBeInTheDocument();

    // Languages
    expect(screen.getByText('• English')).toBeInTheDocument();
    expect(screen.getByText('• Testish')).toBeInTheDocument();

    // Map links
    expect(screen.getByText('View on Google Maps')).toHaveAttribute(
      'href',
      'https://maps.google.com/test'
    );
    expect(screen.getByText('View on OpenStreetMap')).toHaveAttribute(
      'href',
      'https://openstreetmap.org/test'
    );

    // Flag alt text displayed
    expect(screen.getByText(/Testland flag description/)).toBeInTheDocument();

    // Independent icon tooltip text
    expect(screen.getByRole('button', { name: /Independent Country/i })).toBeInTheDocument();
    expect(screen.getByText(/Independent/)).toBeInTheDocument();
  });

  test('shows Not Independent icon and tooltip when independent is false', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              ...mockCountry,
              independent: false,
            },
          ]),
      })
    );

    render(
      <MemoryRouter initialEntries={['/country/Testland']}>
        <Routes>
          <Route path="/country/:name" element={<CountryDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Not Independent/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Not Independent/)).toBeInTheDocument();
  });
});
