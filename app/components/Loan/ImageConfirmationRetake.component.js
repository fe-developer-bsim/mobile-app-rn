import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from '../CreateNewAccount/CreditCard.styles';
import {Dimensions} from 'react-native';
// import result from 'lodash/result';

class ImageConfirmation extends Component {

  render () {
    const {base64Image, handleSubmit, backToCamera, imageRotate} = this.props;
    const renderImage = `data:image/gif;base64,${base64Image}`;
    const {width} = Dimensions.get('window');
    const trueWidth = width - 40;
    const trueHeight = (trueWidth * 14) / 15;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.missingInfoContainer}>
          <View style={styles.mainTitleConf}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_UPLOAD_PHOTO}</Text>
          </View>
      
          <View style={styles.imageContainer}>
            <Image source={{uri: renderImage}} style={{width: trueWidth, height: trueHeight, transform: [{rotate: imageRotate}]}}/>
          </View>
          <View style={styles.photoTextContainer}>
            <Touchable onPress={backToCamera}>
              <Text style={styles.photoText}>{language.CREDITCARD_TAKE_PHOTO}</Text>
            </Touchable>
          </View>
          
          <View style={styles.missingInfoBottomWrapper}>
            <View style={styles.buttonNextConf}>
              <SinarmasButton onPress={handleSubmit}>
                <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
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
  navigation: PropTypes.object,
  RetakeSelfieCamera: PropTypes.func
};

export default ImageConfirmation;
