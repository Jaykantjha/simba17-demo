export const FLAG = {
    AGENT_DETAIL: 'AgentDetails',
    BRANCH_DETAIL: 'BranchDetails'
}

export const STATIC_DATA = [
    { key: 'superhealth', productCode: 'SUHE001', pincodeRequired: true, title: 'Super Health Insurance', logo: 'retail-health-10', heroImg: 'assets/images/SuperHealth/hero.png' },
    { key: 'arogya', productCode: 'OPDH001', pincodeRequired: false, title: 'Arogya Plus Health Insurance', logo: 'arogyaplustitle', heroImg: 'assets/images/family.svg' },
    { key: 'supreme', productCode: 'SURE001', pincodeRequired: true, title: 'Arogya Supreme Health Insurance', logo: 'arogyaplustitle', heroImg: 'assets/images/family.svg' },
    { key: 'IPA', productCode: 'PACC001', pincodeRequired: true, title: 'Individual Personal Accident Insurance', logo: 'arogyaplustitle', heroImg: 'assets/images/family.svg' },
    { key: 'Cyber', productCode: 'CVE001', pincodeRequired: true, title: 'Cyber VaultEdge', logo: 'arogyaplustitle', heroImg: 'assets/images/family.svg' }
]

export const CKYC_DETAILS_DATA = [
    { key: 'superhealth', productCode: 'SUHE001' },
    { key: 'arogya', productCode: 'OPDH001' },
    { key: 'supreme', productCode: 'SURE001'},
    { key: 'IPA', productCode: 'PACC001',},
    { key: 'Cyber', productCode: 'CVE001',}
]

export const CKYC_OPTIONS=[
    {key:'IsPanCheck',title:"Pancard Number",pattern:"[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}",length:10,type:["Indivual","Corporate User"],inputIdType:"C",validation: [
        { type: 'required', message: 'Please Enter PAN Number' },
        { type: 'pattern', message: 'Please Enter Proper PAN Number' },
        { type: 'maxlength', message: "Maximun 10 Digits" },
        { type: 'minlength', message: "Minimun 10 Digits" }
 
      ],},
    {key:'IsAadharCheck',title:"Enter Last 4 digit of Aadhar No.",pattern:"[0-9]{4}",length:4,inputIdType:"E",type:["Indivual"],validation: [
        { type: 'required', message: 'Please Enter Last 4 digit of Aadhar Number' },
        { type: 'pattern', message: 'Please Enter Last 4 digit of Aadhar Number' },
        { type: 'maxlength', message: "Maximun 4 Digits" },
        { type: 'minlength', message: "Minimun 4 Digits" }
 
      ],},
    {key:'IsCkycIdCheck',title:"CKYC ID",pattern:"[0-9]{14}",length:14,inputIdType:"Z",type:["Indivual","Corporate User"],validation: [
        { type: 'required', message: 'Please Enter CKYC ID' },
        { type: 'pattern', message: 'Please Enter Proper CKYC ID' },
        { type: 'maxlength', message: "Maximun 14 Digits" },
        { type: 'minlength', message: "Minimun 14 Digits" }
 
      ]},
    {key:'IsCRNCheck',length:21,title:"CIN / CRN",inputIdType:"02",pattern:'[LUu]{1}[0-9]{5}[A-Za-z]{2}[0-9]{4}[A-Za-z]{3}[0-9]{6}',type:["Corporate User"],
    validation: [
      { type: 'required', message: 'Please Enter CIN / CRN ID' },
      { type: 'pattern', message: 'Please Enter Proper CIN / CRN ID' },
      { type: 'maxlength', message: "Maximun 16 Digits" },
      { type: 'minlength', message: "Minimun 16 Digits" }
 
    ]},    
 
]