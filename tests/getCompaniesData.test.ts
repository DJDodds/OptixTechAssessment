import axios from 'axios';
import { getMoviesData } from '../src/CommonFunctions/getMoviesData'
import { getMovieCompaniesData } from '../src/CommonFunctions/getMovieCompanies'
import { sendMovieReview } from '../src/CommonFunctions/sendMovieReview'

jest.mock('axios');

describe('getMoviesData', () => {
  it('fetches movie data correctly', async () => {
    const mockedData = [  {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
    {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
  ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedData,
    });
    const moviesData = await getMoviesData();
    expect(moviesData).toEqual(mockedData);
  });

  it('handles error', async () => {
    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));
    const moviesData = await getMoviesData();
    expect(moviesData).toEqual([]);
  });
});

describe('getMovieCompaniesData', () => {
  it('fetches movie company data correctly', async () => {
    const mockedData = [{id: "1", name: "Test Productions"}];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedData,
    });
    const moviesCompanyData = await getMovieCompaniesData();
    expect(moviesCompanyData).toEqual(moviesCompanyData);
  });

  it('handles error', async () => {
    const errorMessage = 'Failed to fetch data';
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error(errorMessage));
    const moviesCompanyData = await getMovieCompaniesData();
    expect(moviesCompanyData).toEqual([]);
  });
});

describe('sendMovieReview', () => {
  it('successfully sends movie review', async () => {
    const message = 'This is a movie review';
    const mockedResponse = { data: { message: 'Review published successfully' } };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockedResponse);
    const response = await sendMovieReview(message);
    expect(response).toEqual(mockedResponse.data.message);
  });

  it('handles error when sending movie review', async () => {
    const message = 'This is a movie review';
    const errorMessage = 'Failed to publish review';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(new Error(errorMessage));
    await expect(sendMovieReview(message)).rejects.toThrowError(errorMessage);
  });
});
