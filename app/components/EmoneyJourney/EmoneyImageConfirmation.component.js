import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import {SinarmasIconInput, DatePicker} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EmoneyImageConfirmation.component.styles';
import {Dimensions} from 'react-native';
import {Field} from 'redux-form';
import {noop} from 'lodash';
import {normalizeNumber} from '../../utils/transformer.util';

export const fields = {
  KTP_NUMBER: 'ktpId',
  BIRTH_DATE: 'birthDate'
};

class ImageConfirmation extends Component {

  render () {
    const {base64Image, backToCamera, imageRotate, flagKTP, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const renderImage = `data:image/gif;base64,${base64Image}`;
    const {width} = Dimensions.get('window');
    const trueWidth = width - 40;
    const trueHeight = (trueWidth * 14) / 15;
    const maxDate = new Date();

    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.missingInfoContainer}>
          <View style={styles.mainTitleConf}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_UPLOAD_PHOTO}</Text>
          </View>
      
          <View style={styles.imageContainer}>
            <Image source={{uri: renderImage}} style={{width: trueWidth, height: trueHeight, transform: [{rotate: imageRotate}]}}/>
          </View>

          {flagKTP ? 
            <View>
              <Field
                name={fields.KTP_NUMBER}
                component={SinarmasIconInput}
                theme='primary'
                style={styles.fieldContainer}
                label={language.CREDITCARD__KTP_NUMBER}
                placeholder={language.HINT__KTP_NUMBER}
                isUseSuccessInputText={true}
                keyboardType='numeric'
                maxLength={16}
                typeField={'ktpId'}
                normalize={normalizeNumber}
              />

              <Field
                name={fields.BIRTH_DATE}
                component={DatePicker}
                label={language.CREDITCARD__BIRTH_DATE}
                placeholder={language.HINTTEXT__BIRTH_DATE}
                maximumDate={maxDate}
                minimumDate={'01/01/1900'}
                date={maxDate}              
              />
            </View>
            : null
          }

          

          <View style={styles.missingInfoBottomWrapper}>
            <View style={styles.buttonNextConf}>
              <View style={styles.photoTextContainer}>
                <Touchable onPress={backToCamera}>
                  <Text style={styles.photoText}>{language.CREDITCARD_TAKE_PHOTO}</Text>
                </Touchable>
              </View>
              <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
                <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_UPLOAD}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

ImageConfirmation.propTypes = {
  base64Image: PropTypes.string,
  handleSubmit: PropTypes.func,
  backToCamera: PropTypes.func,
  imageRotate: PropTypes.string,
  flagKTP: PropTypes.bool
};

export default ImageConfirmation;
