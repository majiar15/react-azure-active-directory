import {
    PublicClientApplication,
    AuthenticationResult,
    AccountInfo,
    EndSessionRequest,
    RedirectRequest,
    PopupRequest,
  } from "@azure/msal-browser";
  
  import { MSAL_CONFIG } from "../../config/azure-authentication-config";
  
  export class AzureAuthenticationContext {
    myMSALObj = new PublicClientApplication(
      MSAL_CONFIG
    );
    account;
    loginRedirectRequest;
    loginRequest;
  
    isAuthenticationConfigured = false;
  
    constructor() {
      // @ts-ignore
      this.account = null;
      this.setRequestObjects();
      if (MSAL_CONFIG?.auth?.clientId) {
        this.isAuthenticationConfigured = true;
      }
    }
  
    setRequestObjects() {
      this.loginRequest = {
        scopes: [],
        prompt: "select_account",
      };
  
      this.loginRedirectRequest = {
        ...this.loginRequest,
        redirectStartPage: window.location.href,
      };
    }
  
    login(signInType, setUser) {
      if (signInType === "loginPopup") {
        this.myMSALObj
          .loginPopup(this.loginRequest)
          .then((resp) => {
            this.handleResponse(resp, setUser);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (signInType === "loginRedirect") {
        this.myMSALObj.loginRedirect(this.loginRedirectRequest);
      }
    }
  
    logout(account) {
      const logOutRequest = {
        account,
      };
  
      this.myMSALObj.logout(logOutRequest);
    }
    handleResponse(response, incomingFunction) {
      if(response !==null && response.account !==null) {
        this.account = response.account;
      } else {
        this.account = this.getAccount();
      }
  
      if (this.account) {
        incomingFunction(this.account);
      }
    }
    getAccount() {
      console.log(`loadAuthModule`);
      const currentAccounts = this.myMSALObj.getAllAccounts();
      if (currentAccounts === null) {
        // @ts-ignore
        console.log("No accounts detected");
        return undefined;
      }
  
      if (currentAccounts.length > 1) {
        // TBD: Add choose account code here
        // @ts-ignore
        console.log(
          "Multiple accounts detected, need to add choose account code."
        );
        return currentAccounts[0];
      } else if (currentAccounts.length === 1) {
        return currentAccounts[0];
      }
    }
  }
  
  export default AzureAuthenticationContext;