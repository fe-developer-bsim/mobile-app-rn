import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './GenerateCodeTimeout.styles';
import {SinarmasButton} from '../FormComponents';
import sandTime from '../../assets/images/sandTime.png';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';


class GenerateCodeTimeout extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    generateNewCode: PropTypes.func,
    handleSubmit: PropTypes.func,
    finish: PropTypes.func
  }

  render () {
    const {handleSubmit, finish} = this.props;
    return (
      <View>
        <View style={styles.containerWhite}>
          <View style={styles.containerButtonX}>
            <Touchable style={styles.buttonX} onPress={finish}>
              <SimasIcon name='close' style={styles.closeIcon} size={20}/>
            </Touchable>
          </View>
          <View style={styles.viewImageSand}>
            <Image style={styles.imageSand} source={sandTime}/>
            <Text style={styles.expiredText}>{language.GENERATE_CODE_TIMEOUT_FASTCODE_EXPIRED}</Text>
          </View>
        </View>

        <View style={styles.buttonBottom}>
          <SinarmasButton style={styles.buttonFinish} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{language.GENERATE_CODE_TIMEOUT_GET_NEW_CODE}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default GenerateCodeTimeout;
