import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine} from '../FormComponents';
import {formatFieldPostal, wrapMethodInFunction, generateAccountLabel} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './QRMerchantRegister.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class QRMerchantRegister extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    selectWNI: PropTypes.func,
    selectWNA: PropTypes.func,
    wni: PropTypes.bool,
    wna: PropTypes.bool,
  }

  render () {
    const {wni, wna, selectWNI, selectWNA, accounts, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting, invalid} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_01}</Text>
            <Text style={styles.titles2}>{language.QR_GPN__MERCHANT_DETAIL_02}</Text>
            <Field
              name='merchantName'
              label={language.QR_GPN__MERCHANT_NAME}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_NAME}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='merchantPhone'
              label={language.QR_GPN__MERCHANT_PHONE_NUMBER}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_PHONE}
              keyboardType='numeric'
              disabled={false}
              maxLength={13}
              component={SinarmasInput}
            />
            <Field
              name='merchantOwner'
              label={language.QR_GPN__MERCHANT_OWNER}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_OWNER}
              component={SinarmasInput}
              maxLength={25}
            />
          </View>

          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_TITLE}</Text>
            <Field
              name='merchantAddress'
              label={language.QR_GPN__MERCHANT_ADDRESS}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_ADDRESS}
              component={SinarmasInput}
              maxLength={99}
            />
            <Field
              name='merchantKelurahan'
              label={language.QR_GPN__MERCHANT_KELURAHAN}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_KELURAHAN}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='merchantKecamatan'
              label={language.QR_GPN__MERCHANT_KECAMATAN}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_KECAMATAN}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='merchantCity'
              label={language.QR_GPN__MERCHANT_CITY}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_CITY}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='merchantProv'
              label={language.QR_GPN__MERCHANT_PROVINCE}
              placeholder={language.HINTTEXT__QR_GPN_MERCHANT_PROVINCE}
              component={SinarmasInput}
              maxLength={25}
            />
            <Field
              name='postalCode'
              label={language.QR_GPN__MERCHANT_POSTAL_CODE}
              placeholder={language.HINTTEXT__QR_GPN_POSTAL_CODE}
              format={formatFieldPostal}
              normalize={formatFieldPostal}
              component={SinarmasInput}
              maxLength={5}
            />
          </View>

          <View style={styles.greyLine} />

          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__SUPPORTING_DOC}</Text>
            <View>
              <View style={styles.timeSelection}>
                <Touchable style={styles.row} onPress={selectWNI}>
                  <SimasIcon style={styles.radioStyle} name={wni ? 'radio-selected' : 'radio-unselected'} size={20}/>
                  <View style={styles.extraPadding}><Text style={styles.wnia}>{language.QR_GPN__MERCHANT_WNI}</Text></View>
                </Touchable>
              </View>
              <View style={styles.timeAddContainer}>
                <View style={wni ? styles.borderedContainer : styles.disbaledBorderedContainer}>
                  <Field
                    name='merchantKTP'
                    label={language.QR_GPN__MERCHANT_KTP}
                    placeholder={language.HINTTEXT__QR_GPN_MERCHANT_KTP}
                    keyboardType='numeric'
                    component={SinarmasInput}
                    maxLength={16}
                    disabled={!wni}
                  />
                  <Field
                    name='merchantPasporWNI'
                    label={language.QR_GPN__MERCHANT_PASPORWNI}
                    placeholder={language.HINTTEXT__QR_GPN_MERCHANT_PASPORWNI}
                    keyboardType='numeric'
                    component={SinarmasInput}
                    maxLength={16}
                    disabled={!wni}
                  />
                </View>
              </View>
            </View>

            <View>
              <View style={styles.timeSelection}>
                <Touchable style={styles.row} onPress={selectWNA}>
                  <SimasIcon style={styles.radioStyle} name={wna ? 'radio-selected' : 'radio-unselected'} size={20}/>
                  <View style={styles.extraPadding}><Text style={styles.wnia}>{language.QR_GPN__MERCHANT_WNA}</Text></View>
                </Touchable>
              </View>
              <View style={styles.timeAddContainer}>
                <View style={wna ? styles.borderedContainer : styles.disbaledBorderedContainer}>
                  <Field
                    name='merchantPasporWNA'
                    label={language.QR_GPN__MERCHANT_PASPORWNA}
                    placeholder={language.HINTTEXT__QR_GPN_MERCHANT_PASPORWNA}
                    keyboardType='numeric'
                    component={SinarmasInput}
                    maxLength={16}
                    disabled={!wna}
                    style={styles.wna}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.greyLine}/>

          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_ACCOUNT_01}</Text>
            <Text>{language.QR_GPN__MERCHANT_ACCOUNT_02}</Text>
            <Text>{language.QR_GPN__MERCHANT_ACCOUNT_03}</Text>
            <View style={styles.labelSpacing} />
            <Field
              name='accountNo'
              rightIcon='arrow'
              component={SinarmasPickerLine}
              placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
              labelText={language.QR_GPN__MERCHANT_YOUR_ACCOUNT}
              labelKey='display'
              itemList={generateAccountLabel(accounts)}
            />
          </View>
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={submitting || invalid} text={language.SERVICE__NEXT_BUTTON}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}




export default QRMerchantRegister;
