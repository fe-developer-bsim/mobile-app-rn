import React from 'react';
import PropTypes from 'prop-types';
import styles from './AutoDebitListHeader.style';
import {View} from 'react-native';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {searchAutoDebitList} from '../../state/thunks/dashboard.thunks';

class AutoDebitListHeader extends React.Component {
  state = {
    isEdit: false,
    isSearch: false
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    setParams: PropTypes.func.isRequired,
  }

  editList = () => {
    const isEdit = !this.state.isEdit;
    this.setState({isEdit: isEdit});
    this.props.setParams({isEdit: isEdit});
  }

  searchList = () => {
    const {dispatch} = this.props;
    dispatch(searchAutoDebitList()); // move to find list
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.row}>
            <Touchable onPress={this.searchList} style={styles.iconBox}>
              <SimasIcon name={'magnifier'} size={20} style={styles.lup}/>
            </Touchable>
          </View>         
          <View style={styles.additionalPadding}/>
        </View>
      </View>
    );
  }
}

export default AutoDebitListHeader;
