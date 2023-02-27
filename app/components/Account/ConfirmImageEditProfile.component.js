import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from '../Account/ConfirmImageEditProfile.styles';
import {Dimensions} from 'react-native';
import {noop} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';

class ConfirmImageEditProfile extends Component {
  render () {
    const {base64Image, backToCamera, imageRotate, ...reduxFormProps} = this.props;
    const {handleSubmit = noop} = reduxFormProps;
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

          <View style={styles.missingInfoBottomWrapper}>
            <View style={styles.buttonNextConf}>
              <View style={styles.photoTextContainer}>
                <Touchable onPress={backToCamera}>
                  <Text style={styles.photoText}>{language.CREDITCARD_TAKE_PHOTO}</Text>
                </Touchable>
              </View>

              <View style={styles.infoConfirm}> 
                <SimasIcon name={'caution-circle'} size={16} style={styles.iconInfo}/>
                <Text style={styles.txtInfo}>{language.CONFIRM__SELFIE_PD}</Text>
              </View>
              
              <SinarmasButton onPress={handleSubmit} style={styles.submitBtn}>
                <Text style={styles.submitTxt}>{language.CONFIRM__IMAGE_USE}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

ConfirmImageEditProfile.propTypes = {
  base64Image: PropTypes.string,
  handleSubmit: PropTypes.func,
  backToCamera: PropTypes.func,
  imageRotate: PropTypes.string
};

export default ConfirmImageEditProfile;
