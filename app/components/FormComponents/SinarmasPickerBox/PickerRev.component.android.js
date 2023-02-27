import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import Overlay from '../../Overlay/OverlayRadiusRev.component';
import Touchable from '../../Touchable.component';
import styles from './PickerRev.component.styles.android';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import {language} from '../../../config/language';

class Picker extends Component {
  optionSelected = (option) => () => {
    this.props.onSelect(option);
    this.props.hideModal();
  };

  renderItem = ({item}) => (
    <Touchable onPress={this.optionSelected(item)}>
      <Text style={styles.modalFontStyle}>{item}</Text>
      <View style={styles.greyLine} />
    </Touchable>
  );

  render () {
    const {
      options = [],
      selectedValue,
      showModal,
      hideModal,
      modalVisible,
      arrowPickerStyle = {},
      textPickerStyle = {},
      isCurrency,
      isPurpose
    } = this.props;
    return (
      <View>
        <Touchable onPress={showModal} style={styles.textBoxStyle}>
          <Text
            style={[
              selectedValue !==
                language.HINTTEXT__RECIPIENTDATA_SELECET_CURRENCY &&
              selectedValue !== language.REMITTANCE__PURPOSE_TEXT
                ? styles.remittanceTextStyle
                : styles.textStyle,
              textPickerStyle
            ]}
          >
            {selectedValue}
          </Text>
          <SimasIcon
            name='arrow'
            style={[styles.arrowDownStyle, arrowPickerStyle]}
          />
        </Touchable>
        <Overlay
          visible={modalVisible}
          hideModal={hideModal}
          closeOnTouchOutside
          isCurrency={isCurrency}
          isPurpose={isPurpose}
        >
          <FlatList
            style={styles.modalContainer}
            data={options}
            renderItem={this.renderItem}
          />
        </Overlay>
      </View>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  arrowPickerStyle: PropTypes.object,
  textPickerStyle: PropTypes.object,
  isCurrency: PropTypes.string,
  isPurpose: PropTypes.string
};

export default Picker;
