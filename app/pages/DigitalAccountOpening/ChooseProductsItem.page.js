import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChooseProductsItemComp from '../../components/DigitalAccountOpening/ChooseProductsItem.component';
import {connect} from 'react-redux';
import {saveProductData, saveProductCode, saveCcCode} from '../../state/actions/index.actions.js';
import {result, isEmpty, startsWith, find} from 'lodash';
import {getAdditionalData, goToTnC} from '../../state/thunks/digitalAccountOpening.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  isLogin: !isEmpty(result(state, 'user', {})),
  productItems: result(state, 'productItems', {}),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  config: result(state, 'config', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToTnC: (value) => () => {
    dispatch(saveProductCode(result(value, 'productCode', '')));
    dispatch(saveCcCode(result(value, 'productCode', '') + '-SIMOBI-002'));
    dispatch(saveProductData(value));
    dispatch(goToTnC(value));    
  },
  getAdditionalData: () => dispatch(getAdditionalData())
});

class ChooseProductsItem extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isLogin: PropTypes.bool,
    productItems: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToTnC: PropTypes.func,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    onChangeTab: PropTypes.func,
    getAdditionalData: PropTypes.func,
    config: PropTypes.object,
    // navigation: PropTypes.object
  }

  componentWillMount () {
    this.props.getAdditionalData();
  }

  carouselRefs = {
    secureCC: null,
    unsecureCC: null,
  }

  tabNames = ['secureCC', 'unsecureCC'];

  state = {
    activeTab: 'secureCC'
  }

  _setCarouselReferenceFor = (refType) => (ref) => {
    this.carouselRefs[refType] = ref;
  }
  
  render () {
    const {isLogin, productItems, currentLanguage, goToTnC, accountList, cifCode, config, navigation} = this.props;
    const emoneyKycOnly = !find(accountList, {accountType: 'SavingAccount'}) && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
    const isOBMPassword = result(navigation, 'state.params.isOBMPassword', false);
    let show = false;

    if (isLogin) {
      if (!startsWith(cifCode, 'NK')) {
        if (emoneyKycOnly) {
          show = false;
        } else {
          show = true;
        }
      } else {
        show = false;
      }
    } else {
      show = false;
    }

    const showCCUnsecureETB = result(config, 'flag.flagCCUnsecureMenuETB', 'INACTIVE') === 'ACTIVE';
    const showCCUnsecureNTB = result(config, 'flag.flagCCUnsecureMenuNTB', 'INACTIVE') === 'ACTIVE';

    return (
      <ChooseProductsItemComp
        isLogin={isLogin}
        productItems={productItems}
        currentLanguage={currentLanguage}
        goToTnC={goToTnC}
        show={show}
        activeTab={this.state.activeTab}
        setCarouselReferenceFor={this._setCarouselReferenceFor}
        emoneyKycOnly={emoneyKycOnly}
        cifCode={cifCode}
        showCCUnsecureETB={showCCUnsecureETB}
        showCCUnsecureNTB={showCCUnsecureNTB}
        isOBMPassword={isOBMPassword}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseProductsItem);
