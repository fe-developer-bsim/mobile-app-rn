import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import QRRegisterStatus from '../../components/QRGpn/QRRegisterStatus.component';
import {QRRegisterComplete} from '../../state/thunks/QRGpn.thunks';

const formConfig = {
  form: 'QRForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(QRRegisterComplete()),
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const QRMerchantForm = reduxForm(formConfig)(QRRegisterStatus);

class QRRegisterStatusPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantRegisterPage: PropTypes.func,
    MyQRMerchant: PropTypes.func,
  };

  render () {

    const {navigation, QRMerchantRegisterPage, MyQRMerchant} = this.props;
    return <QRMerchantForm navigation={navigation} QRMerchantRegisterPage={QRMerchantRegisterPage} MyQRMerchant={MyQRMerchant}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRRegisterStatusPage);
