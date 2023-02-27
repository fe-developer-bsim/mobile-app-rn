import env from './env.config';
export const SERVER_URL = env.URL;
export const CAPTCHA_URL = env.URLCAPTCHA;
export const QR_URL = env.URLDIMO;
export const URLV3 = env.URLV3;
export const URLV4 = env.URLV4;
export const URLEFORMCENTRAL = env.URLEFORMCENTRAL;
export const URLQR = env.URLQR;
export const URLESTORE = env.URLESTORE;
export const URLV1 = env.URLV1;
export const URLESTOREMERCHANT = env.URLESTOREMERCHANT;
export const URLALFACART = env.URLALFACART;

export const endpoints = {
  // CALLED ON APP LOAD
  HSM_INIT: '/hsm/init',
  VERSION_CHECK: '/version-check',

  LOGIN: '/login',
  APPCONFIG: '/app-config',

  GET_PAYEE_NAME: '/payee-name',
  ADD_PAYEE: '/add-payee',
  TRANSFER: '/transfer',
  BALANCES: '/balances',
  CONFIRMATION_TRANSFER: '/confirm-transfer',
  // BILL PAYMENTS
  WATER_BILL_ENQUIRY: '/billpay-inquiry',
  WATER_BILL_TRANSACTION: '/billpay-transaction',
  POSTPAID_ENQUIRY: '/billpay-inquiry',
  POSTPAID_TRANSACTION: '/billpay-transaction',
  ELECTRICITY_ENQUIRY: '/billpay-inquiry',
  ELECTRICITY_TRANSACTION: '/billpay-transaction',
  ELECTRICITY_CONFIRMATION: '/billpay-confirmation',
  ELECTRICITY_RESULT: '/billpay-result',
  GET_TRANS_REF_NUM: '/request-sms-otp', // Not changing endpoint since it might affect old app users.
  MOBILE_TOPUP: '/billpay-transaction',
  MOBILE_TOPUP_CONFIRMATION: '/billpay-confirmation',
  MOBILE_TOPUP_RESULT: '/billpay-result',
  BILLER_CONFIG: '/biller-config',
  RESEND_PAYMENT_OTP: '/resend-payment-otp',
  MOBILE_POSTPAID_CONFIRMATION: '/billpay-confirmation',
  MOBILE_POSTPAID_RESULT: '/billpay-result',
  WATERBILL_CONFIRMATION: '/billpay-confirmation',
  WATERBILL_RESULT: '/billpay-result',

  OTP_VERIFY: '/verify-otp',
  VERIFY_ATM_CARD_PIN: '/fetch-by-pan-number',
  VERIFY_USERNAME: '/check-username',
  OTP_RESEND: '/resend-otp',
  CREATE_USERNAME_PASSWORD: '/do-registration',
  EASY_PIN_REGISTER: '/register-easypin',
  TRANSACTIONS_HISTORY: '/account-statement',
  TRANSACTIONS_HISTORY_NEW: '/account-statement-get',
  TRANSACTIONS_MINI: '/mini-statement',
  TRANSACTIONS_MINI_NEW: '/mini-statement-new',
  TIMEDEPOSIT_DETAIL: '/td-online-detail',
  CREDIT_CARD_DETAIL: '/credit-card-detail',
  CREDIT_CARD_INQUIRY: '/balance-inquiry-creditcard',
  CREDIT_CARD_TRANSACTION: '/account-statement-creditcard',
  CREDIT_CARD_STATEMENT: '/cc-statement',
  CREDIT_CARD_SET_INSTALLMENT: '/eppSchemeEnquiry',
  CREDIT_CARD_CHANGE_INSTALLMENT: '/changeEpp',
  CREDIT_CARD_TXN_MANAGE: '/parametersTxn',
  CREDIT_CARD_GETTXN_MANAGE: '/getToogleTxn',
  CREDIT_CARD_CASH_ADVANCE: '/cc-cash-advance',
  CREDIT_CARD_SOURCE_OF_FUND: '/cc-source-of-payment',
  CREDIT_CARD_SETTINGS_GET_NOTIF: '/getToogleNotif',
  CREDIT_CARD_SETTINGS_SET_NOTIF: '/parametersNotif',
  CREDIT_CARD_SET_INSTALLMENT_PERIODE: '/eppSchemeEnquiry',
  CREDIT_CARD_CASH_ADVANCE_FEE: '/cc-cash-advance-fee',

  // PROFILE
  LOGOUT: '/logout',
  VERFY_PASSWORD: '/verify-password',
  UPDATE_EASYPIN: '/update-easypin',
  CHANGE_PASSWORD: '/change-password',
  OFFERS_EN: '/offer-list/en',
  OFFERS_ID: '/offer-list/id',
  BANNERS: '/banner-list',
  OFFERS: '/offer-list',

  // TIME DEPOSIT
  TD_CONFIG: '/td-online-config',
  TD_CONFIRMATION: '/td-online-confirmation',
  TD_TRANSACTION: '/td-online',
  TDS_CONFIG: '/tds-online-config',
  TDS_CONFIRMATION: '/tds-online-confirmation',
  TDS_TRANSACTION: '/tds-online',

  REFRESH_STORAGE: '/refresh-storage',
  LINK_CREDIT_CARD: '/autolink-creditcard',
  CC_INQUIRY: '/billpay-inquiry',
  CC_TRANSACTION: '/billpay-transaction',

  CONFIRM_BLOCK_CREDIT_CARD: '/confirm-block-creditcard',
  REQUEST_BLOCK_CREDIT_CARD: '/request-block-creditcard',
  REQUEST_CREDIT_CARD_OPTION: '/request-card-options-creditcard',

  FEEDBACK_SUBMIT: '/feedback',
  CONFIRM_CREDIT_CARD_OPTION: '/confirm-card-options-creditcard',
  CONFIRM_CREDIT_CARD_CHANGE_LIMIT: '/confirm-change-limit-creditcard',
  REQUEST_CREDIT_CARD_CREDIT_CARD_OPTION: '/request-change-limit-creditcard',

  CLOSE_TD: '/td-online-close',
  TD_DISCLAIMER_EN: 'td-online-note?lang=en',
  TD_DISCLAIMER_ID: 'td-online-note?lang=id',

  SHARE_REFERRAL_CODE: '/share-referral-code',

  FETCH_PAN_NUMBER: '/fetch-by-clear-pan-number',
  FETCH_PIN_NUMBER: '/fetch-by-clear-pan-encrypt-pin-number',

  GET_USER_API_KEY: 'get-user-api-key',
  QR_PAYMENT: 'qr-payment',
  QR_LOGIN: '/login',
  QR_INVOICE: '/banking',
  QR_GET_STATUS: '/banking',
  QR_GET_PROMO_LIST: '/mobile/individualGetActiveLoyaltyPrograms?withLogo=false',
  QR_MERCHANT: '/DppApi',

  GET_DETAIL_TRANSACTION: '/statement-detail',
  // https://sandbox.dimo.co.id/login/auth/connect?userkey=e1e9b10906b134bd0e8c53a3d12ad
  // 5fe402cecf6&pin=0000
  EFORM_NTB: '/rest/formdata',

  // GENERIC BILLER
  GENERIC_BILLER_ENQUIRY: '/billpay-inquiry',
  GENERIC_BILLER_TRANSACTION: '/billpay-transaction',
  GENERIC_BILLER_CONFIRMATION: '/billpay-confirmation',
  GENERIC_BILLER_DETAIL: '/billpayment-detail',
  GENERIC_BILLER_RESULT: '/billpay-result',

  // GET LANGUAGE
  GET_LANGUAGE: '/get-lang?mode=all',

  // GET REGEX PASSWORD
  GET_REGEX_PASSWORD_POLICY: '/password-policy',

  // get wealth Management config
  GET_WEALTH_MANAGEMENT_CONFIG: '/wealth-management-config',
  GET_WEALTH_MANAGEMENT_VIEW: '/get-wealth-management',
  GET_WEALTH_MANAGEMENT_LINK_UNLINK: '/link-unlink-wealth-management',


  REGISTER_LOGIN_WITH_FACE: '/register-face-recognition',
  DETECT_LIVE_FACE: '/detect-live-face',

  // get information user in SIMOBIPLUS
  FETCH_USER_SIMOBI: '/fetch-user-simobi',

  // get information INSURANCE
  GET_TRAVEL_INSURANCE: '/travel-insurance-config',
  CONFIRM_TRAVEL_INSURANCE: '/travel-insurance-confirm',
  RESULT_TRAVEL_INSURANCE: '/travel-insurance-result',
  GET_PA_INSURANCE: '/personal-accident-config',
  CONFIRM_PA_INSURANCE: '/personal-accident-confirm',
  RESULT_PA_INSURANCE: '/personal-accident-result',

  GET_PAYDAY_LOAN: '/payDayLoan-eligible',
  GET_LOAN_LIST: '/payDayLoan-card',

  // Send PaydayLoan FormError
  SEND_PAYDAYLOAN_FORM: '/payDayLoan-disburse',
  GET_DATA_PAYDAYLOAN_FORM: '/payDayLoan-dataForm',

  OPEN_ACCOUNT_CONFIG: '/online-open-account-config',
  OPEN_ACCOUNT_CONFIRMATION: '/online-open-account-confirmation',
  OPEN_ACCOUNT: '/online-open-account',
  SF_REDEEM: '/SFRedeem',
  GET_RECURRING_TRANSFER_LIST: '/fundTransferSchedule-inqury',
  EDIT_RECURRING_TRANSFER: '/fundTransferSchedule-edit',
  DELETE_RECURRING_TRANSFER: '/fundTransferSchedule-delete',

  GET_BALANCE_EMONEY: '/balance-emoney',

  // register eMoneyData
  SEND_EMAIL_REGISTER_E_MONEY: '/send-email-activation-emoney',
  CHECK_E_MONEY_REGISTER: '/check-register-emoney',

  // Emoney
  GET_EMONEY_OFFERS: '/register-emoney-kyc',

  // close emoney account
  CLOSE_EMONEY_ACCOUNT: '/close-account-emoney',

  // QR GPN
  QR_GPN_MERCHANT: '/register-merchant',
  QR_GPN_MERCHANT_V2: '/register-merchant-v2',
  QR_GPN_TRANSACTION: '/payment-GPN',
  QR_CROSSBORDER_INQUIRY: '/crossInquiryPayment',
  QR_CROSSBORDER_TRANSACTION: '/crossPaymentCredit',
  QR_MERCHANT_LIST: '/get-merchant-list',
  QR_TERMINAL_LIST: '/get-terminal-list',
  QR_TERMINAL_DELETE: '/delete-terminal',
  QR_TERMINAL_EDIT: '/edit-terminal',
  QR_TERMINAL_RESET: '/reset-password-terminal',
  QR_REFUND_CODE: '/get-all-refund-codes',
  QR_GENERATE_REFUND_CODE: '/generate-refund-code',
  QR_USERNAME_AVAILABILITY: '/check-username-availability',
  QR_USERNAME_GET_PARAM: '/get-register-parameter',
  QR_STORE_LIST: '/get-store-list',
  QR_STORE_DELETE: '/delete-store',
  QR_STORENAME_AVAILABILITY: '/check-store-availability',

  // mini statement for eMoneyData
  GET_STATEMENT_EMONEY: '/account-statement-emoney',
  GET_STATEMENT_EMONEY_DETAIL: '/statement-detail-emoney',

  // reset password new onboarding
  CHECK_EMONEY_RESET_PASSWORD: '/checking-kyc-emoney-autoRegistration',
  CHECKING_RESET_PASSWORD_EMONEY: '/check-Reset-password-KYC', // for shape
  RESET_PASSWORD_EMONEY: '/email-reset-password-autoRegistration',

  // eGift
  GET_EGIFT_CACHE: '/egift-list-cache',
  GET_EGIFT_PAGINATION: '/egift-list-pagination',
  PURCHASE_EGIFT: '/egift-purchase-agregator',
  GET_EGIFT_DETAIL: '/egift-view',

  // simas simasPoin
  INQUIRY_SIMAS_POIN: '/inquiry-simas-poin',
  GET_SIMASPOIN_HISTORY: '/account-statement-simas-poin',

  // get data order TabDetail
  GET_DATA_MYORDER: '/myOrder-voucher',

  // GET USER CPAN FOR SHOW QR
  GET_USER_CPAN: '/',

  // upgrade to kyc emoney
  UPGRADE_EMONEY_KYC: '/request-emoney-kyc',

  // check phone number
  CHECK_PHONE_NUMBER_CC: '/checkingMobileNumber-creditCard',

  // check email orami
  CHECK_EMAIL_ORAMI: '/checkAvailabilityOrami',

  // register and verify orami
  REGISTER_ORAMI: '/registerAndVerifyOrami',

  // dukcapil
  CHECK_DUKCAPIL: '/checkingDukcapil',

  GET_CC_DATA_CIF: '/getCustomerForCCI',

  REQUEST_OTP_EFORM: '/request-sms-otp-eform',
  VERIFY_OTP_EFORM: '/verifyOTPEform',

  // get location listCity
  GET_PROVINCE_LIST: '/listLocation',
  GET_CITY_LIST: '/listLocation',
  GET_DISTRICT_LIST: '/listLocation',
  GET_SUBDISTRICT_LIST: '/listLocation',

  GENERATE_PHOTO: '/generatePhoto',

  // CGV landing page
  GET_MOVIE_CGV: '/get-cacheData/getMovieList',
  GET_CINEMA_CGV: '/get-cacheData/getCinemaList',
  GET_CINEMA_SCHEDULE: '/get-schedule',
  GET_CINEMA_COMING_SOON: '/get-cacheData/getComingSoonMovieList',

  // CGV
  GET_SEAT_LAYOUT: '/get-seat-layout',
  GET_SELECTED_SEAT: '/secure-selected-seat',
  GET_PAYMENT_CINEMA: '/do-payment-cinema',

  QR_VOUCHER_DISCOUNT: '/receive_sipoin_login.php',
  QR_DISCOUNT_MERCHANT_LIST: '/receive_sipoin_merchant.php',
  QR_DISCOUNT_MERCHANT_DETAIL: '/receive_sipoin_detail_merchant.php',

  // ACTIVATION
  SEND_OTP_ACTIVATION: '/send-otp-activation-autoRegistration',
  RESEND_OTP_ACTIVATION: '/resend-otp-activation-autoRegistration',
  VERIFY_OTP_ACTIVATION: '/verify-otp-autoRegistration',
  ACTIVATION_COMMON: '/activation-autoRegistration',

  // Coupon
  GET_VOCUHERLIST: '/show-voucher-list',
  GET_VOUCHER_DETAIL: '/get-selected-voucher-detail',
  GET_VOUCHER_VALIDITY: '/check-voucher-validity-v2',
  GET_SUGGESTION_VOUCHER: '/get-suggested-voucher',

  // Delete Payee Transfer
  DELETE_PAYEE_TRANSFER: '/delete-payee',

  // ATM & BRANCH LOCATOR
  ATM_LOCATOR: '/listATMLocator',

  // billpayment transaction history
  GET_BILLPAY_HISTORY: 'get-saved-billpayment',
  DELETE_BILLPAY_HISTORY: 'delete-saved-billpayment',

  // saving account
  REGISTER_SAG: 'registerSAG',

  // FLIGHT TRAVEL
  GET_FLIGHT_RESERV: '/reservation',
  GET_FLIGHT_PAYMENT: '/IssueRsvFlight',
  // get Flight
  GET_FLIGHT_AVAILABILITY: '/get-flight-availability',
  GET_FARE_DETAIL: '/get-fare-detail',
  GET_LIST_PASSENGER: '/myPassenger/list',
  ADD_LIST_PASSENGER: '/myPassenger/addPassenger',
  COUNTRY_ISO: '/lookup/list/countryISO',

  // Profile Picture
  ADD_PICTURE: '/change-profile-picture',
  UPDATE_PICTURE: '/get-profile-picture',

  GENERATE_ONLINE_CODE: '/generate-fastCode',
  GENERATE_ONLINE_CODE_II: '/generate-fastCode2',
  GENERATE_VOUCHER_CODE: '/pushBilling/requestVoucherCode',

  INQUIRY_TOKEN_PAYMENT: '/pushBilling/requestDetailInvoice',
  TOKEN_PAYMENT_PAY: '/pushBilling/validateInvoice',
  INCOMPLETE_INVOICE: '/pushBilling/requestInvoiceList',

  // jest mock endpoint
  TEST: '/test',

  // lucky draw
  SEND_EMAIL_LUCKYDRAW: '/send-detail-lucky-draw',
  GET_DETAIL_WINNER: '/get-winner-detail-url',
  CHECK_WINNER_LUCKYDRAW: '/check-winner',

  // Genflix
  GENFLIX_GET_EMAIL: '/genflix-get-email',
  GENFLIX_EMAIL_QUERY: '/genflix-check-email',
  GENFLIX_REGISTRATION: '/genflix-registration',

  // Email Verification
  EMAIL_OTP_GENERATE: '/genflix-generate-otp',
  EMAIL_OTP_VALIDATE: '/genflix-validate-otp',

  // Favorite Transactions
  GET_FAVORITE_BILLER: '/favoriteTransaction/getTransaction',
  ADD_FAVORITE_BILLER: '/favoriteTransaction/addFavorite',
  DELETE_FAVORITE_BILLER: '/favoriteTransaction/removeFavorite',
  EDIT_FAVORITE_BILLER: '/favoriteTransaction/editFavorite',
  INQUIRY_QRGPN: '/inquiry-payment-QRGPN',

  // reksadana
  SUBSCRIPTION_REKSADANA: 'open-acc-reksadana/subscribe',
  REDEMPTION_REKSADANA: 'open-acc-reksadana/redemption',
  REKSADANA_SUMMARY_DETAIL_LAST_TRANSACTION: 'open-acc-reksadana/summary-detail-lastTransaction-portfolio',
  GET_CONVERT_AMOUNT_MEDALION: 'open-acc-reksadana/getConvertAmount',

  // RELEASE DEVICE
  GET_RELEASE_DEVICE_QR: '/get-user-device-data',
  CHECK_RELEASE_DEVICE_QR: '/check-release-qr-status',
  UPDATE_RELEASE_DEVICE_QR: '/update-release-qr-status',
  CONFIRM_RELEASE_DEVICE_QR: '/update-valid-otp-status',
  OTP_VERIFY_EFORM: '/verifyOTPEform',

  // RELEASE DEVICE v2
  GET_RELEASE_DEVICE_QR_REVAMP: '/get-qr-code',
  CHECK_RELEASE_DEVICE_QR_REVAMP: '/check-qr-code-status',
  UPDATE_RELEASE_DEVICE_QR_REVAMP: '/scan-qr-code',
  CONFIRM_RELEASE_DEVICE_QR_REVAMP: '/change-device-lockdown',

  // Generic Saving
  GET_GENERIC_SAVING_LIST: '/configDataSavingGenericDAO',

  // auto debit list
  GET_GENERIC_LOAN_LIST: '/configDataLoanGeneric',

  // auto debit list
  GET_AUTO_DEBIT_LIST: '/autoDebetListMobileController',
  DELETE_AUTO_DEBIT_LIST: '/autoDebetDeleteMobile',

  // new auto debit list
  ADD_AUTO_DEBIT: '/auto-debet-register-mobile-API',
  EDIT_AUTO_DEBIT: '/auto-debet-edit-mobile',
  GET_AUTO_DEBIT_HISTORY: '/auto-debet-history-API',
  DELETE_AUTO_DEBIT_NEW: '/auto-debet-unregister-mobile-API',

  // CREDIT CARD Management
  CREDIT_CARD_ACTIVATION: '/card-activation',
  CREDIT_CARD_UNBLOCK_BLOCK: '/card-memo-msg',
  CREDIT_CARD_CVV_INQUIRY: '/cvv2-enquiry',
  CREDIT_CARD_CREATE_PIN: '/pin-selection',
  CREDIT_CARD_PRINT_VCC: '/print-virtualcard',
  CREDIT_CARD_GET_ADDRRESS: '/getCustomerForCCI',
  CREDIT_CARD_GET_ADDRRESS_NEW: '/vcc-get-address',
  CREDIT_CARD_INST_CONFIRM: '/changeEppConfirmation',

  GET_INQUIRY_SIL: 'asj-getinvestData',


  // default account
  GET_DEFAULT_ACCOUNT: '/get-default-account',
  SET_DEFAULT_ACCOUNT: '/set-default-account',

  // Verify EasyPin
  VERIFY_EASYPIN: '/verify-easypin',

  GET_INQUIRY_MMQ: '/get-mmq',
  GET_MMQ_DETAIL: '/get-mmq-detail',
  SEND_EMFUND_SIL: '/asj-emergencyFundWithdraw',

  // GENERIC EFORM REGISTRATION
  GET_WORK_LIST: '/listLocation',

  // tracking by pass url
  SEND_TRACKING_DATA: '/sendDataDigiSign',

  GENERIC_REGISTRATION: '/genericRegistrationCC',
  GET_REGISTRATION_DATA: '/getRegistrationDataGeneric-simobi',

  // PGO
  GET_BORROW_LIST_ORDER: '/borrow/getLastBorrowByCif',

  // PGO SIGN
  GET_SIGN_OPEN_ACCOUNT: '/sign/getSignOpenAccountInfo',
  ADD_USERSIGN_OPEN: '/sign/addUserSignOpenAccountInfo',
  GET_USER_ACTIVE: '/sign/userActive',
  GET_CHECK_ACTIVE_STATUS: '/sign/checkActiveStatus',
  GET_SIGN_PAGE_LOAD_PARAMS: '/sign/signPageLoadParam',
  GET_SIGN_PAGE_LOAD: '/sign/signPageLoad',
  GET_CHECK_DOC_STATUS: '/sign/checkOrdersDocStatus',
  GET_SIGN_OR_NOT_SIGN: '/sign/queryLasterOrderNeedSignOrNot',
  RETAKE_SELFIE_DIGI_SIGN: '/sendSelfiePhoto',
  POST_CIF_CODE_WITHOUT_PICTURE: '/addUserSignOpenAccountInfo',
  SEND_ADDRESS_DATA_PGO: '/upload/addressBook',

  // tracking by pass url
  SEND_DATA_PGO: '/sendDataPGO',

  // checking CIF
  CHECKING_KYC_EMONEY: '/requestKycEmoney',

  // reksadana fee redempt
  GET_REDEMPTION_FEE: '/open-acc-reksadana/feeRedemption',

  // bypass EForm
  API_EFORM_GENERAL: '/sendDataEForm',

  // Split Bill
  SPLIT_BILL: '/send-split-bill',
  GET_LIST_SPLITBILLBYSENDER: '/get-list-split-bill-by-sender',
  GET_LIST_SPLITBILLBYRECEIVER: '/get-list-split-bill-by-receiver',
  EDIT_STATUS_SPLITBILL_YOU_BILL: '/update-status-invoice',
  REQUEST_STATUS_SPLITBILL_YOU_BILL: '/request-back-invoice',
  REJECT_STATUS_SPLITBILL_YOU_OWE: '/reject-status-invoice',
  DELETE_YOUBILL_LIST: '/delete-invoice-splitBill',
  REMINDER_STATUS_SPLITBILL_YOU_BILL: '/reminder-split-bill',
  DOWNLOAD_RECEIPT_BILL: '/download-image-splitBill',
  TRANSFER_SPLITBILL: '/fund-transfer-split-bill',
  UPDATE_INVOICE_AFTER_FT: '/update-status-after-FT',
  REMINDER_MAX_BALANCE_SPLITBILL: '/reminder-creator',

  // alur baru untuk merchant alfacart di estore manager yang baru
  API_FORM_ESTORE: '/sendDataEstoreManager',

  GET_INQUIRY_CARD_INFO: '/inquiry-card-info',
  GET_ACTIVATION_CARD: '/activation-card',

  // Net Promoter Score
  SET_FEEDBACK_DATA: '/setFeedbackData',
  GET_FEEDBACK_DATA: '/getFeedbackData',

  // get balanc emoney before login
  GET_BALANCE_EMONEY_LANDING: '/getBalanceEmoneyByTokenClientAndTokenServer',

  API_EFORM_GENERAL_NOAUTH: '/sendDataEForm',

  // set login preference
  GET_LOCKDOWN_FLAG: '/get-lockdown-flag',
  SET_LOCKDOWN_FLAG: '/set-lockdown-flag',

  // Lucky dip
  SAVE_ADDRESS_USER: '/save-user-address',
  GET_CURRENT_TOKEN: '/get-current-token',
  GET_SPIN_REWARDS: '/get-spin-rewards',
  GET_REWARD_HISTORY: '/get-reward-history',
  GET_LOCATION_ALFATREX: '/listLocationAlfatrex',
  GET_TRACKING_NUMBER: '/get-tracking-number',
  GET_CURRENT_TOKEN_NEW: '/get-current-token-new',
  GET_SPIN_REWARDS_NEW: '/get-spin-rewards-new',
  GET_INQUIRY_GIVEAWAY: '/inquiry-giveaway',

  // reset password - deeplink flow
  SEND_OTP_RESET_PASSWORD_AUTOREGIST: '/send-otp-resetPassword-autoRegistration',
  VERIFY_OTP_RESET_PASSWORD_AUTOREGIST: '/verify-otp-resetPassword-autoRegistration',
  DO_RESET_PASSWORD_AUTOREGISTRATION: '/doResetPassword-autoRegistration',

  GET_DUKCAPIL_DATA: '/getDataDukcapil',
  GET_CUSTOMER_PROFILE: '/get-customer-profile-for-upgrade',
  GET_CUSTOMER_PORTOFOLIO: '/get-customer-portfolio-for-upgrade',

  // set default account
  CHECK_ACCOUNT_LIST: '/checkAccountTypeListByMobileNumber', // for shape

  // lkd
  GENERATE_CODE: '/generateCode/generate-lowCode',
  CHECK_STATUS_INVOICE: 'generateCode/check-status-invoice',

  LOCATION_UPGRADE_KYC: '/listLocationForUpgradeKyc',
  GET_TARGET_ACCOUNT: '/get-target-account',

  // merchant
  CREATE_JWT: '/create-jwt',
  PAYMENT_ESTORE: '/payment-estore',
  PAYMENT_ESTORE_NEW: '/payment-estores',

  // GET_TARGET_ACCOUNT: '/get-target-account',
  LOGIN_NEW: '/login-new', // for shape

  // checkout alfacart from cart (ini nanti tidak dipake untuk estore yang baru)

  CHECKOUT_ALFA_CART: '/purchaseOrder/checkout-from-cart',

  REFRESH_STORAGE_NEW: '/refresh-storage-new',

  UPDATE_ADDRESSES: '/update-addresses',

  SAVE_ADDRESS_ALFA: '/myAddresses/save-addresses',

  ALFA_CHECK_STOCK_CHEKCOUT: '/purchaseOrder/check-stock',

  UPDATE_ADDRESS_ALFA: '/myAddresses/update-addresses',

  SET_DEFAULT_ADDRESS_ALFA: '/myAddresses/set-as-default-addresses',

  DELETE_ADDRESS_ALFA: '/myAddresses/delete-addresses',

  SEARCH_ALFA_STORE_NAME: '/myAddresses/searchAdressList',

  LIST_STORE_ALFAMART: '/listStoreAlfamart',

  // list alfmart
  GET_LOCATION_ALFAMART: '/listLocationVillageIdAlfamart',
  // REFRESH_STORAGE_NEW: '/refresh-storage-new',

  // new upgrade kyc
  CHECK_SELFIE_IMAGE: '/checkSelfieImage',
  UPGRADE_KYC_NEW: '/upgradeKYCNew',
  SEND_EMAIL_TOKEN: '/sendEmailToken',
  VALIDATE_EMAIL_TOKEN: '/validateTokenVerif',

  // QR CPM
  GET_QR_CPAN: '/get-customer-pan',
  GENERATE_CODE_CPM: '/generateCode/generate-code',

  SIMAS_TARA_DETAIL: '/getSimasTaraDetail',
  SIMAS_TARA_CLOSE: '/simasTaraClose',
  GET_RATE_SIMAS_TARA: '/checkInterestRate',
  DETAIL_LOCKED_AMOUNT: '/detail-lock-dana',
  GET_USER_DETAIL_NB: '/asj-getUserDetailForNB',
  GET_PRODUCT_LIST_ID: '/asj-getProductList?lang=id',
  GET_PRODUCT_LIST_EN: '/asj-getProductList?lang=en',
  GET_PRODUCT_LIST: '/asj-getProductList',
  GET_DROP_LIST_ID: '/asj-getDdl?lang=id',
  GET_DROP_LIST_EN: '/asj-getDdl?lang=en',
  GET_CITY_LIST_SIL: '/asj-getCityList',
  GET_PROFILE_QUESTION: '/asj-getProfileQuestion',
  NB_PERTANGGUNGAN: '/asj-nbPertanggungan',
  GET_HEALTH_QUESTION: '/asj-getHealthQuestioner',
  GET_POLIS_INDIVIDU: '/asj-nbinputPolisIndividu',
  GET_NO_ESPAJ: '/asj-nbinputPolisIndividu',
  DIGITAL_SIGNING: '/asj-getConfigESigning',
  CONFIRM_TRANSACTION_INDIVIDU: '/asj-confirmTransactionIndividu',
  GET_EGIFT_MOST: '/egift-most',

  // unlink merchant push invoice
  GET_PARTNER_LIST: '/pushBilling/getPartnerList',
  UNLINK_PARTNER: '/pushBilling/unlinkPartner',

  // PUSH WOOSH INBOC
  GET_PUSH_NOTIF: '/getPushNotif',

  // Valas
  GET_LIST_VALAS: '/get-currency',

  // QR TTS Transaction
  VALIDATE_CODE: '/validate-code',
  GENERATE_CODE_QRTCICO: 'generateCode/generate-code-qr-transfer',
  INQUIRY_QRCASHOUT: '/inquiry-QRcashOut',
  PAYMENT_QRCASHOUT: '/transactionQRCashOut',
  CONFIRM_TRANSFER_QR: '/confirm-transfer-qris',
  TRANSFER_QR: '/transfer-qris',

  // set limit transaction
  LIST_LIMIT_TRANSACTION: '/list-limit-transaction',
  EDIT_LIMIT_TRANSACTION: '/edit-limit-transaction',
  ADD_LIMIT_TRANSACTION: '/add-limit-transaction',
  DELETE_LIMIT_TRANSACTION: '/delete-limit-transaction',
  GET_CACHE_DATA: '/config-version',

  GET_CUSTOMER_DETAIL_ADD_ATM: '/get-customer-detail',
  CHECK_BALANCE_ADD_ATM: '/get-balance-atmcard',
  GET_LINKING_CARD: '/linking-card',

  // Star Investama
  GET_INQ_STAR_INVESTAMA: 'getPolicyDetailInfo',
  SECURITY_AUTHENTICATE: 'securityauthenticate',

  // Remittance
  CHECK_REMITTANCE_OPERATION_TIME: '/check-remmitance-operation-hour',
  VALIDATE_SWIFT_CODE: '/validate-swift-code',
  CURRENCY_PURPOSE: '/currency-and-purpose-remmitance',
  DETAIL_SENDER_REMITTANCE: '/detail-sender-remmitance',
  EXCHANGE_CURRENCY: '/exchange-currency',
  // ACCOUNT_LIST_REMITTANCE: '/account-list-remmitance',
  HISTORY_REMITTANCE: '/history-remmitance',
  CONFIRMATION_REMITTANCE: '/confirm-remmitance',
  TRANSFER_REMITTANCE: '/remmitance',
  DELETE_PAYEE_REMITTANCE: '/delete-history-remmitance',


  // NB SIL Multi
  GET_CURRENCY_MULTI: 'get-currency',

  // Generic Credit Card
  GET_GENERIC_CREDIT_CARD_LIST: '/configDataCreditCardGeneric',

  // Digital Account Opening
  DIGITAL_EFORM: '/sendDataProxy',

  // sendDataProxy -> opening account
  SEND_DATA_PROXY: '/sendDataProxy',

  // Etax Payment
  TAX_USER_DETAIL: '/tax-userDetail',
  CREATE_ID_BILLING: '/tax-createBilling',
  GET_JENIS_SETORAN: '/tax-depositType',
  TAX_BILLING_DETAIL: '/tax-getBillingDetail',
  SAVE_IMAGE_ETAX: '/tax-saveImage',
  GET_IMAGE_ETAX: 'tax-getImage',
  GET_ETAX_HISTORY: '/tax-history',
  GET_TAX_INFORMATION: '/tax-information',
  
  GET_KEY_VCC: '/get-key',

  GET_DOWNLOAD_STATEMENT: '/download-billing-statement-creditcard',
  GET_DOWNLOAD_STATEMENT2: '/download-billing-statement-creditcard-post',



  // open saving simas valas
  GET_CONFIG_DATA_SAVING_VALAS: '/configDataSavingValas',
  GET_CONVERT_AMOUNT_SAVING_VALAS: '/convertAmountSavingValas',

  // Internet Banking
  SET_ALLOW_IB: '/set-allow-ib',
  GET_ALLOW_IB: '/get-allow-ib',

  // autosave
  AUTO_SAVE: '/autoSave',

  // MGM
  GET_REFERRAL_CODE: 'share-referral-code',
  GET_REFERRAL_LIST: 'search-reward-tracker',
  GET_HISTORY_REWARD: 'reward-statement',
  GET_DETAIL_HISTORY_REWARD: 'reward-detail-statement',
  GET_REWARD_BALANCE: 'get-reward-balance',
  GET_REEDEM_POIN_MGM: 'redeem-poin-mgm',

  // search-metadata
  SEARCH_METADATA: 'search-metadata',

  // Check User Reset Password
  RESET_PASS_WITHOUT_CARD: '/resetPassword-withoutCard',

  // PD
  CHECK_IMAGE: '/checkImage',

  COMMIT_PENGKINIAN: '/commitPengkinianData',

  SPREAD_MARGIN_VALAS_REFRESH_RATE_VALAS: 'refresh-rate-valas',
  SPREAD_MARGIN_VALAS_REFRESH_RATE_REMITTANCE: 'refresh-rate-remmitance',
  
  API_EFORM_GENERAL_NEW: '/sendDataEFormNew',

  // BI FAST
  INQUIRY_PROXY_BY_EDW: '/proxy/inquiryProxyByEDW',
  PROXY_REGISTER: '/proxy/register',
  PROXY_PORTING: 'proxy/porting',
  DETAIL_BY_CUST_NO: '/proxy/getDetailByCustNo',
  PROXY_RESOLUTION: '/proxy/resolution',
  GET_RESOLUTION_CT: 'proxy/getResolutionCT',
  GET_CONFIRMATION_CT: 'proxy/getConfirmationCT',
  PROXY_UPDATE: '/proxy/update',
  PROXY_UNLINK: '/proxy/deregister',
  SUBMIT_PROXY_TF: '/proxy/submit',
  HISTORY_PROXY_ADDRESS: '/proxy/history-bifast',
  SEND_EMAIL_TOKEN_PROXY: '/proxy/sendEmailToken',
  CONFIRMATION_TRANSFER_BIFAST: '/proxy/confirm-transfer',
  TRANSFER_BIFAST: '/proxy/transfer',
  GET_PAYEE_NAME_BIFAST: '/payee-name-bifast',
  DELETE_PAYEE_BIFAST: '/delete-payee-bifast',

  // redeem voucher
  REDEEM_VOUCHER: '/redeem-voucher-simaspoin',
  DELETE_VOUCHER: '/archive-voucher-simaspoin',

  // loan - credit line
  GET_LOAN_ACCOUNTS: 'get-account-by-cif-cl',

  // get approval PPA
  GET_APPROVAL_PPA: '/pdf-ppa-get',

  // Sil Riplay
  GET_RIPLAY_PDF_UMUM: '/asj-getRipleyPDFUmum',
  GET_RIPLAY_PDF_PERSONAL: '/asj-getRipleyPDFPersonal',
  GET_RIPLAY_PERSONAL: '/asj-getRipleyPersonal',

  // List Config Dropdown EForm
  LIST_CONFIG_EFORM: '/listConfig-EForm',

  // Bank List
  GET_BANK_LIST: '/bank-list',

  // emoney config
  EMONEY_CONFIG: '/emoney-config',

  APICONFIG_ANDROID: '/app-config-android',
  CHARGE_CONFIG: '/charge-config',
  RELEASE_DORMANT_ACCOUNT: '/release-dormant-account',

  // closing account
  GET_CLOSING_DETAIL: '/getClosingDetail',
  COMMIT_CLOSING_ACCOUNT: '/commitClosingAccount',
  GET_CLOSING_CONFIG: '/initCloseAccountConfig',
  
  // NilaiQ
  GET_NILAI_Q: '/send-request-nilaiq',
};

export const mockResponses = env.fixtures || {};
