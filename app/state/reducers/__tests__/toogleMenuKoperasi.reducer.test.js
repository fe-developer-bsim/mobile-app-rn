import comingSoonCgv from '../toogleMenuKoperasi.reducer';
import {SAVE_TOOGLE_MENU_KOPERASI, DELETE_TOOGLE_MENU_KOPERASI} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set comingSoonCgv config', () => {
    const action = {
      type: SAVE_TOOGLE_MENU_KOPERASI,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

  it('Should reset comingSoonCgv config', () => {
    const action = {
      type: DELETE_TOOGLE_MENU_KOPERASI
    };
    const expectedResult = '';
    expect(comingSoonCgv([], action)).toEqual(expectedResult);
  });

});
