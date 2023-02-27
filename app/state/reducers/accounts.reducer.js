import {ACCOUNTS_UPDATE_BALANCES, ACCOUNTS_SET_ACCOUNTS, ACCOUNTS_CLEAR, ACCOUNTS_UPDATE_BALANCE_EMONEY} from '../actions/index.actions';
import find from 'lodash/find';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';

export default function accounts (state = [], action) {
  switch (action.type) {
  case ACCOUNTS_UPDATE_BALANCES: {
    const newBalances = action.payload;
    const accountList = [...state];
    const emoney = remove(accountList, {accountType: 'emoneyAccount'})[0];
    const newAccounts = accountList.map((account) => {
      const balances = find(newBalances, {accountNumber: account.accountNumber});
      return {...account, balances};
    });
    return isEmpty(emoney) ? [...newAccounts] : [...newAccounts, emoney];
  }
  case ACCOUNTS_UPDATE_BALANCE_EMONEY: {
    const emoneyBalance = action.payload;
    const accountList = [...state];
    const emoney = {...remove(accountList, {accountType: 'emoneyAccount'})[0], balances: emoneyBalance};
    return isEmpty(emoney) ? [...accountList] : [...accountList, emoney];
  }
  case ACCOUNTS_SET_ACCOUNTS: {
    const newAccounts = action.payload;
    return [...newAccounts];
  }
  case ACCOUNTS_CLEAR: {
    return [];
  }
  default:
    return state;
  }
}
