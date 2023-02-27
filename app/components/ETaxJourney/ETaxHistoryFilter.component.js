import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import {getTaxList} from '../../utils/transformer.util';
import {SinarmasPickerBoxNew, DatePickerNew, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty, result} from 'lodash';
import styles from './ETaxHistoryFilter.styles';
import Touchable from '../../components/Touchable.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';

export const fields = {
  JENIS_PAJAK: 'jenisPajak',
  ID_BILLING: 'idBilling',
};

class EtaxHistoryFilter extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    billerAccount: PropTypes.func,
    handleSubmit: PropTypes.func,
    goBack: PropTypes.func,
    clearFitler: PropTypes.func,
    jenisPajak: PropTypes.array,
    getHistory: PropTypes.func,
    biller: PropTypes.object
  }

  state = {
    setDate: ''
  }

  changeDate = (selectedDate) => () => {
    this.setState({setDate: selectedDate});
  }

  clearFitler = () => () => {
    const {clearFitler} = this.props;
    this.setState({setDate: ''});
    clearFitler();
  }

  componentDidMount () {
    this.changeDate('Today');
  }

  render () {
    const {formValues, goBack, getHistory, biller} = this.props;
    const {setDate} = this.state;
    const isToday = setDate === 'Today';
    const isMonth = setDate === 'Month';
    const isRange = setDate === 'Range';
    const checkSelectedDate = isEmpty(setDate);
    const checkSelectMonth = isMonth && isEmpty(result(formValues, 'monthSelected', {}));
    const checkSelectRangeStart = isRange && isEmpty(result(formValues, 'dateStart', ''));
    const checkSelectRangeEnd = isRange && isEmpty(result(formValues, 'dateEnd', ''));
    const checkJenisPajak = isEmpty(result(formValues, 'jenisTransaksi', {}));
    const billerPeriod = result(biller, 'billPeriod', []);
    const jenisTransaksi = [{'label': 'Penerimaan Negara (MPN)', 'code': 123}];
    const transformJenisTransaksi = getTaxList(jenisTransaksi);
    const datePicker = getTaxList(billerPeriod);
    const todayDate = new Date();
    const minimumDate = new Date().setDate(todayDate.getDate() - 90);
    const minimumDateRaw = new Date(minimumDate);
    const maximumDate = new Date().setDate(todayDate.getDate());
    const maximumDateRaw = new Date(maximumDate);

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>
            <View style={styles.topContainer}>
              <Touchable onPress={goBack}>
                <SimasIcon name='close-black' style={styles.closeIcon}/>
              </Touchable>
              <Touchable onPress={this.clearFitler()}>
                <Text style={styles.reset}>{language.ETAX__HISTORY_RESET_BUTTON}</Text>
              </Touchable>
            </View>
            <View style={styles.transacionContainer}>
              <Text style={styles.textTrans}>{language.ETAX__HISTORY_TRANSACTION_TYPE}</Text>
            </View>
            <View style={styles.taxType}>
              <View style={styles.mt15}>
                <Field
                  name='jenisTransaksi'
                  component={SinarmasPickerBoxNew}
                  itemList={transformJenisTransaksi}
                  isTax={true}
                  rightIcon='arrow'
                  placeholder={'Jenis Transaksi'}
                  labelText={'Jenis Transaksi'}
                  labelKey='display'
                  textPickerStyle={styles.textPickerStyle}
                  pickerStyle={styles.pickerStyle}
                />
                {
                  checkJenisPajak && <ErrorTextIndicator text={language.VALIDATION__REQUIRED_FIELD} isTax={true}/>
                }
              </View>
              
            </View>
            
            <View style={styles.transacionContainer}>
              <Text style={styles.textTrans}>{language.ETAX__HISTORY_FILTER_BY_DATE}</Text>
            </View>
            <Touchable onPress={this.changeDate('Today')} style={styles.dateContainer1}>
              <Text style={styles.todayOption}>{language.ETAX__HISTORY_FILTER_TODAY}</Text>
              <View style={styles.circleButton}>
                <View style={isToday ? styles.circleButtonInsideActive : styles.circleButtonInsideInactive} />
              </View>
            </Touchable>
            <View style={styles.borderBlue} />
            <Touchable onPress={this.changeDate('Month')} style={styles.dateContainer1}>
              <Text style={styles.todayOption}>{language.ETAX__HISTORY_FILTER_MONTH}</Text>
              <View style={styles.circleButton}>
                <View style={isMonth ? styles.circleButtonInsideActive : styles.circleButtonInsideInactive} />
              </View>
            </Touchable>
            {
              isMonth ? 
                <View style={styles.pickMonth}>
                  <Field
                    name='monthSelected'
                    component={SinarmasPickerBoxNew}
                    itemList={datePicker}
                    isTax={true}
                    rightIcon='arrow'
                    placeholder={'Select Bill Period'}
                    labelText={'Select Bill Period'}
                    labelKey='display'
                    textPickerStyle={styles.textPickerStyle}
                    pickerStyle={styles.pickerStyle}
                  />
                </View>
                : null
            }
            <View style={styles.borderBlue} />
            <Touchable onPress={this.changeDate('Range')} style={styles.dateContainer1}>
              <Text style={styles.todayOption}>{language.ETAX__HISTORY_FILTER_RANGE}</Text>
              <View style={styles.circleButton}>
                <View style={isRange ? styles.circleButtonInsideActive : styles.circleButtonInsideInactive} />
              </View>
            </Touchable>
            {
              isRange ?
                <View>
                  <View style={styles.dateContainer}>
                    <Field
                      name='dateStart'
                      component={DatePickerNew}
                      isTax={true}
                      label={'From'}
                      addStyle={styles.h10Left}
                      showDay={false}
                      minimumDate={minimumDateRaw}
                      maximumDate={maximumDateRaw}
                      formatDate={'DD-MM-YY'}
                    />
                    <View style={styles.mt15} />
                    <Field
                      name='dateEnd'
                      component={DatePickerNew}
                      isTax={true}
                      label={'To'}
                      addStyle={styles.h10Right}
                      showDay={false}
                      minimumDate={minimumDateRaw}
                      maximumDate={maximumDateRaw}
                      formatDate={'DD-MM-YY'}
                    />
                  </View>
                  <View style={styles.explanationContainer}>
                    <SimasIcon name='input-error' style={styles.disclaimerIcon}/>
                    <Text style={styles.textExplanation}>{language.ETAX__HISTORY_FILTER_RANGE_DIS}</Text>
                  </View>
                </View>
                : null
            }
            
            <View style={styles.borderBlue} />
            {
              checkSelectedDate && <View style={styles.bottomErrContainer}><ErrorTextIndicator text={language.ETAX__EMPTY_FILTERDATE} isTax={true}/></View>
            }
          </ScrollView>
          
        </View>
        <View style={styles.footer}>
          <SinarmasButton text={language.GENERIC__CONTINUE} onPress={getHistory(formValues, setDate, biller)} disabled={checkSelectedDate || checkSelectMonth || checkSelectRangeStart || checkSelectRangeEnd || checkJenisPajak}/>

        </View>
      </View>
    );
  }
}

export default EtaxHistoryFilter;