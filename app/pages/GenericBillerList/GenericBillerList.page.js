import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearcheableList from '../../components/SearcheableList/SearcheableList.component';
import {noop, forEach, result, filter, find, isEmpty} from 'lodash';
import {language} from '../../config/language';
import {genericBillerNavigate} from '../../utils/genericBiller.util';

class GenericBillerListPage extends Component {
  static propTypes = {
    populateAppConfig: PropTypes.func,
    goToBiller: PropTypes.func,
    billerConfig: PropTypes.array,
    navigation: PropTypes.object,
    billerAllowListRevamp: PropTypes.array,
    cifString: PropTypes.string,
  }

  getBillerList = () => {
    const {billerConfig, navigation, billerAllowListRevamp} = this.props;

    const billerTypeName = result(navigation, 'state.params.billerTypeId', '');
    const selectedBillerType = result(find(billerAllowListRevamp, (billerAllow) =>
      billerAllow.name === billerTypeName), 'listOfBiller', []);
    const isAutoDebit = result(navigation, 'state.params.isAutoDebit', false);
    if (isAutoDebit) {
      return filter(billerConfig, (biller) => {
        const isAutodebetEnabled = result(biller, 'billerPreferences.isAutodebetEnabled', '');
        const isShown = result(biller, 'billerPreferences.isShown', true);
        return (!isEmpty(isAutodebetEnabled) && isAutodebetEnabled !== 'NONE' && isShown);
      });
    } else if (billerTypeName === '') {
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

  render () {
    const {goToBiller, ...extraProps} = this.props;
    const billerList = this.getBillerList();

    return <SearcheableList
      searchlist={billerList}
      listHeader={language.TRANSFER__OR_SELECT_FROM_BELOW}
      inputHeader={language.GENERIC_BILLER__BILLER_NAME}
      placeholderText={language.GENERIC_BILLER__INPUT_BILLER__PLACEHOLDER}
      textKey='name'
      onItemClick={goToBiller}
      onChangeText = {noop}
      isBiller = {true}
      {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  billerConfig: result(state, 'billerConfig.billerList'),
  billerAllowListRevamp: result(state, 'billerConfig.billerAllowListRevamp'),
  cifString: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToBiller: (biller) => {
    genericBillerNavigate(dispatch, biller);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GenericBillerListPage);
