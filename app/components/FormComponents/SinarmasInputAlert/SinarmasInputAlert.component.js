import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../../Overlay/Overlay.component';
import noop from 'lodash/noop';
import Touchable from '../../Touchable.component';
import {View, Text, Image, TextInput} from 'react-native';
import styles from './SinarmasInputAlert.styles';
import checkIcon from '../../../assets/images/check-green.png';
import refreshIcon from '../../../assets/images/refresh-grey.png';
import result from 'lodash/result';
import size from 'lodash/size';
import {validateEmail} from '../../../utils/validator.util';
import {formatFieldNote} from '../../../utils/transformer.util';
import {connect} from 'react-redux';
import SimasIcon from '../../../assets/fonts/SimasIcon';

class LogoutModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    onClose: PropTypes.func,
    onButton1Press: PropTypes.func,
    onButton2Press: PropTypes.func,
    onButtonFavBiller: PropTypes.func,
    image: PropTypes.string,
    button1: PropTypes.string,
    button2: PropTypes.string,
    buttonFavBiller: PropTypes.string,
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
    text1Black: PropTypes.bool,
    style: PropTypes.object,
    submitHandler: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    value: PropTypes.string,
    value1: PropTypes.string,
    value2: PropTypes.string,
    value3: PropTypes.string,
    textInput1: PropTypes.string,
    textInput2: PropTypes.string,
    textInput3: PropTypes.string,
    desc: PropTypes.string,
    goNewBank: PropTypes.func,
    goNewBiller: PropTypes.func,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueDesc: PropTypes.string,
    realEmail: PropTypes.string,
    goNotPaidYet: PropTypes.func,
    goDeclined: PropTypes.func,
    goPaid: PropTypes.func,
    button3: PropTypes.string,
    button4: PropTypes.string,
    button5: PropTypes.string,
  }
  state = {
    buttonDisabled: false,
    value: '',
    value2: '',
    validate: '',
    setStatus: '',
    notYetIsChecked: false,
    declinedIsChecked: false,
    paidIsChecked: false,
  }
  static defaultProps = {
    visible: false,
    input: {
      onChange: noop
    },
    onClose: noop,
    submitHandler: noop,
  }
  onButton1Press = (text) => {
    const {onButton1Press = noop, input = {}} = this.props;
    this.setState({buttonDisabled: false, value2: text});
    onButton1Press(this.state.value2);
    if (input === 'EditStatusSplitBill') {
      this.setState({declinedIsChecked: false});
      this.setState({paidIsChecked: false});
    }
  }

  onButton2Press = (text) => {
    const {onButton2Press = noop} = this.props;
    this.setState({value2: text});
    onButton2Press(this.state.value2);
  }

  onButtonFavBiller = () => {
    const {onButtonFavBiller = noop} = this.props;
    this.setState({buttonDisabled: true});
    onButtonFavBiller(this.state.value2);
    this.setState({value2: ''});
  }

  goNewBank = () => {
    const {goNewBank = noop} = this.props;
    this.setState({buttonDisabled: true});
    goNewBank();
  }

  goNewBiller = () => {
    const {goNewBiller = noop} = this.props;
    this.setState({buttonDisabled: true});
    goNewBiller();
  }

  onClose = () => {
    const {onClose} = this.props;
    onClose();
    this.setState({buttonDisabled: false});
  }

  handleChange = (text) => {
    const textInput = text;
    const validate = validateEmail(textInput);
    if (validate)    {
      this.setState({value2: textInput, validate: validate, buttonDisabled: true});
    } else {
      this.setState({value2: textInput, validate: validate, buttonDisabled: false});
    }
  }

  handleChange2 = (text) => {
    const textInput = formatFieldNote(text);
    if (size(text) > 16) {
      this.setState({value2: textInput.substring(0, 16)});
    } else {
      this.setState({value2: textInput});
    }
  }

  goNotPaidYet = () => {
    this.setState({value2: {notYetIsChecked: true}, notYetIsChecked: true, declinedIsChecked: false, paidIsChecked: false});
  }

  goDeclined = () => {
    this.setState({value2: {declinedIsChecked: true}, notYetIsChecked: false, declinedIsChecked: true, paidIsChecked: false});
  }

  goPaid = () => {
    this.setState({value2: {paidIsChecked: true}, notYetIsChecked: false, declinedIsChecked: false, paidIsChecked: true});
  }
  

  componentWillReceiveProps (nextProps) {
    (nextProps.visible && nextProps.input === 'EditFavouriteInput') && this.setState({value2: nextProps.valueDesc});
    (nextProps.visible && nextProps.input === 'FavouriteInput') && this.setState({value2: nextProps.desc});
    (nextProps.visible && nextProps.input === 'TextInput') && this.setState({value2: nextProps.realEmail});
    if (nextProps.realEmail === '') {
      this.setState({buttonDisabled: true});
    } else {
      this.setState({buttonDisabled: false});      
    }
  }

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
      }
    };
    const {closeOnTouchOutside =  true, visible, image, heading1, heading2, text, button1, button2, buttonFavBiller, button1Color = '', button2Color = '', text1 = '', text2 = '', text3 = '', input = {}, placeholder = '', maxLength, value1, value3, textInput1, textInput2, textInput3, button4, button5, ...extraProps} = this.props;
    const imgSource = result(imageMap[image], 'iconName', '');
    let isSplitBillModal;
    if (input === 'EditStatusSplitBill') {
      isSplitBillModal = true;
    }

    return (
      <Overlay closeOnTouchOutside={closeOnTouchOutside} visible={visible} onClose={this.onClose} isSplitBillModal={isSplitBillModal}>
        { input === 'newFavorite' ?
          <View>
            <Text style={styles.headingFav}>{heading1}</Text>
            <Touchable onPress={this.goNewBank} disabled={this.state.buttonDisabled} style={styles.chooseFav}>
              <Text style={styles.chooseFavText}>{button1}</Text>
            </Touchable>
            <View style={styles.greyLine} />
            <Touchable onPress={this.goNewBiller} disabled={this.state.buttonDisabled} style={styles.chooseFav}>
              <Text style={styles.chooseFavText}>{button2}</Text>
            </Touchable>
          </View>
          :
          <View>
            {input === 'TextInput' ?
              <View>
                {image && <View style={styles.icon}><Image source={imgSource}/></View>}
                {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                <View style={styles.searchInput}>
                  <Text style={styles.label}>{text1}</Text>
                  <TextInput {...extraProps} style={styles.textInput} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                    value={this.state.value2} placeholder={placeholder} maxLength={maxLength} onChangeText={this.handleChange} />
                  <Text style={styles.labelWarning}>{this.state.validate}</Text>
                </View>
              </View>
              : input === 'FavouriteInput' ?
                <View>
                  <Text style={styles.heading}>{heading1}</Text>
                  {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                  { textInput1 === '1' ?
                    <View style={styles.searchInput}>
                      <Text style={styles.label}>{text1}</Text>
                      <TextInput {...extraProps} style={styles.textInput} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                        value={value1} placeholder={placeholder} maxLength={maxLength} editable={false} />
                    </View>
                    : null }
                  { textInput2 === '2' ?
                    <View style={styles.searchInput}>
                      <Text style={styles.label}>{text2}</Text>
                      <TextInput {...extraProps} style={styles.textInput} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                        value={this.state.value2} placeholder={placeholder} maxLength={maxLength} onChangeText={this.handleChange2} />
                    </View>
                    : null }
                  { textInput3 === '3' ?
                    <View style={styles.searchInput}>
                      <Text style={styles.label}>{text3}</Text>
                      <TextInput {...extraProps} style={styles.textInput} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                        value={value3} placeholder={placeholder} maxLength={maxLength} editable={false} />
                    </View>
                    : null }
                </View>
                : input === 'EditFavouriteInput' ?
                  <View>
                    <Text style={styles.heading}>{heading1}</Text>
                    { textInput2 === '2' ?
                      <View style={styles.searchInput}>
                        <Text style={styles.label}>{text2}</Text>
                        <TextInput style={styles.textInput2} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                          value={this.state.value2} placeholder={placeholder} maxLength={maxLength} onChangeText={this.handleChange2} />
                      </View>
                      : null }
                    { textInput3 === '3' ?
                      <View style={styles.searchInput}>
                        <Text style={styles.label}>{text3}</Text>
                        <TextInput {...extraProps} style={styles.textInput2} placeholderTextColor='#848484' underlineColorAndroid={'#848484'}
                          value={value3} placeholder={placeholder} maxLength={maxLength} editable={false} />
                      </View>
                      : null }
                  </View>
                  : input === 'EditStatusSplitBill' ?
                    <View style={styles.splitbillContainer}>
                      <View>
                        <Text style={styles.headingStatusSPlitBill}>{heading1}</Text>
                      </View>
                      <Touchable onPress={this.goDeclined} disabled={this.state.buttonDisabled} style={styles.chooseFav}>
                        <View style={styles.containerStatus}>
                          <Text style={styles.chooseStatusText}>{button4}</Text>
                          { this.state.declinedIsChecked === true ?
                            <SimasIcon name='check-black' style={styles.checkIcon} size={20}/>
                            : 
                            null
                          }
                        </View>
                      </Touchable>
                      <View style={styles.greyLine} />
                      <Touchable onPress={this.goPaid} disabled={this.state.buttonDisabled} style={styles.chooseFav}>
                        <View style={styles.containerStatus}>
                          <Text style={styles.chooseStatusText}>{button5}</Text>
                          { this.state.paidIsChecked === true ?
                            <SimasIcon name='check-black' style={styles.checkIcon} size={20}/>
                            : 
                            null
                          }
                        </View>
                      </Touchable>
                      <View style={styles.greyLine} />
                    </View>
                    :
                    <View>
                      {image && <View style={styles.icon}><Image source={imgSource}/></View>}
                      {heading1 && <Text style={styles.heading}>{heading1}</Text>}
                      {heading2 && <Text style={styles.heading}>{heading2}</Text>}
                      {text ? <Text style={styles.text}>{text}</Text> : <View style={styles.additionalPadding} />}
                    </View>
            }
            {input === 'EditStatusSplitBill' ?
              <View style={styles.containerButton}>
                <Touchable onPress={this.onButton1Press} style={styles.buttonAlignNew}>
                  <Text style={ button1Color === 'white' ? styles.whiteText : styles.redText}>{button1}</Text>
                </Touchable>
                {button2 &&
                <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.buttonAlignNewCancel}>
                  <Text style={ this.state.buttonDisabled === true ? styles.disabledGrey : styles.redText}>{button2}</Text>
                </Touchable>
                }
                {buttonFavBiller &&
                <Touchable onPress={this.onButtonFavBiller} disabled={this.state.buttonDisabled} style={styles.buttonAlign}>
                  <Text style={ button2Color === 'black' ? styles.blackText : styles.redText}>{buttonFavBiller}</Text>
                </Touchable>
                }
              </View>
              :
              <View style={styles.buttonContainer}>
                <Touchable onPress={this.onButton1Press} style={styles.buttonAlign}>
                  <Text style={ button1Color === 'black' ? styles.blackText : styles.redText}>{button1}</Text>
                </Touchable>
                {button2 &&
                <Touchable onPress={this.onButton2Press} disabled={this.state.buttonDisabled} style={styles.buttonAlign}>
                  <Text style={ this.state.buttonDisabled === true ? styles.disabledGrey : styles.redText}>{button2}</Text>
                </Touchable>
                }
                {buttonFavBiller &&
                <Touchable onPress={this.onButtonFavBiller} disabled={this.state.buttonDisabled} style={styles.buttonAlign}>
                  <Text style={ button2Color === 'black' ? styles.blackText : styles.redText}>{buttonFavBiller}</Text>
                </Touchable>
                }
              </View>
            }
            
          </View>
        }
      </Overlay>
    );
  }
}

const mapStateToProps = (state) => ({
  desc: result(state, 'billerDescFav.description', ''),
  billerConfig: result(state, 'billerConfig', {}),
  realEmail: result(state, 'user.profile.email', ''),
});

export default connect(mapStateToProps, null)(LogoutModal);
