import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRRefundCreate.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';

class QRRefundCreate extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    merchant: PropTypes.array,
  }

  state = {
    disabled: false,
  }

  submit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  render () {
    const {...reduxFormProps} = this.props;    
    const {submitting, invalid} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View style={styles.formContainer}>
          <Text style={styles.titles}>{language.QR_GPN__REFUND_CREATE_CODE}</Text>
          <Field
            name='merchantList'
            rightIcon='arrow'
            component={SinarmasInput}
            placeholder={language.QR_GPN__REFUND_MERCHANT}
            label={language.QR_GPN__REFUND_MERCHANT}
            disabled={true}
          />   
          <Field
            name='refundAmount'
            label={language.QR_GPN__REFUND_AMOUNT_FIELD}
            placeholder={language.QR_GPN__REFUND_AMOUNT_HINT}
            component={SinarmasInput}
            maxLength={13}            
            keyboardType='numeric'            
          />
          <Field
            name='refundCount'
            label={language.QR_GPN__REFUND_COUNT}
            placeholder={language.QR_GPN__REFUND_COUNT_HINT}
            component={SinarmasInput}
            maxLength={3}            
            keyboardType='numeric'            
          />
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={this.submit} disabled={invalid || submitting} text={language.SERVICE__NEXT_BUTTON}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRRefundCreate;
