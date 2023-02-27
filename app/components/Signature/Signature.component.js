import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import SignatureCapture from 'react-native-signature-capture';
import styles from './Signature.style';
import Touchable from '../Touchable.component';

class SignatureView extends Component {
  static propTypes = {
    setSignature: PropTypes.func,
    onPress: PropTypes.func,
  }

  state = {
    emptySignature: true
  }

  saveSign = () => {
    this.refs['signature'].saveImage();
  }

  resetSign = () => {
    this.setState({emptySignature: true});
    this.refs['signature'].resetImage();
  }

  _onSaveEvent = (result) => {
    const {setSignature} = this.props;
    setSignature(result.encoded);
    this.setState({emptySignature: true});
    this.props.onPress(result.encoded);
  }

  _dragEvent = () => {
    this.setState({emptySignature: false});
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{language.SIGNATURE__TITLE}</Text>
        </View>
        <View style={styles.middleContainer}>
          <SignatureCapture
            ref='signature'
            style={styles.signaturePad}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            showBorder={true}
            onSaveEvent={this._onSaveEvent}
            viewMode={'portrait'}
            onDragEvent={this._dragEvent}/>
          <View style={styles.signatureLine}/>
          <View style={styles.buttonContainerClear}>
            <Touchable onPress={this.resetSign}>
              <Text style={styles.buttonTextClear} textDecorationLine={'underline'}>{language.GENERIC__RESET}</Text>
            </Touchable>
          </View>

        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <SinarmasButton disabled={this.state.emptySignature} onPress={this.saveSign}>
              <Text style={styles.buttonText}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default SignatureView;
