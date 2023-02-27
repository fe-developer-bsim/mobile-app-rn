import React, {Component} from 'react';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import WebView from 'react-native-webview';

class TravelInsuranceTnC extends Component {
  static propTypes = {
    navParams: PropTypes.object,
  };

  render () {
    const {navParams} = this.props;
    const url = result(navParams, 'url', '');
    return <WebView source={{uri: url}} />;
  }
}

export default TravelInsuranceTnC;
