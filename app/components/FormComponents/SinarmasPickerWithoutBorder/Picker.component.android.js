import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import Overlay from '../../Overlay/Overlay.component';
import Touchable from '../../Touchable.component';
import styles from './Picker.component.styles.android';
import SimasIcon from '../../../assets/fonts/SimasIcon';

class Picker extends Component {

  optionSelected = (option) => () => {
    this.props.onSelect(option);
    this.props.hideModal();
  }

  renderItem = ({item}) => (
    <Touchable onPress={this.optionSelected(item)}>
      <Text style={styles.modalFontStyle}>{item}</Text>
    </Touchable>
  )

  render () {
    const {options = [], selectedValue, showModal, hideModal, modalVisible, arrowPickerStyle = {}, textPickerStyle = {}} = this.props;
    return  (
      <View>
        <Touchable onPress={showModal} style={styles.textBoxStyle}>
          <Text style={[styles.textStyle, textPickerStyle]}>{selectedValue}</Text>
          <SimasIcon name='arrow' style={[styles.arrowDownStyle, arrowPickerStyle]} />
        </Touchable>
        <Overlay visible={modalVisible} hideModal={hideModal} closeOnTouchOutside>
          <FlatList
            style={styles.modalContainer}
            dataSource={options}
            renderItem={this.renderItem}
          />
        </Overlay>
      </View>);
  }

}

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  arrowPickerStyle: PropTypes.array,
  textPickerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onSelectPress: PropTypes.func,
};

export default Picker;
