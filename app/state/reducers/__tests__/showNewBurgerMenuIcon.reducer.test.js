import showNewBurgerMenuIcon from '../showNewBurgerMenuIcon.reducer';
import {SAVE_NEW_BURGER_MENU, CLEAR_NEW_BURGER_MENU} from '../../actions/index.actions';

describe('Reducer: showNewBurgerMenuIcon', () => {

  it('Should set movies', () => {
    const action = {
      type: SAVE_NEW_BURGER_MENU,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(showNewBurgerMenuIcon({}, action)).toEqual(expectedResult);
  });

  it('Should reset movies', () => {
    const action = {
      type: CLEAR_NEW_BURGER_MENU
    };
    const expectedResult = {};
    expect(showNewBurgerMenuIcon({}, action)).toEqual(expectedResult);
  });

});
