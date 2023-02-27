import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DigitalEFormSuccessScreenComp from '../../components/DigitalAccountOpening/DigitalEFormSuccessScreen.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {isEmpty, result} from 'lodash';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {})),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  cif: result(state, 'user.profile.customer.cifCode', ''),
  productCode: result(state, 'productCode', '')
});

const mapDispatchToProps = (dispatch) => ({
  backToHome: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({routeName: 'Landing'})
    ]
  }))
});

class DigitalEFormSuccessScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    isLogin: PropTypes.object,
    backToHome: PropTypes.func,
    currentLanguage: PropTypes.string,
    cif: PropTypes.string,
    productCode: PropTypes.string
  }

  componentDidMount = () => {
    const {cif, productCode} = this.props;
    let adjustEvent;
    if (productCode.includes('SA')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('csndco');
        adjustEvent.addCallbackParameter('page_id', 'ak-dao-9');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('CC')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
        adjustEvent.addCallbackParameter('page_id', 'ak-daocc-9');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    } else if (productCode.includes('EMONEY')) {
      if (Platform.OS === 'android') {
        adjustEvent = new adjustAndroid.AdjustEvent('eb9ysx');
        adjustEvent.addCallbackParameter('page_id', 'ak-emkyc-4');
        adjustEvent.addCallbackParameter('cif', cif);
        adjustAndroid.Adjust.trackEvent(adjustEvent);
      }
    }
  }

  render () {
    const {backToHome, navigation, currentLanguage} = this.props;
    const data = result(navigation, 'state.params.data', {});
    return (
      <DigitalEFormSuccessScreenComp
        backToHome={backToHome}
        data={data}
        currentLanguage={currentLanguage}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalEFormSuccessScreen);