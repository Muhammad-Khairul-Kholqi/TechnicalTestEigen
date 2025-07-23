import React from 'react';
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import PopularNews from '../../components/molecules/popularNews';
import { FetchPopularNews } from '../../api/fetchPopularNews';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../config/apiKey.ts', () => ({
  NEWS_API_KEY: 'dummy_test_key',
}));

jest.mock('../../api/fetchPopularNews');
jest.mock('../../components/loading/pouplarLoading.tsx', () => () => (
  <div data-testid="loading-indicator">Loading...</div>
));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});


const mockArticles = [
  {
    url: 'https://example.com/article1',
    urlToImage: 'image1.jpg',
    publishedAt: '2023-01-01T00:00:00Z',
    title: 'First Article Title',
    description: 'First article description',
  },
  {
    url: 'https://example.com/article2',
    urlToImage: 'image2.jpg',
    publishedAt: '2023-01-02T00:00:00Z',
    title: 'Second Article Title',
    description: 'Second article description',
  },
  {
    url: 'https://example.com/article3',
    urlToImage: 'image3.jpg',
    publishedAt: '2023-01-03T00:00:00Z',
    title: 'Third Article Title',
    description: 'Third article description',
  },
];

describe('PopularNews Component', () => {
  beforeEach(() => {
    (FetchPopularNews as jest.Mock).mockReset();
  });

  it('menampilkan loading state saat data dimuat', () => {
    (FetchPopularNews as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <Router>
        <PopularNews />
      </Router>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('menampilkan error state ketika fetch gagal', async () => {
    (FetchPopularNews as jest.Mock).mockRejectedValue(new Error('API error'));

    render(
      <Router>
        <PopularNews />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  it('menampilkan artikel setelah berhasil di-fetch', async () => {
    (FetchPopularNews as jest.Mock).mockResolvedValue(mockArticles);

    render(
      <Router>
        <PopularNews />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    const mainArticle = screen.getByRole('link', { name: /First Article Title/i });
    expect(mainArticle).toHaveAttribute('href', 'https://example.com/article1');
    expect(screen.getByText('First Article Title')).toBeInTheDocument();
    expect(screen.getByText('First article description')).toBeInTheDocument();

    const secondArticle = screen.getByRole('link', { name: /Second Article Title/i });
    expect(secondArticle).toHaveAttribute('href', 'https://example.com/article2');
    expect(screen.getByText('Second Article Title')).toBeInTheDocument();

    const thirdArticle = screen.getByRole('link', { name: /Third Article Title/i });
    expect(thirdArticle).toHaveAttribute('href', 'https://example.com/article3');
    expect(screen.getByText('Third Article Title')).toBeInTheDocument();
  });

  it('menampilkan 3 artikel dengan layout yang benar', async () => {
    (FetchPopularNews as jest.Mock).mockResolvedValue(mockArticles);

    render(
      <Router>
        <PopularNews />
      </Router>
    );

    await waitFor(() => {
      const mainArticleImage = screen.getByAltText('First Article Title');
      expect(mainArticleImage).toHaveStyle('height: 350px');

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(2);
      
      cards.forEach(card => {
        const image = within(card).getByRole('img');
        expect(image).toHaveStyle('height: 180px');
      });
    });
  });

  it('menangani artikel tanpa gambar dengan benar', async () => {
    const articlesWithMissingImage = [...mockArticles];
    articlesWithMissingImage[1].urlToImage = undefined;
    
    (FetchPopularNews as jest.Mock).mockResolvedValue(articlesWithMissingImage);

    render(
      <Router>
        <PopularNews />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Second Article Title')).toBeInTheDocument();
      const secondArticleImage = screen.queryByAltText('Second Article Title');
      expect(secondArticleImage).not.toBeInTheDocument();
    });
  });
});