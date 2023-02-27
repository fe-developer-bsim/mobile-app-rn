import {View, Text} from 'react-native';
import React from 'react';
import {SinarmasButton, RadioButton} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './QRMerchantRegister1.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {getMerchantCriteria} from '../../utils/middleware.util';

class QRMerchantRegister1 extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    criteriaList: PropTypes.object,
    disabled: PropTypes.bool,
  }

  render () {
    const {disabled, criteriaList, ...reduxFormProps} = this.props;
    const merchantParams = getMerchantCriteria(criteriaList);
    const {handleSubmit} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_00}</Text>
            <Field name='criteria' component={RadioButton} options={merchantParams} renderOptionMerchantQRGPN={true}/>
          </View>
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={disabled} text={language.GENERIC__CONTINUE}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRMerchantRegister1;
