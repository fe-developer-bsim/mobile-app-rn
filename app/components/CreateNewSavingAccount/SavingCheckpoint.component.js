import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './SavingCheckpoint.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmpty, forEach, result, isObject, endsWith, noop} from 'lodash';
import Touchable from '../Touchable.component';
import {SinarmasButton} from '../FormComponents';
import {getTitleName} from '../../utils/transformer.util';

class Checkpoint extends Component {
  renderFormData = (formData) => {
    const values = result(formData, 'values', {});
    const {goToPage} = this.props;
    const languageKey = 'OPENACCOUNT__' + formData.pageName.toUpperCase() + '_TITLE';
    let dataArray = [];
    forEach(values, (value, key) => {
      dataArray = [...dataArray, {key, value}];
    });

    return (<View>
      {isEmpty(values) ?
        null :
        <View>
          <View style={styles.detailContainer}>
            <View style={styles.flex1}>
              <Text style={styles.formTitle}>{language[`${languageKey}`]}</Text>
              {dataArray.map(this.renderDataArray)}
            </View>
            <Touchable onPress={goToPage(formData.pageName)}>
              <Text style={styles.redText}>{language.CHECKPOINT__CHANGE}</Text>
            </Touchable>
          </View>
          <View style={styles.greyLine}/>
        </View>
      }
    </View>);
  }

  renderDataArray = (dataObject, isLogin) => {
    const value = result(dataObject, 'value', '');
    const key = result(dataObject, 'key', '');
    const title = getTitleName(key);
    const hide = endsWith(key, '2') && key !== 'savingStatement2' || isLogin && key === 'numberOfDependant2';

    return (<View>
      {
        value === null ? null :
          hide ? 
            null :
            <View>
              {isObject(value) ?
                <View style={styles.detailBox}>
                  <Text style={styles.titleText}>{title}</Text>
                  <Text style={styles.itemText}>{value.name}</Text>
                </View>
                :
                <View style={styles.detailBox}>
                  <Text style={styles.titleText}>{title}</Text>
                  <Text style={styles.itemText}>{value}</Text>
                </View>
              }
            </View>
      }
    </View>);
  }

  render () {

    const {SavingForm2Data = {}, SavingForm3Data = {}, SavingForm4Data = {}, SavingForm5Data = {},
      SavingForm7Data = {}, continueTo = noop, pageName, progress, remainingProgress} = this.props;
    let CCFormData2Filtered = {values: {}};
    let rt = '', rw = '';
    forEach(SavingForm2Data.values, (value, key) => {
      if (!endsWith(key, '2')) {
        if (key.includes('rt')) {
          rt = value + '/';
          const rtrw = rt + rw;
          CCFormData2Filtered.values.rtrw = rtrw;
        } else if (key.includes('rw')) {
          rw = value;
          const rtrw = rt + rw;
          CCFormData2Filtered.values.rtrw = rtrw;
        } else {
          CCFormData2Filtered.values[`${key}`] = value;
        }
      }
    });
    const allData = [{...CCFormData2Filtered, pageName: 'SavingAccountForm2'},
      {...SavingForm3Data, pageName: 'SavingAccountForm3'},
      {...SavingForm4Data, pageName: 'SavingAccountForm4'},
      {...SavingForm5Data, pageName: 'SavingAccountForm5'},
      {...SavingForm7Data, pageName: 'SavingAccountForm7'}];
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>        
          <View style={styles.progressBar}>
            <View style={[{flex: progress}, styles.redBar]}/>
            <View style={[{flex: remainingProgress}, styles.greyBar]}/>
          </View>
          <View style={styles.topContainer}>
            <Text style={styles.title}>{language.CHECKPOINT__UPDATED_DATA}</Text>
          </View>
          <View style={styles.middleContainer}>
            {allData.map(this.renderFormData)}
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={continueTo(pageName)}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

Checkpoint.propTypes = {
  ccCheckpointData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  getCheckpointCc: PropTypes.func,
  SavingForm2Data: PropTypes.object,
  SavingForm3Data: PropTypes.object,
  SavingForm4Data: PropTypes.object,
  SavingForm5Data: PropTypes.object,
  SavingForm7Data: PropTypes.object,
  goToPage: PropTypes.func,
  continueTo: PropTypes.func,
  pageName: PropTypes.string,
  progress: PropTypes.string,
  remainingProgress: PropTypes.string,
  isLogin: PropTypes.bool
};

export default Checkpoint;
