import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FLAG, STATIC_DATA } from './constant';
import { Urls } from '../../../shared/enums/url.enum';
import * as uuid from 'uuid';
import { UtilityService } from '../../../shared/utility-service.service';
import { CommonService } from '../../../shared/common.service';
import { CommonModule } from '@angular/common';
import { SvgComponent } from '../../../shared/svg/svg.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-started',
  standalone: true,
  imports: [CommonModule, SvgComponent, HeaderComponent, NavbarComponent],
  templateUrl: './started.component.pug',
  styleUrl: './started.component.scss'
})

export class StartedComponent implements OnInit {
  isDialogVisible: boolean = false;
  dialogMessage: string;
  zoneBlocked: boolean = false;
  zoneErr: boolean = false;
  isLoading: boolean[];
  startedForm!: FormGroup;
  agentList: any[];
  agreementCodeList: any[];
  branchList: any[];
  isNewCustomer: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private commonService: CommonService
  ) {
    this.isLoading = [];
    this.agentList = [];
    this.branchList =[];
    this.agreementCodeList = [];
    this.agreementCodeList = [];
    this.dialogMessage = '';
    this.isNewCustomer = false;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadAgent();
    const decryptedTeamplate = this.utilityService.sessionData('loggedINUserTemplate');
    const decryptedFormData = this.utilityService.sessionData('supGetStarted');
    const userTemplate = decryptedTeamplate ? JSON.parse(decryptedTeamplate) : {};
    const CustoType = userTemplate?.templateDetails?.customerType;
    this.isNewCustomer = CustoType.some((el: { description: string; }) => el.description == "New-AP");
    const pageRecord = decryptedFormData ? JSON.parse(decryptedFormData) : {};
    if(Object.values(pageRecord).length) {
      this.onChange({value: pageRecord.agentName}, 'agentName', true);
      this.onChange({value: pageRecord.agreementCode}, 'agreementCode', true);
      setTimeout(() => {
        this.startedForm.patchValue({...pageRecord});
      }, 2000)
    }
  }

  get pageData() {
    console.log(STATIC_DATA, 'STATIC_DATA-->');
    return STATIC_DATA.find(({key}) => this.router.url.includes(key));
  }

  createForm(): void {
    this.startedForm = this.formBuilder.group({
      agentName: ['', Validators.required],
      agreementCode: ['', Validators.required],
      branchName: ['', Validators.required],
      pinCode: [''],
      customerCategory: ['', [Validators.required]],
      zoneName: [''],
      zoneCode: ['']
    });
  
    if (this.pageData?.pincodeRequired) {
      this.startedForm.controls['pinCode'].setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    }
  
    this.startedForm.controls['pinCode'].updateValueAndValidity();
  }
  
  onFormSubmit(): void {
    if (this.startedForm.invalid) {
      return;
    }
    this.utilityService.sessionEncryption('CKYCUniqueId', uuid.v4());
    this.utilityService.sessionEncryption('supGetStarted', JSON.stringify(this.startedForm.value));
    const key = this.pageData?.key;
    this.router.navigate([`/health/${key}/cover`]);
  }
  
  onChange({ value }: { value: any; }, key: string, preload: boolean | undefined): void {
    if (key === 'agentName') {
      const { agentName ,agentID} = value;
      this.loadAgreementCode(agentName,agentID);
      this.utilityService.sessionEncryption('supAgentId',agentID)
    } else if (key === 'agreementCode') {
      const { code, branchName } = value;
      this.loadBranch(code, branchName, preload);
    }
  }  

  handlePinCodeChange(event: { target: { value: any; }; }): void {
    this.zoneErr = false;
    this.zoneBlocked = false;
  
    const { value } = event.target;
  
    if (value.length !== 6) {
      this.startedForm.patchValue({
        zoneName: ''
      });
      return;
    }
  
    const decryptedTeamplate = this.utilityService.sessionData('loggedINUserTemplate');
    const { templateDetails: { blockedPincodes } } = decryptedTeamplate ? JSON.parse(decryptedTeamplate) : {templateDetails: {blockedPincodes: []}};
  
    if (blockedPincodes.includes(value)) {
      this.zoneBlocked = true;
      return;
    }
  
    this.isLoading.push(true);
  
    const req = { Pincode: this.startedForm.get('pinCode')?.value };
  
    this.commonService.getDetailByUrl(Urls.Pincode, JSON.stringify(req))
      .subscribe(
        (res: { data: { zone: any; }; }) => {
          this.isLoading.pop();
  
          if (res?.data?.zone) {
            this.startedForm.patchValue({
              zoneName: res.data.zone,
              zoneCode: res
            });
  
            this.utilityService.sessionEncryption('supPincode', JSON.stringify(res.data));
            this.startedForm.updateValueAndValidity();
            return;
          }
  
          this.zoneErr = true;
        },
        () => {
          this.isLoading.pop();
        }
      );
  }  

  setCustomerCategory(id: string) {
    this.startedForm.patchValue({ customerCategory: id });
  }

  canBeDisableField(key: string) {
    if(key === 'agent') {
      return this.agentList.length === 1;
    }
    if(key === 'agreementCode') {
      return this.agreementCodeList.length === 1 || this.startedForm.value.agentName === '';
    }
    if(key === 'branch') {
      return (this.branchList?.length === 1 && this.startedForm.value.agreementCode  ) || this.startedForm.value.agentName === '' || this.startedForm.value.agreementCode === '';
    }
    return true;
  }

  addValueForLengthOne(): void {
    if (!this.startedForm.value.agentName) {
      return;
    }
  
    if (this.agreementCodeList.length === 1) {
      this.startedForm.patchValue({
        agreementCode: this.agreementCodeList[0]
      });
  
      if (this.startedForm.value.agreementCode) {
        this.startedForm.patchValue({
          branchName: this.branchList.length === 1 ? this.branchList[0] : ''
        });
      }
    } else {
      this.startedForm.patchValue({
        branchName: ''
      });
    }
  }  

  loadAgent(): void {
    this.branchList = [];
    this.agreementCodeList = [];
    this.isLoading.push(true);
    const ID = this.utilityService.sessionData('userid');
    const Flag = FLAG.AGENT_DETAIL;
    const userToken = localStorage.getItem('userToken');
    const decryptedDIPRecord = this.utilityService.sessionData('DIPdata');
    const DIPData = decryptedDIPRecord ? JSON.parse(decryptedDIPRecord) : {};
    const request = { ID, Flag, UserType: DIPData.dipUserType };
  
    this.commonService.getDetailByUrl(Urls.Agents, JSON.stringify(request))
      .subscribe(
        ({ data }: {data: any}) => {
          this.isLoading.pop();
          
          if (!data) {
            this.handleDialog('Agent not available for Logged-In User. Please contact Admin to proceed further.');
            return;
          }
  
          this.agentList = data.filter((el: { agentName: null; }) => el.agentName != null);
          this.addValueForLengthOne();
  
          if (this.agentList.length === 1) {
            this.startedForm.patchValue({
              agentName: this.agentList[0]
            });
            this.onChange({ value: this.agentList[0] }, 'agentName', false);
          }
        },
        () => {
          this.isLoading.pop();
        }
      );
  }  

  loadAgreementCode(AgentName: string, agentID:string): void {
    this.branchList = [];
    this.agreementCodeList = [];
    this.startedForm.patchValue({
      branchName: '',
      agreementCode: ''
    });
  
    if (!AgentName) {
      return;
    }
  
    const ID = this.utilityService.sessionData('userid');
    const Flag = FLAG.AGENT_DETAIL;
    const userToken = localStorage.getItem('userToken');
    AgentName=agentID
    //AgentName="46618"
    const decryptedDIPRecord = this.utilityService.sessionData('DIPdata');
    const DIPData = decryptedDIPRecord ? JSON.parse(decryptedDIPRecord) : {};
    const request = { ID, Flag, AgentName, UserType: DIPData.dipUserType };
  
    this.isLoading.push(true);
  
    this.commonService.getDetailByUrl(Urls.Agreements, JSON.stringify(request))
      .subscribe(
        ({ data }: {data: any}) => {
          this.isLoading.pop();
          this.agreementCodeList = data.flatMap((val: { agreement_Code: any; }) => val.agreement_Code).map((value: { code: any; branchName: any; }) => ({
            code: value?.code,
            agreementName: `${value.code} - ${value.branchName}`,
            branchName: value.branchName
          }));
  
          this.addValueForLengthOne();
  
          if (this.agreementCodeList.length === 1) {
            this.startedForm.patchValue({
              agreementCode: this.agreementCodeList[0]
            });
            this.onChange({ value: this.agreementCodeList[0] }, 'agreementCode', false);
          }
        },
        () => {
          this.isLoading.pop();
        }
      );
  }
  
  async loadBranch(agreementCode: string, branchName: string, preload = false) {
    if (!agreementCode || !branchName) {
      this.startedForm.patchValue({
        branchName: '',
        agreementCode: ''
      });
      return;
    }
  
    try {
      this.isLoading.push(true);
      this.branchList = [];
      const productFlag = this.pageData?.productCode;
      const decryptedFormData = this.utilityService.sessionData('supGetStarted');
      const pageRecord = decryptedFormData ? JSON.parse(decryptedFormData) : {};
  
      const AgreementCode = preload ? pageRecord?.agreementCode?.code : this.startedForm.value.agreementCode.code;
      const decryptedDIPRecord = this.utilityService.sessionData('DIPdata');
      const DIPData = decryptedDIPRecord ? JSON.parse(decryptedDIPRecord) : {};
      const productDetailPayload = { ID: AgreementCode, Flag: productFlag, UserType: DIPData.dipUserType };
      const { data } = await this.commonService.getDetailByUrl(Urls.ProductDetail, JSON.stringify(productDetailPayload)).toPromise();
      if (!data || (data && data?.length > 0 && data[0]?.agreement_Code === null)) {
        this.handleDialog('Agreement Code not available for selected Agent. Please contact Admin to proceed further.');
        this.isLoading.pop();
        return;
      }
  
      const Flag = FLAG.BRANCH_DETAIL;
      const userToken = localStorage.getItem('userToken');
      const ID = preload ? pageRecord?.agentName?.agentID : this.startedForm.value.agentName.agentID;
  
      if (!ID) {
        return;
      }
  
      const request = { ID, Flag, AgentCode: agreementCode, UserType: DIPData.dipUserType };
      const response = await this.commonService.getDetailByUrl(Urls.Branch, JSON.stringify(request)).toPromise();
  
      this.isLoading.pop();
  
      if (!response?.data) {
        this.handleDialog('Branch not available for selected Agent. Please contact Admin to proceed further.');
        return;
      }
  
      this.branchList = response.data[0].agreement_Code;
  
      if (this.branchList.length === 1) {
        const branchNameValue = this.branchList.find(({ branchName: name }) => branchName === name);
        this.startedForm.patchValue({
          branchName: branchNameValue
        });
      }
    } catch (error) {
      this.isLoading.pop();
    }
  }
  
  private handleDialog(message: string): void {
    this.isDialogVisible = true;
    this.dialogMessage = message;
  }
  
}
