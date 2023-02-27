import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Picker from './PickerRev.component';
import styles from './SinarmasPickerBoxProxy.styles';
import map from 'lodash/map';
import find from 'lodash/find';
import noop from 'lodash/noop';
import drop from 'lodash/drop';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import {language} from '../../../config/language';

class SinarmasPickerBox extends Component {
  static propTypes = {
    meta: PropTypes.object,
    itemList: PropTypes.array,
    labelKey: PropTypes.string,
    placeholder: PropTypes.string,
    currentValue: PropTypes.string,
    input: PropTypes.object,
    pickerStyle: PropTypes.object,
    arrowPickerStyle: PropTypes.object,
    textPickerStyle: PropTypes.object,
    onValChange: PropTypes.func,
    labelText: PropTypes.string,
    isRemittance: PropTypes.bool,
    isCurrency: PropTypes.string,
    isPurpose: PropTypes.string,
    isAddProxy: PropTypes.bool,
    isProxyType: PropTypes.bool,
    isEmail: PropTypes.object,
    isPhoneNumber: PropTypes.object,
    prefiledAliasProxy: PropTypes.func,
  }

  static defaultProps = {
    itemList: [],
    input: {onChange: noop, value: {}},
    onValChange: noop
  }

  state = {
    modalVisible: false
  }

  showModal = () => this.setState({modalVisible: true})

  hideModal = () => this.setState({modalVisible: false})

  onPickerChange = (selectedLabelValue) => {
    const {labelKey, itemList, onValChange, isEmail, isPhoneNumber, prefiledAliasProxy} = this.props;
    const selectedLabelObj = find(itemList, (listItem) => listItem[labelKey] === selectedLabelValue);
    this.props.input.onChange(selectedLabelObj || {});
    if (selectedLabelValue === 'Email Address') {
      prefiledAliasProxy(isEmail);
    } else if (selectedLabelValue === 'Phone Number') {
      prefiledAliasProxy(isPhoneNumber);
    } else {
      null;
    }
    onValChange(selectedLabelObj);
  }

  render () {
    const {meta, itemList = [], input, placeholder, labelKey, currentValue, pickerStyle = {}, arrowPickerStyle = {}, textPickerStyle = {}, labelText = '', isRemittance, isCurrency, isPurpose, isAddProxy, isProxyType} = this.props;
    const list = placeholder ? [{[labelKey]: placeholder}, ...itemList] : [...itemList];
    const valuesList = drop(map(list, (item) => item[labelKey]));
    const err = (meta && !meta.pristine && meta.error);
    return (
      <View>
        <View style={[styles.container, pickerStyle, styles.box]}>
          <View>{isAddProxy ? null : isProxyType ? <Text style={styles.texLabelTopProxy}>{labelText}</Text> : <Text style={styles.texLabelTop}>{labelText}</Text>}</View>
          <Picker
            itemStyle={styles.iosPickerBackgroundColor}
            options={valuesList}
            confirmText={language.SINARMAS_PICKER__DONE}
            onSelect={this.onPickerChange}
            selectedValue={input.value[labelKey] || currentValue || list[0][labelKey]}
            showModal={this.showModal}
            hideModal={this.hideModal}
            modalVisible={this.state.modalVisible}
            arrowPickerStyle={[isRemittance ? styles.arrowDownStyleRemittance : styles.arrowDownStyle, arrowPickerStyle]}
            textPickerStyle={textPickerStyle}
            style={styles.tes}
            isCurrency={isCurrency}
            isPurpose={isPurpose}
          />
        </View>
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

export default SinarmasPickerBox;
