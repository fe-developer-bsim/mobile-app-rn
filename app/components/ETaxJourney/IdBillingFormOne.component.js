import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import {language} from '../../config/language';
import styles from './IdBillingFormOne.styles';
import NpwpForm from './NpwpForm.component';
import NonNpwpForm from './NonNpwpForm.component';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import {result, noop, isEmpty} from 'lodash';
import {Field} from 'redux-form';
import {getEtaxYear, transformYearFormat} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';

class IdBillingFormOne extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    jenisPajak: PropTypes.array,
    jenisPajakNonNpwp: PropTypes.array,
    getTypeSetoran: PropTypes.func,
    jenisSetoran: PropTypes.array,
    biller: PropTypes.object,
    changeState: PropTypes.func,
    haveNpwp: PropTypes.bool,
    clearValues: PropTypes.func,
    lang: PropTypes.string,
    changeValue: PropTypes.func,
    jenisSetoranNonNoKetetapan: PropTypes.array,
  }

  render () {
    const {formValues, jenisPajak, jenisPajakNonNpwp, getTypeSetoran, jenisSetoran, biller, changeState, haveNpwp, lang, changeValue, jenisSetoranNonNoKetetapan, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 35;
    const getYear = getEtaxYear(10);
    const yearList = getYear.match(/.{1,4}/g);
    const transfromYearList = transformYearFormat(yearList);
    const npwp = result(formValues, 'npwp', '');
    const nik = result(formValues, 'nik', '');
    let disable;
    if (!haveNpwp) {
      disable = isEmpty(nik);
    } else {
      disable = isEmpty(npwp);
    }    
    return (
      <KeyboardAvoidingView style={styles.pinkBg} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={180} showsVerticalScrollIndicator={false} style={styles.mt20}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>Electronic Deposit Form</Text>
            </View>

            <View style={styles.titleContainerTop}>
              <Text style={styles.txtBold}>I Have NPWP</Text>
              <Field
                name={'switchNpwp'}
                component={Switch}
                onChangeHandler={changeState}
                noText={true}
                defaultValue={haveNpwp}
                colorBrand={true}
              />
            </View>

            {
              !haveNpwp ? <NonNpwpForm invalid={invalid} submitting={submitting} jenisPajak={jenisPajakNonNpwp} jenisSetoran={jenisSetoran} formValues={formValues} handleSubmit={handleSubmit} getTypeSetoran={getTypeSetoran} biller={biller} yearList={transfromYearList} lang={lang} changeValue={changeValue} haveNpwp={haveNpwp} jenisSetoranNonNoKetetapan={jenisSetoranNonNoKetetapan}/> 
                : <NpwpForm invalid={invalid} submitting={submitting} jenisPajak={jenisPajak} jenisSetoran={jenisSetoran} formValues={formValues} handleSubmit={handleSubmit} getTypeSetoran={getTypeSetoran} biller={biller} yearList={transfromYearList} lang={lang} changeValue={changeValue} haveNpwp={haveNpwp}/>
                
            }
            <View style={styles.footer}>
              <SinarmasButton text={language.GENERIC__CONTINUE} onPress={handleSubmit} disabled={invalid || submitting || disable}/>
            </View>

            
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default IdBillingFormOne;