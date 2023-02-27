import investmentAccounts from '../investmentAccounts.reducer';
import {SAVE_INVESTMENT_ACCOUNT, INVESTMENT_ACCOUNT_CLEAR} from '../../actions/index.actions';

describe('Reducer: investmentAccounts', () => {
  it('investmentAccounts', () => {
    const action = {
      type: SAVE_INVESTMENT_ACCOUNT,
      payload: {
        'ipassport': 'SMP-3347851508834419553',
        'Portfolio': {
          'affiliation': 'OWNER',
          'name': 'PAFKIPIG HOTGUIQVBIK',
          'dateOfBirth': '10/Okt/2010',
          'id': '12345678'
        },
        'lang': 'en',
        'type': [
          {
            'code': 'SinarmasSekuritas',
            'id': 1084,
            'type': 'portofolio_mutualfund'
          },
          {
            'code': 'sinarmasMSIG',
            'id': 1725,
            'type': 'portofolio_bancassurance'
          }
        ]
      }
    };
    const expectedResult = {
      'ipassport': 'SMP-3347851508834419553',
      'Portfolio': {
        'affiliation': 'OWNER',
        'name': 'PAFKIPIG HOTGUIQVBIK',
        'dateOfBirth': '10/Okt/2010',
        'id': '12345678'
      },
      'lang': 'en',
      'type': [
        {
          'code': 'SinarmasSekuritas',
          'id': 1084,
          'type': 'portofolio_mutualfund'
        },
        {
          'code': 'sinarmasMSIG',
          'id': 1725,
          'type': 'portofolio_bancassurance'
        }
      ]
    };
    expect(investmentAccounts([], action)).toEqual(expectedResult);
  });

  it('investmentAccounts', () => {
    const action = {
      type: INVESTMENT_ACCOUNT_CLEAR,
      payload: {}
    };
    const expectedResult = {};
    expect(investmentAccounts([], action)).toEqual(expectedResult);
  });

});
