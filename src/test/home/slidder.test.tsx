import { render, screen } from '@testing-library/react';
import SlidderSection from '../../components/molecules/popularNews';
import * as fetchPopularNewsModule from '../../api/fetchPopularNews';

jest.mock('../../api/fetchPopularNews', () => ({
    FetchPopularNews: jest.fn(),
}));

describe('SlidderSection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displaying 1 latest article from API', async () => {
        jest.mocked(fetchPopularNewsModule.FetchPopularNews).mockResolvedValue([
            {
                title: 'Title 1',
                description: 'Decription 1',
                urlToImage: 'https://example.com/img1.jpg',
            },
        ]);

        render(<SlidderSection />);

        expect(await screen.findByText('Title 1')).toBeInTheDocument();
    });
});
