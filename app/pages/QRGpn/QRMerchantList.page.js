import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRMerchantList from '../../components/QRGpn/QRMerchantList.component';
import {QRMerchantInquiry, getMerchantStore} from '../../state/thunks/QRGpn.thunks';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  isMerchantAccount: result(state, 'user.profile.merchantId', [])
});

const mapDispatchToProps = (dispatch) => ({
  QRMerchantRegisterPage: () => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister1'})),
  goToDetailMerchant: (merchantId, merchant_name, merchant_criteria, merchant_status) => dispatch(getMerchantStore(merchantId, merchant_name, merchant_criteria, merchant_status)),
  goToMerchantInquiry: (merchantId) => dispatch(QRMerchantInquiry(merchantId)),
  getTnC: () => dispatch(NavigationActions.navigate({routeName: 'QROnboard'})),
});

class QRMenuPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRegisterPage: PropTypes.func,
    isMerchantAccount: PropTypes.array,
    goToDetailMerchant: PropTypes.func,
    goToMerchantInquiry: PropTypes.func,
    getTnC: PropTypes.func,
  };

  render () {
    const {navigation, QRMerchantRegisterPage, isMerchantAccount, goToDetailMerchant, goToMerchantInquiry, getTnC} = this.props;
    return <QRMerchantList navigation={navigation} QRMerchantRegisterPage={QRMerchantRegisterPage} isMerchantAccount={isMerchantAccount} goToDetailMerchant={goToDetailMerchant} goToMerchantInquiry={goToMerchantInquiry} getTnC={getTnC}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMenuPage);
