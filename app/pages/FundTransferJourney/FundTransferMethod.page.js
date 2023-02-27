import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import FundTransferMethod from '../../components/FundTransferJourney/FundTransferMethod.component';
import result from 'lodash/result';
import {getTransferPossibleAccounts, getPayeeType, getOptimalTransferMethods, transformToTransferTypeRadioDataWithAmount, getTransferTimeMethod} from '../../utils/transformer.util';
import {confirmTransfer} from '../../state/thunks/fundTransfer.thunks';
import find from 'lodash/find';
import lowerCase from 'lodash/lowerCase';

const formConfig = {
  form: 'fundTransferMethod',
  destroyOnUnmount: false,
  initialValues: {
    transferMode: ''
  },
};

const DecoratedFundTransferMethod = reduxForm(formConfig)(FundTransferMethod);

class FundTransferMethodPage extends Component {
  static propTypes = {
    goToSummary: PropTypes.func,
    setTransferMode: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    gapTimeServer: PropTypes.number,
    amount: PropTypes.string,
    formValuesPayment: PropTypes.object,
    formValuesSchedule: PropTypes.object,
    timeConfig: PropTypes.object,
    chargeList: PropTypes.array
  };

  state = {
    paymentMethods: []
  }

  getPaymentMethods = (payee) => {
    if (getPayeeType(payee) === 'internal') {
      return [{
        type: payee.transferType || 'inbank',
        when: 'instantly'
      }];
    } else {
      const appTime = new Date();
      const gapTime = result(this, 'props.gapTimeServer', 0);
      const serverTimeNew = String(moment(appTime).add(gapTime, 'seconds').format('HH:mm'));
      return getOptimalTransferMethods(
        moment(result(this, 'props.timeConfig.cutOffTimeSkn'), 'HH:mm'),
        moment(result(this, 'props.timeConfig.cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'), // TODO get currentTime from server
        moment(result(this, 'props.timeConfig.coreBusinessDate')),
        moment('00:00', 'HH:mm')
      );
    }
  }

  componentWillMount () {
    const {setTransferMode, navigation, amount, chargeList, gapTimeServer, timeConfig} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const paymentMethods = this.getPaymentMethods(payee);
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const radioOptions = transformToTransferTypeRadioDataWithAmount(paymentMethods, amount, transferChargeConfig, payee);
    const method = result(find(radioOptions, {disabled: false}), 'value');
    const serverTimeNew = String(moment(new Date()).add(gapTimeServer, 'seconds').format('HH:mm'));
    const bifastDefault = lowerCase(result(payee, 'biFastEnabled', '')) === 'yes' || lowerCase(result(payee, 'bank.biFastEnabled', '')) === 'yes';
    if (bifastDefault) {
      if (radioOptions[0].disabled) {
        this.setState({paymentMethods},
          () => setTransferMode('skn')
        );
      } else {
        this.setState({paymentMethods},
          () => setTransferMode('bifast')
        );
      }
    } else {
      if (method === 'bifast' &&
        getTransferTimeMethod(moment(result(timeConfig, 'cutOffTimeSkn'), 'HH:mm'),
          moment(result(timeConfig, 'cutOffTimeRtgs'), 'HH:mm'),
          moment(serverTimeNew, 'HH:mm'),
          moment(result(timeConfig, 'coreBusinessDate')),
          moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm'),
          moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm'),
          'skn') === 'today') {
        this.setState({paymentMethods},
          () => setTransferMode('skn')
        );
      } else {
        if (radioOptions[2].disabled) {
          this.setState({paymentMethods},
            () => setTransferMode('skn')
          );
        } else {
          this.setState({paymentMethods},
            () => setTransferMode('network')
          );
        }
      }
    }
  }

  render () {
    const {navigation, accountList, formValues, goToSummary, appConfig, amount, formValuesPayment, timeConfig, chargeList} = this.props;
    const formValuesSchedule = result(navigation, 'state.params.formValuesSchedule', {});
    const values = {...formValuesSchedule, ...formValues, ...formValuesPayment};
    const payee = result(navigation, 'state.params.payee', {});
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferChargeConfig = result(chargeList, 'transfer', []);
    return (
      <DecoratedFundTransferMethod accountList={accountList} onNextPress={goToSummary(payee, values)} payee={payee} paymentMethods={this.state.paymentMethods}
        formValues={formValues} tokenConfig={tokenConfig} transferChargeConfig={transferChargeConfig} checkboxChange={this.checkboxChange}
        amount={amount} timeConfig={timeConfig}/>
    );
  }
}

const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.fundTransferMethod.values', {}),
  appConfig: result(state, 'config', {}),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  amount: result(state, 'form.fundTransfer.values.amount'),
  formValuesPayment: result(state, 'form.fundTransfer.values', {}),
  timeConfig: result(state, 'timeConfig', {}),
  chargeList: result(state, 'chargeList', [])
});

const mapDispatchToProps = (dispatch) => ({
  setTransferMode: (mode) => {
    dispatch(change('fundTransferMethod', 'transferMode', mode));
  },
  goToSummary: (payee, formValues) => () => {
    dispatch(confirmTransfer(formValues, payee, 'fundTransfer'));
  }
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(FundTransferMethodPage);
export default connectedTransfer;
