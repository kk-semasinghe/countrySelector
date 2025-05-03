import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryPage from './pages/countryList'; // Adjust path as necessary

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            name: { common: 'Japan' },
            capital: ['Tokyo'],
            population: 125800000,
            region: 'Asia',
            flags: { png: 'https://flagcdn.com/jp.png' },
            languages: { jpn: 'Japanese' },
            ccn3: '392',
          },
        ]),
    })
  );
});

afterEach(() => {
  // Cleanup mocks
  jest.resetAllMocks();
});

test('filters countries based on search input', async () => {
  render(
    <MemoryRouter>
      <CountryPage />
    </MemoryRouter>
  );

  const input = screen.getByLabelText(/search country/i);
  fireEvent.change(input, { target: { value: 'japan' } });

  const matches = await screen.findAllByText(/japan/i);
expect(matches.length).toBeGreaterThan(0);

});

test('adds country to favorites and stores in localStorage', async () => {
  render(
    <MemoryRouter>
      <CountryPage />
    </MemoryRouter>
  );

  const input = screen.getByLabelText(/search country/i);
  fireEvent.change(input, { target: { value: 'japan' } });

  const favButton = await screen.findByLabelText(/toggle favorite for japan/i);
  fireEvent.click(favButton);

  await waitFor(() => {
    const stored = JSON.parse(localStorage.getItem('favorites'));
    expect(stored).toContain('Japan');
  });
});
