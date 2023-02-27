import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Services.styles';
import Touchable from '../../components/Touchable.component';
import activeImage from '../../assets/images/activateatmcard.png';
import blockImage from '../../assets/images/blockatmcard.png';
import addNewCardImage from '../../assets/images/addnewatmcard.png';
import closeCard from '../../assets/images/closesavingacc.png';

class ChooseServices extends React.Component {
  static propTypes = {
    goToActivateCard: PropTypes.func,
    goToBlockCard: PropTypes.func,
    goToAddNewAtmCard: PropTypes.func,
    goToCloseCard: PropTypes.func,
    toogleCloseAccount: PropTypes.bool
  }
  
  render () {
    const {goToActivateCard, goToBlockCard, goToAddNewAtmCard, goToCloseCard, toogleCloseAccount} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.SERVICES__CHOOSE_SERVICES}</Text>
          </View>
          <View>
            <Touchable onPress={goToActivateCard} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={activeImage} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.SERVICES__ACTIVATE_ATM_CARD_TITLE}</Text>
                  <Text style={styles.txtLight}>{language.CHOOSE__SERVICES_ACTIVATE_ATM}</Text>
                </View>
              </View>
            </Touchable>
          </View>

          <View>
            <Touchable onPress={goToBlockCard} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={blockImage} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.SERVICES__BLOCK_ATM_CARD_TITLE}</Text>
                  <Text style={styles.txtLight}>{language.CHOOSE__SERVICES_BLOCK_ATM}</Text>
                </View>
              </View>
            </Touchable>
          </View>

          <View>
            <Touchable onPress={goToAddNewAtmCard} style={styles.offerContainer}>
              <View style={styles.cardContainer2}>
                <View style={styles.imageContainer}>
                  <Image source={addNewCardImage} style={styles.image} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.txtBold}>{language.SERVICES__ADD_NEW_ATM_CARD_TITLE}</Text>
                  <Text style={styles.txtLight}>{language.CHOOSE__SERVICES_ADD_NEW_ATM}</Text>
                </View>
              </View>
            </Touchable>
          </View>
          
          {  
            toogleCloseAccount ? 
              <View>
                <Touchable onPress={goToCloseCard} style={styles.offerContainer}>
                  <View style={styles.cardContainer2}>
                    <View style={styles.imageContainer}>
                      <Image source={closeCard} style={styles.image} />
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.txtBold}>{language.CLOSE__SAVING_ACCOUNT}</Text>
                      <Text style={styles.txtLight}>{language.CLOSE__SAVING_ACCOUNT_SUBTITLE}</Text>
                    </View>
                  </View>
                </Touchable>
              </View> 
              : null
          }
        </View>
      </ScrollView>
    );
  }
}

export default ChooseServices;

