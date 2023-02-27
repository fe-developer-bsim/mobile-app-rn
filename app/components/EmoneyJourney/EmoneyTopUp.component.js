import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './EmoneyTopUp.style';
import Touchable from '../../components/Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';

class ChooseCreditCard extends React.Component {
  static propTypes = {
    goToATM: PropTypes.func,
    goToPlatinum: PropTypes.func,
    goToOrami: PropTypes.func,
    goToBankBranch: PropTypes.func,
    mockImageLocation: PropTypes.bool,
    indigoEnabledNTB: PropTypes.bool,
    indigoEnabledETB: PropTypes.bool,
    platinumEnabledNTB: PropTypes.bool,
    platinumEnabledETB: PropTypes.bool,
    oramiEnabledNTB: PropTypes.bool,
    oramiEnabledETB: PropTypes.bool,
    alfamartEnabledNTB: PropTypes.bool,
    alfamartEnabledETB: PropTypes.bool,
    isLogin: PropTypes.bool
  }

  render () {
    const {goToATM, goToPlatinum, goToOrami, goToBankBranch} = this.props;


    return (
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{language.EMONEY_TOPUP_METHOD}</Text>
            </View>
            <View style={styles.greyLine} />
            <Touchable onPress={goToATM}>
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Text style={styles.bold}>{language.ATM_LOCATOR__TAB_ATM}</Text>
                  <Text>{language.EMONEY_TOPUP_ATM}</Text>
                </View>
                <View style={styles.buttonApply}>
                  <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
                </View>
              </View>                
            </Touchable>
            <View>
              <View style={styles.greyLine} />
              <Touchable onPress={goToPlatinum}>
                <View style={styles.rowContainer}>                
                  <View style={styles.cardContainer}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.bold}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__2}</Text>
                      <Text>{language.EMONEY_TOPUP_IB}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonApply}>
                    <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
                  </View>
                </View>
              </Touchable>
            </View>
            <View>
              <View style={styles.greyLine} />
              <Touchable onPress={goToOrami}>
                <View style={styles.rowContainer}>
                  <View style={styles.cardContainer}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.bold}>{language.ACCOUNT_MENUT_MB_TITLE}</Text>
                      <Text>{language.EMONEY_TOPUP_MOBILE}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonApply}>
                    <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
                  </View>
                </View>                  
              </Touchable>
            </View>
            <View>
              <View style={styles.greyLine} />
              <Touchable onPress={goToBankBranch}>
                <View style={styles.rowContainer}>                
                  <View style={styles.cardContainer}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.bold}>{language.ACCOUNT_MENUT_BRANCH}</Text>
                      <Text>{language.EMONEY_TOPUP_CASHIER}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonApply}>
                    <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
                  </View>
                </View>                  
              </Touchable>
            </View>
            <View>
              <View style={styles.greyLine} />
              <Touchable onPress={goToBankBranch}>
                <View style={styles.rowContainer}>                
                  <View style={styles.cardContainer}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.bold}>{language.EMONEY_TOPUP_OTHER}</Text>
                      <Text>{language.EMONEY_TOPUP_OTHER2}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonApply}>
                    <SimasIcon name='arrow' style={styles.arrowIcon} size={13}/>
                  </View>
                </View>                  
              </Touchable>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

export default ChooseCreditCard;
