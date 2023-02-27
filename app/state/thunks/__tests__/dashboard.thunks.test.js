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
  
  
import * as thunks from '../dashboard.thunks';
import apiUtils from '../../../utils/api.util';
import * as actionCreators from '../../actions/index.actions';
import {Toast} from '../../../utils/RNHelpers.util';
import * as reduxForm from 'redux-form';
import {NavigationActions} from 'react-navigation';
  
  
describe('dashboard', () => {
  const mockDispatch = jest.fn();
  const getState = () => {};
  const spy = jest.spyOn(Toast, 'show');
  reduxForm.destroy = jest.fn();
  NavigationActions.reset = jest.fn();
  NavigationActions.navigate = jest.fn();

  it('getTdDisclaimer: getTdDisclaimer', () => {
    apiUtils.getTdDisclaimer = jest.fn(() => Promise.resolve());
    thunks.getTdDisclaimer()(mockDispatch, getState);
    expect(apiUtils.getTdDisclaimer).toHaveBeenCalled();
    return apiUtils.getTdDisclaimer().then(() => {
      expect(NavigationActions.navigate).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('getTdConfig: getTdConfig', () => {
    apiUtils.tdConfig = jest.fn(() => Promise.resolve());
    thunks.getTdConfig()(mockDispatch, getState);
    expect(apiUtils.tdConfig).toHaveBeenCalled();
    return apiUtils.tdConfig().then(() => {
      expect(actionCreators.updateTdConfigConv).toHaveBeenCalled();
      expect(apiUtils.tdsConfig).toHaveBeenCalled().then(() => {
        expect(actionCreators.updateTdConfigSharia).toHaveBeenCalled();
        expect(apiUtils.getTdDisclaimer).toHaveBeenCalled();
        return apiUtils.getTdDisclaimer(() => {
          expect(NavigationActions.navigate).toHaveBeenCalled();
          expect(actionCreators.hideSpinner).toHaveBeenCalled();
        }).
          catch(() => {
            expect(actionCreators.hideSpinner).toHaveBeenCalled();
            expect(spy).toHaveBeenCalled();
          });
      });
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('faqTd: faqTd', () => {
    thunks.faqTd()(mockDispatch, getState);
    expect(actionCreators.showSpinner).toHaveBeenCalled();
    expect(NavigationActions.navigate).toHaveBeenCalled();
    expect(actionCreators.hideSpinner).toHaveBeenCalled();
  });
});