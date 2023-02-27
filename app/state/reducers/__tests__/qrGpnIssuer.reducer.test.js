import qrGpnIssuer from '../qrGpnIssuer.reducer';
import {SET_QR_GPN_ISSUER, CLEAR_QR_GPN_ISSUER} from '../../actions/index.actions';

describe('Reducer: qrGpnIssuer', () => {

  it('Should set saving data', () => {
    const action = {
      type: SET_QR_GPN_ISSUER,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(qrGpnIssuer([], action)).toEqual(expectedResult);
  });

  it('Should clear saving data', () => {
    const action = {
      type: CLEAR_QR_GPN_ISSUER
    };
    const expectedResult = {};
    expect(qrGpnIssuer([], action)).toEqual(expectedResult);
  });

});

