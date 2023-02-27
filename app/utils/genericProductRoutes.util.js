import {NavigationActions} from 'react-navigation';
import {getTdConfig} from '../state/thunks/dashboard.thunks';
import {goReferralCode} from '../state/thunks/common.thunks';
import {insurance} from '../state/thunks/Insurance.thunks';
import {getConfigMenuSavingValas, getCreditCardProductsItems, getListLoanProduct} from '../state/thunks/digitalAccountOpening.thunks';
import * as actionCreators from '../state/actions/index.actions';
import {goToSplitBillMenu} from '../state/thunks/splitBill.thunks';
import {set, storageKeys} from '../utils/storage.util';

export function genericProductRoutes (productName) {
  return (dispatch) => {
    if (productName === 'td') {
      const isSearch = true;
      dispatch(actionCreators.saveValueTD(isSearch));
      dispatch(getTdConfig());
    } else if (productName === 'sa') {
      dispatch(getConfigMenuSavingValas());
    } else if (productName === 'cc') {
      dispatch(getCreditCardProductsItems());
    } else if (productName === 'loan') {
      dispatch(getListLoanProduct());
    } else if (productName === 'exrate') {
      dispatch(NavigationActions.navigate({routeName: 'ValasItem'}));
    } else if (productName === 'insurance') {
      dispatch(insurance());
    } else if (productName === 'mgm') {
      dispatch(goReferralCode());
    } else if (productName === 'splitbill') {
      set(storageKeys['NEW_SPLITBILL'], true);
      dispatch(actionCreators.hideDrawer());
      dispatch(goToSplitBillMenu());
    }
  };
}