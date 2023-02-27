import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './TabATM.component.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import MapView from 'react-native-maps';
import {listViewComparator} from '../../utils/transformer.util';
import getDirections from 'react-native-google-maps-directions';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import Geolocation from '@react-native-community/geolocation';

let map = null;

class Locator extends React.Component {
  static propTypes = {
    isMapView: PropTypes.bool,
    branch: PropTypes.array,
    goToSearch: PropTypes.func,
  }

  state = {
    masterData: [],
    branch: [],
    isSearch: false,
    isMarkerClicked: false,
  }

  componentWillMount () {
    const {branch} = this.props;
    this.setState({
      branch: branch,
      masterData: branch
    });
  }

  componentDidMount () {
    this.getCurrentPosition();
  }

  setRegion = () => {
    setTimeout(() => map.animateToRegion(this.state.region), 10);
    this.hideModal();
  }
  
  setMap (mapview) {
    map = mapview;
  }

  onChangeInput = (text) => {
    const {masterData} = this.state;
    let result;
    if (text === '') {
      result = masterData;
    } else {
      result = masterData.filter((data) => data.aTMAddress.toUpperCase().includes(text.toUpperCase()));
    }
    this.setState({branch: result});
  }

  showModal = (marker) => () => {
    this.setState({isMarkerClicked: true, selectedMarker: marker});
  }

  hideModal = () => {
    this.setState({isMarkerClicked: false});
  }

  getCurrentPosition () {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        this.setState({region});
      },
    );
  }

  handleGetDirections = (branch) => () => {
    const {aTMLatitude, aTMLongitude} = branch;
    const data = {
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
    getDirections(data);
  }

  comparator = listViewComparator

  renderBranchList = ({item}) => (
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
    const {isMapView, goToSearch = noop} = this.props;
    const {isMarkerClicked, branch, selectedMarker} = this.state;

    return (
      <View style={styles.viewContainer}>
        {
          isMapView === true || isMapView === undefined ?
            <View style={styles.viewContainer}>
              <MapView 
                ref={this.setMap}
                showsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
                initialRegion={this.state.region}
                onPress={this.hideModal}
                style={styles.map}
              >
                {
                  branch.map((marker) =>
                    <MapView.Marker
                      key={marker.aTMCode}
                      coordinate={marker.coordinate}
                      onPress={this.showModal(marker)}
                    />)
                }
              </MapView>
              {
                isMarkerClicked === true ? 
                  <View style={styles.modalContainer}>
                    <View style={styles.blockModalContainer}>
                      <View style={styles.leftContainer}>
                        <Text style={styles.textFirstRowModal}>{selectedMarker.aTMAddress}</Text>
                        <Text style={styles.textFirstRowModal}>{selectedMarker.aTMDescription.phoneNumber}</Text>
                        <View style={styles.lastRowContainer}>
                          <Text style={styles.textOperationalHourModal}>{selectedMarker.aTMDescription.operationalHour}</Text>
                          {selectedMarker.aTMDescription.openStatus === 'Buka' ? 
                            <Text style={styles.textStatusGreenModal}>{language.ATM_LOCATOR__OPEN}</Text>
                            :
                            <Text style={styles.textStatusRedModal}>{language.ATM_LOCATOR__CLOSE}</Text>
                          }
                        </View>
                      </View>
                      <View style={styles.rightContainer}>
                        <Touchable style={styles.touchable} onPress={this.handleGetDirections(selectedMarker)}>
                          <Text style={styles.locateTextModal}>{language.ATM_LOCATOR__LOCATE_TEXT}</Text>
                          <SimasIcon name={'cross-hair-1'} size={18} style={styles.locateIconList}/>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                  :
                  null
              }
              
              <View style={styles.footerContainer}>
                <Touchable style={styles.footerTouchable} onPress={goToSearch(branch)}>
                  <Text style={styles.footerText}>{language.ATM_LOCATOR__SEARCHBYLOC}</Text>
                  <SimasIcon name={'search'} size={17} style={styles.footerIcon}/>
                </Touchable>
              </View>
              <View style={styles.buttonLocationContainer}>
                <Touchable style={styles.buttonLocationBorder} onPress={this.setRegion}>
                  <SimasIcon name={'cross-hair-1'} size={25} style={styles.locateIcon}/>
                </Touchable>
              </View>
            </View>
            :
            <View style={styles.outerContainer}>
              
              <View>
                <View style={styles.searchContainer}>
                  <View style={styles.searchInput}>
                    <TextInput 
                      underlineColorAndroid={'transparent'}
                      placeholder={language.ATM_LOCATOR__SEARCHBYLOC}
                      onChangeText={this.onChangeInput}
                      placeholderTextColor='#848484'
                      style={styles.textInput}
                    />
                  </View>
                  <View>
                    <SimasIcon name={'search'} size={20} style={styles.searchATMButton}/>
                  </View>
                </View>
              </View>
              <View style={styles.separator} />
              {!isEmpty(branch) ?
                <View style={styles.listView}>
                  <FlatList
                    data={branch}
                    renderItem={this.renderBranchList}/>
                </View>
                :
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{language.ATM_LOCATOR__EMPTY_TEXT}</Text>
                </View>
              }
            </View>
        }
      </View>
    );
  }
}

export default Locator;
