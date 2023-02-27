import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import {isEmpty, result, find} from 'lodash';

class CurrentSectionForm extends React.Component {
  static propTypes = {
    submitData: PropTypes.func,
    currentLanguage: PropTypes.string,
    currentSection: PropTypes.array,
    getChoosenPage: PropTypes.func
  }

  renderProducts = (item) => {
    const {currentLanguage, getChoosenPage} = this.props;
    const title = currentLanguage === 'id' ? item.titleID : item.titleEN;
    const isSubmit = result(item, 'isSubmit', false);
    const isDisabled = result(item, 'isDisabled', false);
    const iconName = isSubmit ? 'success-circle' : 'arrow';
    const iconStyle = isDisabled ? 'disabledArrIcon' : isSubmit ? 'successIcon' : 'arrIcon';
    const textStyle = isDisabled ? 'sectionTitleDisabled' : 'sectionTitle';
    const  dtactioncode = 'Eform page' + result(item, 'sectionCode', '');
    return (
      <View style={styles.sectionContainer}>
        <Touchable dtActionName={dtactioncode} onPress={getChoosenPage(item)} style={styles.sectionBox} disabled={isDisabled}>
          <Text style={styles[`${textStyle}`]}>{title}</Text>
          <SimasIcon style={styles[`${iconStyle}`]} name={iconName} size={15}/>
        </Touchable>
      </View>
    );
  }
  
  render () {
    const {currentSection, submitData} = this.props;
    const disabledButton = !isEmpty(find(currentSection, (curr) => curr.isSubmit === false));

    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} showsVerticalScrollIndicator={false}>
            <View style={styles.spaceContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitleTxt}>{language.EFORM__SECTION_TITLE}</Text>
              </View>
      
              {isEmpty(currentSection) ? null : currentSection.map(this.renderProducts)}
            </View>

            <View>
              <SinarmasButton dtActionName= 'FinalizeEform' onPress={submitData} disabled={disabledButton}>
                <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CurrentSectionForm;
