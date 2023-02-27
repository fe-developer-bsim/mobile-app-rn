import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {BackHandler, View, KeyboardAvoidingView, Platform} from 'react-native';

class UltraVoucherWebView extends React.Component {

  constructor (props) {
    super(props);
    this.webView = null;
  }

  static propTypes = {
    uri: PropTypes.string,
    onMessage: PropTypes.func,
    onLoadStart: PropTypes.func,
    onLoadEnd: PropTypes.func,
    canGoBack: PropTypes.bool,
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack = () => {
    const {canGoBack} = this.props;
    if (canGoBack) {
      this.webView.goBack();
      return true;
    } else {
      return false;
    }
  }

  handleMessage = (event) => {
    const {onMessage} = this.props;
    onMessage(event);
  }

  getRef = (webView) => {
    this.webView = webView;
  }

  render () {
    const {uri, onLoadEnd, onLoadStart} = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: 'padding'})}
        enabled
        contentContainerStyle={{flex: 1}}
        keyboardVerticalOffset={Platform.select({ios: 60, android: 60})}
        style={{flexGrow: 1}}>

        <View style={{flex: 1}}>
          <WebView
            source={{uri: uri}}
            onMessage={this.handleMessage}
            ref={this.getRef}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd} />
        </View>

      </KeyboardAvoidingView>

    );
  }
}

export default UltraVoucherWebView;
