import React from 'react';
import PropTypes from 'prop-types';
import ProductTypeSelectionsComponent from '../../components/SimasValas/ProductTypeSelections.component';
import {result, isEmpty, find, startsWith} from 'lodash';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {getSavingProductsItems} from '../../state/thunks/digitalAccountOpening.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  isLogin: !isEmpty(result(state, 'user', {})),
  productItems: result(state, 'productItems', {}),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  config: result(state, 'config', {}),
  productItemsList: result(state, 'productItemsSimasValas.config', []),
});

const mapDispatchToProps = (dispatch) => ({
  goToIDRsavings: () => dispatch(getSavingProductsItems()),
  goToValasSavings: () => {
    dispatch(NavigationActions.navigate({routeName: 'SimasValasChooseCurrency'}));
  },
});

class ProductTypeSelections extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    isLogin: PropTypes.bool,
    productItems: PropTypes.object,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    config: PropTypes.object,
    productItemsList: PropTypes.array,
    goToIDRsavings: PropTypes.func,
    goToValasSavings: PropTypes.func,
  }

  render () {
    const {navigation, currentLanguage, isLogin, productItems, accountList, cifCode, productItemsList, goToIDRsavings, goToValasSavings} = this.props;
    const emoneyKycOnly = accountList.length === 1 && find(accountList, {accountType: 'emoneyAccount'}) && !startsWith(cifCode, 'NK');
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

    const findProductSavingValas = find(productItemsList, function (prodList) {
      return prodList.productCode === 'SAV';
    });
    const productEnabledETB = result(findProductSavingValas, 'productEnabledETB', '');
    const productEnabledNTB = result(findProductSavingValas, 'productEnabledNTB', '');
    const productNameID = result(findProductSavingValas, 'productNameID', '');
    const productNameEN = result(findProductSavingValas, 'productNameEN', '');
    const productDescID = result(findProductSavingValas, 'productDescID', '');
    const productDescEN = result(findProductSavingValas, 'productDescEN', '');
    const productImage = result(findProductSavingValas, 'productImage', '');

    return <ProductTypeSelectionsComponent
      navigation={navigation}
      currentLanguage={currentLanguage}
      isLogin={isLogin}
      productItems={productItems}
      show={show}
      goToIDRsavings={goToIDRsavings}
      goToValasSavings={goToValasSavings}
      findProductSavingValas={findProductSavingValas}
      productEnabledETB={productEnabledETB}
      productEnabledNTB={productEnabledNTB}
      productNameID={productNameID}
      productNameEN={productNameEN}
      productDescID={productDescID}
      productDescEN={productDescEN}
      productImage={productImage}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeSelections);
