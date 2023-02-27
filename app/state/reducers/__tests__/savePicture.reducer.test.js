import savePicture from '../savePicture.reducer';
import {SAVE_PICTURE, CLEAR_PICTURE} from '../../actions/index.actions';

describe('Reducer: savePicture', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_PICTURE,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(savePicture([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_PICTURE
    };
    const expectedResult = {};
    expect(savePicture([], action)).toEqual(expectedResult);
  });

});

