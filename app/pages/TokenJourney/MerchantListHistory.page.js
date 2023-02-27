import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import MerchantListHistory from '../../components/TokenJourney/MerchantListHistory.component';
import {unlinkMerchant, getMerchantList} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import {toLower, startCase} from 'lodash';

const formConfig = {
  form: 'MerchantListHistory',
  destroyOnUnmount: false,
};

const mapStateToProps = (state) => ({
  directDebitPartnerList: result(state, 'directDebitPartnerList', []),
  userName: startCase(toLower(result(state, 'user.profile.name', ''))),

});

const mapDispatchToProps = (dispatch) => ({
  unlinkMerchant: (data) => () => {
    dispatch(unlinkMerchant(data));
  },
  getMerchantList: () => {
    dispatch(getMerchantList());
  },


});



const DecoratedTokenForm = reduxForm(formConfig)(MerchantListHistory);

class MerchantListHistoryPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    unlinkMerchant: PropTypes.func,
    expiredInvoice: PropTypes.func,
    getMerchantList: PropTypes.func,
    directDebitPartnerList: PropTypes.array,
    userName: PropTypes.string,
  };

  componentDidMount () {
    this.props.getMerchantList();
  }

  render () {
    const {navigation = {}, unlinkMerchant, directDebitPartnerList, userName} = this.props;
    const data = result(navigation, 'state.params.data', {});
    return <DecoratedTokenForm
      data= {data}
      unlinkMerchant= {unlinkMerchant}
      directDebitPartnerList= {directDebitPartnerList}    
      userName={userName}  
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantListHistoryPage);