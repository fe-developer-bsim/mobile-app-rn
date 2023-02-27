import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './Signature.style';
import {connect} from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';
import Touchable from '../Touchable.component';
import {noop} from 'lodash';
import {change} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class ESigningCanvas extends Component {
  static propTypes = {
    page: PropTypes.object,
    onPress: PropTypes.func,
    nextPage: PropTypes.func,
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func
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
    const {dispatch, page, handleSubmit = noop} = this.props;
    const {fields} = page;
    const {code} = fields[0];
    this.setState({emptySignature: true});
    this.refs['signature'].resetImage();
    dispatch(change('DigitalEForm', code, result.encoded));
    handleSubmit();
  }

  _dragEvent = () => {
    this.setState({emptySignature: false});
  }

  render () {
    const {page} = this.props;
    const {header} = page;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.SilTitleHeaderView}>
          <Text style={styles.SilTitleHeader}>{language.SIL__ESIGNATURE_HEADER}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[{flex: 10}, styles.redBar]}/>
          <View style={[{flex: 0}, styles.greyBar]}/>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{language[header]}</Text>
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
                <Text style={styles.buttonTextClear}>{language.SIL__CLEAR_ESIGN}</Text>
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
      </KeyboardAwareScrollView>
    );
  }
}

const signingState = () => ({});

const signingDispatch = () => ({

});

const ConnectedEFormCamera = connect(signingState, signingDispatch)(ESigningCanvas);

export default ConnectedEFormCamera;

