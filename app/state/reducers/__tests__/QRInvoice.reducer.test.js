import qrInvoiceReducer from '../QRInvoice.reducer';
import * as actions from '../../actions/index.actions';

describe('Reducer: transactions', () => {
  const initialState = {};
  it('Should return default state by default', () => {
    expect(qrInvoiceReducer(undefined, {})).toEqual(initialState);
  });
  it('Should update qr invoice', () => {
    const action = {
      type: actions.SAVE_QR_INVOICE,
      payload: {
        'result': 'success',
        'content': {
          'amount': 2250,
          'couponList': [
            {
              'loyaltyProgramId': 138,
              'amount': 10,
              'loyaltyCardId': 41991,
              'couponType': 'PERCENT',
              'loyaltyId': 10509,
              'couponId': 4363,
              'validityEndDate': 1521910800000,
              'currency': 'IDR'
            },
            {
              'loyaltyProgramId': 138,
              'amount': 10,
              'loyaltyCardId': 41991,
              'couponType': 'PERCENT',
              'loyaltyId': 10509,
              'couponId': 4363,
              'validityEndDate': 1521910800000,
              'currency': 'IDR'
            },
            {
              'loyaltyProgramId': 138,
              'amount': 10,
              'loyaltyCardId': 41991,
              'couponType': 'PERCENT',
              'loyaltyId': 10509,
              'couponId': 4363,
              'validityEndDate': 1521910800000,
              'currency': 'IDR'
            }
          ],
          'merchantApikey': '4f6c5f8fad20165966a1d3522aafc6ebce2a5bd6',
          'receiver': 'Payment Loyalty',
          'correctedInvoiceAmountWithPercentage': 2125,
          'hasLoyaltyCard': false,
          'status': 'AVAILABLE_FOR_PAYMENT',
          'invoiceId': 'FAzdlWTmmlOL',
          'permanentPercentageDiscount': 10,
          'currentLoyaltyProgram': {
            'result': 'success',
            'loyaltyProgram': {
              'startDate': 1457654400000, 'minTransAmountForDiscount': 10000, 'permanentPercentageDiscount': 20,
              'endDate': 1483142400000,
              'loyaltyProgramType': 'PERMANENT_PERCENTAGE_DISCOUNT', 'discountAmount': null,
              'currency': 'IDR',
              'amountPerPoint': null,
              'monthNumberValidity': 0,
              'maxRedeem': 2,
              'pointPerExpense': 0,
              'pointAmountForCoupon': 0,
              'loyaltyProgramId': 66,
              'logo': null,
              'loyaltyProgramOwnerBrand': 'UANGKU SMARTFREN',
              'label': 'Discount Salon Meicy 20%',
              'rewardType': null,
              'loyaltyProgramOwnerCompanyName': 'PT Smartfren Telecom Tbk', 'maxDiscountAmount': null,
              'expenseType': null
            }
          },
          'loyaltyId': 10509,
          'tipEnabled': true,
          'comment': 'No comment',
          'tip': {
            'firstProposition': 50,
            'suggestedAmount': 100,
            'secondProposition': 200
          },
          'currency': 'IDR'
        }
      }
    };
    const expected = {
      'result': 'success',
      'content': {
        'amount': 2250,
        'couponList': [
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          },
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          },
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          }
        ],
        'merchantApikey': '4f6c5f8fad20165966a1d3522aafc6ebce2a5bd6',
        'receiver': 'Payment Loyalty',
        'correctedInvoiceAmountWithPercentage': 2125,
        'hasLoyaltyCard': false,
        'status': 'AVAILABLE_FOR_PAYMENT',
        'invoiceId': 'FAzdlWTmmlOL',
        'permanentPercentageDiscount': 10,
        'currentLoyaltyProgram': {
          'result': 'success',
          'loyaltyProgram': {
            'startDate': 1457654400000, 'minTransAmountForDiscount': 10000, 'permanentPercentageDiscount': 20,
            'endDate': 1483142400000,
            'loyaltyProgramType': 'PERMANENT_PERCENTAGE_DISCOUNT', 'discountAmount': null,
            'currency': 'IDR',
            'amountPerPoint': null,
            'monthNumberValidity': 0,
            'maxRedeem': 2,
            'pointPerExpense': 0,
            'pointAmountForCoupon': 0,
            'loyaltyProgramId': 66,
            'logo': null,
            'loyaltyProgramOwnerBrand': 'UANGKU SMARTFREN',
            'label': 'Discount Salon Meicy 20%',
            'rewardType': null,
            'loyaltyProgramOwnerCompanyName': 'PT Smartfren Telecom Tbk', 'maxDiscountAmount': null,
            'expenseType': null
          }
        },
        'loyaltyId': 10509,
        'tipEnabled': true,
        'comment': 'No comment',
        'tip': {
          'firstProposition': 50,
          'suggestedAmount': 100,
          'secondProposition': 200
        },
        'currency': 'IDR'
      }
    };
    expect(qrInvoiceReducer(initialState, action)).toEqual(expected);
  });
  it('CLEAR_QR_INVOICE: should clear all ', () => {
    const action = {
      type: actions.CLEAR_QR_INVOICE
    };
    const state = {qrInvoice: {
      'result': 'success',
      'content': {
        'amount': 2250,
        'couponList': [
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          },
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          },
          {
            'loyaltyProgramId': 138,
            'amount': 10,
            'loyaltyCardId': 41991,
            'couponType': 'PERCENT',
            'loyaltyId': 10509,
            'couponId': 4363,
            'validityEndDate': 1521910800000,
            'currency': 'IDR'
          }
        ],
        'merchantApikey': '4f6c5f8fad20165966a1d3522aafc6ebce2a5bd6',
        'receiver': 'Payment Loyalty',
        'correctedInvoiceAmountWithPercentage': 2125,
        'hasLoyaltyCard': false,
        'status': 'AVAILABLE_FOR_PAYMENT',
        'invoiceId': 'FAzdlWTmmlOL',
        'permanentPercentageDiscount': 10,
        'currentLoyaltyProgram': {
          'result': 'success',
          'loyaltyProgram': {
            'startDate': 1457654400000, 'minTransAmountForDiscount': 10000, 'permanentPercentageDiscount': 20,
            'endDate': 1483142400000,
            'loyaltyProgramType': 'PERMANENT_PERCENTAGE_DISCOUNT', 'discountAmount': null,
            'currency': 'IDR',
            'amountPerPoint': null,
            'monthNumberValidity': 0,
            'maxRedeem': 2,
            'pointPerExpense': 0,
            'pointAmountForCoupon': 0,
            'loyaltyProgramId': 66,
            'logo': null,
            'loyaltyProgramOwnerBrand': 'UANGKU SMARTFREN',
            'label': 'Discount Salon Meicy 20%',
            'rewardType': null,
            'loyaltyProgramOwnerCompanyName': 'PT Smartfren Telecom Tbk', 'maxDiscountAmount': null,
            'expenseType': null
          }
        },
        'loyaltyId': 10509,
        'tipEnabled': true,
        'comment': 'No comment',
        'tip': {
          'firstProposition': 50,
          'suggestedAmount': 100,
          'secondProposition': 200
        },
        'currency': 'IDR'
      }
    }};
    const expected = {};
    expect(qrInvoiceReducer(state, action)).toEqual(expected);
  });
});
