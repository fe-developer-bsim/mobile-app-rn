import React from 'react';
import PropTypes from 'prop-types';
import Authenticate from '../../components/Authenticate/Authenticate.component';
import {resendBillPayOTP} from '../../state/thunks/common.thunks';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {moreInfo, dontRecogniseNumber} from '../../state/thunks/common.thunks';
import {setNotLoading, hideSpinner} from '../../state/actions/index.actions';
import * as actionCreators from '../../state/actions/index.actions';
import isEmpty from 'lodash/isEmpty';
import {clearAndResetPasswordBurgerMenu} from '../../state/thunks/onboarding.thunks';

const formConfig = {
  form: 'AuthenticateForm',
  onSubmit: (values, dispatch, {onSubmit, resendBillPayOTP, transactionId}) => {
    dispatch(onSubmit());
    resendBillPayOTP(transactionId);
  }
};

const ConnectedForm = reduxForm(formConfig)(Authenticate);

class AuthenticatePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    config: PropTypes.array,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    formValues: PropTypes.object,
    changeEasyPin: PropTypes.func,
    moreInfo: PropTypes.func,
    dontRecogniseNumber: PropTypes.func,
    currentLanguage: PropTypes.object,
    setNotLoading: PropTypes.func,
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    dispatch: PropTypes.func,
    changeEasypin: PropTypes.func,
    mobileNumberMasking: PropTypes.string,
    isLogin: PropTypes.bool,
    forgotEasyPin: PropTypes.func,
  };

  componentWillMount () {
    const {setNotLoading} = this.props;
    setNotLoading();
  }


  gochangeEasyPin = (encryptedEasyPin, pin) => {
    const {changeEasypin, dispatch} = this.props;
    dispatch(actionCreators.savePinObm(pin));
    changeEasypin(encryptedEasyPin);
  }

  render () {

    const {navigation, moreInfo, dontRecogniseNumber, currentLanguage, dispatch, isLogin, forgotEasyPin} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const currentLang = result(currentLanguage, 'id', '');
    const {transRefNum, config, resendBillPayOTP, userId, userMobileNumber, formValues, changeEasypin, isOBMActive, mobileNumberMasking} = this.props;
    const mobileNum = isLogin ? userMobileNumber : mobileNumberMasking;
    const isRemittance = result(navigation, 'state.params.isRemittance', false);
    return <ConnectedForm userId={userId} {...navParams} config={config} transRefNum={transRefNum} resendBillPayOTP={resendBillPayOTP}
      userMobileNumber={mobileNum} mobileNumberMasking={mobileNumberMasking} formValues={formValues} changeEasyPin={this.gochangeEasyPin} moreInfo={moreInfo} dontRecogniseNumber={dontRecogniseNumber} currentLanguage={currentLang} isOBMActive={isOBMActive} dispatch={dispatch} changeEasypin={changeEasypin}
      forgotEasyPin={forgotEasyPin} isRemittance={isRemittance}/>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  resendBillPayOTP: (transactionId) => dispatch(resendBillPayOTP(transactionId)),
  changeEasypin: (encryptedEasyPin) => dispatch(change('AuthenticateForm', 'easypin', encryptedEasyPin)),
  moreInfo: () => dispatch(moreInfo()),
  dontRecogniseNumber: () => dispatch(dontRecogniseNumber()),
  setNotLoading: () => dispatch(setNotLoading()),
  hideSpinner: () => dispatch(hideSpinner()),
  dispatch: (action) => dispatch(action),
  forgotEasyPin: () => {
    dispatch(clearAndResetPasswordBurgerMenu());
  },
});
const mapStateToProps = ({transRefNum, config, user, form, currentLanguage, loginData}) => ({
  transRefNum, config: result(config, 'tokenConfig', []),
  userId: result(user, 'profile.customer.id', 0),
  userMobileNumber: result(user, 'profile.mobileNumberMasking', ''),
  formValues: result(form, 'AuthenticateForm.values'),
  isOBMActive: result(config, 'isOBMActive'),
  currentLanguage,
  mobileNumberMasking: result(loginData, 'data.ipassportData.ipassDataClient.profileScope.userLogin.mobileNumberMasking', ''),
  isLogin: !isEmpty(user),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatePage);
