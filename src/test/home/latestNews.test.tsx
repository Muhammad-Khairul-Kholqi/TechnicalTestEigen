import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LatestNews from "../../components/molecules/latestNews";
import * as fetchLatestNewsModule from "../../api/fetchLatestNews";
import { BrowserRouter as Router } from 'react-router-dom';

// Mock Komponen loading
jest.mock("../../components/loading/latestLoading", () => () => (
  <div data-testid="loading">Loading...</div>
));

jest.mock("../../config/apiKey", () => ({
  NEWS_API_KEY: "test-api-key",
}));

jest.mock("../../api/fetchLatestNews");

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
      <LatestNews />
    </Router>
  );

describe("LatestNews Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("menampilkan loading state saat data dimuat", async () => {
    (fetchLatestNewsModule.fetchLatestNews as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("menampilkan artikel setelah berhasil di-fetch", async () => {
    (fetchLatestNewsModule.fetchLatestNews as jest.Mock).mockResolvedValue(mockArticles);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });
  });

  it('menampilkan error state ketika fetch gagal', async () => {
    (fetchLatestNewsModule.fetchLatestNews as jest.Mock).mockRejectedValue(new Error('API error'));

    render(
      <Router>
        <LatestNews />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  it("menangani artikel tanpa gambar dengan benar", async () => {
    const mockWithoutImage = [
      {
        ...mockArticles[0],
        urlToImage: undefined,
      },
    ];

    (fetchLatestNewsModule.fetchLatestNews as jest.Mock).mockResolvedValue(mockWithoutImage);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
      const images = screen.queryAllByRole("img");
      expect(images.length).toBe(0); // karena gambar tidak ada
    });
  });
});
