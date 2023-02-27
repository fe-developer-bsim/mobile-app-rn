import tutorialOnboard from '../tutorialOnboard.reducer';
import {SAVE_TUTORIAL_ONBOARD, CLEAR_TUTORIAL_ONBOARD} from '../../actions/index.actions';

describe('Reducer: tutorialOnboard', () => {

  it('Should set saving data', () => {
    const action = {
      type: SAVE_TUTORIAL_ONBOARD,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(tutorialOnboard([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_TUTORIAL_ONBOARD
    };
    const expectedResult = {};
    expect(tutorialOnboard([], action)).toEqual(expectedResult);
  });

});

