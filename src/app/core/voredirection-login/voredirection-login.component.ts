import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../shared/utility-service.service';
import { UserService } from '../../shared/user.service';
import { PRODUCTS } from '../../shared/constant/product.constant';
import { MasterService } from '../../shared/master.service';
const REDIRECTS = [
  { Page: "Raise New Endorsements", URL: "/endorsement/raise", template: true },
  { Page: "Endorsement Search", URL: "/endorsement/search", template: true },
  { Page: "MotorClaim", URL: "/claim/claim-status", template: true },
  { Page: "Support", URL: "/support/ticket-history", template: true },
  { Page: "TicketWithoutLogin", URL: "/support/new-ticket-wo-login", template: false },
  { Page: "GlobalSearch", URL: "/search/search-form", template: true },
  { Page: "DocumentPending", URL: "/dashboard/document-pending", template: true },
  { Page: "PaymentPending", URL: "/dashboard/payment-pending", template: true },
  { Page: "myQuote", URL: "/dashboard/my-quotes", template: true },
  { Page: "OpsLogin", URL: "/OPs/endorsement", template: true }
];

@Component({
  selector: 'app-voredirection-login',
  standalone: true,
  imports: [],
  providers: [UserService],
  templateUrl: './voredirection-login.component.html',
  styleUrl: './voredirection-login.component.scss'
})
export class VORedirectionLoginComponent implements OnInit {
  templateID: string;
  userID: string;

  constructor(private route: ActivatedRoute, private utilityService: UtilityService, private userService: UserService, private router: Router, private masterService: MasterService) {
    this.templateID = '';
    this.userID = '';
  }
  ngOnInit(): void {
    this.handleLogin();
  }

  handleLogin() {
    try {
      const { queryParams } = this.route.snapshot as any;
      const queryParam = JSON.parse(queryParams.q).replaceAll(" ", "+");
      const decryptedToken = this.utilityService.decryptString(queryParam);
      let decryptedRecord: any;
      const { data: [{ CheckSum, UserID, Date, Source, Page, quotationId, ProductCode, DIPUserId, LoginUserId, Mobile, UserType }] } = decryptedRecord = JSON.parse(JSON.parse(decryptedToken));
      const stringForCheckSum = `${UserID}|${Date}|${Source}|${Page}|${quotationId}|${ProductCode}`;
      const generatedHash = this.utilityService.generateHash(stringForCheckSum).toString();
      if (CheckSum !== generatedHash) {
        throw Error('Hash Mismatch')
      }
      this.utilityService.sessionEncryption('DIPdata', JSON.stringify(decryptedRecord));
      if (Page === 'TicketWithoutLogin') {
        this.router.navigate(['/support/new-ticket-wo-login'])
        return;
      }
      const payload = {
        AgreementCode: DIPUserId,
        FullRequest: `${UserID}|${LoginUserId}|${Mobile}|${UserType}`,
        LoginDIPUserId: DIPUserId
      };
      const encryptedRequest = this.utilityService.encryptData(JSON.stringify(payload));
      this.userService.getUserDetail(encryptedRequest).subscribe((res) => {
        const authenticateReq = {
          Source: 'Web',
          UserId: res.data.user_ID,
          Password: 'Test@1234',
          MPIN: '',
          DeviceID: '',
          Platform: '',
          UserType
        };
        const encryptedAuthenticateUserRequest = this.utilityService.encryptData(JSON.stringify(authenticateReq));
        this.userService.authenticateUser(encryptedAuthenticateUserRequest).subscribe(({ data }) => {
          this.templateID = data.template_ID;
          this.userID = data.agent_Category.toUpperCase().trim() == "Child".toUpperCase() ? data.supervisor_ID : data.userId;
          this.handleNavigation({ ProductCode, Page });
        })
      })
    } catch (error) {
      this.utilityService.handleBackEvent();
    }
  }

  handleNavigation({ ProductCode, Page }: { ProductCode: string, Page: string }): void {
    const isProduct = PRODUCTS.find((product) => product.ProductCode === ProductCode);
    if (isProduct) {
      this.router.navigate([isProduct.URL]);
    }
    const isRedirectPage = REDIRECTS.find(redirect => redirect.Page === Page);
    if (isRedirectPage) {
      this.router.navigate([isRedirectPage.URL]);
    }
    if (isProduct?.template || isRedirectPage?.template) {
      const templateRequest = { JSON: { TemplateID: this.templateID, "UserID": this.userID }, Method: "Retrive" }
      const encryptedTeamplateRequest = this.utilityService.encryptData(JSON.stringify(templateRequest));
      this.masterService.getTemplateMaster(encryptedTeamplateRequest).subscribe((response) => {
        const template = response.templateMasterResponse == null ? response.templateMasterModifyResponse.data[0] : response.templateMasterResponse.data[0];
        this.utilityService.sessionEncryption('loggedINUserTemplate', JSON.stringify(template));
      })
    }
  }
}
