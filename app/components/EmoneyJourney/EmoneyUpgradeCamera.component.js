import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EmoneyUpgrade.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import {isEmpty} from 'lodash';

class EmoneyUpgradeCamera extends React.Component {
  static propTypes = {
    upgradeKYC: PropTypes.func,
    goToCamera: PropTypes.func,
    goToEmailVerification: PropTypes.func,
    imageKTP: PropTypes.object,
    imageKTPSelfie: PropTypes.object,
    imageSelfie: PropTypes.object,
    emailValid: PropTypes.bool
  }

  render () {
    const {upgradeKYC, goToCamera, goToEmailVerification, imageKTP, imageKTPSelfie, imageSelfie, emailValid} = this.props;
    const iconKTPName = isEmpty(imageKTP) ? 'arrow' : 'success-circle';
    const iconKTPStyle = isEmpty(imageKTP) ? 'arrIcon' : 'successIcon';

    const iconKTPSelfieName = isEmpty(imageKTPSelfie) ? 'arrow' : 'success-circle';
    const iconKTPSelfieStyle = isEmpty(imageKTPSelfie) ? 'arrIcon' : 'successIcon';

    const iconSelfieName = isEmpty(imageSelfie) ? 'arrow' : 'success-circle';
    const iconSelfieStyle = isEmpty(imageSelfie) ? 'arrIcon' : 'successIcon';

    const iconEmailName = !emailValid ? 'arrow' : 'success-circle';
    const iconEmailStyle = !emailValid ? 'arrIcon' : 'successIcon';

    const disabledSelfieKTP = isEmpty(imageKTP);
    const disabledSelfie = isEmpty(imageKTP) || isEmpty(imageKTPSelfie);
    const disabledEmail = isEmpty(imageKTP) || isEmpty(imageKTPSelfie) || isEmpty(imageSelfie);
    const buttonDisabled = isEmpty(imageKTP) || isEmpty(imageKTPSelfie) || isEmpty(imageSelfie) || !emailValid;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.mainTitleContainer}>
            <Text style={styles.mainTitleTxt}>{language.EMONEY__UPGRADE_CAMERA_TITLE}</Text>
          </View>
          <View style={styles.container}>
            <Touchable onPress={goToCamera('EmoneyKTPCamera')} style={styles.box}>
              <Text style={styles.info}>{language.EMONEY__UPGRADE_ID_CARD}</Text>
              <SimasIcon style={styles[`${iconKTPStyle}`]} name={iconKTPName} size={15}/>
            </Touchable>

            <Touchable onPress={goToCamera('EmoneyKTPSelfieCamera')} style={styles.box} disabled={disabledSelfieKTP}>
              <Text style={disabledSelfieKTP ? styles.disabledInfo : styles.info}>{language.EMONEY__UPGRADE_ID_CARD_SELFIE}</Text>
              <SimasIcon style={disabledSelfieKTP ? styles.disabledArrIcon : styles[`${iconKTPSelfieStyle}`]} name={iconKTPSelfieName} size={15}/>
            </Touchable>

            <Touchable onPress={goToCamera('EmoneySelfieCamera')} style={styles.box} disabled={disabledSelfie}>
              <Text style={disabledSelfie ? styles.disabledInfo : styles.info}>{language.EMONEY__UPGRADE_SELFIE}</Text>
              <SimasIcon style={disabledSelfie ? styles.disabledArrIcon : styles[`${iconSelfieStyle}`]} name={iconSelfieName} size={15}/>
            </Touchable>

            <Touchable onPress={goToEmailVerification} style={styles.box} disabled={disabledEmail}>
              <Text style={disabledEmail ? styles.disabledInfo : styles.info}>{language.EMONEY__UPGRADE_EMAIL_VERIFICATION}</Text>
              <SimasIcon style={disabledEmail ? styles.disabledArrIcon : styles[`${iconEmailStyle}`]} name={iconEmailName} size={15}/>
            </Touchable>
          </View>
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton onPress={upgradeKYC} disabled={buttonDisabled}>
            <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__UPGRADE_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmoneyUpgradeCamera;
