import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableList from '../../components/SearcheableList/SearchableListNewSearch.component';
import {noop, forEach, result, filter, find, isEmpty} from 'lodash';
import {language} from '../../config/language';
import {genericBillerNavigate} from '../../utils/genericBiller.util';
import {MenuSearchContent} from '../../config/MenuSearchContent.config';
import {setupPaymentSearch, addRecentSearch, saveValueRecentSearch, deleteRecentSearch, deleteValueSearch, getDataRecentSearch, getCacheBankList} from '../../state/thunks/common.thunks';
import {getSavingAccount} from '../../utils/transformer.util';
import {getDefaultAccount} from '../../state/thunks/fundTransfer.thunks';
import {getDefaultAccount as getEmonneyAccount} from '../../state/thunks/genericBill.thunks';


class SearcheableListPage extends Component {
  static propTypes = {
    populateAppConfig: PropTypes.func,
    goToBiller: PropTypes.func,
    billerConfig: PropTypes.array,
    navigation: PropTypes.object,
    billerAllowListRevamp: PropTypes.array,
    menuSearchMetaDataBE: PropTypes.array,
    addRecentSearch: PropTypes.func,
    accounts: PropTypes.array,
    isLogin: PropTypes.bool,
    defaultAccount: PropTypes.object,
    getDefaultAccount: PropTypes.func,
    getEmonneyAccount: PropTypes.func,
    setupPaymentForNavigation: PropTypes.func,
    saveValueRecentSearch: PropTypes.func,
    deleteRecentSearch: PropTypes.func,
    deleteValueSearch: PropTypes.func,

    removeSearchInput: PropTypes.func,
    investmentData: PropTypes.func,
    investmentAccounts: PropTypes.object,
    onTextField: PropTypes.func,
    recommendationData: PropTypes.array,
    dataRecentSearch: PropTypes.array,
    getDataRecentSearch: PropTypes.func,
    dataDisplay: PropTypes.object,
    userAccount: PropTypes.string,
    getCacheBankList: PropTypes.func,

  }

  navigateTo = (billerTypeId) => {
    const {accounts, isLogin, defaultAccount} = this.props;
    if (isEmpty(accounts)) {
      this.props.getDefaultAccount();
    }
    if (!isLogin && isEmpty(defaultAccount)) {
      this.props.getEmonneyAccount();
    }
    this.props.setupPaymentForNavigation(billerTypeId);
    this.props.getCacheBankList();
  }

  getBillerList = () => {
    const {billerConfig, navigation, billerAllowListRevamp} = this.props;
    const billerTypeName = result(navigation, 'state.params.billerTypeId', '');
    const selectedBillerType = result(find(billerAllowListRevamp, (billerAllow) =>
      billerAllow.name === billerTypeName), 'listOfBiller', []);
    if (billerTypeName === '') {
      return filter(billerConfig, (biller) => {
        const {billerType, isShown = true} = biller.billerPreferences;
        return (billerType === '1' || billerType === '2' || billerType === '3' || billerType === '6'
        || billerType === '7' || billerType === '8' || billerType === '9' || billerType === '10')
        && isShown;
      });
    } else {
      let billers = [];
      forEach(selectedBillerType, (billerCode) => {
        billers = [...billers, find(billerConfig, (biller) => {
          const {code} = biller.billerPreferences;
          return code === billerCode;
        })];
      }
      );
      return billers;
    }
  }

  componentWillMount = () => {
    this.props.getDataRecentSearch();
    this.props.deleteValueSearch();
  }

  render () {
    const {menuSearchMetaDataBE, addRecentSearch, saveValueRecentSearch, deleteRecentSearch, deleteValueSearch, 
      recommendationData, dataRecentSearch, dataDisplay, userAccount, ...extraProps} = this.props;
    const valueMenuSearch = isEmpty(menuSearchMetaDataBE) ? MenuSearchContent : menuSearchMetaDataBE;
    const billerList = this.getBillerList();

    return <SearcheableList
      searchlist={billerList}
      listHeader={language.TRANSFER__OR_SELECT_FROM_BELOW}
      inputHeader={language.GENERIC_BILLER__BILLER_NAME}
      textKey='menu'
      onItemClick={this.navigateTo}
      onChangeText = {noop}
      MenuSearchContent={MenuSearchContent}
      addRecentSearch={addRecentSearch}
      valueMenuSearch={valueMenuSearch}
      saveValueRecentSearch={saveValueRecentSearch}
      deleteRecentSearch={deleteRecentSearch}
      deleteValueSearch={deleteValueSearch}
      recommendationData={recommendationData}
      dataRecentSearch={dataRecentSearch}
      placeholderText = {language.MENU__SEARCH_PLACEHOLDER}
      clearRecentSearch={deleteRecentSearch}
      dataDisplay={dataDisplay}
      userAccount={userAccount}
      {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  billerConfig: result(state, 'billerConfig.billerList'),
  billerAllowListRevamp: result(state, 'billerConfig.billerAllowListRevamp'),
  menuSearchMetaDataBE: result(state, 'searchMetaData.searchMetadata', []),
  recommendationData: result(state, 'searchMetaData.recommendation', []),
  dataRecentSearch: result(state, 'updateRecentSearch', []),
  accounts: getSavingAccount(result(state, 'accounts', [])),
  isLogin: !isEmpty(result(state, 'user', {})),
  defaultAccount: result(state, 'defaultAccount', {}),
  dataDisplay: result(state, 'insuranceDataTravel', {}),
  userAccount: result(state, 'searchMetaData.userAccount', ''),

});

const mapDispatchToProps = (dispatch) => ({
  goToBiller: (biller) => {
    genericBillerNavigate(dispatch, biller);
  },
  saveValueRecentSearch: (recentSearch) => {
    dispatch(saveValueRecentSearch(recentSearch));
  },
  deleteRecentSearch: () => {
    dispatch(deleteRecentSearch());
  },
  deleteValueSearch: () => {
    dispatch(deleteValueSearch());
  },
  addRecentSearch: (dataSearch) => {
    dispatch(addRecentSearch(dataSearch));
  },
  setupPaymentForNavigation: (billerTypeId) => {
    dispatch(setupPaymentSearch(billerTypeId));
  },
  getDefaultAccount: () => {
    dispatch(getDefaultAccount());
  },
  getEmonneyAccount: () => {
    dispatch(getEmonneyAccount());
  },
  getDataRecentSearch: () => {
    dispatch(getDataRecentSearch());
  },
  getCacheBankList: () => {
    dispatch(getCacheBankList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearcheableListPage);
