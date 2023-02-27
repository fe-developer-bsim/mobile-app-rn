import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {change} from 'redux-form';
import {connect} from 'react-redux';
import CheckBox from 'react-native-checkbox';
import {View, Text} from 'react-native';
import Touchable from '../../Touchable.component';
import {language} from '../../../config/language';
import WhiteCheckBox from '../../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../../assets/images/checkbox-unchecked.png';
import styles from './TermsNConditions.style';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';

class TermsAndCondition extends Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  static propTypes = {
    tnc: PropTypes.string,
    header: PropTypes.string,
    formTicked: PropTypes.func,
    formName: PropTypes.string,
    fieldName: PropTypes.string,
    errors: PropTypes.object,
    meta: PropTypes.object,
    value: PropTypes.bool,
    headerStyle: PropTypes.object,
    input: PropTypes.object,
  };

  toogleCheckbox = () => {
    const {formTicked, fieldName = '', formName = ''} = this.props;
    const newChecked = !this.state.checked;
    this.setState({checked: newChecked});
    if (formName && fieldName) 
      formTicked(formName, fieldName, newChecked);
  }

  tnc = (<View><Text style={styles.tncBodyStyle}>{`${language.TERMS_AND_CONDITION__AGREE1} ${language.TERMS_AND_CONDITION__AGREE2}`}</Text></View>)

  render () {
    const {meta, header = language.TERMS_AND_CONDITION__HEADER, headerStyle = styles.labelStyle, tnc = this.tnc} = this.props;
    const err = meta && meta.pristine && !meta.active && meta.error;
    return (
      <View>
        <View style={styles.border}>
          <Touchable>
            <CheckBox
              onChange={this.toogleCheckbox}
              uncheckedImage={UnCheckBox}
              checkedImage={WhiteCheckBox}
              label={header}
              labelStyle={headerStyle}
              checkboxStyle={styles.checkBox}
              checked={this.state.checked}
            />
          </Touchable>
          <View style={styles.padding}>
            { 
              (typeof (tnc) === 'object') ? 
                <View>{tnc}</View>
                :
                <Text style={styles.tncBodyStyle}>{tnc}</Text>
            } 
          </View>
        </View>
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  formTicked: (formName, fieldName, checkedValue) => dispatch(change(formName, fieldName, checkedValue))
});

export default connect(null, mapDispatchToProps)(TermsAndCondition);
