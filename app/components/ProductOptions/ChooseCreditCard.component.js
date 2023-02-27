import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './Products.styles';
import Touchable from '../../components/Touchable.component';
import ccIndigo from '../../assets/images/cc_indigo.jpg';
import ccPlatinum from '../../assets/images/credit-card-platinum.png';
import ccOrami from '../../assets/images/cc_orami2x.png';
import ccAlfamart from '../../assets/images/cc_alfamart.png';
import ccTraveloka from '../../assets/images/cc_traveloka.png';

class ChooseCreditCard extends React.Component {
  static propTypes = {
    goToIndigo: PropTypes.func,
    goToPlatinum: PropTypes.func,
    goToOrami: PropTypes.func,
    goToAlfamart: PropTypes.func,
    goToTraveloka: PropTypes.func,
    indigoEnabledNTB: PropTypes.bool,
    indigoEnabledETB: PropTypes.bool,
    platinumEnabledNTB: PropTypes.bool,
    platinumEnabledETB: PropTypes.bool,
    oramiEnabledNTB: PropTypes.bool,
    oramiEnabledETB: PropTypes.bool,
    alfamartEnabledNTB: PropTypes.bool,
    alfamartEnabledETB: PropTypes.bool,
    travelokaEnabledNTB: PropTypes.bool,
    travelokaEnabledETB: PropTypes.bool,
    isEmoneyKyc: PropTypes.bool,
    isLogin: PropTypes.bool
  }

  render () {
    const {goToIndigo, goToPlatinum, goToOrami, goToAlfamart, goToTraveloka, 
      indigoEnabledNTB, indigoEnabledETB, platinumEnabledNTB, platinumEnabledETB, 
      oramiEnabledNTB, oramiEnabledETB, alfamartEnabledNTB, alfamartEnabledETB, 
      travelokaEnabledNTB, travelokaEnabledETB, isEmoneyKyc, isLogin} = this.props;

    const showIndigo = isLogin && isEmoneyKyc ? indigoEnabledETB : indigoEnabledNTB;
    const showPlatinum = isLogin && isEmoneyKyc ? platinumEnabledETB : platinumEnabledNTB;
    const showOrami = isLogin && isEmoneyKyc ? oramiEnabledETB : oramiEnabledNTB;
    const showAlfamart = isLogin && isEmoneyKyc ? alfamartEnabledETB : alfamartEnabledNTB;
    const showTraveloka = isLogin && isEmoneyKyc ? travelokaEnabledETB : travelokaEnabledNTB;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.CREDITCARD__CHOOSE_PRODUCTS}</Text>
          </View>

          {showIndigo ?
            <View>
              <Touchable onPress={goToIndigo} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainerCC}>
                    <Image source={ccIndigo} style={styles.imageCC} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.CREDITCARD__INDIGO_PRODUCTS}</Text>
                    <Text style={styles.txtLight}>{language.CREDITCARD__INDIGO_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> 
            : null
          }

          {showPlatinum ?
            <View>
              <Touchable onPress={goToPlatinum} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainerCC}>
                    <Image source={ccPlatinum} style={styles.imageCC} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.CREDITCARD__PLATINUM_PRODUCTS}</Text>
                    <Text style={styles.txtLight}>{language.CREDITCARD__PLATINUM_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> 
            : null
          }

          {showOrami ?
            <View>
              <Touchable onPress={goToOrami} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainerCC}>
                    <Image source={ccOrami} style={styles.imageCC} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.CREDITCARD__ORAMI_PRODUCTS}</Text>
                    <Text style={styles.txtLight}>{language.CREDITCARD__ORAMI_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> 
            : null
          }

          {showAlfamart ?
            <View>
              <Touchable onPress={goToAlfamart} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainerCC}>
                    <Image source={ccAlfamart} style={styles.imageCC} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.CREDITCARD__ALFAMART_PRODUCTS}</Text>
                    <Text style={styles.txtLight}>{language.CREDITCARD__ALFAMART_INTRO}</Text>
                  </View>
                </View>
              </Touchable>
            </View> 
            : null
          }

          {showTraveloka ?
            <View>
              <Touchable onPress={goToTraveloka} style={styles.offerContainer}>
                <View style={styles.cardContainer2}>
                  <View style={styles.imageContainerCC2}>
                    <Image source={ccTraveloka} style={styles.imageCC} />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.txtBold}>{language.CREDITCARD__TRAVELOKA_PRODUCTS}</Text>
                    <Text style={styles.txtLight}>{language.CREDITCARD__TRAVELOKA_INTRO}</Text>
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

export default ChooseCreditCard;
