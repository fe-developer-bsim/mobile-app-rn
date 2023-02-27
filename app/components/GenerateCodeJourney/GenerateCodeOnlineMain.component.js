import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './GenerateCodeOnlineMain.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result} from 'lodash';
import {language} from '../../config/language';

class GenerateCodeOnlineMain extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToGenerateMain: PropTypes.func,
    paramActiveMenu: PropTypes.object,
    transactionTypeLKD: PropTypes.object,
  }

  render () {
    const {goToGenerateMain, paramActiveMenu, transactionTypeLKD} = this.props;
    const flagLKDCashOut = result(paramActiveMenu, 'flagLKDCashOut', false);
    const flagLKDPurchase = result(paramActiveMenu, 'flagLKDPurchase', false);
    return (
      <View style={styles.containerWhite}>
        <View style={styles.containerCodeMenu}>
          {flagLKDPurchase ?
            <View>
              <Touchable onPress={goToGenerateMain(result(transactionTypeLKD, 'pay', ''))}>
                <View style={styles.codeBorder}>
                  <View style={styles.imageLeft}>
                    <SimasIcon name={'purchase'} style={styles.iconColor} size={40}/>
                  </View>
                  <View style={styles.imageCenter}>
                    <Text style={styles.titleCode}>{language.GENERATE_CODE_MAIN_OFFLINE_PAY}</Text>
                    <Text style={styles.subtitleCode}>{language.GENERATE_CODE_MAIN_OFFLINE_CREATE_CODE_TO_PAY}</Text>
                  </View>
                  <View style={styles.imageRight}>
                    <SimasIcon name={'arrow'} style={styles.iconArrow} size={15}/>
                  </View>
                </View>
              </Touchable>
            </View>
            : <View /> }
          {flagLKDCashOut ?
            <View>
              <Touchable onPress={goToGenerateMain(result(transactionTypeLKD, 'cashOut', ''))}>
                <View style={styles.codeBorder}>
                  <View style={styles.imageLeft}>
                    <SimasIcon name={'biller-withdrawal'} style={styles.iconColor} size={40}/>
                  </View>
                  <View style={styles.imageCenter}>
                    <Text style={styles.titleCode}>{language.GENERATE_CODE_MAIN_OFFLINE_WITHDRAW}</Text>
                    <Text style={styles.subtitleCode}>{language.GENERATE_CODE_MAIN_OFFLINE_CREATE_CODE_TO_WITHDRAW}</Text>
                  </View>
                  <View style={styles.imageRight}>
                    <SimasIcon name={'arrow'} style={styles.iconArrow} size={15}/>
                  </View>
                </View>
              </Touchable>
            </View>
            : <View /> }
        </View>
        <View style={styles.whiteBottom} />
      </View>
    );
  }
}

export default GenerateCodeOnlineMain;
