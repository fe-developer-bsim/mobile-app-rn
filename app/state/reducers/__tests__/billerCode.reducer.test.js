import comingSoonCgv from '../billerCode.reducer';
import {SAVE_BILLERCODE, CLEAR_BILLERCODE} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set comingSoonCgv config', () => {
    const action = {
      type: SAVE_BILLERCODE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

  it('Should reset comingSoonCgv config', () => {
    const action = {
      type: CLEAR_BILLERCODE
    };
    const expectedResult = '';
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

});
