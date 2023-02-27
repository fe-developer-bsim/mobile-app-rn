import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import QRRefundCreate from '../../components/QRGpn/QRRefundCreate.component';
import {getRefundCode} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateNumber, validateRefundCount} from '../../utils/validator.util';

const formConfig = {
  form: 'QRRefundCreate',
  destroyOnUnmount: false,
  initialValues: {
    merchantList: '',
  },
  onSubmit: (values, dispatch, {triggerAuth, QRRefundCreates}) => {
    const defaultAmount = 1000;
    const params = {onSubmit: QRRefundCreates, isOtp: false};
    triggerAuth(defaultAmount, params);
  },
  validate: (values) => ({
    refundAmount: validateNumber(values.refundAmount),
    refundCount: validateNumber(values.refundCount) || validateRefundCount(values.refundCount)
  })
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', ''),
  merchant: result(state, 'qrMerchant', []),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  QRRefundRes: (merchantId) => dispatch(getRefundCode(merchantId)),
  setMerchant: (merchantList) => dispatch(change('QRRefundCreate', 'merchantList', merchantList)),
});

const QRRefundCreateForm = reduxForm(formConfig)(QRRefundCreate);

class QRRefundCreatePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    merchant: PropTypes.array,
    QRRefundRes: PropTypes.func,
    triggerAuth: PropTypes.func,
    setMerchant: PropTypes.func,
  };

  componentDidMount () {
    const {setMerchant, navigation} = this.props;
    const data = result(navigation, 'state.params', '');
    setMerchant(result(data, 'merchantId', ''));
  }

  QRRefundCreates = () => {
    const {QRRefundRes, navigation} = this.props;
    const merchantId = result(navigation, 'state.params.merchantId', '');
    QRRefundRes(merchantId);
  }

  render () {
    const {merchant, navigation, dispatch, triggerAuth} = this.props;
    return <QRRefundCreateForm navigation={navigation} triggerAuth={triggerAuth} QRRefundCreates={this.QRRefundCreates} dispatch={dispatch} merchant={merchant} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRRefundCreatePage);
