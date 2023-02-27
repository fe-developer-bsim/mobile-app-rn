import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {View, Text, FlatList} from 'react-native';
import styles from './SortingFlightModal.style';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import {listViewComparator} from '../../utils/transformer.util';
import Modal from 'react-native-modal';
import SimasIcon from '../../assets/fonts/SimasIcon';

class SortingFlightModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    input: PropTypes.object,
    submitHandler: PropTypes.func,
    onClose: PropTypes.func,
    sortProps: PropTypes.array,
    selectedValue: PropTypes.object,
    sortFunc: PropTypes.func,
    animationType: PropTypes.string,
    hideModal: PropTypes.bool,
    value: PropTypes.string
  }
  static defaultProps = {
    visible: false,
    input: {},
    submitHandler: noop,
    onClose: noop,
    animationType: 'fadeIn',
  }
  comparator = listViewComparator;
  renderListItem = ({item}) => {
    const display = result(item, 'label', {});
    const selected = result(item, 'value', {});
    const {sortFunc, value} = this.props;
    return (  
      <Touchable onPress={sortFunc(item)}>
        <View style={styles.childComponent}>
          <Text style={value === selected ? styles.redChildText : styles.childText}>{display}</Text>  
          {value === selected ? <SimasIcon name = 'check' size = {20} style={styles.icon}/> : <View/> } 
        </View>
      </Touchable>
    );
  }

  _hideModal = () => {
    const {onClose = noop, hideModal = noop} = this.props;
    this.setState({visible: false}, () => {
      onClose();
      hideModal();
    });
  }
  render () {
    
  
    const {visible, onClose, sortProps = []} = this.props;
    
    return (
      <Modal isVisible={visible} onClose={onClose} style={styles.bottomModal} hideOnBack={true}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{language.FLIGHT__SORT}</Text>
          <FlatList enableEmptySections 
            data={sortProps} 
            renderItem={this.renderListItem}/>
        </View>
      </Modal>
    );
  }
}
export default SortingFlightModal;
