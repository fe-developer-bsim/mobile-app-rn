import qrTransferCpan from '../qrTransferCpan.reducer';
import {SAVE_TRANSFER_CPAN, CLEAR_TRANSFER_CPAN} from '../../actions/index.actions';

describe('Reducer: qrTransfer', () => {

  xit('Should set saving data', () => {
    const action = {
      type: SAVE_TRANSFER_CPAN,
      payload: {test: 'wasd'}
    };
    const expectedResult = {'test': 'wasd'};
    expect(qrTransferCpan({}, action)).toEqual(expectedResult);
  });

  xit('Should clear saving data', () => {
    const action = {
      type: CLEAR_TRANSFER_CPAN
    };
    const expectedResult = {};
    expect(qrTransferCpan({}, action)).toEqual(expectedResult);
  });

});

