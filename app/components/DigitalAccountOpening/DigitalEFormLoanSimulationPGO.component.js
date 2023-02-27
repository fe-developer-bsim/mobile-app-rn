import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull} from '../../utils/transformer.util';
import {map, noop, result, isEmpty} from 'lodash';
import {ConnectedEFormComponent} from './RenderDigitalEForm.component';
import {Text, View} from 'react-native';
import {change} from 'redux-form';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {currencyFormatter} from '../../utils/transformer.util';
import Slider from 'react-native-slider';

class DigitalEFormLoanSimulation extends Component {
  static propTypes = {
    page: PropTypes.func,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool, 
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    setAmountValue: PropTypes.func,
    prefilledValue: PropTypes.func
  }

  state = {
    amount: 1700000,
  };

  sliderChange = (value) => {
    const {formValues} = this.props;
    const period = result(formValues, '4~1~3.value', 0);
    const totalInterest = (value * 0.7 / 100) * period;
    const amountGet = value - totalInterest;
    const amountPay = value;
    const data = {totalInterest, amountGet, amountPay};
    this.props.prefilledValue(data);
    this.props.setAmountValue(value);
    this.setState({amount: value});
  };

  componentWillMount () {
    const {initialValues} = this.props;
    const isNewApply = result(initialValues, 'isNewApply', true);
    if (!isNewApply) {
      this.props.setAmountValue(this.state.amount);
    }
  }

  render () {
    const {page, formValues, initialValues, invalid, submitting, handleSubmit = noop} = this.props;
    const {header, formName, fields = []} = page;
    const isNewApply = result(initialValues, 'isNewApply', true);
    const minAmount = result(initialValues, 'minAmount', 0);
    const maxAmount = result(initialValues, 'maxAmount', 0);
    const amount = isNewApply ? result(initialValues, '4~1~1', 0) : result(formValues, '4~1~1', 0);
    const period = result(formValues, '4~1~3', {});
    const loanInterest = isNewApply ? result(initialValues, '4~1~4', 0) : result(formValues, '4~1~4', 0);
    const amountGet = isNewApply ? result(initialValues, '4~1~5', 0) : result(formValues, '4~1~5', 0);
    const amountPay = isNewApply ? result(initialValues, '4~1~6', 0) : result(formValues, '4~1~6', 0);

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} keyboardShouldPersistTaps='handled'>
        <View>
          {
            isEmptyOrNull(header) ? null :
              typeof (header) === 'object' ? 
                map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
                :
                <Text style={styles.mainTitleText}>{language[header]}</Text>
          }
          { isNewApply ?
            <View style={styles.loanAmountContainer}>
              <View>
                <Text style={styles.rpText}>Rp</Text> 
              </View>
              <View>
                <Text style={styles.amountText}>{currencyFormatter(amount)}</Text> 
              </View>
            </View>
            :
            <View>
              <View style={styles.loanAmountContainer}>
                <View>
                  <Text style={styles.rpText}>Rp</Text> 
                </View>
                <View>
                  <Text style={styles.amountText}>{currencyFormatter(this.state.amount)}</Text> 
                </View>
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  value={this.state.amount}
                  onValueChange={this.sliderChange}
                  minimumValue={minAmount}
                  maximumValue={maxAmount}
                  step={100000}
                  minimumTrackTintColor= '#ED1D25'
                  maximumTrackTintColor= '#ffcccc'
                  thumbTintColor= '#ED1D25'
                />
              </View> 

              <View style={styles.rowContainer}>
                <View style={styles.minimumAmount}>
                  <Text style={styles.amount}>Rp {currencyFormatter(minAmount)}</Text> 
                </View>
                <View style={styles.maximumAmount}>
                  <Text style={styles.amount}>Rp {currencyFormatter(maxAmount)}</Text> 
                </View>
              </View>
            </View>
          }

          {
            map(fields, (component) => (
              <View style={styles.pt20}>
                <View style={styles.rowCenter}>
                  <View>
                    <Text style={styles.loanLeftText}>{language[component.placeholder]}</Text>
                  </View>
                  <View style={styles.fieldComponentLoan}>
                    <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
                  </View>
                </View>
                <View style={styles.borderGreyLine}/>                
              </View>
            ))
          }
          
          {!isEmpty(period) ? 
            <View>
              <View style={styles.pt20}>
                <View style={styles.rowCenterFee}>
                  <View style={styles.columnCenter}>
                    <Text style={styles.loanLeftText}>{language.LOAN__ESTIMATED_TOTAL_INTEREST}</Text>
                    <Text style={styles.loanLeftText}>{language.LOAN__INTEREST_AMOUNT}</Text>                  
                  </View>
                  <View>
                    <Text style={styles.loanRightText}>Rp {currencyFormatter(loanInterest)}</Text>
                  </View>
                </View>
                <View style={styles.borderGreyLine}/>
              </View>

              <View style={styles.pt20}>
                <View style={styles.rowCenter}>
                  <View>
                    <Text style={styles.loanLeftText}>{language.LOAN__AMOUNT_GET}</Text>              
                  </View>
                  <View>
                    <Text style={styles.loanRightTextRed}>Rp {currencyFormatter(amountGet)}</Text>
                  </View>
                </View>
                <View style={styles.borderGreyLine}/>
              </View>

              <View style={styles.pt20}>
                <View style={styles.rowCenter}>
                  <View>
                    <Text style={styles.loanLeftText}>{language.LOAN__YOU_WILL_PAY}</Text>              
                  </View>
                  <View>
                    <Text style={styles.loanRightTextRed}>Rp {currencyFormatter(amountPay)}</Text>
                  </View>
                </View>
                <View style={styles.borderGreyLine}/>
              </View>
            </View>
            : null
          }
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSimulationState = (state) => ({
  formValues: result(state, 'form.DigitalEForm.values', {})
});

const loanSimulationDispatch = (dispatch) => ({
  prefilledValue: (data) => {
    const totalInterest = result(data, 'totalInterest', 0);
    const amountGet = result(data, 'amountGet', 0);
    const amountPay = result(data, 'amountPay', 0);
    dispatch(change('DigitalEForm', '4~1~4', totalInterest));
    dispatch(change('DigitalEForm', '4~1~5', amountGet));    
    dispatch(change('DigitalEForm', '4~1~6', amountPay));
  },
  setAmountValue: (amount) => {
    dispatch(change('DigitalEForm', '4~1~1', amount));
  }
});

const ConnectedEFormSimulation = connect(loanSimulationState, loanSimulationDispatch)(DigitalEFormLoanSimulation);

export default ConnectedEFormSimulation;