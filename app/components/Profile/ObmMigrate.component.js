import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from './ObmMigrate.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import SimobiPlus from '../../assets/images/simobiplus.png';


class ObmMigrate extends Component {
  static propTypes={
    registerSimobiPlus: PropTypes.func
  }

  render () {
    const {registerSimobiPlus} = this.props;  
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainer} extraHeight={120}>
        <View style={styles.columnContainer}>
          <View>
            <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
            <View style={styles.containerInformationText}>
              <Text style={styles.informationText}>{language.MIGRATE__TO_OBM_INFORMATION_TITLE}</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.informationSubText}>{language.MIGRATE__TO_OBM_INFORMATION1}</Text>
              <Text style={styles.informationSubText}>{language.MIGRATE__TO_OBM_INFORMATION2}</Text>
              <Text style={styles.informationSubText}>{language.MIGRATE__TO_OBM_INFORMATION3}</Text>
              <Text style={styles.informationSubText}>{language.MIGRATE__TO_OBM_INFORMATION4}</Text>
            </View>
          </View>
          <View style={styles.clearSimobiPlusDataContainer}>
            <Touchable onPress= {registerSimobiPlus}>
              <Text style={styles.clearSimobiPlusDataText}>{language.MIGRATE__TO_OBM_BUTTON}</Text>
            </Touchable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default ObmMigrate;
