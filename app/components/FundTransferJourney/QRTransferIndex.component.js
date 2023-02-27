import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './QRTransferIndex.styles';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-generator';
import {language} from '../../config/language';
import bankSinarmas from '../../assets/images/banksinarmas.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Touchable from '../Touchable.component';



class QRTransferIndex extends Component {
  static propTypes = {
    toReleaseQr: PropTypes.func,
    code: PropTypes.string,
    showSandTime: PropTypes.bool,
    showCountdown: PropTypes.bool,
    renewQR: PropTypes.func,
    showLoading: PropTypes.bool,
    showInstructions: PropTypes.func,
    showPopupQR: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  render () {
    let {showInstructions, showPopupQR} = this.props;
    const qrWidth = ((width - 40) * 0.6);
    const code = '0011277578';
    return (
      <ScrollView style={styles.bodyContainer} extraHeight={120}>
        <View style={styles.columnContainer}>
          <View style={styles.rowTopTitle}>
            <Touchable onPress={showInstructions}><Text style={styles.releaseTitle}>{language.TITLE_SEND_WITH_QR} <SimasIcon name='caution-circle' size={20} style={styles.iconTitleTop}/></Text>
            </Touchable>
          </View>
          <View>
            <View style={styles.bodyBox}>
              <View style={styles.lineDashed} />
              <View style={styles.centerQR}>
                <View>
                  <Touchable onPress={showPopupQR}>
                    <View style={styles.midleImageQR}>
                      <View style={{overflow: 'hidden'}}>
                        <QRCode value={code} size={qrWidth} bgColor='#000' fgColor='#fff'/>
                      </View>
                      <View style={styles.logoBSIM}>
                        <Image source={bankSinarmas} style={styles.imgBSIM}/>
                      </View>
                    </View>
                  </Touchable>
                  <Text style={styles.innerTextQR}>{language.TAP_EXPAND_CODE_CHANGE_DEVICE}</Text>
                </View>

              </View>
            </View>
          </View>


        </View>
      </ScrollView >
    );
  }
}

export default QRTransferIndex;
