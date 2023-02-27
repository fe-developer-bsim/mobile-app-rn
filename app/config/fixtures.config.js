module.exports = {
  HSM_INIT: require('../fixtures/hsm.json'),
  VERSION_CHECK: require('../fixtures/version-check.json'),
  LOGIN: require('../fixtures/login.json'),
  APPCONFIG: require('../fixtures/app-config.json'),
  BILLER_CONFIG: require('../fixtures/biller-config.json'),
  GET_PAYEE_NAME: require('../fixtures/payee-name.json'),
  ADD_PAYEE: require('../fixtures/add-payee.json'),
  TRANSFER: require('../fixtures/transfer.json'),
  MOBILE_TOPUP: require('../fixtures/topup-transaction.json'),
  BALANCES: require('../fixtures/balances.json'),
  CONFIRM_INTERNAL_TRANSFER: require('../fixtures/confirm-transfer.json'),
  WATER_BILL_ENQUIRY: require('../fixtures/waterbill-enquiry.json'),
  WATER_BILL_TRANSACTION: require('../fixtures/waterbill-transaction.json'),
  ELECTRICITY_ENQUIRY: require('../fixtures/electricity-enquiry.json'),
  ELECTRICITY_TRANSACTION: require('../fixtures/electricity-transaction.json'),
  ELECTRICITY_RESULT: require('../fixtures/electricity-transaction.json'),
  POSTPAID_ENQUIRY: require('../fixtures/postpaid-enquiry.json'),
  POSTPAID_TRANSACTION: require('../fixtures/postpaid-transaction.json'),
  OTP_VERIFY: require('../fixtures/otp-verify.json'),
  VERIFY_ATM_CARD_PIN: require('../fixtures/verify-atm.json'),
  VERIFY_USERNAME: require('../fixtures/verify-username.json'),
  OTP_RESEND: require('../fixtures/otp-resend.json'),
  CREATE_USERNAME_PASSWORD: require('../fixtures/create-username-password.json'),
  EASY_PIN_REGISTER: require('../fixtures/easy_pin_register.json'),
  TRANSACTIONS_HISTORY: require('../fixtures/transactions-history.json'),
  TRANSACTIONS_MINI: require('../fixtures/mini-statement.json'),
  TIMEDEPOSIT_DETAIL: require('../fixtures/timedeposit-detail.json'),
  CREDIT_CARD_INQUIRY: require('../fixtures/balance-inquiry-creditcard'),
  GET_TRANS_REF_NUM: require('../fixtures/request-sms-otp.json'),
  LOGOUT: require('../fixtures/logout.json'),
  VERFY_PASSWORD: require('../fixtures/verify-password.json'),
  UPDATE_EASYPIN: require('../fixtures/update-easypin.json'),
  CHANGE_PASSWORD: require('../fixtures/change-password.json'),
  TD_CONFIG: require('../fixtures/td-config.json'),
  TD_CONFIRMATION: require('../fixtures/td-confirmation.json'),
  TD_TRANSACTION: require('../fixtures/td-online.json'),
  TDS_CONFIG: require('../fixtures/tds-config.json'),
  TDS_CONFIRMATION: require('../fixtures/tds-confirmation.json'),
  TDS_TRANSACTION: require('../fixtures/tds-online.json'),
  REFRESH_STORAGE: require('../fixtures/refresh-storage'),
  CC_INQUIRY: require('../fixtures/creditcard-inquiry.json'),
  CC_TRANSACTION: require('../fixtures/creditcard-transaction.json'),
  RESEND_PAYMENT_OTP: require('../fixtures/resend-payment-otp'),
  LINK_CREDIT_CARD: require('../fixtures/autolink-credit-card.json'),
  CREDIT_CARD_TRANSACTION: require('../fixtures/account-statement-creditcard.json'),
  CONFIRM_BLOCK_CREDIT_CARD: require('../fixtures/confirm-block-credit-card.json'),
  REQUEST_BLOCK_CREDIT_CARD: require('../fixtures/request-block-credit-card.json'),
  REQUEST_CREDIT_CARD_OPTION: require('../fixtures/request-card-options-creditcard.json'),
  FEEDBACK_SUBMIT: require('../fixtures/feedback-submit.json'),
  CONFIRM_CREDIT_CARD_OPTION: require('../fixtures/confirm-card-options-creditcard.json'),
  CONFIRM_CREDIT_CARD_CHANGE_LIMIT: require('../fixtures/confirm-change-limit-creditcard.json'),
  REQUEST_CREDIT_CARD_CREDIT_CARD_OPTION: require('../fixtures/request-change-limit-creditcard.json'),
  OFFERS_EN: require('../fixtures/offers-en.json'),
  OFFERS_ID: require('../fixtures/offers-id.json'),
  BANNERS: require('../fixtures/banners.json'),
  CLOSE_TD: require('../fixtures/td-online-close.json'),
  TD_DISCLAIMER_EN: require('../fixtures/td-online-note.json'),
  TD_DISCLAIMER_ID: require('../fixtures/td-online-note.json'),
  SHARE_REFERRAL_CODE: require('../fixtures/share-referral-code.json'),
  FETCH_PAN_NUMBER: require('../fixtures/fetch-by-clear-pan-number.json'),
  FETCH_PIN_NUMBER: require('../fixtures/fetch-by-clear-pan-encrypt-pin-number.json'),
  GET_USER_API_KEY: require('../fixtures/get-user-api-key.json'),
  QR_PAYMENT: require('../fixtures/qr-payment.json'),
  EFORM_NTB: require('../fixtures/formdata.json'),
  QR_LOGIN: require('../fixtures/login-qr.json'),
  QR_INVOICE: require('../fixtures/invoice-qr.json'),
  QR_GET_STATUS: require('../fixtures/qr-get-status.json'),
  ELECTRICITY_CONFIRMATION: require('../fixtures/electricity-confirmation.json'),
  MOBILE_TOPUP_CONFIRMATION: require('../fixtures/topup-confirmation.json'),
  GET_DETAIL_TRANSACTION: require('../fixtures/statement-detail.json'),
  GET_PAYDAY_LOAN: require('../fixtures/payday-loan.json'),

  // GENERIC BILLER
  GENERIC_BILLER_ENQUIRY: require('../fixtures/generic-bill-enquiry.json'),
  GENERIC_BILLER_TRANSACTION: require('../fixtures/generic-bill-transaction.json'),
  GENERIC_BILLER_CONFIRMATION: require('../fixtures/generic-bill-confirmation.json'),
  GENERIC_BILLER_DETAIL: require('../fixtures/billpayment-detail.json'),

  // GET language
  GET_LANGUAGE: require('../fixtures/get-language.json'),

  // GET simobi user migration
  FETCH_USER_SIMOBI: require('../fixtures/fetch-user-simobi.json'),

  GET_PA_INSURANCE: require('../fixtures/personal-accident-config.json'),
  CONFIRM_PA_INSURANCE: require('../fixtures/personal-accident-confirm.json'),
  RESULT_PA_INSURANCE: require('../fixtures/personal-accident-result.json'),

  GET_TRAVEL_INSURANCE: require('../fixtures/travel-insurance-config.json'),
  CONFIRM_TRAVEL_INSURANCE: require('../fixtures/travel-insurance-confirm.json'),
  RESULT_TRAVEL_INSURANCE: require('../fixtures/travel-insurance-result.json'),
  GET_LOAN_LIST: require('../fixtures/payDayLoan-card.json'),

  // Send PaydayLoan FormError
  SEND_PAYDAYLOAN_FORM: require('../fixtures/payDayLoan-disburse.json'),
  GET_DATA_PAYDAYLOAN_FORM: require('../fixtures/payDayLoan-dataForm.json'),

  // recurring data
  EDIT_RECURRING_TRANSFER: require('../fixtures/fundTransferSchedule-edit.json'),
  DELETE_RECURRING_TRANSFER: require('../fixtures/fundTransferSchedule-delete.json'),

  // get balance EmoneyCard
  GET_BALANCE_EMONEY: require('../fixtures/get-balance-emoney.json'),

  // register eMoneyData
  SEND_EMAIL_REGISTER_E_MONEY: require('../fixtures/send-emailtotp-emoney.json'),
  CHECK_E_MONEY_REGISTER: require('../fixtures/check-register-emoney.json'),

  // QR GPN
  QR_GPN_MERCHANT: require('../fixtures/qr-gpn.json'),
  QR_GPN_TRANSACTION: require('../fixtures/qr-gpn-payment.json'),
  QR_MERCHANT_LIST: require('../fixtures/qr-merchant-list.json'),
  QR_TERMINAL_LIST: require('../fixtures/qr-terminal-list.json'),
  QR_REFUND_CODE: require('../fixtures/qr-refund-list.json'),

  // mini statement for eMoneyData
  GET_STATEMENT_EMONEY: require('../fixtures/mini-statement-emoney.json'),

  // eGift
  GET_EGIFT_CACHE: require('../fixtures/get-egift-cache.json'),
  PURCHASE_EGIFT: require('../fixtures/purchase-egift.json'),
  GET_EGIFT_DETAIL: require('../fixtures/egift-view.json'),
  GET_EGIFT_PAGINATION: require('../fixtures/get-egift-pagination.json'),

  // simasPoin
  INQUIRY_SIMAS_POIN: require('../fixtures/inquiry-simas-poin.json'),
  GET_SIMASPOIN_HISTORY: require('../fixtures/account-statement-simas-poin'),

  // myOrder for Tada
  GET_DATA_MYORDER: require('../fixtures/myOrder.json'),

  // Create new cc account (indigo)
  GET_CC_CHECKPOINT: require('../fixtures/get-cc-checkpoint.json'),
  GET_CC_DATA_CIF: require('../fixtures/get-cc-checkpoint-cif.json'),
  CHECK_PHONE_NUMBER_CC: require('../fixtures/checkingMobileNumber-creditCard.json'),
  CREATE_CREDIT_CARD: require('../fixtures/registrationCC.json'),
  CHECK_DUKCAPIL: require('../fixtures/checkingDukcapil.json'),

  // OTP Eform
  REQUEST_OTP_EFORM: require('../fixtures/request-sms-otp-eform.json'),
  VERIFY_OTP_EFORM: require('../fixtures/verify-sms-otp-eform.json'),

  // get location list
  GET_PROVINCE_LIST: require('../fixtures/get-province.json'),
  GET_CITY_LIST: require('../fixtures/get-city.json'),
  GET_DISTRICT_LIST: require('../fixtures/get-district.json'),
  GET_SUBDISTRICT_LIST: require('../fixtures/get-subdistrict.json'),

  // CGV
  GET_SEAT_LAYOUT: require('../fixtures/get-seat-layout.json'),
  GET_SELECTED_SEAT: require('../fixtures/cgv-selected-seat.json'),
  GET_PAYMENT_CINEMA: require('../fixtures/cgv-payment.json'),

  // FLIGHT
  GET_FLIGHT_RESERV: require('../fixtures/flight-reservation.json'),

  // get flight availability
  GET_FLIGHT_AVAILABILITY: require('../fixtures/get-flight-availability.json'),
  GET_FARE_DETAIL: require('../fixtures/get-flight-detail.json'),
  GET_LIST_PASSENGER: require('../fixtures/passengerList.json'),
  COUNTRY_ISO: require('../fixtures/country-iso.json'),
  GET_MOVIE_CGV: require('../fixtures/cgv-movie-list.json'),
  GET_CINEMA_SCHEDULE: require('../fixtures/cgv-schedule.json'),

  // ATM & BRANCH LOCATOR
  ATM_LOCATOR: require('../fixtures/atm-branch-locator.json'),

  // coupon
  GET_VOCUHERLIST: require('../fixtures/getCouponList.json'),
  GET_VOUCHER_DETAIL: require('../fixtures/getDetailCoupon.json'),
  GET_VOUCHER_VALIDITY: require('../fixtures/getValidityCoupon.json'),
  GET_BILLPAY_HISTORY: require('../fixtures/get-saved-billpayment.json'),
  DELETE_BILLPAY_HISTORY: require('../fixtures/delete-billpay-history.json'),

  // Profile Picture
  ADD_PICTURE: require('../fixtures/addPicture.json'),
  UPDATE_PICTURE: require('../fixtures/updatePicture.json'),
  GENERATE_CODE: require('../fixtures/generate-lowCode.json'),
  GENERATE_ONLINE_CODE_II: require('../fixtures/generate-lowCode2.json'),

  INQUIRY_TOKEN_PAYMENT: require('../fixtures/requestDetailPushInvoice.json'),
  TOKEN_PAYMENT_PAY: require('../fixtures/validatePushInvoice.json'),
  INCOMPLETE_INVOICE: require('../fixtures/requestInvoiceIncomplete.json'),
  GENERATE_VOUCHER_CODE: require('../fixtures/requestVoucherCode.json'),
  // Genflix
  GENFLIX_GET_EMAIL: require('../fixtures/genflix-get-email.json'),
  GENFLIX_EMAIL_QUERY: require('../fixtures/genflix-check-email.json'),
  GENFLIX_REGISTRATION: require('../fixtures/genflix-registration.json'),

  // // Verify Email
  EMAIL_OTP_GENERATE: require('../fixtures/genflix-generate-otp.json'),
  EMAIL_OTP_VALIDATE: require('../fixtures/genflix-validate-otp.json'),

  // Favorite Transactions
  GET_FAVORITE_BILLER: require('../fixtures/favBiller.json'),

  // CONFIRMATION_TRANSFER: require('../fixtures/confirm-transfer.json'),

  INQUIRY_QRGPN: require('../fixtures/inquiry-qr-gpn.json'),

  // lucky draw
  GET_DETAIL_WINNER: require('../fixtures/getDetailWinner.json'),

  // reksadana
  // GET_WEALTH_MANAGEMENT_CONFIG: require('../fixtures/wealth-management-config'),
  REKSADANA_SUMMARY_DETAIL_LAST_TRANSACTION: require('../fixtures/reksadana-summary-detail-last-transaction'),
  GET_RELEASE_DEVICE_QR: require('../fixtures//get-user-device-data.json'),
  CHECK_RELEASE_DEVICE_QR: require('../fixtures/check-status-release-qr.json'),
  OTP_VERIFY_EFORM: require('../fixtures/verifyOTPEform.json'),
  CONFIRM_RELEASE_DEVICE_QR: require('../fixtures/update-valid-otp-status.json'),

  // get auto debit list
  GET_AUTO_DEBIT_LIST: require('../fixtures/get-auto-debit-list.json'),

  GET_REGISTRATION_DATA: require('../fixtures/get-config-eform.json'),

  GET_GENERIC_LOAN_LIST: require('../fixtures/get-generic-loan-products.json'),
  // get inquiry SIL
  GET_INQUIRY_SIL: require('../fixtures/inquiry-SIL.json'),

  // get wealth management config
  GET_WEALTH_MANAGEMENT_CONFIG: require('../fixtures/wealth-management-config.json'),

  // default account
  GET_DEFAULT_ACCOUNT: require('../fixtures/get-default-account.json'),
  SET_DEFAULT_ACCOUNT: require('../fixtures/set-default-account.json'),

  // Split Bill
  GET_LIST_SPLITBILLBYSENDER: require('../fixtures/getListSplitBillBySender.json'),
  GET_LIST_SPLITBILLBYRECEIVER: require('../fixtures/getListSplitBillByReceiver.json'),
  SPLIT_BILL: require('../fixtures/sendSplitBill.json'),
  
  DETAIL_LOCKED_AMOUNT: require('../fixtures/get-detail-lockdana.json'),

  // quesioner SIL
  GET_HEALTH_QUESTION: require('../fixtures/sil-health-question.json'),
  GET_PROFILE_QUESTION: require('../fixtures/sil-profile-question.json'),

  // Merchant List Push Invoice
  GET_PARTNER_LIST: require('../fixtures/getPartnerList.json'),

  GET_PUSH_NOTIF: require('../fixtures/getPushWooshInbox.json'),
  // Valas
  GET_LIST_VALAS: require('../fixtures/valas-list.json'),

  // Remittance
  CHECK_REMITTANCE_OPERATION_TIME: require('../fixtures/check-remittance-operation-hour.json'),

  // MUST BE DELETED //
  GET_GENERIC_SAVING_LIST: require('../fixtures/get-saving-config.json'),
};
