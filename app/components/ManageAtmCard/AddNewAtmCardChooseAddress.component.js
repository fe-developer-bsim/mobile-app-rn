import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './AddNewAtmCard.styles';
import {SinarmasButton, RadioButtonOpenAccount} from '../FormComponents';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import {Field} from 'redux-form';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';

class AddNewAtmCardChooseAddress extends React.Component {
  static propTypes = {
    radioOptions: PropTypes.array,
    isEmptyForm: PropTypes.bool,
    popUpRadioButtonAddressAddNewAtm: PropTypes.func,
    isEmptyAddress: PropTypes.bool,
    isEmptyStreetAddress: PropTypes.bool,
    isEmptyRtRw: PropTypes.bool,
    isEmptySubDistrict: PropTypes.bool,
    isEmptyDistrict: PropTypes.bool,
    isEmptyPostalCode: PropTypes.bool,
    isEmptyProvince: PropTypes.bool,
    getCurrentSectionAccountMenu: PropTypes.func,
    goToConfirmationPage: PropTypes.func,
  }

  state = {
    checked: false,
    disable: false,
  }

  toogleCheckbox = (checked) => {
    this.setState({checked, disable: checked});
  }

  render () {
    const {radioOptions, isEmptyForm, popUpRadioButtonAddressAddNewAtm, isEmptyAddress,
      isEmptyStreetAddress, isEmptyRtRw, isEmptySubDistrict, isEmptyDistrict, isEmptyPostalCode, isEmptyProvince,
      getCurrentSectionAccountMenu, goToConfirmationPage} = this.props;
    return (
      <View style={styles.buttonContainerStyle}>
        <ScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
          <View>
            
            <View style={styles.FieldsContainerWrapperPage}>
              <Text style={styles.mainTitleTextHeader}>{language.ADD_NEW_ATM_CARD_CHOOSE_ADDRESS_TITLE}</Text>

              <View style={styles.styleRadioButton}>
                <Field name='deliveryMode'
                  component={RadioButtonOpenAccount}
                  options={radioOptions}
                  onChange={popUpRadioButtonAddressAddNewAtm}
                  labelBold={true}
                />
              </View>

              <View>
                <View style={styles.noBorderCaution}>
                  <SimasIcon name={'caution-circle'} size={25} style={styles.iconCenter}/>
                  <Text style={styles.caution}>{language.REQUEST_ATM_CARD__DISCLAIMER_ADDRESS}</Text>
                </View>
              </View>
              <Touchable style={styles.rowCenter} onPress={getCurrentSectionAccountMenu}>
                <View style={styles.rowCenter}>
                  <View>
                    <Text style={styles.btnUpdateAddress}>{language.REQUEST_ATM_CARD__UPDATE_YOUR_ADDRESS}</Text>
                  </View>
                </View>
              </Touchable>

              <View style={styles.rowAlignBorder}>
                <View style={{padding: 20}}>
                  <Text style={[styles.accNo, styles.roboto]}>{language.ADD_NEW_ATM_CARD_ESTIMATED}</Text>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textTnc}>{language.ADD_NEW_ATM_CARD_ESTIMATED_JADETABEK}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textTnc}>{language.ADD_NEW_ATM_CARD_ESTIMATED_LUAR_JADETABEK}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textTnc}>{language.ADD_NEW_ATM_CARD_ESTIMATED_LUAR_PULAU_JAWA}</Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.borderCaution}>
                  <CheckBox
                    onChange={this.toogleCheckbox}
                    uncheckedImage={RedCheckBox}
                    checkedImage={UnCheckBox}
                    label={''}
                    checkboxStyle={styles.checkBox}
                    checked={!this.state.checked}
                  />
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={styles.caution}>{language.ADD_NEW_ATM_CARD_CHECKBOX_DETAIL}</Text>
                  </View>
                </View>
              </View>
              
            </View>
          </View>
        </ScrollView>

        <View style={styles.containerIcon}>
          <SinarmasButton onPress={goToConfirmationPage} disabled={!this.state.disable || isEmptyForm || isEmptyAddress || isEmptyStreetAddress || isEmptyRtRw || isEmptySubDistrict || isEmptyDistrict || isEmptyPostalCode || isEmptyProvince}
            text={language.GENERIC__CONTINUE}
          />
        </View>
      </View>
    );
  }
}

export default AddNewAtmCardChooseAddress;
