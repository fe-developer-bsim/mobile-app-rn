import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {result, isEmpty} from 'lodash';
import UltraVoucherWebView from '../../components/OnboardingJourney/UltraVoucherWebView.component';
import {goToEasyPinUltraVoucher, accessLocation, getPermissionLocationAccess} from '../../state/thunks/digitalStore.thunks';
import {silentLoginBillpay} from '../../state/thunks/genericBill.thunks';
import * as actionCreators from '../../state/actions/index.actions';
import env from '../../config/env.config';
import Geolocation from '@react-native-community/geolocation';

class UltraVoucherWebViewPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onCheckout: PropTypes.func,
    onLoadStart: PropTypes.func,
    onLoadEnd: PropTypes.func,
    isLogin: PropTypes.bool,
    geolocationSimasCatalog: PropTypes.object,
    accessLocation: PropTypes.object,
    getPermissionLocationAccess: PropTypes.func
  }

  state = {
    canGoBack: false,
    coords: '',
    getAccess: false,
    reload: false
  }

  onMessage = (event) => {
    const {isLogin, onCheckout, navigation} = this.props;
    const webState = result(event, 'nativeEvent', {});
    const data = result(event, 'nativeEvent.data', '');
    if (data === 'navigationStateChange') {
      // for handling back button in web
      this.setState({
        canGoBack: result(webState, 'canGoBack', false)
      });
    } else if (data === 'goBackToDashboard') {
      // for handling back to dashboard from web
      navigation.goBack();
    } else {
      // for handling orderNumber received from checkout in web
      if (!isEmpty(data)) {
        onCheckout(isLogin, data);
      }
    }
  }
  accessLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      const lat = result(info, 'coords.latitude', '0').toString();
      const lot = result(info, 'coords.longitude', '0').toString();
      this.setState({
        coords: 'lat=' + lat + '|' + 'lot=' + lot,
        getAccess: true
      });
    },
    {},
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  componentDidMount () {
    const {geolocationSimasCatalog} = this.props;

    isEmpty(geolocationSimasCatalog) ? this.props.accessLocation() : null;
  }

  reloadSimasCatalog = () => {
    this.setState({
      reload: true
    });
    this.props.getPermissionLocationAccess();

  }

  render () {
    const {navigation, onLoadEnd, onLoadStart, geolocationSimasCatalog} = this.props;
    const jwt = result(navigation, 'state.params.jwt', '');
    const merchant = result(navigation, 'state.params.merchant', '');
    const isOrderHistory = result(navigation, 'state.params.isOrderHistory', false);
    let coords = 'lat=' + result(geolocationSimasCatalog, 'lat') + '|' + 'lot=' + result(geolocationSimasCatalog, 'long');
    const reload = this.state.reload;
    const getAccess = reload ? this.state.getAccess : this.state.getAccess;
    const uriHome = env.URLCATALOG + '/categoryProduct?token=' + jwt + '&merchant=' + merchant + '&coords=' + coords;
    const uriOrderHistory = env.URLCATALOG + '/orderHistoryMenu?token=' + jwt + '&merchant=' + merchant + '&coords=' + coords + '&isFromRN=yes';
    const uri = isOrderHistory ? uriOrderHistory : uriHome;
    return (
      <UltraVoucherWebView uri={uri} onMessage={this.onMessage} onLoadEnd={onLoadEnd} onLoadStart={onLoadStart} 
        canGoBack={this.state.canGoBack} getAccess={getAccess} reloadSimasCatalog={this.reloadSimasCatalog} coords={coords} />
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  geolocationSimasCatalog: result(state, 'geolocationSimasCatalog')
});

const mapDispatchToProps = (dispatch) => ({
  onCheckout: (isLogin, orderNumber) => {
    if (isLogin) {
      dispatch(goToEasyPinUltraVoucher(orderNumber));
    } else {
      const triggerAuthPaymentUV = () => dispatch(goToEasyPinUltraVoucher(orderNumber));
      dispatch(silentLoginBillpay(triggerAuthPaymentUV));
    }
  },
  onLoadStart: () => {
    dispatch(actionCreators.showSpinner());
  },
  onLoadEnd: () => {
    dispatch(actionCreators.hideSpinner());
  },
  accessLocation: () => dispatch(accessLocation()),
  getPermissionLocationAccess: () => dispatch(getPermissionLocationAccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(UltraVoucherWebViewPage);