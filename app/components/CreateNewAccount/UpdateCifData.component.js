import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './UpdateCifData.styles';
import {isEmpty, result} from 'lodash';
import Touchable from '../Touchable.component';
import {SinarmasButton} from '../FormComponents';

class Checkpoint extends Component {
  renderFormData = (formData) => {
    const {goToPage} = this.props;
    const languageKey = result(formData, 'title', '');
    const formName = result(formData, 'form', '');
    return (<View>
      {isEmpty(formData) ?
        null :
        <View>
          <View style={styles.detailContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.formTitle}>{language[`${languageKey}`]}</Text>
              {formData.data.map(this.renderDataArray)}
            </View>
            <Touchable onPress={goToPage(formName)}>
              <Text style={styles.redText}>{language.CHECKPOINT__CHANGE}</Text>
            </Touchable>
          </View>
          <View style={styles.greyLine}/>
        </View>
      }
    </View>);
  }

  renderDataArray = (stringData) => (<View>
    <Text style={styles.itemText}>{stringData}</Text>
  </View>);

  render () {

    const {ccCheckpointData, continueToPage} = this.props;
    const aboutWork = result(ccCheckpointData, 'aboutWork', []);
    const currentAddressList = result(ccCheckpointData, 'currentAddressList', []);
    const allData = [{data: currentAddressList, title: 'CREDITCARD__CREDITCARDFORM2_TITLE', form: 'CreditCardForm2'},
      {data: aboutWork, title: 'CREDITCARD__CREDITCARDFORM4_TITLE', form: 'CreditCardForm4'}];
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120} bounces={false}>
        <View style={styles.subContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{language.CHECKPOINT__UPDATED_DATA}</Text>
          </View>
          <View style={styles.middleContainer}>
            {allData.map(this.renderFormData)}
          </View>
          <View style={styles.bottomWrapper}>
            <View><Text style={styles.finePrint}>{language.CREATE_ACCOUNT__FINEPRINT}</Text></View>
            <View style={styles.buttonNext}>
              <SinarmasButton onPress={continueToPage}>
                <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

Checkpoint.propTypes = {
  ccCheckpointData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  getCheckpointCc: PropTypes.func,
  goToPage: PropTypes.func,
  continueToPage: PropTypes.func,
};

export default Checkpoint;
