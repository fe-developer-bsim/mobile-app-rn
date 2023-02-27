import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import EmallTxStatus from '../../components/Emall/EmallTxStatus.component';
import {getTxComplete} from '../../state/thunks/flight.thunks';
import moment from 'moment';
import result from 'lodash/result';
import {Linking} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'QRForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(getTxComplete()),
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
  originCity: result(state, 'form.FlightIndexForm.values.originCity', ''),
  destinationCity: result(state, 'form.FlightIndexForm.values.destinationCity', ''),
  fareDepart: result(state, 'flightFareDetail1', {}),
  fareReturn: result(state, 'flightFareDetail2', {}),
  simasPoin: result(state, 'simasPoin', {}),
  profile: result(state, 'user.profile', {}),
});

const mapDispatchToProps = () => ({
});

const QRMerchantForm = reduxForm(formConfig)(EmallTxStatus);

class EmallTxStatusPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRegisterPage: PropTypes.func,
    MyQRMerchant: PropTypes.func,
    mockDate: PropTypes.bool,
    transRefNum: PropTypes.string,
    toDashboard: PropTypes.func,
    originCity: PropTypes.string,
    destinationCity: PropTypes.string,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
    profile: PropTypes.object,
    simasPoin: PropTypes.object,
  };

  onCustomerCall = (telephone) => () => {
    Linking.canOpenURL(telephone).then((supported) => {
      if (supported) {
        Linking.openURL(telephone);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  render () {

    const {navigation, QRMerchantRegisterPage, MyQRMerchant, mockDate = false, transRefNum, toDashboard, originCity, destinationCity, fareDepart, fareReturn, simasPoin, profile} = this.props;
    const airportOrigin = originCity.substring(0, originCity.indexOf('/'));
    const airportDestination = destinationCity.substring(0, destinationCity.indexOf('/'));
    const cityOrigin = originCity.substring(originCity.indexOf('/') + 1, originCity.indexOf('['));
    const cityDestination = destinationCity.substring(destinationCity.indexOf('/') + 1, destinationCity.indexOf('['));
    const date = mockDate ? '' : (moment()).format('D MMM YYYY, hh:mm A');
    return <QRMerchantForm navigation={navigation} QRMerchantRegisterPage={QRMerchantRegisterPage} MyQRMerchant={MyQRMerchant} date={date}
      transRefNum={transRefNum} onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')} toDashboard={toDashboard}
      airportOrigin={airportOrigin} airportDestination={airportDestination} 
      cityOrigin={cityOrigin} cityDestination={cityDestination} fareDepart={fareDepart} fareReturn={fareReturn} 
      simasPoin={simasPoin} profile={profile} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallTxStatusPage);
