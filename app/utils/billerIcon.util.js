export const billerIconGenerator = (billerCode, isVerified) => {
  switch (billerCode) {
  case '0':
    return [
      {
        iconName: 'Water_01',
        iconStyle: {color: '#0787e3'},
        iconSize: 40
      },
      {
        iconName: 'Water_02',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'Water_03',
        iconStyle: {color: '#949494'},
        iconSize: 40
      }
    ];
  case '1':
    return [
      {
        iconName: 'Electric_01',
        iconStyle: {color: '#c7c7c7'},
        iconSize: 40
      },
      {
        iconName: 'Electric_02',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'Electric_03',
        iconStyle: {color: '#949494'},
        iconSize: 40
      },
      {
        iconName: 'Electric_04',
        iconStyle: {color: '#e40717'},
        iconSize: 40
      },
      {
        iconName: 'Electric_05',
        iconStyle: {color: '#f39c1d'},
        iconSize: 40
      }
    ];
  case '2':
    return [
      {
        iconName: 'Postpaid_1',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'Postpaid_2',
        iconStyle: {color: '#949494'},
        iconSize: 40
      },
      {
        iconName: 'Postpaid_3',
        iconStyle: {color: '#E30717'},
        iconSize: 40
      },
      {
        iconName: 'Postpaid_4',
        iconStyle: {color: '#F0CC3D'},
        iconSize: 40
      },
      {
        iconName: 'Postpaid_5',
        iconStyle: {color: '#F39C1D'},
        iconSize: 40
      }
    ];
  case '3':
    return [
      {
        iconName: 'Creditcard_01',
        iconStyle: isVerified ? {color: '#c7c7c7'} : {color: 'rgba(199, 199, 199, 0.5)'},
        iconSize: 40
      },
      {
        iconName: 'Creditcard_02',
        iconStyle: isVerified ? {color: '#f0cc3d'} : {color: 'rgba(240, 204, 61,0.5)'},
        iconSize: 40
      },
      {
        iconName: 'Creditcard_03',
        iconStyle: isVerified ? {color: '#f39c1d'} : {color: 'rgba(243, 156, 29, 0.5)'},
        iconSize: 40
      },
      {
        iconName: 'Creditcard_04',
        iconStyle: isVerified ? {color: '#e40717'} : {color: 'rgba(228, 7, 22, 0.5)'},
        iconSize: 40
      }
    ];
  case '4':
    return [
      {
        iconName: 'Prepaid_01',
        iconStyle: {color: '#e40717'},
        iconSize: 40
      },
      {
        iconName: 'Prepaid_02',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'Prepaid_03',
        iconStyle: {color: '#949494'},
        iconSize: 40
      }
    ];
  case '5':
    return [
      {
        iconName: 'ICON-SCAN',
        iconStyle: {alignSelf: 'center', marginTop: 8},
        iconSize: 25
      },
    ];
  case '6':
    return [
      {
        iconName: 'gopay_01',
        iconStyle: {color: '#e40717'},
        iconSize: 40
      },
      {
        iconName: 'gopay_02',
        iconStyle: {color: '#666666'},
        iconSize: 40
      },
      {
        iconName: 'gopay_03',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'gopay_04',
        iconStyle: {color: '#8cb709'},
        iconSize: 40
      }
    ];
  case '7':
    return [
      {
        iconName: 'Ovo',
        iconStyle: {color: '#4d2A86'},
        iconSize: 40
      },
    ];
  case '8':
    return [
      {
        iconName: 'Tokopedia_03',
        iconStyle: {color: '#60bb55'},
        iconSize: 40
      },
      {
        iconName: 'Tokopedia_04',
        iconStyle: {color: '#333333'},
        iconSize: 40
      },
      {
        iconName: 'Tokopedia_05',
        iconStyle: {color: '#4F9D4D'},
        iconSize: 40
      },
      {
        iconName: 'Tokopedia_01',
        iconStyle: {color: '#ffd400'},
        iconSize: 40
      },
      {
        iconName: 'Tokopedia_02',
        iconStyle: {color: '#DCB300'},
        iconSize: 40
      },
    ];
  case '9':
    return [
      {
        iconName: 'SmartfrenDP_01',
        iconStyle: {color: '#949393'},
        iconSize: 40
      },
      {
        iconName: 'SmartfrenDP_02',
        iconStyle: {color: '#060707'},
        iconSize: 40
      },
      {
        iconName: 'SmartfrenDP_03',
        iconStyle: {color: '#B3B3B3'},
        iconSize: 40
      },
      {
        iconName: 'SmartfrenDP_04',
        iconStyle: {color: '#FFFFFF'},
        iconSize: 40
      },
      {
        iconName: 'SmartfrenDP_05',
        iconStyle: {color: '#EC1D24'},
        iconSize: 40
      }
    ];
  case '10':
    return [
      {
        iconName: 'BuddhaTzuChi',
        iconStyle: {color: '#4a9e46', marginTop: 10},
        iconSize: 22
      }
    ];
  case '11':
    return [
      {
        iconName: 'link-aja-icon',
        iconStyle: {color: '#ED1D25', marginTop: 10, alignSelf: 'center'},
        iconSize: 25
      }
    ];
  case '99':
    return [
      {
        iconName: 'Other',
        iconStyle: {color: '#e40717'},
        iconSize: 40
      },
    ];

  default:
    // console.log('error');
  }
};
