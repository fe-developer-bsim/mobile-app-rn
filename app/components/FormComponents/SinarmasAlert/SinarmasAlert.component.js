import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../Overlay/Overlay.component';
import noop from 'lodash/noop';
import Touchable from '../../Touchable.component';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import {View, Text, Image, ImageBackground, Dimensions, ActivityIndicator, Linking} from 'react-native';
import styles from './SinarmasAlert.styles';
import checkIcon from '../../../assets/images/check-green.png';
import refreshIcon from '../../../assets/images/refresh-grey.png';
import thanksIcon from '../../../assets/images/Thanks.png';
import warningIcon from '../../../assets/images/Warning.png';
import disclaimerIcon from '../../../assets/images/disclaimer.png';
import lockDownImg from '../../../assets/images/change-device.png';
import emoji_sad_black from '../../../assets/images/emoji_sad_black.png';
import bankSinarmas from '../../../assets/images/banksinarmas.png';
import popUpActiveAtm from '../../../assets/images/activate.png';
import popUpBlockAtm from '../../../assets/images/blockAtmPopUp.png';
import popUpCongrats from '../../../assets/images/congrats.png';
import result from 'lodash/result';
import CheckBox from 'react-native-checkbox';
import QRCode from 'react-native-qrcode-generator';
import Thanks from '../../../assets/images/Thanks.png';
import LuckyDipPoin from '../../../assets/images/PopUpPoin.png';
import LuckyDipCashBack from '../../../assets/images/PopUpVoucher.png';
import map from 'lodash/map';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LuckyIcon from '../../../assets/images/IconLuckyDip.png';
import splitBillIcon from '../../../assets/images/split_bill_success.png';
import popUpCautionCircle from '../../../assets/images/caution-circle.png';
import {Field} from 'redux-form';
import SinarmasPickerBox from '../SinarmasPickerBox/SinarmasPickerBox.component';
import {language} from '../../../config/language';
import moment from 'moment';
import deleteAlert from '../../../assets/images/attention.png';
import popup_notfound from '../../../assets/images/popup_notfound.png';
import popup_Information from '../../../assets/images/popup_Information.png';
import BackGroundEvoucher from '../../../assets/images/BackgroundEvoucher1.png';
import RewardClaim from '../../../assets/images/RewardClaim.png';
import InformationMgm from '../../../assets/images/INFORMATION.png';
import successMgm from '../../../assets/images/successMgm.png';
import failedMgm from '../../../assets/images/MgmFailed.png';
import MgmReward from '../../../assets/images/MgmReward.png';
import selfie from '../../../assets/images/Selfie.png';
import timeProgress from '../../../assets/images/time-progress.png';
import {Toast} from '../../../utils/RNHelpers.util';
import successLiveness from '../../../assets/images/successMgm.png';
import proxyResolution from '../../../assets/images/attention.png';

const {width} = Dimensions.get('window');

const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

class LogoutModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    onClose: PropTypes.func,
    onButton1Press: PropTypes.func,
    onButton2Press: PropTypes.func,
    image: PropTypes.string,
    button1: PropTypes.string,
    button2: PropTypes.string,
    heading1: PropTypes.string,
    heading2: PropTypes.string,
    text: PropTypes.string,
    uriImage: PropTypes.string,
    closeOnTouchOutside: PropTypes.bool,
    checkboxChange: PropTypes.func,
    checkboxLabel: PropTypes.string,
    checkboxPosition: PropTypes.string,
    button1Color: PropTypes.string,
    button2Color: PropTypes.string,
    text1: PropTypes.string,
    text2: PropTypes.string,
    text3: PropTypes.string,
    text4: PropTypes.string,
    text1Black: PropTypes.bool,
    valueQR: PropTypes.string,
    isTcico: PropTypes.bool,
    textTimer: PropTypes.string,
    timer: PropTypes.string,
    isInstructions: PropTypes.bool,
    showLoading: PropTypes.bool,
    heading3: PropTypes.string,
    uriImg: PropTypes.object,
    typeLuckyDip: PropTypes.string,
    textLuckyDip: PropTypes.string,
    customHeading: PropTypes.string,
    customText: PropTypes.string,
    imgUpgrade: PropTypes.string,
    emoneyOnboard: PropTypes.object,
    textEmptyBox1: PropTypes.string,
    textEmptyBox2: PropTypes.string,
    textEmptyBox3: PropTypes.string,
    textWrongSwiftCode1: PropTypes.string,
    textWrongSwiftCode2: PropTypes.string,
    textRemittance1: PropTypes.string,
    textRemittance2: PropTypes.string,
    textRemittance3: PropTypes.string,
    textSil1: PropTypes.string,
    textSil2: PropTypes.string,
    checkboxLabel2: PropTypes.string,
    checked: PropTypes.bool,
    textSil3: PropTypes.string,
    textReksadana: PropTypes.string,
    textLinkReksadana: PropTypes.string,
    textLinkReksadana2: PropTypes.string,
  }

  state = {
    buttonDisabled: false,
    activeSlide: 0
  }
  static defaultProps = {
    visible: false,
    input: {},
    onClose: noop,
  }
  onButton1Press = () => {
    const {onButton1Press = noop} = this.props;
    onButton1Press();
    this.setState({buttonDisabled: true});
  }

  onButton2Press = () => {
    const {onButton2Press = noop} = this.props;
    onButton2Press();
    this.setState({buttonDisabled: true});
  }

  onClose = () => {
    const {onClose} = this.props;
    onClose();
    this.setState({buttonDisabled: false});
  }

  get pagination () {
    const {emoneyOnboard} = this.props;
    const {activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={emoneyOnboard.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.dot}
        dotStyle={styles.activeDot}
        inactiveDotStyle={{
        // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  renderEmoneyOnboard = (obj) => {
    const index = result(obj, 'index', 0);
    const emoneyImg = result(obj, 'item.emoneyImg', '');
    const emoneyText = result(obj, 'item.emoneyText', []);
    return (
      <View style={styles.onbView} index={index} key={index}>
        <View >
          <Image source={emoneyImg} style={styles.wlcEmImg} />
        </View>
        <View style={styles.textView}>
          <Text style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
            {map(emoneyText, (objText) => (
              <Text style={objText.style === 'normal' ? styles.textNormal : styles.textBold}>
                {objText.text}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    );

  }
  snapItem = (index) => this.setState({activeSlide: index});
  render () {
    const imageMap = {
      get REFRESH () {
        return {
          iconName: refreshIcon
        };
      },
      get CHECK () {
        return {
          iconName: checkIcon
        };
      },
      get WARNING () {
        return {
          iconName: 'WARNING'
        };
      },
      get DISCLAIMER () {
        return {
          iconName: disclaimerIcon
        };
      },
    };
    const {text1Black, closeOnTouchOutside =  true, visible, image, heading1, heading2, text, button1, button2, uriImage,
      checkboxChange = noop, checkboxLabel = '', checkboxPosition = '', button1Color = '', button2Color = '', text1 = '', isTcico,
      text2 = '', text3 = '', text4 = '', heading3, valueQR = '0', textTimer = '', timer = '', isInstructions = false, showLoading = false,
      imgUpgrade, emoneyOnboard, customHeading, customText, typeLuckyDip, textLuckyDip, textEmptyBox1, textEmptyBox2, textEmptyBox3, textWrongSwiftCode1, textWrongSwiftCode2, textRemittance1, textRemittance2, textRemittance3,
      textSil1, textSil2, textReksadana, textLinkReksadana, textLinkReksadana2} = this.props;
    const imgSource = result(imageMap[image], 'iconName', '');
    const qrWidth = ((width - 40) * 0.6);
    const stylesSet = image === 'LUCKYDIP' || image === 'EMPTYLUCKYDIP' || image === 'SPLITBILL' || image === 'CONFIRMSPLIT_BILL' || image === 'SPLITBILL_REVAMP' || image === 'QRGPN' || image === 'SWIFTCODE' || image === 'REMITTANCE_TRANSACTION' || image === 'REKSADANA_DISCLAIMER' || image === 'MEDALION_DISCLAIMER' || image === 'MEDALION_DISCLAIMER2' || image === 'ESTATEMENT' || image === 'TMANAGE' || image === 'TOOGLE_MEDALION';
    const isBankAcc = image === 'bankAccount';
    const isMedalion = image === 'MEDALION_DISCLAIMER2';
    const separatedText = text ? text.split('~') : null;
    let isReferMgm;
    if (image === 'CLAIMREWARDMGM') {
      isReferMgm = true;
    } else if (image === 'INFORMATION') {
      isReferMgm = true;
    } else if (image === 'SUCCESSMGM') {
      isReferMgm = true;
    } else if (image === 'FAILEDMGM') {
      isReferMgm = true;
    } else if (image === 'REWARDMGM') {
      isReferMgm = true;
    } else if (image === 'OPENSAVING') {
      isReferMgm = true;
    }

    return (
      <Overlay closeOnTouchOutside={closeOnTouchOutside} visible={visible} onClose={this.onClose} stylesSet={stylesSet} isBankAcc={isBankAcc} isReferMgm={isReferMgm} isMedalion={isMedalion}>
        <View>
          {
            image === 'WARNING' ?
              <Touchable onPress={this.onClose}>
                {(checkboxPosition !== '') ?
                  <ImageBackground resizeMode={'stretch'} source={{uri: uriImage}} style={styles.backgroundImage}>
                    <View>
                      <Text style={text1Black ? styles.containerTextTopColorMediumBlack : styles.containerTextTopColorMedium}>{text1}</Text>
                      <Text style={styles.containerTextTopColorLarge}>{text2}</Text>
                      <Text style={styles.containerTextTopColorMedium}>{text3}</Text>
                    </View>
                  </ImageBackground>
                  :
                  <Image
                    source={
                      {uri: uriImage}
                    }
                    style={styles.imageBanner}
                  />
                }
                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                {customHeading && <View>{customHeading}</View>}
                {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                {customText && <View>{customText}</View>}
              </Touchable>
              : image === 'EMONEYUPGRADE' ?
                <View style={styles.upgCont}>
                  <View style={styles.upgView}><Image source={imgUpgrade} style={styles.upgImg}/></View>
                  {heading1 && <Text style={styles.upgHeading}>{heading1}</Text>}
                  {heading2 && <Text style={styles.upgHeading}>{heading2}</Text>}
                  {text ? <Text style={styles.upgText}>{text}</Text> : <View style={styles.additionalPadding} />}
                </View>
                : image === 'emoji_sad_black' ?
                  <View style={styles.upgCont}>
                    <View style={styles.upgView}><Image source={emoji_sad_black} style={styles.upgSad}/></View>
                    {heading1 && <Text style={styles.upgHeading}>{heading1}</Text>}
                    {text ? <Text style={styles.upgTextSad}>{text}</Text> : <View style={styles.additionalPaddingSad} />}
                  </View>
                  : image === 'LOCKDOWN' ?
                    <View>
                      {image && <View style={styles.icon}><Image source={lockDownImg} style={styles.imageBannerLockDown}/></View>}
                      {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                      {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                      {customHeading && customHeading}
                      {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                      {customText && customText}
                    </View>
                    :  image === 'LUCKYDIP' ?
                      <View>
                        {typeLuckyDip === '1' ?
                          <View>
                            <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                            {image && <View style={styles.icon}><Image source={{uri: uriImage}} style={styles.backgroundImage}/></View>}
                            {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                            {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                            {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                          </View> : typeLuckyDip === '2' ?
                            <View>
                              <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                              <ImageBackground source={BackGroundEvoucher} style={styles.backgroundImageLuckyDip} >
                                {image && <View style={styles.icon}><Image source={{uri: uriImage}} style={styles.urlEvoucher}/></View>}
                              </ImageBackground>
                              {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                              {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                              {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                            </View> : typeLuckyDip === '3' ?
                              <View>
                                <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                {image && <View style={styles.icon}><Image source={LuckyDipPoin} style={styles.backgroundImageLuckyDip}/></View>}
                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                              </View> :
                              <View>
                                <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                {image && <View style={styles.icon}><Image source={LuckyDipCashBack} style={styles.backgroundImageLuckyDip}/></View>}
                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                              </View>}
                      </View>
                      : image === 'THANKYOU' ?
                        <View style = {styles.border}>
                          {image && <View style={styles.icons}><Image source={Thanks} style={styles.imageThankyou}/></View>}
                          {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                          {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                          {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                          {text ? <Text style={styles.feedbackText}>{text}</Text> : <View style={styles.additionalPadding} />}
                        </View>
                        : image === 'ACTIVEATM' ?
                          <View>
                            {image && <View style={styles.icon}><Image source={popUpActiveAtm} style={styles.imagePopUpManageAtmCard}/></View>}
                            {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                            {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                            {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                            {text ? <Text style={styles.textPopUpAtm}>{text}</Text> : <View style={styles.additionalPadding} />}
                          </View>
                          : image === 'BLOCKATM' ?
                            <View>
                              {image && <View style={styles.icon}><Image source={popUpBlockAtm} style={styles.imagePopUpManageAtmCard}/></View>}
                              {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                              {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                              {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                              {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                            </View>
                            : image === 'CONGRATS' ?
                              <View>
                                {image && <View style={styles.icon}><Image source={popUpCongrats} style={styles.imagePopUpManageAtmCard}/></View>}
                                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                              </View>
                              : image === 'DELETE' ?
                                <View>
                                  {image && <View style={styles.icon}><Image source={deleteAlert} style={styles.imagePopUpManageAtmCard}/></View>}
                                  {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                  {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                  {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                  {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                </View>
                                : image === 'QR' ?
                                  (showLoading ?
                                    <View style={styles.spinner}>
                                      <ActivityIndicator
                                        color={'black'}
                                        size={1}/>
                                    </View>
                                    :
                                    <View>
                                      <View  style={styles.blackTextTop}>
                                        <Touchable onPress={this.onButton1Press}>
                                          <SimasIcon name='close-black' size={20} />
                                        </Touchable>
                                      </View>
                                      <View style={styles.marginQR} >
                                        <View style={styles.midleImageQR}>
                                          <View style={{overflow: 'hidden'}}>
                                            <QRCode value={valueQR} size={qrWidth} bgColor='#000' fgColor='#fff' />
                                          </View>
                                          {
                                            isTcico ? 
                                              null :
                                              <View style={styles.logoBSIM}>
                                                <Image source={bankSinarmas} style={styles.imgBSIM}/>
                                              </View>
                                          }
                    
                                        </View>
                                      </View>
                                      {
                                        isTcico ? 
                                          null :
                                          <View style={styles.rowTimer}>
                                            <Text style={styles.topQRText}>{textTimer}</Text>
                                            <View style={styles.shadowTimer}>
                                              <Text style={styles.topQRTextTimer}> {timer} </Text>
                                            </View>
                                          </View>
                                      }
                
                                    </View>
                                  )
                                  : image === 'QR_CPM' ?
                                    (showLoading ?
                                      <View style={styles.spinner}>
                                        <ActivityIndicator
                                          color={'black'}
                                          size={1}/>
                                      </View>
                                      :
                                      <View>
                                        <View  style={styles.blackTextTop}>
                                          <Touchable onPress={this.onButton1Press}>
                                            <SimasIcon name='close-black' size={20} />
                                          </Touchable>
                                        </View>
                                        <View style={styles.marginQR} >
                                          <View style={styles.midleImageQR}>
                                            <View style={{overflow: 'hidden'}}>
                                              <QRCode value={valueQR} size={qrWidth} bgColor='#000' fgColor='#fff' />
                                            </View>
                                            <View style={styles.logoBSIM}>
                                              <Image source={bankSinarmas} style={styles.imgBSIM}/>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    )
                                    : image === 'EMONEYUPGRADE' ?
                                      <View style={styles.upgCont}>
                                        <View style={styles.upgView}><Image source={imgUpgrade} style={styles.upgImg}/></View>
                                        {heading1 && <Text style={styles.upgHeading}>{heading1}</Text>}
                                        {heading2 && <Text style={styles.upgHeading}>{heading2}</Text>}
                                        {text ? <Text style={styles.upgText}>{text}</Text> : <View style={styles.additionalPadding} />}
                                      </View>
                                      : image === 'emoji_sad_black' ?
                                        <View style={styles.upgCont}>
                                          <View style={styles.upgView}><Image source={emoji_sad_black} style={styles.upgSad}/></View>
                                          {heading1 && <Text style={styles.upgHeading}>{heading1}</Text>}
                                          {text ? <Text style={styles.upgTextSad}>{text}</Text> : <View style={styles.additionalPaddingSad} />}
                                        </View>
                                        : image === 'LOCKDOWN' ?
                                          <View>
                                            {image && <View style={styles.icon}><Image source={lockDownImg} style={styles.imageBannerLockDown}/></View>}
                                            {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                            {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                            {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                            {customHeading && customHeading}
                                            {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                            {customText && customText}
                                          </View>
                                          :  image === 'LUCKYDIP' ?
                                            <View>
                                              {typeLuckyDip === '1' ?
                                                <View>
                                                  <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                                  {image && <View style={styles.icon}><Image source={{uri: uriImage}} style={styles.backgroundImage}/></View>}
                                                  {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                  {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                  {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                                                </View> : typeLuckyDip === '2' ?
                                                  <View>
                                                    <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                                    <ImageBackground source={BackGroundEvoucher} style={styles.backgroundImageLuckyDip} >
                                                      {image && <View style={styles.icon}><Image source={{uri: uriImage}} style={styles.urlEvoucher}/></View>}
                                                    </ImageBackground>
                                                    {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                    {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                    {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                                                  </View> : typeLuckyDip === '3' ?
                                                    <View>
                                                      <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                                      {image && <View style={styles.icon}><Image source={LuckyDipPoin} style={styles.backgroundImageLuckyDip}/></View>}
                                                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                      {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                      {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                                                    </View> :
                                                    <View>
                                                      <View style={styles.iconLuckyDipContainer}><Image source={LuckyIcon} style={styles.iconLuckyDip}/></View>
                                                      {image && <View style={styles.icon}><Image source={LuckyDipCashBack} style={styles.backgroundImageLuckyDip}/></View>}
                                                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                      {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                      {text ? <Text style={styles.text}>{text} <Text style={styles.LuckyDipPrizeText}>{textLuckyDip}</Text></Text> : <View style={styles.additionalPadding} />}
                                                    </View>}
                                            </View>
                                            : image === 'THANKYOU' ?
                                              <View style = {styles.border}>
                                                {image && <View style={styles.icons}><Image source={Thanks} style={styles.imageThankyou}/></View>}
                                                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                {text ? <Text style={styles.feedbackText}>{text}</Text> : <View style={styles.additionalPadding} />}
                                              </View>
                                              : image === 'ACTIVEATM' ?
                                                <View>
                                                  {image && <View style={styles.icon}><Image source={popUpActiveAtm} style={styles.imagePopUpManageAtmCard}/></View>}
                                                  {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                  {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                  {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                  {text ? <Text style={styles.textPopUpAtm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                </View>
                                                : image === 'BLOCKATM' ?
                                                  <View>
                                                    {image && <View style={styles.icon}><Image source={popUpBlockAtm} style={styles.imagePopUpManageAtmCard}/></View>}
                                                    {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                    {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                    {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                    {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                  </View>
                                                  : image === 'CONGRATS' ?
                                                    <View>
                                                      {image && <View style={styles.icon}><Image source={popUpCongrats} style={styles.imagePopUpManageAtmCard}/></View>}
                                                      {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                      {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                      {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                    </View>
                                                    : image === 'DELETE' ?
                                                      <View>
                                                        {image && <View style={styles.icon}><Image source={deleteAlert} style={styles.imagePopUpManageAtmCard}/></View>}
                                                        {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                        {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                        {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                        {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                      </View>
                                                      : image === 'QR' ?
                                                        (showLoading ?
                                                          <View style={styles.spinner}>
                                                            <ActivityIndicator
                                                              color={'black'}
                                                              size={1}/>
                                                          </View>
                                                          :
                                                          <View>
                                                            <View  style={styles.blackTextTop}>
                                                              <Touchable onPress={this.onButton1Press}>
                                                                <SimasIcon name='close-black' size={20} />
                                                              </Touchable>
                                                            </View>
                                                            <View style={styles.marginQR} >
                                                              <View style={styles.midleImageQR}>
                                                                <View style={{overflow: 'hidden'}}>
                                                                  <QRCode value={valueQR} size={qrWidth} bgColor='#000' fgColor='#fff' />
                                                                </View>
                                                                <View style={styles.logoBSIM}>
                                                                  <Image source={bankSinarmas} style={styles.imgBSIM}/>
                                                                </View>
                                                              </View>
                                                            </View>
                                                            <View style={styles.rowTimer}>
                                                              <Text style={styles.topQRText}>{textTimer}</Text>
                                                              <View style={styles.shadowTimer}>
                                                                <Text style={styles.topQRTextTimer}> {timer} </Text>
                                                              </View>
                                                            </View>
                                                          </View>
                                                        )
                                                        : image === 'QR_CPM' ?
                                                          (showLoading ?
                                                            <View style={styles.spinner}>
                                                              <ActivityIndicator
                                                                color={'black'}
                                                                size={1}/>
                                                            </View>
                                                            :
                                                            <View>
                                                              <View  style={styles.blackTextTop}>
                                                                <Touchable onPress={this.onButton1Press}>
                                                                  <SimasIcon name='close-black' size={20} />
                                                                </Touchable>
                                                              </View>
                                                              <View style={styles.marginQR} >
                                                                <View style={styles.midleImageQR}>
                                                                  <View style={{overflow: 'hidden'}}>
                                                                    <QRCode value={valueQR} size={qrWidth} bgColor='#000' fgColor='#fff' />
                                                                  </View>
                                                                  <View style={styles.logoBSIM}>
                                                                    <Image source={bankSinarmas} style={styles.imgBSIM}/>
                                                                  </View>
                                                                </View>
                                                              </View>
                                                            </View>
                                                          )
                                                          : image === 'information_alert' ?
                                                            <View>
                                                              <View  style={styles.icon}>
                                                                <Touchable onPress={this.onButton1Press}>
                                                                  <SimasIcon name='alert-circle' size={50} style={{transform: [{rotate: '180deg'}]}} />
                                                                </Touchable>
                                                              </View>
                                                              <View>
                                                                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                {customHeading && customHeading}
                                                                {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                {customText && customText}
                                                              </View>
                                                            </View>
                                                            : image === 'EMPTYLUCKYDIP' ?
                                                              <View>
                                                                <View  style={styles.iconLuckySad}>
                                                                  <View>
                                                                    <SimasIcon name='emoji_sad_black' size={40} />
                                                                  </View>
                                                                </View>
                                                                <View>
                                                                  <Text style={styles.headingLuckyDip}>{heading1}</Text>
                                                                  <Text style={styles.textLuckyDip}>{textEmptyBox1}<Text style={styles.textBold}>{textEmptyBox2}</Text>{textEmptyBox3}</Text>
                                                                </View>
                                                              </View>
                                                              :
                                                              image === 'EMONEYONBOARD' ?
                                                                <View style={styles.onbCont}>
                                                                  <View style={styles.centerCont}>
                                                                    <Carousel data={emoneyOnboard} layout={'default'} autoplay={true}
                                                                      autoplayDelay={3000}
                                                                      renderItem={this.renderEmoneyOnboard} loop={true} scrollEnabled={false}
                                                                      enableMomentum={false} windowSize={500} firstItem={0}
                                                                      containerCustomStyle={styles.containerCustomStyle}
                                                                      sliderWidth={styles.sliderWidth} itemWidth={styles.itemWidth}
                                                                      snapOnAndroid={true}
                                                                      enableSnap={true}
                                                                      inactiveSlideOpacity={1}
                                                                      inactiveSlideScale={1}
                                                                      hasParallaxImages={true}
                                                                      loopClonesPerSide={5}
                                                                      onSnapToItem={this.snapItem}/>
                                                                    <View style={styles.pagination}>
                                                                      {this.pagination}
                                                                    </View>
                                                                  </View>
                                                                </View>
                                                                :
                                                                image === 'SPLITBILL' ?
                                                                  <View style={styles.upgCont}>
                                                                    <View style={styles.upgviewSplitBill}><Image source={splitBillIcon} style={styles.splitbill}/></View>
                                                                    {heading1 && <Text style={styles.upgHeadingSplitBillSuccess}>{heading1}</Text>}
                                                                    {text ? <Text style={styles.textSplitBillSuccess}>{text}</Text> : null}
                                                                  </View>
                                                                  :  
                                                                  image === 'CONFIRMSPLIT_BILL' ?
                                                                    <View style={styles.upgCont}>
                                                                      <View><Image source={imgSource}/></View>
                                                                      {heading1 && <Text style={styles.upgHeadingSplitBill}>{heading1}</Text>}
                                                                      {text ? <Text style={styles.textSplitBill}>{text}</Text> : null}
                                                                    </View>
                                                                    : image === 'bankAccount' ?
                                                                      <View style={styles.bankAccTopContainer}>
                                                                        {text ? <Text style={styles.textAcc}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                      </View>
                                                                      :
                                                                      image === 'CLOSESIMASTARA' ?
                                                                        <View>
                                                                          {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                          <Text style={styles.text}>{text}<Text style={styles.textBold}>{text1}</Text>{text2}</Text>
                                                                        </View>
                                                                        : image === 'REQUESTATMCARD' ?
                                                                          <View style={styles.marginStyle}>
                                                                            {image && <View style={styles.icon}><Image source={popUpActiveAtm} style={styles.imagePopUpManageAtmCard}/></View>}
                                                                            {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                            <Text style={styles.text}>{text}</Text>
                                                                          </View>
                                                                          : image === 'CONGRATSREQUESTATMCARD' ?
                                                                            <View style={styles.marginStyle}>
                                                                              {image && <View style={styles.icon}><Image source={popUpCongrats} style={styles.imagePopUpManageAtmCard}/></View>}
                                                                              {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                              <Text style={styles.text}>{text}</Text>
                                                                            </View>
                                                                            : image === 'OpenMenuActivateAtmCard' ?
                                                                              <View style={styles.marginStyle}>
                                                                                {image && <View style={styles.icon}><Image source={popUpCautionCircle} style={styles.imagePopUpManageAtmCard}/></View>}
                                                                                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                                <Text style={styles.text}>{text}</Text>
                                                                              </View>
                                                                              :
                                                                              image === 'SWIFTCODE' ?
                                                                                <View>
                                                                                  <View  style={styles.iconRemittanceWrong}>
                                                                                    <View>
                                                                                      <Image source={popup_notfound} style={styles.imgIcon}/>
                                                                                    </View>
                                                                                  </View>
                                                                                  <View>
                                                                                    <Text style={styles.headingRemittance}>{heading1}</Text>
                                                                                    <Text style={styles.textRemittance}>{textWrongSwiftCode1}<Text style={styles.textRemittance}>{textWrongSwiftCode2}</Text></Text>
                                                                                  </View>
                                                                                </View>
                                                                                :
                                                                                image === 'REMITTANCE_TRANSACTION' ?
                                                                                  <View>
                                                                                    <View  style={styles.iconRemittanceWrong}>
                                                                                      <View>
                                                                                        <Image source={popup_Information} style={styles.imgIcon}/>
                                                                                      </View>
                                                                                    </View>
                                                                                    <View>
                                                                                      <Text style={styles.headingRemittance}>{heading1}</Text>
                                                                                      <Text style={styles.textRemittance}>{textRemittance1}<Text style={styles.textRemittance}>{textRemittance2}</Text>{textRemittance3}</Text>
                                                                                    </View>
                                                                                  </View>
                                                                                  :
                                                                                  image === 'unlinkMerchant' ?
                                                                                    <View>
                                                                                      {image && <View style={styles.icon}><Image source={warningIcon} style={styles.imgSuccessUnlink}/></View>}
                                                                                      <View>
                                                                                        {heading1 && <Text style={styles.headingUnlinkMerchant}>{heading1}</Text>}
                                                                                      </View>
                                                                                      <Text style={styles.textUnlinkMerchant}>{text} {text2} {text1}</Text>
                                                                                    </View>
                                                                                    :
                                                                                    image === 'successUnlink' ?
                                                                                      <View>
                                                                                        {image && <View style={styles.icon}><Image source={thanksIcon} style={styles.imgSuccessUnlink}/></View>}
                                                                                        <View>
                                                                                          {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                                        </View>
                                                                                        <Text style={styles.textUnlinkMerchant}>{text}</Text>
                                                                                      </View>
                                                                                      :
                                                                                      image === 'TMANAGE' ?
                                                                                        <View style={styles.tManDetail}>
                                                                                          <View style={{justifyContent: 'center'}}>
                                                                                            {heading1 && <Text style={styles.detailTitleModal}>{heading1}</Text>}
                                                                                          </View>
                                                                                          <View style={{justifyContent: 'center'}}>
                                                                                            {heading2 && <Text style={styles.confText}>{heading2}</Text>}
                                                                                          </View>
                                                                                        </View>
                                                                                        :
                                                                                        image === 'ESTATEMENT' ?
                                                                                          <View style={styles.bRad}>
                                                                                            <View style={{justifyContent: 'flex-start', paddingVertical: 20}}>
                                                                                              {heading1 && <Text style={styles.detailTitlePeriode}>{heading1}</Text>}
                                                                                            </View>
                                                                                            <View style={styles.boxI}>
                                                                                              <View style={styles.fieldSty}>
                                                                                                <Field
                                                                                                  name='Periode'
                                                                                                  component={SinarmasPickerBox}
                                                                                                  rightIcon='arrow'
                                                                                                  itemList={[{term: moment().format('MMMM YYYY'), schmeId: 'currPeriod'},
                                                                                                    {term: moment().subtract(1, 'month').format('MMMM YYYY'), schmeId: 'prevPeriod'},
                                                                                                    {term: moment().subtract(2, 'month').format('MMMM YYYY'), schmeId: 'prev2Period'},
                                                                                                    {term: moment().subtract(3, 'month').format('MMMM YYYY'), schmeId: 'prev3Period'},
                                                                                                    {term: moment().subtract(4, 'month').format('MMMM YYYY'), schmeId: 'prev4Period'},
                                                                                                    {term: moment().subtract(5, 'month').format('MMMM YYYY'), schmeId: 'prev5Period'},
                                                                                                  ]}
                                                                                                  labelKey='schmeId'
                                                                                                  labelText={language.MANAGE__CREDIT_CARD_STATEMENT_CHOOSE}
                                                                                                  labelName='term'
                                                                                                  isRevamp={true}
                                                                                                />
                                                                                              </View>
                                                                                            </View>
                                                                                          </View>
                                                                                          :
                                                                                          image === 'CLOSESIMASTARA' ?
                                                                                            <View>
                                                                                              {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                                              <Text style={styles.text}>{text}<Text style={styles.textBold}>{text1}</Text>{text2}</Text>
                                                                                            </View>
                                                                                            : image === 'CLAIMREWARDMGM' ?
                                                                                              <View>
                                                                                                {image && <View style={styles.iconMgm}><Image source={RewardClaim} style={styles.imageRewardClaim}/></View>}
                                                                                                {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                              </View>
                                                                                              : image === 'INFORMATION' ?
                                                                                                <View>
                                                                                                  {image && <View style={styles.iconMgm}><Image source={InformationMgm} style={styles.imageRewardClaim}/></View>}
                                                                                                  {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                  <Text style={styles.textSuccessMgm}>{text}<Text style={styles.textBold}>{text1}</Text>{text2} {text3}</Text>
                                                                                                </View>
                                                                                                : image === 'FAILEDMGM' ?
                                                                                                  <View>
                                                                                                    {image && <View style={styles.iconMgm}><Image source={failedMgm} style={styles.imageRewardClaim}/></View>}
                                                                                                    {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                    {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                    {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                    {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                  </View>
                                                                                                  :
                                                                                                  image === 'SUCCESSMGM' ?
                                                                                                    <View>
                                                                                                      {image && <View style={styles.iconMgm}><Image source={successMgm} style={styles.imageRewardClaim}/></View>}
                                                                                                      {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                      <Text style={styles.textSuccessMgm}>{text}<Text style={styles.textBold}>{text1}</Text>{text2}</Text>
                                                                                                    </View>
                                                                                                    :
                                                                                                    image === 'REWARDMGM' ?
                                                                                                      <View>
                                                                                                        {image && <View style={styles.iconMgm}><Image source={MgmReward} style={styles.imageMgmReward}/></View>}
                                                                                                        {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                        {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                        {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                        {text ? <Text style={styles.textRewardMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                      </View>
                                                                                                      :
                                                                                                      image === 'OPENSAVING' ?
                                                                                                        <View>
                                                                                                          {image && <View style={styles.iconMgm} />}
                                                                                                          {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                          {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                          {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                          {text ? <Text style={styles.textRewardMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                        </View>
                                                                                                        : image === 'SELFIEPD' ?
                                                                                                          <View style = {styles.border}>
                                                                                                            {image && <View style={styles.icons}><Image source={selfie} style={styles.selfie}/></View>}
                                                                                                            {heading2 && <Text style={styles.heading2PD}>{heading2}</Text>}
                                                                                                            {text ? <Text style={styles.progressPDSub}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                          </View>
                                                                                                          : image === 'PROGRESSPD' ?
                                                                                                            <View style = {styles.border}>
                                                                                                              {text1Black ? <Text style={styles.orderIdRequest}> {text1Black} </Text> : <View style={styles.additionalPadding} />}
                                                                                                              {image && <View style={styles.iconsPD}><Image source={timeProgress} style={styles.timeProgress}/></View>}
                                                                                                              {heading3 && <Text style={styles.heading3PD}>{heading3}</Text>}
                                                                                                              {text ? <Text style={styles.progressPDSub}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                            </View>
                                                                                                            : image === 'MOVEVOUCHER' ?
                                                                                                              <View style = {styles.border}>
                                                                                                                {heading1 && <Text style={styles.heading1MoveVoucher}>{heading1}</Text>}
                                                                                                                { text ? 
                                                                                                                  <Text style={styles.textMoveVoucher}>
                                                                                                                    {separatedText.map((substring, index) => {
                                                                                                                      if (index % 2 === 1) {
                                                                                                                        return <Text style={styles.textBold}>{substring}</Text>;
                                                                                                                      } else {
                                                                                                                        return <Text>{substring}</Text>;
                                                                                                                      }
                                                                                                                    })}
                                                                                                                  </Text> 
                                                                                                                  : 
                                                                                                                  <View style={styles.additionalPadding} />
                                                                                                                }
                                                                                                              </View>
                                                                                                              : image === 'SPLITBILL_REVAMP' ?
                                                                                                                <View style={styles.upgCont}>
                                                                                                                  {heading1 && <Text style={styles.upgHeadingSplitBill}>{heading1}</Text>}
                                                                                                                  {text ? <Text style={styles.textSplitBill}>{text}</Text> : null}
                                                                                                                </View>
                                                                                                                : image === 'WARNING_DETAIL_ALAMAT_ADDNEWATM' ?
                                                                                                                  <View>
                                                                                                                    {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                                                                    <Text style={styles.text}>{text}</Text>
                                                                                                                  </View>
                                                                                                                  : image === 'REKSADANA_DISCLAIMER' ?
                                                                                                                    <View>
                                                                                                                      <View  style={styles.iconRemittanceWrong}>
                                                                                                                        <View>
                                                                                                                          <Image source={disclaimerIcon}/>
                                                                                                                        </View>
                                                                                                                      </View>
                                                                                                                      <View>
                                                                                                                        {heading1 && <Text style={styles.headingSIL}>{heading1}</Text>}
                                                                                                                        {textSil1 && <Text style={styles.textSIL1}>{textSil1}</Text>}
                                                                                                                        {textReksadana && <Text style={styles.textDisclaimerReksadana}>{textReksadana}</Text>}
                                                                                                                        {text && <Text style={styles.text}>{text}</Text>}
                                                                                                                        <Touchable onPress={openLink('https://www.banksinarmas.com/id/informasiumum/hubunganinvestor/reksadana')}>
                                                                                                                          <Text style={styles.textSIL2}>{textSil2}</Text>
                                                                                                                        </Touchable>
                                                                                                                      </View>

                                                                                                                      <View style={styles.buttonContainerSIL}>
                                                                                                                        <View style={styles.checkboxAlignSIL}>
                                                                                                                          <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyleMedalion} labelStyle={styles.checkboxLabelReksadana}/>
                                                                                                                        </View>
                                                                                                                      </View>
                                                                                                                    </View>
                                                                                                                    : image === 'MEDALION_DISCLAIMER' ?
                                                                                                                      <View>
                                                                                                                        <View  style={styles.iconRemittanceWrong}>
                                                                                                                          <View>
                                                                                                                            <Image source={disclaimerIcon}/>
                                                                                                                          </View>
                                                                                                                        </View>
                                                                                                                        <View>
                                                                                                                          {heading1 && <Text style={styles.headingSIL}>{heading1}</Text>}
                                                                                                                          {textSil1 && <Text style={styles.textSIL1}>{textSil1}</Text>}
                                                                                                                          {textReksadana && <Text style={styles.text}>{textReksadana}</Text>}
                                                                                                                          {textLinkReksadana && <Text style={styles.textLinkReksadanaStyle}>{textLinkReksadana}</Text>}
                                                                                                                          {text && <Text style={styles.text}>{text}</Text>}
                                                                                                                          <Touchable onPress={openLink('https://www.banksinarmas.com/id/informasiumum/hubunganinvestor/reksadana')}>
                                                                                                                            <Text style={styles.linkStyleMedalion}>{textLinkReksadana2}</Text>
                                                                                                                          </Touchable>
                                                                                                                        </View>
                                                                                                                      </View>
                                                                                                                      : image === 'MEDALION_DISCLAIMER2' ?
                                                                                                                        <View>
                                                                                                                          <View style={styles.iconDisclaimerMedalion}>
                                                                                                                            <View>
                                                                                                                              <Image source={disclaimerIcon}/>
                                                                                                                            </View>
                                                                                                                          </View>
                                                                                                                          <View>
                                                                                                                            {heading1 && <Text style={styles.headingNewMedalion}>{heading1}</Text>}
                                                                                                                            {textSil1 && <Text style={styles.textSIL1}>{textSil1}</Text>}
                                                                                                                            <View style={styles.listRowMedalion}>
                                                                                                                              <Text style={styles.marginList1}>1</Text>
                                                                                                                              {textReksadana && <Text style={styles.wordingDisclaimerMedalion}>{textReksadana}</Text>}
                                                                                                                            </View>
                                                                                                                            <View style={styles.listRowMedalion}>
                                                                                                                              <Text>2</Text>
                                                                                                                              {textLinkReksadana && <Text style={styles.textLinkReksadanaStyle}>{textLinkReksadana}</Text>}
                                                                                                                            </View>
                                                                                                                            <Touchable onPress={openLink('https://www.banksinarmas.com/id/informasiumum/hubunganinvestor/reksadana')} style={styles.listRowMedalion}>
                                                                                                                              <Text style={styles.linkStyleMedalion}>{textLinkReksadana2}</Text>
                                                                                                                            </Touchable>
                                                                                                                            {text && <Text style={styles.text}>{text}</Text>}
                                                                                                                          </View>

                                                                                                                          <View style={styles.buttonContainerSIL}>
                                                                                                                            <View style={styles.checkboxAlignMedalion}>
                                                                                                                              <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyleMedalion} labelStyle={styles.checkboxLabelReksadana}/>
                                                                                                                            </View>
                                                                                                                          </View>
                                                                                                                        </View>
                                                                                                                        :
                                                                                                                        image === 'TOOGLE_MEDALION' ? 
                                                                                                                          <View>
                                                                                                                            <View style={styles.iconInformationMedalion}>
                                                                                                                              <View>
                                                                                                                                <Image source={popup_Information} style={styles.imgInformation}/>
                                                                                                                              </View>
                                                                                                                            </View>
                                                                                                                            <View>
                                                                                                                              <Text style={styles.headingInformationToogle}>{heading1}</Text>
                                                                                                                              <Text style={styles.textInformationToggle}>{text}</Text>
                                                                                                                            </View>
                                                                                                                          </View>
                                                                                                                          :
                                                                                                                          image === 'SUCCESSLIVENESS' ?
                                                                                                                            <View>
                                                                                                                              {image && <View style={styles.iconMgm}><Image source={successLiveness} style={styles.imageRewardClaim}/></View>}
                                                                                                                              {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                              <Text style={styles.textSuccessMgm}>{text}<Text style={styles.textBold}>{text1}</Text>{text2}</Text>
                                                                                                                            </View>
                                                                                                                            : image === 'PROXYOTHERBANK' ?
                                                                                                                              <View>
                                                                                                                                {image && <View style={styles.iconMgm}><Image source={proxyResolution} style={styles.imageProxyResolution}/></View>}
                                                                                                                                {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                                                {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                                              </View>
                                                                                                                              : image === 'PROXYRESOLUTION' ?
                                                                                                                                <View>
                                                                                                                                  {image && <View style={styles.iconMgm}><Image source={proxyResolution} style={styles.imageProxyResolution}/></View>}
                                                                                                                                  {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                                  {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                  {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                                                  {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                                                </View>
                                                                                                                                : image === 'PROXYSUCCESS' ?
                                                                                                                                  <View>
                                                                                                                                    {image && <View style={styles.iconMgm}><Image source={successMgm} style={styles.imageRewardClaim}/></View>}
                                                                                                                                    {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                                    {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                    {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                                                    {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                                                  </View>
                                                                                                                                  : image === 'PROXYFAILED' ?
                                                                                                                                    <View>
                                                                                                                                      {image && <View style={styles.iconMgm}><Image source={failedMgm} style={styles.imageRewardClaim}/></View>}
                                                                                                                                      {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                      {heading3 && <Text style={styles.heading3}>{heading3}</Text>}
                                                                                                                                      {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                                                    </View>
                                                                                                                                    : image === 'FAILEDBIFASTACCOUNT' ?
                                                                                                                                      <View>
                                                                                                                                        {image && <View style={styles.iconMgm}><Image source={imgSource}/></View>}
                                                                                                                                        {heading1 && <Text style={styles.headingMgm}>{heading1}</Text>}
                                                                                                                                        {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                        {text ? <Text style={styles.textMgm}>{text}</Text> : <View style={styles.additionalPadding} />}
                                                                                                                                      </View>
                                                                                                                                      :
                                                                                                                                      <View>
                                                                                                                                        {image && <View style={styles.icon}><Image source={imgSource}/></View>}
                                                                                                                                        {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                                                                                                                                        {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                                                                                                                                        {
                                                                                                                                          isInstructions ?
                                                                                                                                            <View style={styles.containerInstruction}>
                                                                                                                                              <View style={styles.rowView}>
                                                                                                                                                <View style={styles.numberContainer}><Text style={[styles.numberText]}>1</Text></View>
                                                                                                                                                <Text style={styles.textInstruction}>{text}</Text>
                                                                                                                                              </View>
                                                                                                                                              <View style={styles.rowView}>
                                                                                                                                                <View style={styles.numberContainer}><Text style={[styles.numberText]}>2</Text></View>
                                                                                                                                                <Text style={styles.textInstruction}>{text1}</Text>
                                                                                                                                              </View>
                                                                                                                                              <View style={styles.rowView}>
                                                                                                                                                <View style={styles.numberContainer}><Text style={[styles.numberText]}>3</Text></View>
                                                                                                                                                <Text style={styles.textInstruction}>{text2}</Text>
                                                                                                                                              </View>
                                                                                                                                              <View style={styles.rowView}>
                                                                                                                                                <View style={styles.numberContainer}><Text style={[styles.numberText]}>4</Text></View>
                                                                                                                                                <Text style={styles.textInstruction}>{text3}</Text>
                                                                                                                                              </View>
                                                                                                                                              { text4 === '' ?
                                                                                                                                                null
                                                                                                                                                :
                                                                                                                                                <View style={styles.rowView}>
                                                                                                                                                  <View style={styles.numberContainer}><Text style={[styles.numberText]}>5</Text></View>
                                                                                                                                                  <Text style={styles.textInstruction}>{text4}</Text>
                                                                                                                                                </View>
                                                                                                                                              }
                                                                                                                                            </View>
                                                                                                                                            : text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />

                                                                                                                                        }
                                                                                                                                      </View>
          }

        </View>

        {
          ((checkboxPosition !== '') && (checkboxPosition === 'TOP')) &&
          <View style={styles.buttonContainerTop}>
            <View style={styles.checkboxAlignTop}>
              <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyle} labelStyle={styles.checkboxLabelTop}/>
            </View>
          </View>
        }
        {
          ((checkboxLabel !== '') && (checkboxPosition === '')) && image === 'REWARDMGM' &&
          <View style={styles.buttonContainerTopMgm}>
            <View style={styles.checkboxAlignTopMgm}>
              <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyleMgm} labelStyle={styles.checkboxLabel}/>
            </View>
          </View>
        }
        <View style={image === 'ESTATEMENT' || image === 'TMANAGE' ? styles.buttonContainerES : image === 'SPLITBILL_REVAMP' ? styles.buttonContainerSplitBill : styles.buttonContainer}>
          { image === 'REWARDMGM' ?
            ((checkboxLabel !== '') && (checkboxPosition === 'TOP')) &&
            <View style={styles.buttonAlignMgm}>
              <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyle} labelStyle={styles.checkboxLabel}/>
            </View>
            :
            ((checkboxLabel !== '') && (checkboxPosition === '')) &&
            <View style={styles.buttonAlign}>
              <CheckBox onChange={checkboxChange} label={checkboxLabel} checkboxStyle={styles.checkboxStyle} labelStyle={styles.checkboxLabel}/>
            </View>
          }
          {image === 'LUCKYDIP' ?
            <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignLuckyDip}>
              <Text style={ button1Color === 'black' ? styles.blackText : styles.redText}>{button1}</Text>
            </Touchable>
            : image === 'EMONEYUPGRADE' ?
              <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonUpg}>
                <Text style={ button1Color === 'black' ? styles.blackText : styles.redTextUpg}>{button1}</Text>
              </Touchable>
              : image === 'bankAccount' ?
                <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1bankAcc}>
                  <Text style={styles.bankTextTop}>{button1}</Text>
                </Touchable>
                : image === 'ESTATEMENT' || image === 'TMANAGE' ?
                  <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1ES}>
                    <Text style={styles.whiteText1}>{button1}</Text>
                  </Touchable>
                  : image === 'REQUESTATMCARD' ?
                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1Border}>
                      <Text style={styles.button1Style}>{button1}</Text>
                    </Touchable>
                    : image === 'CONGRATSREQUESTATMCARD' ?
                      <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1Border}>
                        <Text style={styles.button1Style}>{button1}</Text>
                      </Touchable>
                      : image === 'OpenMenuActivateAtmCard' ?
                        <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button2BorderOpenMenuActiveAtm}>
                          <Text style={styles.button2StyleOpenMenuActiveAtm}>{button1}</Text>
                        </Touchable>
                        : image === 'SWIFTCODE' ?
                          <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignRemittance}>
                            <Text style={ button1Color === 'black' ? styles.redText : styles.whiteText}>{button1}</Text>
                          </Touchable>
                          : image === 'QRGPN' ?
                            <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1QRGPN}>
                              <Text style={styles.bankTextTop}>{button1}</Text>
                            </Touchable>
                            : image === 'SPLITBILL_REVAMP' ?
                              <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignSplitBill}>
                                <Text style={ button2Color === 'white' ? styles.whiteText : styles.redText}>{button2}</Text>
                              </Touchable>
                              : image === 'REMITTANCE_TRANSACTION' ?
                                <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignRemittance}>
                                  <Text style={ button1Color === 'black' ? styles.redText : styles.whiteText}>{button1}</Text>
                                </Touchable>
                                :
                                image === 'CLAIMREWARDMGM' ?
                                  <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1bankAcc}>
                                    <Text style={styles.bankTextTopMgm}>{button1}</Text>
                                  </Touchable>
                                  :
                                  image === 'INFORMATION' ?
                                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1info}>
                                      <Text style={styles.bankTextInfoMgm}>{button1}</Text>
                                    </Touchable>
                                    :
                                    image === 'SUCCESSMGM' ?
                                      <Touchable onPress={this.onButton1Press} style={styles.button1bankAcc}>
                                        <Text style={styles.bankTextTopMgm}>{button1}</Text>
                                      </Touchable>
                                      :
                                      image === 'FAILEDMGM' ?
                                        <Touchable onPress={this.onButton1Press} style={styles.button1info}>
                                          <Text style={styles.bankTextInfoMgm}>{button1}</Text>
                                        </Touchable>
                                        :
                                        image === 'REWARDMGM' ?
                                          <Touchable onPress={this.onButton1Press} style={styles.button1bankAcc}>
                                            <Text style={styles.bankTextRewardMgm}>{button1}</Text>
                                          </Touchable>
                                          :
                                          image === 'OPENSAVING' ?
                                            <Touchable onPress={this.onButton1Press} style={styles.button1bankAcc}>
                                              <Text style={styles.bankTextRewardMgm}>{button1}</Text>
                                            </Touchable>
                                            : image === 'SELFIEPD' ?
                                              <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignPD}>
                                                <Text style={ button1Color === 'black' ? styles.blackText : styles.redTextPD}>{button1}</Text>
                                              </Touchable>
                                              : image === 'PROGRESSPD' ?
                                                <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignPD}>
                                                  <Text style={ button1Color === 'black' ? styles.blackText : styles.redTextPD}>{button1}</Text>
                                                </Touchable>
                                                : image === 'MOVEVOUCHER' ?
                                                  <View>
                                                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1MoveVoucher}>
                                                      <Text style={styles.whiteTextBold}>{button1}</Text>
                                                    </Touchable>
                                                    <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button2MoveVoucher}>
                                                      <Text style={styles.redTextBold}>{button2}</Text>
                                                    </Touchable>
                                                  </View>
                                                  : image === 'SPLITBILL' ?
                                                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignSplitBillGotIt}>
                                                      <Text style={ button1Color === 'black' ? styles.blackText : styles.redText}>{button1}</Text>
                                                    </Touchable>
                                                    : image === 'WARNING_DETAIL_ALAMAT_ADDNEWATM' ?
                                                      <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonPopUpWarningAddressAddNewATM}>
                                                        <Text style={styles.whiteText}>{button1}</Text>
                                                      </Touchable>
                                                      : image === 'unlinkMerchant' ?
                                                        button1 &&
                                                        <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignUnlinkMerchant}>
                                                          <Text style={styles.redTextUnlinkMerchant}>{button1}</Text>
                                                        </Touchable>
                                                        : image === 'REKSADANA_DISCLAIMER' ?
                                                          <Touchable onPress={this.onButton1Press} style={styles.buttonSILCancel}>
                                                            <Text style={ button1Color === 'black' ? styles.blackText : styles.whiteText}>{button1}</Text>
                                                          </Touchable>
                                                          : image === 'MEDALION_DISCLAIMER' ?
                                                            <Touchable onPress={this.onButton1Press} style={styles.buttonSILCancel}>
                                                              <Text style={ button1Color === 'black' ? styles.blackText : styles.whiteText}>{button1}</Text>
                                                            </Touchable>
                                                            : image === 'MEDALION_DISCLAIMER2' ?
                                                              <Touchable onPress={this.onButton1Press} style={styles.buttonMedalionCancel}>
                                                                <Text style={ button1Color === 'black' ? styles.blackText : styles.whiteText}>{button1}</Text>
                                                              </Touchable>
                                                              : image === 'TOOGLE_MEDALION' ? 
                                                                <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonInformationToogle}>
                                                                  <Text style={ button1Color === 'black' ? styles.redText : styles.whiteText}>{button1}</Text>
                                                                </Touchable>
                                                                : image === 'PROXYOTHERBANK' ?
                                                                  <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1Proxy}>
                                                                    <Text style={styles.bankTextProxy}>{button1}</Text>
                                                                  </Touchable>
                                                                  : image === 'PROXYRESOLUTION' ?
                                                                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1bankAcc}>
                                                                      <Text style={styles.bankText}>{button1}</Text>
                                                                    </Touchable>
                                                                    : image === 'PROXYSUCCESS' ?
                                                                      <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.button1Proxy}>
                                                                        <Text style={styles.bankTextProxy}>{button1}</Text>
                                                                      </Touchable>
                                                                      : image === 'PROXYFAILED' ?
                                                                        <Touchable onPress={this.onButton1Press} style={styles.button1Proxy}>
                                                                          <Text style={styles.bankTextProxy}>{button1}</Text>
                                                                        </Touchable>
                                                                        : image === 'FAILEDBIFASTACCOUNT' ?
                                                                          <Touchable onPress={this.onButton1Press} style={styles.button1info}>
                                                                            <Text style={styles.bankTextInfoMgm}>{button1}</Text>
                                                                          </Touchable>
                                                                          :
                                                                          <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlign}>
                                                                            <Text style={ button1Color === 'black' ? styles.blackText : styles.redText}>{button1}</Text>
                                                                          </Touchable>
          }
          {
            image === 'bankAccount' ?
              <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button1bankAcc}>
                <Text style={ styles.bankText}>{button2}</Text>
              </Touchable>
              : image === 'OpenMenuActivateAtmCard' ?
                <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button1BorderOpenMenuActiveAtm}>
                  <Text style={ styles.button1StyleOpenMenuActiveAtm}>{button2}</Text>
                </Touchable>
                : image === 'QRGPN' ?
                  <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button1QRGPN}>
                    <Text style={ styles.bankText}>{button2}</Text>
                  </Touchable>
                  :
                  image === 'SPLITBILL_REVAMP' ?
                    <Touchable onPress={this.onButton1Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignSplitBillCancel}>
                      <Text style={ button1Color === 'black' ? styles.blackText : styles.redText}>{button1}</Text>
                    </Touchable>
                    : image === 'ESTATEMENT' || image === 'TMANAGE' ?
                      <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button2ES}>
                        <Text style={styles.redText1}>{button2}</Text>
                      </Touchable>
                      :
                      image === 'CLAIMREWARDMGM' ?
                        <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.button1bankAcc}>
                          <Text style={ styles.bankText}>{button2}</Text>
                        </Touchable>
                        :
                        image === 'SUCCESSMGM' ?
                          <Touchable onPress={this.onButton2Press} style={styles.button1bankAcc}>
                            <Text style={ styles.bankText}>{button2}</Text>
                          </Touchable>
                          :
                          image === 'REWARDMGM' ?
                            <Touchable onPress={this.onButton2Press} style={styles.button1bankAcc}>
                              <Text style={ styles.bankTextReward}>{button2}</Text>
                            </Touchable>
                            :
                            image === 'OPENSAVING' ?
                              <Touchable onPress={this.onButton2Press} style={styles.button1bankAcc}>
                                <Text style={ styles.bankTextReward}>{button2}</Text>
                              </Touchable>
                              :
                              image === 'MOVEVOUCHER' ?
                                null
                                :
                                image === 'unlinkMerchant' ?
                                  button2 &&
                                  <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={ button2Color === 'red' ? styles.buttonAlignSuccessUnlinkMerchant : styles.buttonAlignUnlinkMerchant2}>
                                    <Text style={ styles.redTextUnlinkMerchant}>{button2}</Text>
                                  </Touchable>
                                  :
                                  image === 'REKSADANA_DISCLAIMER' ?
                                    <Touchable onPress={this.onButton2Press} style={styles.buttonSILOk}>
                                      <Text style={ styles.silText}>{button2}</Text>
                                    </Touchable>
                                    : image === 'MEDALION_DISCLAIMER2' ? 
                                      <Touchable onPress={this.onButton2Press} style={styles.buttonMedalionOK}>
                                        <Text style={ styles.silText}>{button2}</Text>
                                      </Touchable>
                                      :
                                      image === 'PROXYRESOLUTION' ?
                                        <Touchable onPress={this.onButton2Press} style={styles.button1bankAcc}>
                                          <Text style={ styles.bankTextProxyResolution}>{button2}</Text>
                                        </Touchable>
                                        :
                                        button2 &&
                                        <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.buttonAlign}>
                                          <Text style={ button2Color === 'black' ? styles.blackText : styles.redText}>{button2}</Text>
                                        </Touchable>
          }

        </View>
      </Overlay>
    );
  }
}
export default LogoutModal;