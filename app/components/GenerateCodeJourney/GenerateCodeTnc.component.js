import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './GenerateCodeTnc.styles';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';

class GenerateCodeTnc extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    handleSubmit: PropTypes.func,
  }

  render () {
    const {handleSubmit} = this.props;
    return (
      <View style={styles.containerWhite}>

        <View style={styles.containerCode}>
          <SimasIcon style={styles.fastCodeIcon} name={'FASTCODE'} size={40} />
        </View>

        <View style={styles.containerText}>
          <Text style={styles.textTnc}>
            {language.GENERATE_CODE_TNC_TEXT}
          </Text>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.bgTnc}>
            <Text style={styles.textTnc}>{language.GENERATE_CODE_TNC_LABEL}</Text>
          </View>
          <View style={styles.bottonContainer}>
            <SinarmasButton style={styles.buttonFinish} onPress={handleSubmit} >
              <Text style={styles.buttonText}>{language.GENERATE_CODE_TNC_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default GenerateCodeTnc;
