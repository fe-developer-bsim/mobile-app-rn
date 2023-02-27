import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, ScrollView} from 'react-native';
import styles from './TransactionsFilter.styles';
import {Field} from 'redux-form';
import Touchable from '../Touchable.component';
import {CheckBox, SinarmasButton, SinarmasPickerBoxNew, RadioButton, DatePickerNew} from '../../components/FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {noop, result} from 'lodash';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import customCheckedImage from '../../assets/images/checkbox-selected.png';
import customUncheckedImage from '../../assets/images/checkbox-unselected.png';
import customCheckedDisabledImage from '../../assets/images/checkbox-selected-disabled.png';

class TransactionsFilter extends React.Component {
  static propTypes = {
    rangeOptions: PropTypes.array,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    isCheckboxDisabled: PropTypes.bool,
    invalid: PropTypes.bool,
    filterOptions: PropTypes.array,
    selectedFilter: PropTypes.string,
    email: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    filterText: PropTypes.string,
    updateDownloadField: PropTypes.func,
    updateSendEmailField: PropTypes.func,
    formValues: PropTypes.object, 
    showAlert: PropTypes.func, 
    alertStatus: PropTypes.bool,
  }

  monthSelection = () => {
    const {rangeOptions = []} = this.props;
    return (
      <View style={styles.formInputWrapper}>
        <Field
          name='selectedRange'
          component={SinarmasPickerBoxNew}
          itemList={rangeOptions}
          labelKey='label' 
          textPickerStyle={styles.pickerText} 
          arrowPickerStyle={styles.darkBlueArrow}/>
        <View style={styles.alertContainer}>
          <SimasIcon name='input-error' size={10} style={styles.alertIcon} />
          <Text style={styles.alertText}>{language.TRANSACTION_FILTER__MONTH_ALERT}</Text>
        </View>
        <View style={styles.alertContainer}>
          <SimasIcon name='input-error' size={10} style={styles.alertIcon} />
          <Text style={styles.alertText}>{language.TRANSACTION_FILTER__MONTH_ALERT_2}</Text>
        </View>
      </View>
    );
  }

  dateRangeSelection = () => {
    const {minDate, maxDate} = this.props;
    return (
      <View style={styles.formInputWrapper}>
        <View style={{flexDirection: 'row'}}>
          <Field
            name='selectedStartDate'
            component={DatePickerNew}
            label='From'
            multipleInRow={true}
            icon='arrow' 
            darkBlueText={true}
            arrowDown={true}
            transactionsFilter={true}
            minimumDate={minDate}
            maximumDate={maxDate}
            checkPristine={true}
            showDay={false}
            showInitialDate={true}/>
          <View style={styles.rowSeparator}/>
          <Field
            name='selectedEndDate'
            component={DatePickerNew}
            label='To'
            multipleInRow={true}
            darkBlueText={true}
            arrowDown={true}
            icon='arrow' 
            transactionsFilter={true}
            showDay={false}
            minimumDate={minDate}
            maximumDate={maxDate}
            checkPristine={true}
            showInitialDate={true}/>
        </View>
        <View style={styles.alertContainer}>
          <SimasIcon name='input-error' size={10} style={styles.alertIcon} />
          <Text style={styles.alertText}>{language.TRANSACTION_FILTER__DATE_RANGE_ALERT }</Text>
        </View>
      </View>
    );
  }

  updateDownloadCheckBox = (value) => () => {
    const {updateDownloadField} = this.props;
    updateDownloadField(value);
  }

  updateSendEmailCheckBox = (value) => () => {
    const {updateSendEmailField} = this.props;
    updateSendEmailField(value);
  }

  changeShowAlert = (value) => () => {
    const {showAlert} = this.props;
    showAlert(value);
  }

