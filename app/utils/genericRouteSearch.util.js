import {NavigationActions} from 'react-navigation';
import {getTdConfig, openInbox, goFavBiller, goAutoDebitList, checkActiveCard, checkBlockCard, investmentData, getInfoProduct, getClosingConfig, addNewAtmCard} from '../state/thunks/dashboard.thunks';
import {logoutDashboard} from '../state/thunks/onboarding.thunks';
import {goSimasPoinHistory, couponCustomerView, goToMyVoucher, tokenInvoiceHistory, linkingTelp, resetAndNavigate, goToLocator, triggerAuthNavigate, saveEasypin,
  getReleaseDeviceQRRevamp, getBillpayHistory, setupPayment, goReferralCode} from '../state/thunks/common.thunks';
import {inquiryRecurringTransfer, checkTimeOperationRemittance} from '../state/thunks/fundTransfer.thunks';
import {insurance} from '../state/thunks/Insurance.thunks';
import {getQRGpn} from '../state/thunks/QRGpn.thunks';
import {getSavingProductsItems, getCreditCardProductsItems, getListLoanProduct, getCurrentSectionAccountMenu} from '../state/thunks/digitalAccountOpening.thunks';
import {checklistUnipin, shouldGiveChecklist, shouldGiveChecklistSimasCatalog} from '../state/thunks/digitalStore.thunks';
import {goToSplitBillMenu} from '../state/thunks/splitBill.thunks';
import {inquiryProxyByEDW} from '../state/thunks/biFast.thunks';
import {refreshDevice} from '../state/thunks/onboarding.thunks';
import {getLoginPreference} from '../state/thunks/appSetup.thunks.js';
import {result, startsWith} from 'lodash';
import * as actionCreators from '../state/actions/index.actions';
import {set, storageKeys} from '../utils/storage.util';


