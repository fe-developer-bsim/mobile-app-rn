import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasValas.styles';
import aud from '../../assets/images/aud.png';
import cny from '../../assets/images/cny.png';
import usd from '../../assets/images/usd.png';
import eur from '../../assets/images/eur.png';
import sgd from '../../assets/images/sgd.png';
import Touchable from '../../components/Touchable.component';
import nzd from '../../assets/images/nzd.png';

class SimasValasChooseCurrency extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToTnCvalasAUD: PropTypes.func,
    goToTnCvalasCNY: PropTypes.func,
    goToTnCvalasUSD: PropTypes.func,
    goToTnCvalasEUR: PropTypes.func,
    goToTnCvalasSGD: PropTypes.func,
    goToTnCvalasNZD: PropTypes.func,
  }
  render () {
    const {goToTnCvalasAUD, goToTnCvalasCNY, goToTnCvalasUSD, goToTnCvalasEUR, goToTnCvalasSGD, goToTnCvalasNZD} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>{language.SIMAS_VALAS_CHOOSE_CURRENCY}</Text>
          </View>

          <Touchable onPress={goToTnCvalasAUD}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={aud} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_AUSTRALIAN_DOLLAR}</Text>
              </View>
              <Text style={styles.value}>AUD</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

          <Touchable onPress={goToTnCvalasCNY}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={cny} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_CHINESE_YUAN}</Text>
              </View>
              <Text style={styles.value}>CNY</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

          <Touchable onPress={goToTnCvalasUSD}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={usd} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_UNITED_STATES_DOLLAR}</Text>
              </View>
              <Text style={styles.value}>USD</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

          <Touchable onPress={goToTnCvalasEUR}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={eur} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_EURO}</Text>
              </View>
              <Text style={styles.value}>EUR</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

          <Touchable onPress={goToTnCvalasSGD}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={sgd} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_SINGAPORE_DOLLAR}</Text>
              </View>
              <Text style={styles.value}>SGD</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

          <Touchable onPress={goToTnCvalasNZD}>
            <View style={styles.containerImageTextCurrency}>
              <View style={styles.imageCurrency}>
                <Image source={nzd} />
              </View>
              <View style={styles.newTitleContainer}>
                <Text style={styles.title}>{language.SIMAS_VALAS_NEW_ZEALAND_DOLLAR}</Text>
              </View>
              <Text style={styles.value}>NZD</Text>
            </View>
          </Touchable>

          <View style={styles.borderBottomRow} />

        </View>
      </ScrollView>
    );
  }
}

export default SimasValasChooseCurrency;
