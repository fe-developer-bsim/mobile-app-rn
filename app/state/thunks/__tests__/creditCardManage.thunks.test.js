import * as thunks from '../creditCardManage.thunks';
jest.mock('../../../utils/api.util');
import apiUtils from '../../../utils/api.util';

describe('Thunks', () => {
  const mockDispatch = jest.fn();
  xit('confirmCreditCardOption: confirm option by call OTP', () => {
    thunks.confirmCreditCardOption()(mockDispatch);
    expect(apiUtils.confirmCreditCardOption).toHaveBeenCalled();
    // remaining tests are wip
  });

  xit('requestCreditCardOption: send request to update credit card manage option', (payload) => {
    thunks.requestCreditCardOption(payload)(mockDispatch);
    expect(apiUtils.requestCreditCardOption).toHaveBeenCalled();
    // remaining tests are wip
  });
});
