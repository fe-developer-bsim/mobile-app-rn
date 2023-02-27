import {MODULE_CONFIG_POPULATE_DATA, MODULE_CONFIG_CLEAR} from '../actions/index.actions';

const defaultState = {
  eForm: 
  [{
    code: 'CCI',
    mode: 'SIMOBI',
    version: '1',
    stages: [
      {
        code: 'stage0',
        pages: [
          {
            header: 'CREDITCARD_TITLE2',
            code: '0~4',
            fields: [
              {
                code: '0~4~1',
                component: 'SinarmasInput', // -> import * as components from 'FormComponents', components[component],
                label: 'EMONEY__COUNTRY', // -> or  'KTP Number (NIK)' -> this means language settings is from BE
                placeholder: 'HINTTEXT__COUNTRY', // -> or 'Enter your NIK' -> this means language settings is from BE
                value: 'Indonesia',
                disabled: true,   
              },
              {
                code: '0~4~2',
                component: 'SinarmasPicker',
                placeholder: 'EMONEY__PROVINCE',
                itemList: 'provinceList',
                labelKey: 'name',
                typeField: 'province',
                onValChange: 'getCityList',
              },
              {
                code: '0~4~3',
                component: 'SinarmasPicker',
                labelKey: 'name',
                placeholder: 'EMONEY__CITY',
                typeField: 'city',
                itemList: 'cityList',
                onValChange: 'getDistrictList',
              },
              {
                code: '0~4~4',
                component: 'SinarmasPicker',
                labelKey: 'name',
                placeholder: 'EMONEY__DISTRICT',
                typeField: 'district',
                itemList: 'districtList',
                onValChange: 'getSubDistrictList',
              },
              {
                code: '0~4~5',
                component: 'SinarmasPicker',
                labelKey: 'name',
                label: 'EMONEY__SUB_DISTRICT',
                placeholder: 'EMONEY__SUB_DISTRICT',
                typeField: 'subdistrict',
                itemList: 'subDistrictList',               
              },
              {
                code: '0~4~6',
                component: 'SinarmasInput', 
                label: 'EMONEY__POSTAL_CODE', 
                placeholder: 'EMONEY__POSTAL_CODE',
                typeField: 'postal', 
                maxLength: 5,
                keyboardType: 'numeric',
                dependentOn: '0~4~5',
                dependentOnKeyword: 'zipCode',    
                dependentOnFunction: 'set',            
              },
              {
                code: '0~4~7',
                component: 'SinarmasInput', 
                label: 'EMONEY__RT', 
                placeholder: 'EMONEY__RT',
                typeField: 'rt', 
                maxLength: 7,
                keyboardType: 'numeric',               
              },
              {
                code: '0~4~8',
                component: 'SinarmasInput', 
                label: 'CREDITCARD__STREET_ADDRESS', 
                placeholder: 'HINTTEXT__STREET_ADDRESS',
                typeField: 'streetAddress', 
                maxLength: 80,
              }
            ]
          },
          {
            'code': '6~1',
            'header': 'CAMERA__OPEN_ACCOUNT_KTP_TITLE',
            'footer': 'CAMERA__OPEN_ACCOUNT_KTP_INFO',
            'type': 'camera',
            'fields': [
              {
                'code': '6~1~1',
                'component': 'camera'
              }
            ]
          },
        ]
      }] 
  }]
};

// const defaultState = {
//   eForm: 
//   [{
//     code: 'CCI',
//     mode: 'SIMOBI',
//     version: '1',
//     stages: [
//       {
//         code: 'stage0',
//         pages: [
//           {
//             code: '0~5',
//             // style: 'test',
//             type: 'camera',
//             footer: 'CAMERA__OPEN_ACCOUNT_KTP_INFO',
//             header: 'CAMERA__OPEN_ACCOUNT_KTP_TITLE',
//             fields: [
//               {
//                 code: '0~1~1',
//                 component: 'camera',
//               }
//             ]
//             // fields: [
//             //   {
//             //     code: '0~5~1',
//             //     // component: 'KTPCamera',
//             //     // placeholder: 'HINT__WORK',
//             //     // labelKey: 'name',
//             //     // itemList: 'listWorker',
//             //   }
//             // ]
//           }
//         ]
//       }] 
//   }]
// };

export default function moduleConfigReducer (state = defaultState, action) {
  switch (action.type) {
  case MODULE_CONFIG_POPULATE_DATA:
  {
    return {...state, ...action.payload};
  }
  case MODULE_CONFIG_CLEAR:
  {
    return {};
  }
  default:
  {
    return state;
  }
  }
}
