jest.mock('../../../utils/api.util', () => ({
  getTdDisclaimer: jest.fn(() => Promise.resolve()),
  tdConfig: jest.fn(() => Promise.resolve()),
  tdsConfig: jest.fn(() => Promise.resolve()),
}));
jest.mock('../../actions/index.actions', () => ({
  showSpinner: jest.fn(() => Promise.resolve()),
  hideSpinner: jest.fn(() => Promise.resolve()),
  saveTransRefNum: jest.fn(() => Promise.resolve()),
  clearTransRefNum: jest.fn(() => Promise.resolve()),
  updateTdConfigConv: jest.fn(() => Promise.resolve()),
  updateTdConfigSharia: jest.fn(() => Promise.resolve()),
}));
      
      
import * as thunks from '../fundTransfer.thunks';
import apiUtils from '../../../utils/api.util';
import * as actionCreators from '../../actions/index.actions';
import {Toast} from '../../../utils/RNHelpers.util';
import * as reduxForm from 'redux-form';
import {NavigationActions} from 'react-navigation';
      
      
describe('fundTransfer', () => {
  const mockDispatch = jest.fn();
  const getState = () => {};
  const spy = jest.spyOn(Toast, 'show');
  reduxForm.destroy = jest.fn();
  NavigationActions.reset = jest.fn();
  NavigationActions.navigate = jest.fn();
    
  xit('getCurrencyPurpose: getCurrencyPurpose', () => {
    apiUtils.currencyPurpose = jest.fn(() => Promise.resolve());
    thunks.getCurrencyPurpose()(mockDispatch, getState);
    expect(apiUtils.currencyPurpose).toHaveBeenCalled();
    return apiUtils.currencyPurpose().then(() => {
      expect(actionCreators.saveCurrencyPurpose).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
  
  it('getSenderRemittance: getSenderRemittance', () => {
    apiUtils.detailSenderRemittance = jest.fn(() => Promise.resolve());
    thunks.getSenderRemittance()(mockDispatch, getState);
    expect(apiUtils.detailSenderRemittance).toHaveBeenCalled();
    return apiUtils.detailSenderRemittance().then(() => {
      expect(actionCreators.saveSenderDataRemittance).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
});