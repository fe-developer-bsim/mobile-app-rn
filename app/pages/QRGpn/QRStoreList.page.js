import result from 'lodash/result';
import React from 'react';
import {connect} from 'react-redux';
import QRMerchantList from '../../components/QRGpn/QRStoreList.component';
import {QRMerchantInquiry, getMerchantTerminal, goToRefundCode} from '../../state/thunks/QRGpn.thunks';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  isMerchantAccount: result(state, 'user.profile.merchantId', [])
});

const mapDispatchToProps = (dispatch) => ({
  QRMerchantRegisterPage: () => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister1'})),
  goToDetailMerchant: (merchantId, merchant_name, merchant_criteria) => dispatch(getMerchantTerminal(merchantId, merchant_name, merchant_criteria)),
  goToMerchantInquiry: (merchantId) => dispatch(QRMerchantInquiry(merchantId)),
  getRefundCode: (merchantId) => dispatch(goToRefundCode(merchantId)),
  getTnC: () => dispatch(NavigationActions.navigate({routeName: 'QROnboard'})),
  addNewStore: (isRegisterStore, isRegisterTerminal, merchantId) => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister3', params: {isRegisterStore, isRegisterTerminal, merchantId}})),
  goToTerminalList: (terminal_id, merchant_id, store_label, pan, username, city, postal_code, merchant_status) => {
    dispatch(getMerchantTerminal(terminal_id, merchant_id, store_label, pan, username, city, postal_code, merchant_status));
  },
});

class QRMenuPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRegisterPage: PropTypes.func,
    isMerchantAccount: PropTypes.array,
    goToDetailMerchant: PropTypes.func,
    goToMerchantInquiry: PropTypes.func,
    getRefundCode: PropTypes.func,
    getTnC: PropTypes.func,
    addNewStore: PropTypes.func,
    goToTerminalList: PropTypes.func,
  };

  render () {
    const {navigation, getRefundCode, QRMerchantRegisterPage, isMerchantAccount, goToDetailMerchant, goToMerchantInquiry, getTnC, addNewStore, goToTerminalList} = this.props;
    return <QRMerchantList navigation={navigation} getRefundCode={getRefundCode} QRMerchantRegisterPage={QRMerchantRegisterPage} isMerchantAccount={isMerchantAccount} goToDetailMerchant={goToDetailMerchant} goToMerchantInquiry={goToMerchantInquiry} getTnC={getTnC} addNewStore={addNewStore} goToTerminalList={goToTerminalList}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMenuPage);