export function genericSearchNavigate (nameSearch, urlLink) {
  return (dispatch, getState) => {
    if (nameSearch === 'PREPAID') {
      dispatch(getBillpayHistory());
      dispatch(setupPayment('BillerTypeSix'));
    } else if (nameSearch === 'POSTPAID') {
      dispatch(getBillpayHistory());
      dispatch(setupPayment('BillerTypeOne'));
    } else if (nameSearch === 'Open Time Deposit') {
      const isSearch = true;
      dispatch(actionCreators.saveValueTD(isSearch));
      dispatch(getTdConfig());
    } else if (nameSearch === 'Privacy Policy') {
      const singleBilingual = 'yes';
      dispatch(NavigationActions.navigate({routeName: 'PrivacyPageAccount', params: {urlLink, singleBilingual}}));
    } else if (nameSearch === 'Terms and Conditions') {
      const singleBilingual = 'yes';
      dispatch(NavigationActions.navigate({routeName: 'TnCPageAccount', params: {urlLink, singleBilingual}}));
    } else if (nameSearch === 'Logout') {
      dispatch(logoutDashboard());
    } else if (nameSearch === 'Login Preference') {
      dispatch(getLoginPreference());
      dispatch(resetAndNavigate('LoginPreference', {isSearch: true}));
    } else if (nameSearch === 'Simas Emoney') {
      dispatch(NavigationActions.navigate({routeName: 'EmoneyDashboard', params: {isEmoney: true}}));
    } else if (nameSearch === 'Simas Poin') {
      dispatch(goSimasPoinHistory());
    } else if (nameSearch === 'Inbox Pushwoosh') {
      const isSearch = true;
      dispatch(openInbox(isSearch));
    } else if (nameSearch === 'BANK ACCOUNT') {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
          NavigationActions.navigate({routeName: 'homeRoutes'}),
        ]
      }));
    } else if (nameSearch === 'COUPON') {
      dispatch(couponCustomerView());
    } else if (nameSearch === 'E-Voucher') {
      dispatch(goToMyVoucher());
    } else if (nameSearch === 'Lucky Draw') {
      dispatch(NavigationActions.navigate({routeName: 'LuckyDrawScreen'}));
    } else if (nameSearch === 'Hip Hip Horai') {
      dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage', params: {pathRoute: 'AccountMenu'}}));
    } else if (nameSearch === 'Schedule Transfer') {
      dispatch(inquiryRecurringTransfer());
    } else if (nameSearch === 'Favorite Transaction') {
      const isSearch = true;
      dispatch(actionCreators.saveAddFavoriteTrx(isSearch));
      dispatch(goFavBiller());
    } else if (nameSearch === 'Autodebit List') {
      dispatch(goAutoDebitList());
    } else if (nameSearch === 'Push Invoice Transaction') {
      dispatch(tokenInvoiceHistory());
    } else if (nameSearch === 'Open Saving Account') {
      dispatch(getSavingProductsItems());
    } else if (nameSearch === 'Open Credit Card') {
      dispatch(getCreditCardProductsItems());
    } else if (nameSearch === 'Open Credit Card Indigo') {
      dispatch(getCreditCardProductsItems());
    } else if (nameSearch === 'Open Loan Account') {
      dispatch(getListLoanProduct());
    } else if (nameSearch === 'Open Simas TARA') {
      dispatch(getSavingProductsItems());
    } else if (nameSearch === 'Personal Accident Insurance by MSIG') {
      dispatch(insurance());
    } else if (nameSearch === 'Apply and Manage Merchant') {
      const isSearch = true;
      dispatch(actionCreators.saveValueOpenMerchant(isSearch));
      dispatch(getQRGpn());
    } else if (nameSearch === 'Offers') {
      dispatch(NavigationActions.navigate({routeName: 'Offer'}));
    } else if (nameSearch === 'Block ATM Card') {
      dispatch(checkBlockCard());
    } else if (nameSearch === 'Activate ATM Card') {
      dispatch(checkActiveCard());
    } else if (nameSearch === 'Call Support 1500153') {
      dispatch(linkingTelp('tel:1500153'));
    } else if (nameSearch === 'FAQ') {
      dispatch(resetAndNavigate('FAQform'));
    } else if (nameSearch === 'ATM & Branch Locator') {
      dispatch(goToLocator());
    } else if (nameSearch === 'Clear Simobi Data') {
      dispatch(refreshDevice());
    } else if (nameSearch === 'Change Easy PIN') {
      dispatch(resetAndNavigate('UpdateEasyPin', {isSearch: true}));
    } else if (nameSearch === 'Change Password') {
      dispatch(resetAndNavigate('ValidatePasswordBoarding', {nextRouteName: 'CreateNewPassword', isSearch: true}));
    } else if (nameSearch === 'Language') {
      dispatch(resetAndNavigate('LanguageSetting'));
    } else if (nameSearch === 'Change Device') {
      const loginName = result(getState(), 'user.profile.loginName');
      const isSearch = true;
      const goToShowQr = () => {
        dispatch(saveEasypin());
        dispatch(getReleaseDeviceQRRevamp(loginName, isSearch));
      };
      const params = {onSubmit: goToShowQr, amount: 0, isOtp: false};
      dispatch(triggerAuthNavigate('lkd', 0, true, 'Auth', params));
    } else if (nameSearch === 'Mutual Fund') {
      dispatch(investmentData());
      dispatch(NavigationActions.navigate({routeName: 'InvestmentView', params: {isSearch: true, nextRouteName: 'portofolio_mutualfund'}}));
    } else if (nameSearch === 'Bancassurance') {
      dispatch(investmentData());
      dispatch(NavigationActions.navigate({routeName: 'InvestmentView', params: {isSearch: true, nextRouteName: 'portofolio_bancassurance'}}));
    } else if (nameSearch === 'MGM') {
      dispatch(goReferralCode());
    }  else if (nameSearch === 'SIL') {
      dispatch(getInfoProduct());
    } else if (nameSearch === 'Close Saving Account') {
      dispatch((getClosingConfig()));
    } else if (nameSearch === 'Request ATM Card') {
      dispatch(addNewAtmCard());
    } else if (nameSearch === 'SimobiPlus Membership') {
      dispatch(NavigationActions.navigate({routeName: 'MembershipDetail'}));
    } else if (nameSearch === 'UniPin') {
      dispatch(checklistUnipin());
    } else if (nameSearch === 'Ultra Voucher') {
      dispatch(shouldGiveChecklistSimasCatalog());
    } else if (nameSearch === 'Alfamart') {
      dispatch(shouldGiveChecklist());
    } else if (nameSearch === 'Edit my personal data') {
      const cifCode = result(getState(), 'user.profile.customer.cifCode');
      const isKyc = !startsWith(cifCode, 'NK');
      dispatch(isKyc ? actionCreators.saveProductCode('PD') : actionCreators.saveProductCode(''));
      dispatch(isKyc ? getCurrentSectionAccountMenu() : NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit'}));
    } else if (nameSearch === 'Split Bill') {
      set(storageKeys['NEW_SPLITBILL'], true);
      dispatch(actionCreators.hideDrawer());
      dispatch(goToSplitBillMenu());
    } else if (nameSearch === 'Manage BI Fast') {
      dispatch(inquiryProxyByEDW());
    } else if (nameSearch === 'Remittance') {
      dispatch(checkTimeOperationRemittance());
    }
  };
}
