import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AllCardNewsLists from "../../components/molecules/allCardNewsLists";
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchAllNews } from '../../api/fetchAllNews';

jest.mock("../../api/fetchAllNews", () => ({
  __esModule: true,
  fetchAllNews: jest.fn(), 
}));

jest.mock("../../components/loading/cardNewsLoading.tsx", () => () => (
  <div data-testid="loading">Loading...</div>
));

jest.mock("../../components/molecules/searchFilter", () => () => (
  <div data-testid="search-filter">Search Filter</div>
));

jest.mock("../../components/molecules/pagination", () => () => (
  <div data-testid="pagination">Pagination</div>
));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const mockArticles = [
  {
    url: "https://example.com/1",
    title: "First Article",
    publishedAt: "2023-07-01T12:00:00Z",
    description: "Description for the first article",
    urlToImage: "https://example.com/image1.jpg",
  },
  {
    url: "https://example.com/2",
    title: "Second Article",
    publishedAt: "2023-07-02T12:00:00Z",
    description: "Description for the second article",
    urlToImage: "https://example.com/image2.jpg",
  },
];

const renderComponent = () =>
  render(
    <Router>
      <AllCardNewsLists />
    </Router>
  );

describe("AllCardNewsLists Component", () => {
  beforeEach(() => {
    (fetchAllNews as jest.Mock).mockReset();
  });

  it("menampilkan loading state saat data dimuat", () => {
    (fetchAllNews as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("menampilkan artikel setelah berhasil di-fetch", async () => {
    (fetchAllNews as jest.Mock).mockResolvedValue(mockArticles);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });
  });

  it('menampilkan error state ketika fetch gagal', async () => {
    (fetchAllNews as jest.Mock).mockRejectedValue(new Error('API error'));

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Gagal memuat berita. Silakan coba lagi.")).toBeInTheDocument();
    });
  });

  it("menangani artikel tanpa gambar dengan benar", async () => {
    const mockWithoutImage = [
      {
        ...mockArticles[0],
        urlToImage: undefined,
      },
    ];

    (fetchAllNews as jest.Mock).mockResolvedValue(mockWithoutImage);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
      const images = screen.getAllByRole("img");
      const articleImage = images.find(img => 
        img.getAttribute('alt') === 'News'
      );
      expect(articleImage).toHaveAttribute("src", "https://placehold.co/400");
    });
  });
});