import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './FundTransferRevamp.style';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import remittance from '../../assets/images/remittance.png';
import trf_domestik from '../../assets/images/Trf_domestik.png';

class FundTransferTypeComponent extends Component {
  static propTypes = {
    goToFundTransfer: PropTypes.func,
    goToRemittance: PropTypes.func,
  }
  render () {
    const {goToFundTransfer, goToRemittance} = this.props;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.containerBanner}>
          <View style={styles.containerTrfTitle}>
            <Text style={styles.transferTitle}>{language.FUNDTRANSFER__REVAMP_TITLE}</Text>
          </View>
        </View>
        <View style={styles.whiteBg}>
          <View style={styles.containerNew}>
            <View style={styles.containerTransferType}>
              <Text style={styles.textChooseTransferType}>{language.TITLE__TRANSFER_TYPE}</Text>
              <Text style={styles.subTextChooseTransferType}>{language.SUB__TITLE_TRANSFER_TYPE}</Text>
            </View>
            <Touchable onPress={goToFundTransfer}>
              <View style={styles.historyItem}>
                <Image source={trf_domestik} style={styles.imgIcon}/>
                <View style={styles.billerDetailsRemittance}>
                  <View style={styles.flex}>
                    <Text style={styles.bankTitle}>{language.TRANSFER__FUNDTRASFER_DOMESTIK}</Text>
                    <Text style={[styles.roboto, styles.softDarkBlue]}>{language.TRANSFER__FUNDTRASNFER_SUB_TITLE}</Text>
                  </View>
                </View>
                <SimasIcon name='arrow' style={styles.arrowDownStyle}/>                  
              </View>
            </Touchable>
            <View style={styles.greyLine} />
            <Touchable onPress={goToRemittance}>
              <View style={styles.historyItem}>
                <Image source={remittance} style={styles.imgIcon} />
                <View style={styles.billerDetailsRemittanceBottom}>
                  <Text style={styles.bankTitle}>
                    {language.TRANSFER__REMITTANCE}
                  </Text>
                  <View style={styles.flex}>
                    <Text style={styles.robotoSoftDarkBlue}>
                      {language.TRANSFER__REMITTANCE_SUB_TITLE}
                    </Text>
                  </View>
                </View>
                <SimasIcon name='arrow' style={styles.arrowDownStyle}/>                  
              </View>
            </Touchable>
          </View>
        </View>
      </View>
      
    );
  }
}
export default FundTransferTypeComponent;