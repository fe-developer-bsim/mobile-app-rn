import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import styles from './QRTerminalEdit.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasInput} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import {SinarmasIconInput} from '../FormComponents';
import result from 'lodash/result';

class QRTerminalEdit extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func
  }

  state = {
    detailData: {}
  }

  submit = () => {
    const {navigation, dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    const detailData = result(navigation, 'state.params.data', {});
    this.setState({detailData: detailData});
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  render () {
    const {...reduxFormProps} = this.props;
    const {submitting, invalid} = reduxFormProps;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.titles}>{language.QR_GPN__TITLE_TERMINAL_EDIT}</Text>
            <Field
              name='merchant_pan_name'
              label={language.QR_GPN__TERMINAL_NAME}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_NAME}
              component={SinarmasInput}
              maxLength={25}
              style={styles.gray}
            />
            <Field
              name='mobile_number'
              label={language.QR_GPN__TERMINAL_PHONE}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_PHONE}
              keyboardType='numeric'
              maxLength={13}
              component={SinarmasInput}
              disabled={true}
            />
            <Field
              name='username'
              component={SinarmasIconInput}
              label={language.QR_GPN__TERMINAL_USERNAME_02}
              placeholder={language.HINTTEXT__QR_GPN_TERMINAL_USERNAME}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={this.submit} disabled={submitting || invalid}  text={language.QR_GPN__SAVE_BUTTON}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRTerminalEdit;
