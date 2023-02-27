import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull, currencyFormatter} from '../../utils/transformer.util';
import {map, noop, result, isEmpty} from 'lodash';
import {Text, View} from 'react-native';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {getChoosenPage} from '../../state/thunks/digitalAccountOpening.thunks';

class DigitalEFormMortgageSummary extends Component {
  static propTypes = {
    page: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool, 
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToRecalculate: PropTypes.func
  }

  renderSummary = (item) => {
    const {currentLanguage} = this.props;
    const type = result(item, 'type', '');
    const title = currentLanguage === 'id' ? result(item, 'titleID', '') : result(item, 'titleEN', '');
    const value = type === 'currency' ? 'Rp ' + currencyFormatter(result(item, 'value', '')) : result(item, 'value', '');
  
    return (
      <View style={styles.summaryDetailContainer}>
        <Text style={styles.txtInfoTop}>{title}</Text>
        <Text style={styles.txtInfoTopRight}>{value}</Text>
      </View>
    );
  }

  render () {
    const {page, initialValues, invalid, submitting, handleSubmit = noop, goToRecalculate} = this.props;
    const {header, warning} = page;
    const dataHouse = result(initialValues, 'dataHouse', []);
    const dataAddress = result(initialValues, 'dataAddress', []);

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} keyboardShouldPersistTaps='handled' extraScrollHeight enableOnAndroid={true}>
        <View>
          {
            isEmptyOrNull(header) ? null :
              typeof (header) === 'object' ? 
                map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
                :
                <Text style={styles.mainTitleText}>{language[header]}</Text>
          }
          <View style={styles.mb30}>
            {isEmpty(dataHouse) ? null : dataHouse.map(this.renderSummary)}
          </View>
          {isEmpty(dataAddress) ? null : dataAddress.map(this.renderSummary)}
          { 
            isEmptyOrNull(warning) ? 
              null :
              <View style={styles.boxedInfo}>
                <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
                <View>
                  {
                    typeof (warning) === 'object' ? 
                      map(warning, (warningText) => <Text style={styles.info}>{warningText}</Text>)
                      :
                      <Text style={styles.info}>{language[warning]}</Text>
                  }
                </View>
              </View>
          }
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.photoTextContainer}>
            <Touchable onPress={goToRecalculate}>
              <Text style={styles.photoText}>RECALCULATE</Text>
            </Touchable>
          </View>

          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSummaryState = (state) => ({
  formValues: result(state, 'form.DigitalEForm.values', {}),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});

const loanSummaryDispatch = (dispatch) => ({
  goToRecalculate: () => {
    const item = {
      'isOnePage': true,
      'titleEN': 'Loan Simulation',
      'titleID': 'Simulasi Pinjaman',
      'sectionCode': '4~8~1',
      'isSubmit': true,
      'isDisabled': false.valueOf,
      'isRecalculate': true
    };
    dispatch(getChoosenPage(item));
  }
});


const ConnectedEFormSimulation = connect(loanSummaryState, loanSummaryDispatch)(DigitalEFormMortgageSummary);

export default ConnectedEFormSimulation;