import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import GenerateCodeTimeout from '../../components/GenerateCodeJourney/GenerateCodeTimeout.component';
import {generateCode} from '../../state/thunks/generateCode.thunks';
import {result} from 'lodash';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'GenerateCodeTimeout',
  destroyOnUnmount: false,
  onSubmit: (value, dispatch, {navigation, triggerAuth, genCode}) => {
    const isLogin = result(navigation, 'state.params.isLogin', false);
    const code = result(navigation, 'state.params.code', '');
    const payload = result(navigation, 'state.params.payload', '');
    const tipeCode = result(navigation, 'state.params.tipeCode', '');
    const amount = result(payload, 'amount', 0);
    const params = {
      onSubmit: genCode('text', code, isLogin, payload),
      amount: amount,
      isOtp: false
    };
    if (isLogin) {
      dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'Landing'}),
        ]
      }));
      triggerAuth(params, amount);
    } else {
      if (tipeCode) {
        dispatch(genCode('', code, isLogin, {}, tipeCode));
      } else {
        dispatch(genCode('', code, isLogin));
      }
    }
  }
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  generateNewCode: (title, val, status) => () => {
    dispatch(generateCode(title, val, status));
  },
  triggerAuth: (params, amount) => dispatch(triggerAuthNavigate('lkd', amount, true, 'AuthDashboard', params)),
  genCode: (title, val, status, payload, tipeCode) => () => dispatch(generateCode(title, val, status, payload, tipeCode)),
  finish: () => {
    dispatch(NavigationActions.back());
  },
});

const DecoratedForm = reduxForm(formConfig)(GenerateCodeTimeout);

class GenerateCodePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateNewCode: PropTypes.func,
    triggerAuth: PropTypes.func,
    genCode: PropTypes.func,
    finish: PropTypes.func,
  };

  render () {
    const {navigation = {}, generateNewCode, triggerAuth, genCode, finish} = this.props;
    return <DecoratedForm
      navigation = {navigation}
      generateNewCode= {generateNewCode}
      triggerAuth= {triggerAuth}
      genCode= {genCode}
      finish={finish}
    />;
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodePage);
