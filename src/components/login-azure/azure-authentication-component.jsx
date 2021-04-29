import React, { useState } from "react";
import AzureAuthenticationContext from "./azure-authentication-context";
import { AccountInfo } from "@azure/msal-browser";

const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const isIE = msie > 0 || msie11 > 0;

// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated })=> {
  // Azure client context
  const authenticationModule = new AzureAuthenticationContext();

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState();

  const logIn = (method) => {
    const typeName = "loginPopup";
    const logInType = isIE ? "loginRedirect" : typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo);
  };
  const logOut = () => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      authenticationModule.logout(user);
    }
  };

  const returnedAccountInfo = (user) => {
    // set state
    setAuthenticated(user?.name ? true : false);
    onAuthenticated(user);
    setUser(user);
  };

  const showLogInButton = () => {
    return (
      <button id="authenticationButton" onClick={() => logIn("loginPopup")}>
        Log in
      </button>
    );
  };

  const showLogOutButton = () => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button id="authenticationButton" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>
    );
  };

  const showButton = () => {
    return authenticated ? showLogOutButton() : showLogInButton();
  };

  return (
    <div id="authentication">
      {authenticationModule.isAuthenticationConfigured ? (
        showButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  );
};

export default AzureAuthenticationButton;