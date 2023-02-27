import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, ScrollView} from 'react-native';
import NButtonTrf from './NButtonTrf.component';
import styles from './SearchableListNewSearch.style';
import {formatFieldNote, formatFieldAccount, formatMobileNumberEmoney} from '../../utils/transformer.util';
import {noop, result} from 'lodash';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import Touchable from '../Touchable.component';
import SinarmasInputBox from '../FormComponents/SinarmasInputBox/SinarmasInputBox.component';
import {selectContactPhone} from 'react-native-select-contact';
import {filter, lowerCase, includes, isEmpty, find, startsWith} from 'lodash';
import QuickPickListMenuSearch from '../../components/QuickPickList/QuickPickListMenuSearch.component';
import {filterObjects} from '../../utils/transformer.util';

class SearcheableListTrf extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryText: PropTypes.string,
    listHeader: PropTypes.string,
    inputHeader: PropTypes.string,
    minLength: PropTypes.number,
    inputProps: PropTypes.object,
    onNextClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onChangeText: PropTypes.func,
    validator: PropTypes.func,
    placeholderText: PropTypes.string,
    placeholderSearch: PropTypes.string,
    labelSearch: PropTypes.string,
    labelAdd: PropTypes.string,
    labelTitlle: PropTypes.string,
    tittleSearch: PropTypes.string,
    hideAcc: PropTypes.bool,
    acc: PropTypes.bool,
    btnNewAcc: PropTypes.string,
    buttonText: PropTypes.string,

    dispatch: PropTypes.func.isRequired,
    MenuSearchContent: PropTypes.array,
    removeSearchInput: PropTypes.func,
    goToBiller: PropTypes.func,
    menuSearchMetaDataBE: PropTypes.array,
    valueMenuSearch: PropTypes.array,
    isLogin: PropTypes.bool,
    recommendationData: PropTypes.array,
    saveValueRecentSearch: PropTypes.func,
    dataRecentSearch: PropTypes.array,
    clearRecentSearch: PropTypes.func,
    addRecentSearch: PropTypes.func,
    deleteValueSearch: PropTypes.func,
    dataDisplay: PropTypes.object,
    userAccount: PropTypes.string,
  }
  state = {
    searchlist: [],
    searchText: '',
    searchTextAcc: '',
    hideAcc: false,
    acc: false,
    keyword: '',
    valueSearch: [],
    addText: false,
    searchTextNew: [],
  }
  onChangeInput = (text) => {
    const {onChangeText = noop, validator = noop} = this.props;
    onChangeText(text);
    this.onFocusSearch();
    const error = validator(text);
    this.setState({
      searchText: formatFieldNote(text),
      error
    });
  }
  onChangeInputNewAccount = (text) => {
    const {validator = noop} = this.props;
    const error = validator(text);
    this.setState({
      searchTextAcc: formatFieldAccount(text),
      error
    });
  }
  onNextClick=() => {
    const {onNextClick = noop} = this.props;
    onNextClick(this.state.searchTextAcc);
  }
  componentWillMount () {
    const {searchlist = []} = this.props;
    this.setState({searchlist});
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }
  componentWillReceiveProps (nextProps) {
    const {searchlist} = nextProps;
    this.setState({searchlist});
  }
  onFocusAcc=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  onFocusSearch=() => {
    const {hideAcc = true} = this.props;
    this.setState({hideAcc});
  }
  onBlurSearch=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }
  _keyboardDidHide=() => {
    const {hideAcc = false} = this.props;
    this.setState({hideAcc});
  }

  getContact = () => {
    const {validator = noop} = this.props;
    selectContactPhone().then((selection) => {
      if (!selection) {
        return null;
      }
      let {selectedPhone} = selection;
      const error = validator(selectedPhone.number);
      this.setState({
        searchTextAcc: formatMobileNumberEmoney(selectedPhone.number),
        error
      });
    }).catch(noop);
  }

  onChangeInputSearch=(keyword) => {
    const {isLogin, addRecentSearch, dataDisplay, userAccount} = this.props;
    const searchFilter = filter(this.props.valueMenuSearch, function (searchVal) {
      const name = result(searchVal, 'menu', '');
      const metaData = result(searchVal, 'metaTags', '');
      return includes(lowerCase(name), lowerCase(keyword)) || includes(lowerCase(metaData), lowerCase(keyword));
    });
    const cifCode = result(dataDisplay, 'cifCode', '');
    const isNonKyc = startsWith(cifCode, 'NK');
    const isKycOnly = userAccount === 'KYC' || userAccount === 'kyc';
    const isLogout =  find(searchFilter, {'menu': 'Logout'});
    const isOvo =  find(searchFilter, {'menu': 'Bancassurance'});
    const isGopay =  find(searchFilter, {'menu': 'Mutual Fund'});
    const isCC =  find(searchFilter, {'menu': 'Kartu Kredit Bank Sinarmas'});
    const isSimastara =  find(searchFilter, {'menu': 'Open Simas TARA'});
    const isManagedBifast = find(searchFilter, {'menu': 'Manage BI Fast'});
    const isMemberShip = find(searchFilter, {'menu': 'SimobiPlus Membership'});
    const logutBeforeLogin = isNonKyc && isLogin ? searchFilter.filter((item) => item !== isGopay && item !== isOvo && item !== isCC && item !== isSimastara && item !== isManagedBifast && item !== isMemberShip) :
      isNonKyc && !isLogin ? searchFilter.filter((item) => item !== isGopay && item !== isOvo && item !== isCC && item !== isSimastara && item !== isLogout && item !== isManagedBifast && item !== isMemberShip) : 
        isKycOnly && !isLogin ? searchFilter.filter((item) => item !== isSimastara && item !== isLogout && item !== isManagedBifast) : isKycOnly ? searchFilter.filter((item) => item !== isSimastara && item !== isManagedBifast) : !isLogin ? searchFilter.filter((item) => item !== isLogout) : searchFilter;
    if (keyword === '') {
      this.setState({valueSearch: []});
      this.setState({searchTextNew: []});
      addRecentSearch([]);
    } else {
      this.setState({valueSearch: logutBeforeLogin});
      this.setState({searchTextNew: keyword});
      addRecentSearch(logutBeforeLogin);
    }
  }

  onBlur= () => {
    const {searchTextNew} = this.state;
    const {saveValueRecentSearch} = this.props;
    if (!isEmpty(searchTextNew)) {
      saveValueRecentSearch(searchTextNew);
    } else {
      return searchTextNew;
    }
  }

  renderDataRecomen = (dataRecomen) =>
    (
      <View style={styles.rowRecomenSearch}>
        <Touchable onPress={this.setText(dataRecomen)}>
          <View style={styles.contentBox}>
            <Text style={styles.textRecomen}>{dataRecomen}</Text>
          </View>
        </Touchable>
      </View>
    )

  setText = (text) => () => {
    this.setState({recomText: text});
    this.onChangeInputSearch(text);
  }

  clearText = () => {
    this.setState({searchTextNew: ''});
    this.setState({recomText: ''});
    this.setState({valueSearch: []});
  }

  render () {
    const {btnNewAcc = '', labelTitlle = '', placeholderText = '', buttonText = '', textKey = 'text', subtextKey = 'subtext',
      secondaryText = 'secondaryText', onItemClick = noop, onNextClick, minLength = 6, recommendationData, dataRecentSearch = [], 
      isLogin, MenuSearchContent, removeSearchInput, menuSearchMetaDataBE, valueMenuSearch, saveValueRecentSearch, 
      clearRecentSearch, deleteValueSearch} = this.props;

    const nextEnabled = (this.state.searchTextAcc.length >= minLength) && !this.state.error;
    const {recomText, searchTextNew} = this.state;

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <View style={this.state.hideAcc ? styles.inputContainerHide : styles.headerContainer}>
            <Text style={styles.tittle}>{labelTitlle}</Text>
          </View>
          <View style={this.state.hideAcc ? styles.inputContainerHide : styles.inputContainer}>
            <View style={onNextClick ? styles.inputWithPaddingHorizontalAcc : styles.inputAcc}>
              <View>
                <View style={styles.textInputContainer}>
                  <SinarmasInputBox
                    onChangeText={this.onChangeInputSearch}
                    disabled={false}
                    placeholder={placeholderText}
                    onFocus={this.onFocusAcc}
                    value={searchTextNew !== '' ? searchTextNew : recomText !== '' ? recomText : this.state.valueSearch}
                    onBlur={this.onBlur}
                    isSearch={true}
                    deleteValueSearch={deleteValueSearch}
                    clearText={this.clearText}
                    autoCapitalizeSearch={true}
                  />
                </View>
              </View>
            </View>
            {onNextClick && <NButtonTrf style={styles.NButtonTrfs} text={btnNewAcc} disabled={nextEnabled} onPress={this.onNextClick}
              icon={buttonText} getContact={this.getContact}/>}
          </View>

          <QuickPickListMenuSearch 
            listOfItems={filterObjects(this.state.valueSearch, this.state.searchTextNew)} 
            textKey={textKey} 
            subtextKey={subtextKey} 
            secondaryTextKey={secondaryText} 
            onSelect={onItemClick}
            MenuSearchContent={MenuSearchContent}
            removeSearchInput={removeSearchInput}
            menuSearchMetaDataBE={menuSearchMetaDataBE}
            valueMenuSearch={valueMenuSearch}
            isLogin={isLogin}
            recommendationData={recommendationData}
            saveValueRecentSearch={saveValueRecentSearch}
            dataRecentSearch={dataRecentSearch}
            clearRecentSearch={clearRecentSearch}
            renderDataRecomen={this.renderDataRecomen}
          />
          {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
        </View>
      </ScrollView>
    );
  }
}

export default SearcheableListTrf;
