import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmptyOrNull} from '../../utils/transformer.util';
import {ConnectedEFormComponent} from './RenderEForm.component';
import {map, noop} from 'lodash';
import {Text, View} from 'react-native';
import styles from './EForm.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import PropTypes from 'prop-types';

export const form = (props) => {
  const {page, invalid, submitting, handleSubmit = noop} = props;
  const {header, formName, warning, fields = [], style} = page;
  
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} style={styles[style]} keyboardShouldPersistTaps='handled' extraScrollHeight={100} enableOnAndroid={true}>
      <View>
        {
          isEmptyOrNull(header) ? null :
            typeof (header) === 'object' ? 
              map(header, (headerText) => <Text style={styles.mainTitleText}>{language[headerText]}</Text>)
              :
              <Text style={styles.mainTitleText}>{language[header]}</Text>
        }

        {
          map(fields, (component) => (
            <ConnectedEFormComponent key={`${formName}/${component.code}`} {...component} fieldName={component.code}/>
          ))
        }

        { 
          isEmptyOrNull(warning) ? 
            null :
            <View style={styles.boxedInfo}>
              <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
              <View>
                {
                  typeof (warning) === 'object' ? 
                    map(warning, (warningText) => <Text style={styles.info}>{language[warningText]}</Text>)
                    :
                    <Text style={styles.info}>{language[warning]}</Text>
                }
              </View>
            </View>
        }
      </View>
      <View style={styles.buttonWrapper}>
        <SinarmasButton onPress={handleSubmit} disabled={invalid || submitting}>
          <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
        </SinarmasButton>
      </View>
    </KeyboardAwareScrollView>);
};

form.propTypes = {
  page: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool, 
  handleSubmit: PropTypes.func,
};

export {default as camera} from './EFormCamera.component';
export {default as selfieCamera} from './EFormSelfieCamera.component';
export {default as loanSimulation} from './EFormLoanSimulation.component';
export {default as loanSummary} from './EFormLoanSummary.component';
export {default as loanSuccess} from './EFormLoanSuccess.component';