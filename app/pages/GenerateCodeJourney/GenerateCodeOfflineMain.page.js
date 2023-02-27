import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import GenerateCodeOfflineMain from '../../components/GenerateCodeJourney/GenerateCodeOfflineMain.component';
import {goToGenerateMain, generateCode} from '../../state/thunks/generateCode.thunks';
import {result} from 'lodash';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'GenerateCodeOfflineMain',
  destroyOnUnmount: false,
  onSubmit: (value, dispatch, {navigation, triggerAuth, genCode}) => {
    const code = result(navigation, 'state.params.code', '');
    const payload = result(navigation, 'state.params.payload', '');
    const amount = result(payload, 'amount', 0);
    const params = {
      onSubmit: genCode('text', code, true, payload),
      amount: amount,
      isOtp: false
    };
    triggerAuth(params, amount);
  }
};

const mapStateToProps = (state) => ({
  transactionTypeLKD: result(state, 'config.transactionTypeLKD', {})
});

const mapDispatchToProps = (dispatch) => ({
  toGenerateMain: (tipe, update) => () => {
    dispatch(goToGenerateMain(tipe, update));
  },
  generateNewCode: (title, val, status) => () => {
    dispatch(generateCode(title, val, status));
  },
  triggerAuth: (params, amount) => dispatch(triggerAuthNavigate('lkd', amount, true, 'AuthDashboard', params)),
  genCode: (title, val, status, payload) => () => dispatch(generateCode(title, val, status, payload)),
});

const DecoratedForm = reduxForm(formConfig)(GenerateCodeOfflineMain);

class GenerateCodePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    toGenerateMain: PropTypes.func,
    generateNewCode: PropTypes.func,
    triggerAuth: PropTypes.func,
    genCode: PropTypes.func,
    transactionTypeLKD: PropTypes.object,
  };

  render () {
    const {navigation = {}, toGenerateMain, generateNewCode, triggerAuth, genCode, transactionTypeLKD} = this.props;
    const paramActiveMenu = result(navigation, 'state.params.paramActiveMenu', {});
    return <DecoratedForm
      navigation = {navigation}
      goToGenerateMain= {toGenerateMain}
      generateNewCode= {generateNewCode}
      triggerAuth= {triggerAuth}
      genCode= {genCode}
      paramActiveMenu= {paramActiveMenu}
      transactionTypeLKD={transactionTypeLKD}
    />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodePage);
