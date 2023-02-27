import comingSoonCgv from '../comingSoonCgv.reducer';
import {SAVE_COMINGSOON_CGV, CLEAR_COMINGSOON_CGV} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set comingSoonCgv config', () => {
    const action = {
      type: SAVE_COMINGSOON_CGV,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

  it('Should reset comingSoonCgv config', () => {
    const action = {
      type: CLEAR_COMINGSOON_CGV
    };
    const expectedResult = '';
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

});
