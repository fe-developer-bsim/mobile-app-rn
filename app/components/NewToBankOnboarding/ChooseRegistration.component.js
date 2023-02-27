import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './ChooseRegistration.styles';
import Touchable from '../../components/Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class ChooseRegistration extends React.Component {
  static propTypes = {
    registerEmoney: PropTypes.func,
    registerSimobi: PropTypes.func,
    signInSimobi: PropTypes.func
  }

  render () {
    const {registerEmoney, registerSimobi} = this.props;

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.CHOOSE__REGISTRATION_TITLE}</Text>
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.subtitleText}>{language.CHOOSE__REGISTRATION_SUB_TITLE}</Text>
          </View>

          <Touchable style={styles.boxContainerPink} onPress={registerSimobi}>
            <View style={styles.rowContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.txtWhiteBold}>{language.CHOOSE__REGISTRATION_I_HAVE_ACC_TITLE}</Text>
                <Text style={styles.txtWhiteLight}>{language.CHOOSE__REGISTRATION_I_HAVE_ACC_SUBTITLE} <Text style={styles.bold}>{language.CHOOSE__REGISTRATION_I_HAVE_ACC_SUBTITLE_2}</Text> {language.CHOOSE__REGISTRATION_I_HAVE_ACC_SUBTITLE_3}</Text>
              </View>
              <View style={styles.rightContainer}>
                <SimasIcon style={styles.arrowIconWhite} name={'arrow'} size={13}/>
              </View>
            </View>
          </Touchable>

          <Touchable style={styles.boxContainerWhite} onPress={registerEmoney}>
            <View style={styles.rowContainer}>
              <View style={styles.leftContainer}>
                <Text style={styles.txtBlackBold}>{language.CHOOSE__REGISTRATION_I_DONT_HAVE_ACC_TITLE}</Text>
                <Text style={styles.txtBlackLight}>{language.CHOOSE__REGISTRATION_I_DONT_HAVE_ACC_SUBTITLE} <Text style={styles.bold}>{language.CHOOSE__REGISTRATION_I_DONT_HAVE_ACC_SUBTITLE_2}</Text> {language.CHOOSE__REGISTRATION_I_DONT_HAVE_ACC_SUBTITLE_3}</Text>
              </View>
              <View style={styles.rightContainer}>
                <SimasIcon style={styles.arrowIconBlack} name={'arrow'} size={13}/>
              </View>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default ChooseRegistration;