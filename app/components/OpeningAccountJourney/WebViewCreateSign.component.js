import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './TnCLoan.style';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import WebView from 'react-native-webview';
import SuccessIcon from '../../assets/images/success-icon-new.png';

class TermConditionEmoney extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    urlCreate: PropTypes.string,
    goCheckSign: PropTypes.func
  }

  state = {
    hideWeb: '',
    buttonDisable: false
  }

  onMessage = () => {
    this.setState({hideWeb: '1'});
  }

  onSubmit = () => {
    const {goCheckSign} = this.props;
    this.setState({buttonDisable: true}, () => {
      goCheckSign();
      setTimeout(() => {
        this.setState({buttonDisable: false});
      }, 5000);
    });
  }
  
  render () {
    const {urlCreate} = this.props;
    let jsCode = `document.getElementById('formSukses-button').addEventListener('click', function(){
      window.ReactNativeWebView.postMessage("true")
    })
    true`;
    return (
      <View style={styles.bodyContainer}>
        {this.state.hideWeb === '1' ? 
          <View style={styles.successTextWeb}>
            <Image source={SuccessIcon} style={styles.successImage}/>
            <Text>{language.OPENING__SUCCESS_MESSAGE_DIGISIGN_TITLE}</Text>
            <Text>{language.OPENING__SUCCESS_MESSAGE_DIGISIGN_SUBTITLE}</Text>
          </View> :
          <WebView source={urlCreate}
            injectedJavaScript={jsCode}
            onMessage={this.onMessage}
            domStorageEnabled = {true}
            javaScriptEnabled={true}/>}
        {this.state.hideWeb === '1' &&
        <View style={styles.buttonWrapper}>
          <View style={styles.anotherLink}>
            <Text>{language.PGO__NOTE_AFTER_REGISTER}</Text>
          </View>
          <SinarmasButton onPress={this.onSubmit} disabled={this.state.buttonDisable}>
            <Text style={styles.nextButton}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>
        }
      </View>
    );
  }
}

export default TermConditionEmoney;
