import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, ScrollView} from 'react-native';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import styles from './SavingAccountFinalize.style';
import Sinarmas from '../../assets/images/banksinarmas2x.png';
import SimobiPlus from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {wrapMethodInFunction, copyToCLipboard} from '../../utils/transformer.util';

const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

class SavingAccountFinalizeForm extends Component {

  render () {
    const {name, ticketCode, backToHome, mockImageLocation = false} = this.props;
    const imageLocation = mockImageLocation ? '' : Sinarmas;
    const imageLocationSimobiplus = mockImageLocation ? '' : SimobiPlus;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.columnContainer} extraHeight={120}>
        <View style={styles.divideButton}>
          <View>
            <View style={styles.upperWrapper}>
              <Image source={imageLocationSimobiplus} style={styles.mainTitleLogo}/>
              <View style={styles.row}>
                <View style={styles.mainTitle}>
                  <Text style={styles.mainTitleText}>{language.CREATE_ACCOUNT__FINALIZE_TITLE} {name}</Text>
                </View>
                <View style={styles.check2}>
                  <SimasIcon name='check-black' style={styles.mainCheckLogo} size={40}/>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.borderGreyTop}/>
            </View>
            <View style={styles.middleContainer}>
              <View style={styles.ticketContainer}>
                <Text style={styles.largeText}>{language.CREATE_ACCOUNT__TICKET_CODE}</Text>
                <Text style={styles.copyButtonText} onPress={wrapMethodInFunction(copyToCLipboard, ticketCode)}>
                  {language.CREATE_ACCOUNT__COPY}
                </Text>
              </View>
              <View>
                <Text style={styles.redText}>{ticketCode}</Text>
              </View>
            </View>

            <View style={styles.paddingTop}>
              <View style={styles.borderGreyBottom}/>
            </View>
      
            <View style={styles.fieldRow}>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.filler}/>
                  <View style={styles.circleRed}/>
                  <View style={styles.greyLine}/>
                </View>
                <View style={styles.iconContainer}>
                  <SimasIcon name='id' style={styles.arrowIcon} size={30}/>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.greyLine}/>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.steps}>
                    {language.CREATE_ACCOUNT__KTP}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <View style={styles.greyLine}/>
                  <View style={styles.circle}/>
                  <View style={styles.filler}/>
                </View>
                <View style={styles.iconContainer}>
                  <Image source={imageLocation} style={styles.imageSekuritas}/>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}/>
                <View style={styles.textContainer}>
                  <Text style={styles.steps}>
                    {language.SAVING_ACCOUNT__VERIFICATION}
                  </Text>
                  <Text style={styles.steps}>
                    <Text onPress={openLink(language.OFFICE__LINK)} style={styles.redText}>{language.CREATE_ACCOUNT__OFFICE_LINK}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonNext}>
              <SinarmasButton onPress={backToHome} >
                <Text style={styles.buttonLargeTextStyle}>{language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

SavingAccountFinalizeForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onButtonPress: PropTypes.func,
  name: PropTypes.string,
  ticketCode: PropTypes.string,
  backToHome: PropTypes.func,
  mockImageLocation: PropTypes.bool,
};

export default SavingAccountFinalizeForm;
