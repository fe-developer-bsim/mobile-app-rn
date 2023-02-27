import proxyInputBiFast from '../proxyInputBiFast.reducer';
import {SAVE_PROXY_INPUT_BIFAST, CLEAR_PROXY_INPUT_BIFAST} from '../../actions/index.actions';

describe('Reducer:', () => {

  it('Should set proxyInputBiFast config', () => {
    const action = {
      type: SAVE_PROXY_INPUT_BIFAST,
      payload: {test: 'wasd'}
    };
    const expectedResult = {test: 'wasd'};
    expect(proxyInputBiFast([], action)).toEqual(expectedResult);
  });

  it('Should reset proxyInputBiFast config', () => {
    const action = {
      type: CLEAR_PROXY_INPUT_BIFAST
    };
    const expectedResult = '';
    expect(proxyInputBiFast([], action)).toEqual(expectedResult);
  });

});
