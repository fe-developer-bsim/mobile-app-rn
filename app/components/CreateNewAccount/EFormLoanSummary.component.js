import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {map, noop, result, isEmpty} from 'lodash';
import {ConnectedEFormComponent} from './RenderEForm.component';
import {Text, View, ImageBackground, Platform} from 'react-native';
import styles from './EForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {currencyFormatter} from '../../utils/transformer.util';
import LoanAmount from '../../assets/images/loan-amount.png';
import LoanDetail from '../../assets/images/loan-detail.png';
import LoanRepayment from '../../assets/images/loan-repayment.png';
import Touchable from '../Touchable.component'; 
import SimasIcon from '../../assets/fonts/SimasIcon';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import * as actionCreators from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {submitFormPGO} from '../../state/thunks/EForm.thunks';
import moment from 'moment';
import {sendTrackingFivePointTwo, sendTrackingFivePointFive, sendTrackingFivePointFour, getContactForLoan, getInstalledApp} from '../../state/thunks/loan.thunks';

class EFormLoanSummary extends Component {
  static propTypes = {
    page: PropTypes.func,
    initialValues: PropTypes.object,
    showDisclaimer: PropTypes.func,
    goToTerms: PropTypes.func,
    toogleCheckbox: PropTypes.func,
    submitPGO: PropTypes.func,
    form: PropTypes.string,
    accountNo: PropTypes.object,
    getContactForLoan: PropTypes.func
  }

  state = {
    checked: false,
    disable: false
  }

  toogleCheckbox = (checked) => {
    this.setState({checked, disable: checked});
  }

  componentWillMount () {
    this.props.getContactForLoan();
  }

  render () {
    const {page, form, initialValues, submitPGO = noop, showDisclaimer, goToTerms, accountNo} = this.props;

    const isDataEmpty = !isEmpty(accountNo);
    const {formName, fields} = page;
    const amount = result(initialValues, '6~3~1', 0);
    const period = result(initialValues, '6~3~3', 0);
    const amountGet = result(initialValues, '6~3~4', 0);
    const estTotalInterest = result(initialValues, '6~3~5', 0);
    const needToPay = result(initialValues, '6~3~6', 0);
    const date = new Date;
    const dateToday = moment(date).format('DD MMM YYYY');

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} keyboardShouldPersistTaps='handled'>
        <View>
          <View style={styles.summaryContainer}>
            <View style={styles.imgContainerAmount}>
              <ImageBackground source={LoanAmount} borderRadius={7} style={styles.imageSummary}>
                <Text style={styles.amountSummaryText}>{language.LOAN__AMOUNT}</Text>
                <Text style={styles.amountSummarySubText}>Rp {currencyFormatter(amount)}</Text>
              </ImageBackground> 
            </View>

            <View style={styles.imgContainerDetail}>
              <ImageBackground source={LoanDetail} borderRadius={7} style={styles.imageSummary}>
                <View style={styles.ph20}>
                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentDetailText}>{language.LOAN__APPLICATION_DATE}</Text>
                    <Text style={styles.installmentDetailText}>{dateToday}</Text>
                  </View>

                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentDetailText}>{language.LOAN__PERIOD_SUMMARY}</Text>
                    <Text style={styles.installmentDetailText}>{period}</Text>
                  </View>
                </View>
              </ImageBackground> 
            </View>

            <View style={styles.imgContainerRepayment}>
              <ImageBackground source={LoanRepayment} borderRadius={7} style={styles.imageSummary} >
                <View style={styles.ph20}>
                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentEstimatedText}>{language.LOAN__AMOUNT_GET}</Text>
                    <Text style={styles.installmentEstimatedText}>Rp {currencyFormatter(amountGet)}</Text>    
                  </View>
                  <View style={styles.inlineFieldDetail}>
                    <View style={styles.rowFieldAgreement}>
                      <Text style={styles.installmentEstimatedText}>{language.LOAN__ESTIMATED_TOTAL_INTEREST}</Text>
                      <Touchable style={styles.icon} onPress={showDisclaimer}>
                        <SimasIcon name={'caution-circle'} size={12} style={styles.iconInfo}/>
                      </Touchable>
                    </View>
                    <Text style={styles.installmentEstimatedText}>Rp {currencyFormatter(estTotalInterest)}</Text>    
                  </View>

                  <View style={styles.greyLineThin} /> 

                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentEstimatedText}>{language.LOAN__YOU_WILL_PAY}</Text>
                    <Text style={styles.installmentEstimatedTextBold}>Rp {currencyFormatter(needToPay)}</Text>    
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          <View style={styles.greyLineSummary} /> 

          {
            map(fields, (component) => (
              <View style={styles.phv20}>
                <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
              </View>
            ))
          }
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <View style={styles.boxTnC}>
            <View style={styles.rowHeader}>
              <View style={styles.tncContainer}>
                <Text style={styles.tncTxtTitle}>{language.LOAN_TERM_CONDITIONS}</Text>   
                <Touchable onPress={goToTerms}>         
                  <Text style={styles.tncTxt}>{language.LOAN_TERM_CONDITIONS_CONTENT} <Text style={styles.redText}>{language.LOAN_TERM_CONDITIONS_SUB}</Text></Text>
                </Touchable>
              </View>
              <View>
                <Touchable>
                  <CheckBox
                    onChange={this.toogleCheckbox}
                    uncheckedImage={RedCheckBox}
                    checkedImage={UnCheckBox}
                    label=''
                    checkboxStyle={styles.checkboxStyle}
                    checked={!this.state.checked} // somehow checked value is reversed
                  />
                </Touchable>
              </View>  
            </View>         
          </View>
          <SinarmasButton onPress={submitPGO(form)} disabled={!isDataEmpty || !this.state.disable}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSummaryState = (state) => ({
  accountNo: result(state, 'form.EForm.values.accountNo', {})
});

const loanSummaryDispatch = (dispatch) => ({
  showDisclaimer: () => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const goBack = () => {
      NavigationActions.back();
      hideAlert();
    };
    const sinarmasModalOptions = {
      heading1: language.LOAN_DISCLAIMER_TITLE,
      text: language.LOAN_DISCLAIMER,
      button1: 'OK',
      onButton1Press: goBack,
      onClose: hideAlert,
      button1Color: 'red',
      image: 'DISCLAIMER'
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  },
  goToTerms: () => {
    dispatch(NavigationActions.navigate({routeName: 'EFormLoanTnC'}));
  },
  submitPGO: (form) => () => {
    dispatch(submitFormPGO(form));
  },
  getContactForLoan: () => {
    setTimeout(() => {
      dispatch(sendTrackingFivePointTwo());
    }, 3000);
    setTimeout(() => {
      dispatch(sendTrackingFivePointFour());
    }, 6000);
    setTimeout(() => {
      dispatch(sendTrackingFivePointFive());
    }, 9000);
    setTimeout(() => {
      dispatch(getContactForLoan());
    }, 12000);
    if (Platform.OS === 'android') {
      setTimeout(() => {
        dispatch(getInstalledApp());
      }, 15000);
    }
  }
});

const ConnectedEFormSummary = connect(loanSummaryState, loanSummaryDispatch)(EFormLoanSummary);

export default ConnectedEFormSummary;