import movieCgv from '../movieCgv.reducer';
import {SAVE_MOVIE_CGV, CLEAR_MOVIE_CGV} from '../../actions/index.actions';

describe('Reducer: movieCgv', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_MOVIE_CGV,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(movieCgv([], action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_MOVIE_CGV
    };
    const expectedResult = [];
    expect(movieCgv([], action)).toEqual(expectedResult);
  });

});
