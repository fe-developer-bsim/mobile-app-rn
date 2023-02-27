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
      
      
import * as thunks from '../savingAccount.thunks';
import apiUtils from '../../../utils/api.util';
import * as actionCreators from '../../actions/index.actions';
import {Toast} from '../../../utils/RNHelpers.util';
import * as reduxForm from 'redux-form';
import {NavigationActions} from 'react-navigation';
      
      
describe('savingAccount.thunks', () => {
  const mockDispatch = jest.fn();
  const getState = () => {};
  const spy = jest.spyOn(Toast, 'show');
  reduxForm.destroy = jest.fn();
  NavigationActions.reset = jest.fn();
  NavigationActions.navigate = jest.fn();
    
  it('convertAmountSavingValas: convertAmountSavingValas', () => {
    apiUtils.getConvertAmountSavingValas = jest.fn(() => Promise.resolve());
    thunks.convertAmountSavingValas()(mockDispatch, getState);
    expect(apiUtils.getConvertAmountSavingValas).toHaveBeenCalled();
    return apiUtils.getConvertAmountSavingValas().then(() => {
      expect(reduxForm.change).toHaveBeenCalled();
      expect(actionCreators.saveDataConvertSimasValas).toHaveBeenCalled();
      expect(NavigationActions.back).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
  
  it('getConfigMenuSavingValas: getConfigMenuSavingValas', () => {
    apiUtils.getConfigDataSavingValas = jest.fn(() => Promise.resolve());
    thunks.getConfigMenuSavingValas()(mockDispatch, getState);
    expect(apiUtils.getConfigDataSavingValas).toHaveBeenCalled();
    return apiUtils.getConfigDataSavingValas().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveProductsItemSimasValas).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
  
  it('getInterestRateSimasTara: getInterestRateSimasTara', () => {
    apiUtils.getRateSimasTara = jest.fn(() => Promise.resolve());
    thunks.getInterestRateSimasTara()(mockDispatch, getState);
    expect(apiUtils.getRateSimasTara).toHaveBeenCalled();
    return apiUtils.getRateSimasTara().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('getListSavingProduct: getListSavingProduct', () => {
    apiUtils.getSavingProducts = jest.fn(() => Promise.resolve());
    thunks.getListSavingProduct()(mockDispatch, getState);
    expect(apiUtils.getSavingProducts).toHaveBeenCalled();
    return apiUtils.getSavingProducts().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveListSaving).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
  
});