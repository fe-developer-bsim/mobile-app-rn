import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EgiftSrcAcc.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import poin from '../../assets/images/poin.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import sumBy from 'lodash/sumBy';

class EgiftSrcAccAccount extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    goLanding: PropTypes.func,
    simasPoin: PropTypes.object,
    egiftCart: PropTypes.array,
    chooseEmail: PropTypes.func,
  }


  render () {
    const {goLanding, simasPoin, egiftCart, chooseEmail} = this.props;
    const totalAmount = sumBy(egiftCart, 'value');
    const simasPoint = result(simasPoin, 'simasPoin.data.total_point', '') === '' ? 0 : result(simasPoin, 'simasPoin.data.total_point', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={[styles.row, styles.pb20]}>
              <Text style={styles.titleTxt}>{language.CGV__PAY_FROM}</Text>
              <Touchable onPress={goLanding}>
                <View style={styles.buttonTxt}>
                  <Text>{language.CGV__CANCELLATION}</Text>
                </View>
              </Touchable>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.subtitleTxt}>{language.CGV__SIMAS_POIN}</Text>
            </View>
            <View>
              <View style={styles.bgWhite}>
                <Touchable onPress={chooseEmail}>
                  <View style={styles.row}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.simasTxt}>{language.CGV__SIMAS}</Text>
                      <Image source={poin} style={styles.imageOffer} />
                    </View>
                    <View style={styles.infoContainer}>
                      <View style={styles.pad2}>
                        <Text style={styles.typeTxt}>{language.CGV__SIMAS_USED}</Text>
                      </View>
                      <View style={styles.pad2}>
                        <View style={styles.row2}>
                          <Text style={styles.accTxt}>{currencyFormatter(totalAmount)} </Text>
                          <View style={styles.imageContainer}><Image source={poin} style={styles.poinImage}/></View>
                        </View>
                      </View>
                      <View style={styles.pad2}>
                        <Text style={styles.balanceTxt}>{language.CGV__AVAIL_BALANCE2}  {currencyFormatter(simasPoint)} {language.CGV__POIN}</Text>
                      </View>
                    </View>
                    <View style={styles.arrowContainer}>
                      <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                    </View>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EgiftSrcAccAccount;
