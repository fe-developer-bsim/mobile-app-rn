/* eslint-disable */
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull} from '../../utils/transformer.util';
import {map, result, noop} from 'lodash';
import {ConnectedEFormComponent} from './RenderDigitalEForm.component';
import {Text, View} from 'react-native';
import styles from './DigitalEForm.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {generateStatementPhoto} from '../../state/thunks/digitalAccountOpening.thunks';
import Touchable from '../Touchable.component';
import ImagePicker from 'react-native-image-picker';
import {Toast} from '../../utils/RNHelpers.util.js';
import SimasIcon from '../../assets/fonts/SimasIcon';

class DigitalEFormUpload extends Component {
  static propTypes = {
    page: PropTypes.object,
    initialValues: PropTypes.object,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    pageName: PropTypes.string,
    formName: PropTypes.string,
    setImageData: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  selectInput = (fieldName) => () => {
    const {setImageData, pageName} = this.props;
    const options = {quality: 0.05};
    ImagePicker.showImagePicker(options, (response) => {
      const isError = response.hasOwnProperty('error');
      const error = result(response, 'error', 'Go to settings, allow Simobi+ to access device camera');
      if (isError) {
        Toast.show(error, Toast.LONG);
      } else if (response.didCancel) {
        return Promise.resolve();
      } else {
        setImageData({fieldName: fieldName, stringData: response.data, pageName: pageName});
      }
    });
  }

  render () {
    const {page, formName, invalid, submitting, handleSubmit = noop} = this.props;
    const {fields, header, style} = page;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} style={styles[style]} keyboardShouldPersistTaps='handled'>
        <View>
          {
            isEmptyOrNull(header) ? null :
              typeof (header) === 'object' ? 
                map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
                :
                <Text style={styles.mainTitleText}>{language[header]}</Text>
          }

          {
            map(fields, (component) => (
              component.isUpload ?
                <Touchable onPress={this.selectInput(component.code)}>
                  <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
                  <View style={styles.cameraIconStyle}><SimasIcon name='camera' size={20}/></View>
                </Touchable>
                :
                <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
            ))
          }
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>);
  }
}

const loanSimulationState = () => ({});

const loanSimulationDispatch = (dispatch) => ({
  setImageData: (data) => dispatch(generateStatementPhoto(result(data, 'fieldName', ''), result(data, 'stringData', ''))),
});

const ConnectedEFormUpload = connect(loanSimulationState, loanSimulationDispatch)(DigitalEFormUpload);

export default ConnectedEFormUpload;