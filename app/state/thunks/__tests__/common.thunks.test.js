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
    
    
import * as thunks from '../common.thunks';
import apiUtils from '../../../utils/api.util';
import * as actionCreators from '../../actions/index.actions';
import {Toast} from '../../../utils/RNHelpers.util';
import * as reduxForm from 'redux-form';
import {NavigationActions} from 'react-navigation';
    
    
describe('common', () => {
  const mockDispatch = jest.fn();
  const getState = () => {};
  const spy = jest.spyOn(Toast, 'show');
  reduxForm.destroy = jest.fn();
  NavigationActions.reset = jest.fn();
  NavigationActions.navigate = jest.fn();
  
  it('getExchangeCurrency: getExchangeCurrency', () => {
    apiUtils.exchangeCurrency = jest.fn(() => Promise.resolve());
    thunks.getExchangeCurrency()(mockDispatch, getState);
    expect(apiUtils.exchangeCurrency).toHaveBeenCalled();
    return apiUtils.exchangeCurrency().then(() => {
      expect(actionCreators.saveExchangeCurrency).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    });
  });

  xit('getDetailHistoryReward: getDetailHistoryReward', () => {
    apiUtils.getDetailHistoryReward = jest.fn(() => Promise.resolve());
    thunks.getExchangeCurrency()(mockDispatch, getState);
    expect(apiUtils.getDetailHistoryReward).toHaveBeenCalled();
    return apiUtils.getDetailHistoryReward().then(() => {
      expect(NavigationActions.navigate).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('goRewardBalance: goRewardBalance', () => {
    apiUtils.getRewardBalance = jest.fn(() => Promise.resolve());
    thunks.goRewardBalance()(mockDispatch, getState);
    expect(apiUtils.getRewardBalance).toHaveBeenCalled();
    return apiUtils.getRewardBalance().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveRewardBalance).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  xit('getTargetAccountRemittance: getTargetAccountRemittance', () => {
    apiUtils.getTargetAccountRemittance = jest.fn(() => Promise.resolve());
    expect(actionCreators.savePayeeStatusRemittance).toHaveBeenCalled();
    thunks.getTargetAccountRemittance()(mockDispatch, getState);
    expect(apiUtils.getTargetAccountRemittance).toHaveBeenCalled();
    return apiUtils.getTargetAccountRemittance().then(() => {
      expect(actionCreators.clearPayeeStatusRemittance).toHaveBeenCalled();
      expect(actionCreators.savePayeeStatusRemittance).toHaveBeenCalled();
      expect(actionCreators.updatePayeesRemittance).toHaveBeenCalled();
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.savePayeeStatusRemittance).toHaveBeenCalled();
    });
  });
  
  xit('addRecentSearch: addRecentSearch', () => {
    thunks.getallAccbeforelogin()(mockDispatch);
    expect(actionCreators.saveValueRecentSearch).toHaveBeenCalled();
  });

  xit('inbankList: inbankList', () => {
    apiUtils.getTargetAccount = jest.fn(() => Promise.resolve());
    thunks.inbankList()(mockDispatch, getState);
    expect(apiUtils.getTargetAccount).toHaveBeenCalled();
    return apiUtils.getTargetAccount().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveInbankTransferList).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('goToEditSetLimitTransaction: goToEditSetLimitTransaction', () => {
    apiUtils.editLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.goToEditSetLimitTransaction()(mockDispatch, getState);
    expect(apiUtils.editLimitTransaction).toHaveBeenCalled();
    return apiUtils.editLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveEditLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('goToEditSetLimitFundTransferConfirm: goToEditSetLimitFundTransferConfirm', () => {
    apiUtils.editLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.goToEditSetLimitFundTransferConfirm()(mockDispatch, getState);
    expect(apiUtils.editLimitTransaction).toHaveBeenCalled();
    return apiUtils.editLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveEditLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  xit('deleteSelectedList: deleteSelectedList', () => {
    apiUtils.deleteLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.deleteSelectedList()(mockDispatch, getState);
    expect(apiUtils.deleteLimitTransaction).toHaveBeenCalled();
    return apiUtils.deleteLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveDeleteLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('easyPinLimitTransaction: easyPinLimitTransaction', () => {
    apiUtils.addLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.easyPinLimitTransaction()(mockDispatch, getState);
    expect(apiUtils.addLimitTransaction).toHaveBeenCalled();
    return apiUtils.addLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveAddLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('highValueSetLimit: highValueSetLimit', () => {
    apiUtils.addLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.highValueSetLimit()(mockDispatch, getState);
    expect(apiUtils.addLimitTransaction).toHaveBeenCalled();
    return apiUtils.addLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveAddLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('listSetLimitTransaction: listSetLimitTransaction', () => {
    apiUtils.listLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.listSetLimitTransaction()(mockDispatch, getState);
    expect(apiUtils.listLimitTransaction).toHaveBeenCalled();
    return apiUtils.listLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveListLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('listSetLimitTransactionAccPage: listSetLimitTransactionAccPage', () => {
    apiUtils.listLimitTransaction = jest.fn(() => Promise.resolve());
    thunks.listSetLimitTransactionAccPage()(mockDispatch, getState);
    expect(apiUtils.listLimitTransaction).toHaveBeenCalled();
    return apiUtils.listLimitTransaction().then(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(actionCreators.saveListLimitTransaction).toHaveBeenCalled();
      expect(NavigationActions.navigate).toHaveBeenCalled();
    }).catch(() => {
      expect(actionCreators.hideSpinner).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

});