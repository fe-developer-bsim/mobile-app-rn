import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull, currencyFormatter} from '../../utils/transformer.util';
import {map, noop, result, isEmpty} from 'lodash';
import {ConnectedEFormComponent} from './RenderDigitalEForm.component';
import {Text, View} from 'react-native';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actionCreators from '../../state/actions/index.actions';
import {digitalEForm} from '../../utils/api.util';
import {getSimulationDetail} from '../../state/thunks/digitalAccountOpening.thunks';

class DigitalEFormMortgageSimulation extends Component {
  static propTypes = {
    page: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool, 
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    dispatch: PropTypes.func,
    cifCode: PropTypes.string,
    showError: PropTypes.func,
    currentLanguage: PropTypes.string,
    simulationDetail: PropTypes.array
  }

  state = {
    show: false,
    showLoader: false,
    loadingError: false
  };

  calculate = () => {
    const {dispatch, formValues, cifCode, showError} = this.props;
    const requestValue = map(formValues, (obj, key) => ({code: key, value: obj}));
    const requestData = {cifCode, dataSubmit: requestValue};
    const targetUrl = 'calculateSimulation';
    const type = 'post';
    const payload = {requestData, targetUrl, type};
    this.setState({showLoader: true, loadingError: false});
    digitalEForm(payload, dispatch).
      then((res) => {
        this.setState({showLoader: false, show: true});
        const data = result(res, 'data.data', []);
        dispatch(getSimulationDetail(data));
      }).
      catch((err) => {
        const errMessage = result(err, 'data.responseMessage', '');
        this.setState({showLoader: false, loadingError: true});
        dispatch(showError(errMessage));
      });
  }

  render () {
    const {page, formValues, invalid, submitting, handleSubmit = noop, simulationDetail} = this.props;
    const {header, formName, fields = []} = page;
    const fixedRate = result(formValues, '4~8~1.fixedInterest', '');
    const fixedPeriod = parseInt(result(formValues, '4~8~1.fixedPeriod', '')) / 12;
    const floatingRate = result(formValues, '4~8~1.floatingInterest', '');
    const tenor = parseInt(result(formValues, '4~8~6', ''));
    const floatingPeriod = parseInt(tenor) - parseInt(fixedPeriod);

    const fixedPeriodUntil = fixedPeriod * 12;
    const floatPeriodFrom = fixedPeriodUntil + 1;
    const floatPeriodUntil = tenor * 12;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} keyboardShouldPersistTaps='handled' extraScrollHeight enableOnAndroid={true}>
        <View style={styles.container}>
          <View>
            {
              isEmptyOrNull(header) ? null :
                typeof (header) === 'object' ? 
                  map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
                  :
                  <Text style={styles.mainTitleText}>{language[header]}</Text>
            }

            {
              map(fields, (component) => (
                <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
              ))
            }
            <View style={styles.buttonCalcContainer}>
              <View style={styles.buttonLeft}>
                <SinarmasButton text={language.MORTGAGELOAN__CALCULATE} disabled={invalid || submitting} onPress={this.calculate}/>
              </View>
              <View style={styles.buttonRight} />
            </View>
          </View>
        </View>

        {this.state.show ? 
          <View>
            <View style={styles.greyFullLine}/>

            <View style={styles.bodyContainerWithTerms}>
              <Text style={styles.mainTitleText}>{language.MORTGAGELOAN__DETAIL_TITLE}</Text>
              <View style={styles.simulationDetailContainer}>
                <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__LOAN_PLAFON}</Text>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~7', ''))}</Text>
              </View>
              <View style={styles.simulationDetailContainer}>
                <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__DP_PERCENT}</Text>
                <Text style={styles.txtInfoTop}>{result(formValues, '4~8~8', '')} %</Text>
              </View>
              {isEmpty(simulationDetail) ? null : simulationDetail.map(this.renderDetail)}
              <View style={styles.simulationDetailContainer}>
                <View style={styles.columnContainer}>
                  <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__MONTHLY_FIXED_PERIOD}</Text>
                  <Text style={styles.txtInfoBottom}>FIxed rated {fixedRate}% for {fixedPeriod} years (month 1 - {fixedPeriodUntil})</Text>
                </View>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~9', ''))}</Text>
              </View>
              <View style={styles.simulationDetailContainer}>
                <View style={styles.columnContainer}>
                  <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__MONTHLY_FLOATING_PERIOD}</Text>
                  <Text style={styles.txtInfoBottom}>Floating rated {floatingRate}% for {floatingPeriod} years (month {floatPeriodFrom} - {floatPeriodUntil})</Text>
                </View>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~10', ''))}</Text>
              </View>
            </View>

            <View style={styles.greyFullLine}/>

            <View style={styles.bodyContainerWithTerms}>
              <Text style={styles.mainTitleText}>{language.MORTGAGELOAN__CREDIT_FEE}</Text>
              <View style={styles.simulationDetailContainer}>
                <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__PROVISION_FEE}</Text>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~11', ''))}</Text>
              </View>
              <View style={styles.simulationDetailContainer}>
                <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__ADMIN_FEE}</Text>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~12', ''))}</Text>
              </View>
              <View style={styles.simulationDetailContainer}>
                <View style={styles.columnContainer}>
                  <Text style={styles.txtInfoTop}>{language.MORTGAGELOAN__ESTIMATED_COST}</Text>
                  <Text style={styles.txtInfoBottom}>{language.MORTGAGELOAN__ESTIMATED_COST_INFO}</Text>
                </View>
                <Text style={styles.txtInfoTop}>Rp {currencyFormatter(result(formValues, '4~8~13', ''))}</Text>
              </View>
            </View>


            <View style={styles.buttonWrapper}>
              <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
                <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
              </SinarmasButton>
            </View>
          </View>
          : null
        }
      </KeyboardAwareScrollView>);
  }
}

const loanSimulationState = (state) => ({
  formValues: result(state, 'form.DigitalEForm.values', {}),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  simulationDetail: result(state, 'simulationDetail', [])
});

const loanSimulationDispatch = (dispatch) => ({
  showError: (errMsg) => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      text: errMsg,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  }
});

const ConnectedEFormSimulation = connect(loanSimulationState, loanSimulationDispatch)(DigitalEFormMortgageSimulation);

export default ConnectedEFormSimulation;