import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, FlatList, ScrollView} from 'react-native';
import styles from './SimasInvestaLink.styles';
import {language} from '../../config/language';
import Carousel from '../Carousel/Carousel.component';
import {result, toLower, startCase, startsWith} from 'lodash';
import SimasInvestaLinkInfo from './SimasInvestaLinkInfo.component';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SILBackground from '../../assets/images/simasInvestaLink-bg.jpg';
import BottomSheet from 'reanimated-bottom-sheet';
import {listViewComparator, formatForexAmount} from '../../utils/transformer.util';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SinarmasButton} from '../FormComponents';

class InvestmentComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    emFundEnabled: PropTypes.bool,
    goTopUp: PropTypes.func,
    summaryDetail: PropTypes.object,
    silFlag: PropTypes.array,
    getCurrencyMultiSil: PropTypes.func,

  }

  comparator = listViewComparator

  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  renderListPolis = ({item}) => {
    const {changeData, infoPolis} = this.props;
    const polisNumber = result(infoPolis, 'nomorPolis', '');
    const noPolis = result(item, 'nomorPolis', '');
    return (
      <View>
        <TouchableOpacity onPress={changeData(item)}>
          <View>
            <View style={styles.listDropDown}>
              <Text style={styles.listNoPolis}>{noPolis}</Text>
              {
                noPolis === polisNumber ?
                  <SimasIcon style={styles.checked} name='check-black' size={25}/>
                  :
                  null
              }
            </View>
            <View style={styles.greyLine} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderInner = () => {
    const {inquiryData} = this.props;
    const listInfoPolis = result(inquiryData, 'listInformasiPolis', []);
    
    return (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.subPanelHandle} />
          <View style={styles.panelHandle} />
        </View>
        <FlatList
          data={listInfoPolis}
          renderItem={this.renderListPolis} removeClippedSubviews={false}
        />
      </View>
    );
  }

  _renderItem = ({data}) => {
    const summaryDetail = result(data, 'item', {});
    const {goToEmFund, infoPolis, emFundEnabled, silFlag} = this.props;
    const produkCode = result(infoPolis, 'produkCode', '');
    const getFlagEmergencyFund = result(silFlag[`${produkCode}`], 'EF', false);
    return (
      <View>
        <SimasInvestaLinkInfo emFundEnabled={emFundEnabled}infoPolis={infoPolis} goToEmFund={goToEmFund} summaryDetail={summaryDetail} getFlagEmergencyFund={getFlagEmergencyFund} />
      </View>
    );
  }

  _renderItem_topUp = (data) => {
    const summaryDetail = result(data, 'item', {});
    const {goTopUp, infoPolis, silFlag} = this.props;
    const produkCode = result(infoPolis, 'produkCode', '');
    const getFlagEmergencyFund = result(silFlag[`${produkCode}`], 'EF', false);
    return (
      <View>
        <SimasInvestaLinkInfo infoPolis={infoPolis} goTopUp={goTopUp} summaryDetail={summaryDetail} getFlagEmergencyFund={getFlagEmergencyFund}/>
      </View>
    );
  }

  fall = new Animated.Value(1);
  bs = React.createRef();

  goTopUpMenu = () => {
    const {goTopUp, infoPolis, summaryDetail} = this.props;
    goTopUp(summaryDetail, infoPolis);
  }

  render () {
    const {infoPolis, summaryPolis, silFlag} = this.props;
    const polisHolderName = result(infoPolis, 'pemegangPolis', '');
    const polisNumber = result(infoPolis, 'nomorPolis', '');
    const uangPertanggungan = result(infoPolis, 'uangPertanggungan', '');
    const statusPolis = result(infoPolis, 'statusPolis', '');
    const listDetailSummary = result(summaryPolis, 'listDetail', []);
    const mataUang = result(infoPolis, 'mataUang', '');
    const produkCode = result(infoPolis, 'produkCode', '');
    const produkCodeFlag = startsWith(produkCode, '18');
    const getFlagTopUP = result(silFlag[`${produkCode}`], 'TU', false);
    return (
      <View style={styles.offsetOpacity}>
        <BottomSheet
          ref={this.bs}
          snapPoints={['-20%', '30%', '85%']}
          renderContent={this.renderInner}
          initialSnap={0}
          callbackNode={this.fall}
        />
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1)),
          }}
        >
          <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
            <View style={styles.upperContainer}>
              <ImageBackground source={SILBackground} style={styles.backgroundImage}>
                <View style={styles.padding}>
                  <Text style={styles.uname}>{startCase(toLower(polisHolderName))}</Text>
                  {produkCodeFlag ?
                    <Text style={styles.polis}>{language.INQUIRY__SIL_NO_POLIS_NEW}</Text>
                    :
                    <Text style={styles.polis}>{language.INQUIRY__SIL_NO_POLIS_OLD}</Text>
                  }
                  <View style={styles.dropDownContainer}>
                    <Touchable onPress={this.selectNoPolis}>
                      <View style={styles.dropDown}>
                        <Text style={styles.noPolis}>{polisNumber}</Text>
                        <SimasIcon name={'arrow'} size={15} style={styles.noPolisIcon}/>
                      </View>
                    </Touchable>
                  </View>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.keys}>{language.INQUIRY__SIL_UANG_PERTANGGUNGAN}</Text>
                      <Text style={styles.keys}>{language.INQUIRY__SIL_STATUS_POLIS}</Text>
                    </View>
                    <View>
                      <Text style={styles.values}>{mataUang} {formatForexAmount(uangPertanggungan, mataUang)}</Text>
                      <Text style={styles.values}>{startCase(toLower(statusPolis))}</Text>
                    </View>
                  </View>
                </View>
                {getFlagTopUP &&
                <View>
                  <SinarmasButton style={styles.topUpButton} onPress={this.goTopUpMenu}>
                    <Text style={styles.topUpText}>{language.INQUIRY__SIL_TOP_UP_BUTTONTEXT}</Text>
                  </SinarmasButton>
                </View>
                }
              </ImageBackground>
            </View>
            <View style={styles.lowerContainer}>
              <View>
                <Text style={styles.detailsTxt}>{language.INQUIRY__SIL_DETAILS}</Text>
                <Carousel data={listDetailSummary} renderCard={this._renderItem}/>
              </View>
              <View style={styles.boxedInfo}>
                <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
                <Text style={styles.info}>{language.INQUIRY__SIL_FOOTER}</Text>
              </View>
              <View style={styles.footer2}>
                <View>
                  {produkCodeFlag ?
                    <Text style={styles.textFooter2}>{language.INQUIRY__SIL_FOOTER_2_NEW}</Text>
                    :
                    <Text style={styles.textFooter2}>{language.INQUIRY__SIL_FOOTER_2_OLD}</Text>
                  }
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default InvestmentComponent;