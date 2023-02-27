import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './TabATM.component.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {listViewComparator} from '../../utils/transformer.util';
import getDirections from 'react-native-google-maps-directions';
import isEmpty from 'lodash/isEmpty';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SearchATMBranch extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  }

  state = {
    masterData: [],
    data: [],
  }

  componentWillMount () {
    const {data} = this.props;
    this.setState({
      data: data,
      masterData: data
    });
  }

  onChangeInput = (text) => {
    const {masterData} = this.state;
    let result;
    if (text === '') {
      result = masterData;
    } else {
      result = masterData.filter((d) => d.aTMAddress.toUpperCase().includes(text.toUpperCase()));
    }
    this.setState({data: result});
  }

  handleGetDirections = (data) => () => {
    const {aTMLatitude, aTMLongitude} = data;
    const dataLoc = {
      destination: {
        latitude: aTMLatitude,
        longitude: aTMLongitude
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving'
        },
        {
          key: 'dir_action',
          value: 'navigate'
        }
      ]
    };
    getDirections(dataLoc);
  }

  comparator = listViewComparator

  renderDataList = ({item}) => (
    <View style={styles.outerContainer}>
      <View style={styles.blockContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.textFirstRow}>{item.aTMAddress}</Text>
          <Text style={styles.textFirstRow}>{item.aTMDescription.phoneNumber}</Text>
          <View style={styles.lastRowContainer}>
            <Text style={styles.textOperationalHour}>{item.aTMDescription.operationalHour}</Text>
            {item.aTMDescription.openStatus === 'Buka' ? 
              <Text style={styles.textStatusGreen}>{language.ATM_LOCATOR__OPEN}</Text>
              :
              <Text style={styles.textStatusRed}>{language.ATM_LOCATOR__CLOSE}</Text>
            }
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Touchable style={styles.touchable} onPress={this.handleGetDirections(item)}>
            <Text style={styles.locateText}>{language.ATM_LOCATOR__LOCATE_TEXT}</Text>
            <SimasIcon name={'cross-hair-1'} size={20} style={styles.locateIconList}/>
          </Touchable>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  )
  
  render () {
    const {data} = this.state;
    
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.viewContainer} extraHeight={120} style={styles.viewContainer} enableOnAndroid={true}>
        <View style={styles.outerContainer}>
          <View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInput}>
                <TextInput 
                  underlineColorAndroid={'transparent'}
                  placeholder={language.ATM_LOCATOR__SEARCHBYLOC}
                  onChangeText={this.onChangeInput}
                  placeholderTextColor='#848484'
                  autoFocus={true}
                  style={styles.textInput}
                />
              </View>
              <View>
                <SimasIcon name={'search'} size={20} style={styles.searchATMButton}/>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          {!isEmpty(data) ?
            <View style={styles.listView}>
              <FlatList
                data={data}
                renderItem={this.renderDataList}/>
            </View>
            :
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{language.ATM_LOCATOR__EMPTY_TEXT}</Text>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default SearchATMBranch;