  render () {
    const {submitting, handleSubmit = noop, isCheckboxDisabled = false, invalid, filterOptions = [], selectedFilter, email = '', formValues, alertStatus, filterText} = this.props;
    const checkboxProps = {checkboxStyle: styles.checkboxStyle, containerStyle: styles.checkboxContainerStyle, newCheckBoxImage: true};
    const showMonths = selectedFilter === 'selectMonth';
    const showDateSelection = selectedFilter === 'selectDateRange';
    const downloadPdf = result(formValues, 'downloadPdf', false);
    const sendToEmail = result(formValues, 'sendToEmail', false);
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Modal
          animationType='none'
          transparent={true}
          visible={alertStatus}
          onRequestClose={this.changeShowAlert(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.alertHeader}>{language.TRANSACTION_FILTER__ALERT_HEADER}</Text>
              <Text style={styles.alertContent}>{language.TRANSACTION_FILTER__ALERT_CONTENT} {filterText} {language.TRANSACTION_FILTER__ALERT_CONTENT2}</Text>
              <SinarmasButton text={language.GENERIC__YES} style={styles.alertButtonStyle} onPress={wrapMethodInFunction(handleSubmit)} />
              <Touchable onPress={this.changeShowAlert(false)}>
                <Text style={styles.alertCancel}>{language.GENERIC__CANCEL}</Text>
              </Touchable>
            </View>
          </View>
        </Modal>

        <View>
          <Text style={styles.dropdownLabel}>{language.TRANSACTION_FILTER__FILTER_BY_DATE}</Text>
          <View style={styles.radioButtonContainer}>
            <Field
              name='selectedFilter'
              component={RadioButton}
              options={filterOptions}
              transactionsFilter={true}
              showMonths={showMonths}
              showDateSelection={showDateSelection}
              monthSelection={this.monthSelection}
              dateRangeSelection={this.dateRangeSelection}
              onSubmit={this.changeShowAlert(false)} />
          </View>
          <Text style={styles.dropdownLabel}>{language.TRANSACTION_FILTER__EXPORT_FILE}<Text style={styles.alertText}>(optional)</Text></Text>
          <View style={styles.checkboxOptionContainer}>
            <Touchable style={styles.reduxContainer} onPress={this.updateDownloadCheckBox(!downloadPdf)} disabled={isCheckboxDisabled}>
              <View>
                <Text style={styles.checkboxLabelStyle}>{language.TRANSACTION_FILTER__DOWNLOAD_PDF}</Text>
                <Text style={styles.alertText}>{language.TRANSACTION_FILTER__MONTH_PASSWORD}</Text>
              </View>
              <Field name='downloadPdf' component={CheckBox} label={''} disabled={isCheckboxDisabled} customCheckedImage={isCheckboxDisabled ? customCheckedDisabledImage : customCheckedImage} customUncheckedImage={customUncheckedImage} {...checkboxProps} />
            </Touchable>
            <View style={styles.greyLine} />
            <Touchable style={styles.reduxContainer} onPress={this.updateSendEmailCheckBox(!sendToEmail)}>
              <View>
                <Text style={styles.checkboxLabelStyle}>{language.TRANSACTION_FILTER__MAIL_SEND}</Text>
                <Text style={styles.alertText}>{email}</Text>
              </View>
              <Field name='sendToEmail' component={CheckBox} label={''} customCheckedImage={customCheckedImage} customUncheckedImage={customUncheckedImage} {...checkboxProps} />
            </Touchable>
          </View>
        </View>

        <View style={styles.infoBox}>
          <SimasIcon name='caution-circle' style={styles.infoBoxIcon} size={28} />
          <Text style={styles.infoBoxText}>{language.TRANSACTION_FILTER_INFO_BOX}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton
            disabled={submitting || invalid || selectedFilter === ''}
            text={showMonths ? language.TRANSACTION_FILTER__EXPORT_BUTTON : language.TRANSACTION_FILTER__FILTER_BUTTON}
            buttonType='primary'
            style={styles.buttonStyle}
            disabledStyle={styles.disabledButtonStyle}
            onPress={downloadPdf === true ? this.changeShowAlert(true) : wrapMethodInFunction(handleSubmit)} />
        </View>
      </ScrollView>
    );
  }
}

export default TransactionsFilter;
