import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import EmallCgvStatus from '../../components/Emall/EmallCgvStatus.component';
import {getCgvComplete} from '../../state/thunks/cgv.thunks';
import moment from 'moment';
import result from 'lodash/result';
import {Linking} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'QRForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(getCgvComplete()),
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
  simasPoin: result(state, 'simasPoin', []),
});

const mapDispatchToProps = () => ({
});

const QRMerchantForm = reduxForm(formConfig)(EmallCgvStatus);

class EmallCgvStatusPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRegisterPage: PropTypes.func,
    MyQRMerchant: PropTypes.func,
    transRefNum: PropTypes.string,
    toDashboard: PropTypes.func,
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

    const {navigation, QRMerchantRegisterPage, MyQRMerchant, transRefNum, toDashboard, simasPoin} = this.props;
    const date = moment().format('D MMM YYYY, hh:mm A');
    return <QRMerchantForm navigation={navigation} QRMerchantRegisterPage={QRMerchantRegisterPage} MyQRMerchant={MyQRMerchant} date={date}
      transRefNum={transRefNum} onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')} toDashboard={toDashboard} simasPoin={simasPoin} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallCgvStatusPage);
