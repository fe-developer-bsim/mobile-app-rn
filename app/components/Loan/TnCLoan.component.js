import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './TnCLoan.style';
import WebView from 'react-native-webview';

class TermConditionEmoney extends React.Component {
  static propTypes = {
    onFinalizeForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    payBill: PropTypes.func,
    tncUrl: PropTypes.string
  };

  render () {
    const {tncUrl} = this.props;

    return (
      <View style={styles.container}>
        <WebView source={{uri: tncUrl}} />
      </View>
    );
  }
}

export default TermConditionEmoney;
