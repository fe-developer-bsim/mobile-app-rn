import {View, Text} from 'react-native';
import React from 'react';
import {SinarmasButton} from '../FormComponents';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import styles from './RemittanceBankInformation.style';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import {ScrollView} from 'react-native-gesture-handler';

class RemittanceBankInformationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    goBack: PropTypes.func,
    navigation: PropTypes.func
  }

  render () {
    const {goBack, navigation, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    const swiftCode = result(navigation, 'state.params.bankInformation.swiftCode', '');
    const bankName = result(navigation, 'state.params.bankInformation.bankName', '');
    const country = result(navigation, 'state.params.bankInformation.country', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.pinkBg}>
          <View style={styles.shadowWhiteBg}>
            <View style={styles.whiteBg}>
              <ScrollView>
                <View style={styles.containerNew}>
                  <View style={styles.containerArrow}>
                    <Touchable onPress={goBack}>
                      <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>
                    </Touchable>
                  </View>
                  <Text style={styles.titles}>{language.REMITTANCE__TITLE_BANK}</Text>
                  <Text style={styles.titles3}>{language.REMITTANCE__SUBTITLE_DESCRIPTION}</Text>
                  <View style={styles.bankInformationContainer}>
                    <Text style={styles.subTitleText}>{language.HINTTEXT__REMITTANCE_SWIFT_CODE}</Text>
                    <Text style={styles.informationText}>{swiftCode}</Text>
                  </View>
                  <View style={styles.bankInformationContainer}>
                    <Text style={styles.subTitleText}>{language.HINTTEXT__REMITTANCE_BANK_NAME}</Text>
                    <Text style={styles.informationText}>{bankName}</Text>
                  </View>
                  <View style={styles.bankInformationContainer}>
                    <Text style={styles.subTitleText}>{language.HINTTEXT__REMITTANCE_COUNTRY}</Text>
                    <Text style={styles.informationText}>{country}</Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.containerDisclaimer}>
                <View style={styles.containtextExplanation}>
                  <View style={styles.containerSimasIcon}>
                    <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                  </View>
                  <Text style={styles.textExplanation}>{language.DISCLAIMER__NAMA_PENGIRIM_REMITTANCE}</Text>
                </View>
              </View>
              <View style={styles.buttonBottom}>
                <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} text={language.SERVICE__CONTINUE_BUTTON} style={styles.nextButton}/>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default RemittanceBankInformationForm;
