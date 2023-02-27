import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './TnCEmoney.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import WebView from 'react-native-webview';

class TermConditionEmoney extends React.Component {
  static propTypes = {
    onFinalizeForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    payBill: PropTypes.func,
    tncUrl: PropTypes.string
  };

  render () {
    const {tncUrl, ...reduxFormProps} = this.props;
    const {handleSubmit = noop} = reduxFormProps;
    return (
      <View style={styles.container}>
        <WebView source={{uri: tncUrl}} />
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={styles.nextButton}>
              {language.SMARTFREN__AGREE_BUTTON}
            </Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default TermConditionEmoney;
