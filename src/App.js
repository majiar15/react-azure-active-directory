import React, { useState } from "react";
import AzureAuthenticationButton from "./components/login-azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";

function App() {
  // current authenticated user
  const [currentUser, setCurrentUser] = useState();

  // authentication callback
  const onAuthenticated = async (userAccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  // Render JSON data in readable format
  const PrettyPrintJson = ({ data }) => {
    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };



  return (
    <div id="App">
      <h2>Microsoft Login Button application</h2>
      <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
      {currentUser && (
        <div>
          <div>
            Email: {currentUser.username}
          </div>
          <div>
            Nombre Completo: {currentUser.name}
          </div>
          <div>
            Token de autenticacion : {currentUser.idTokenClaims.aud}
          </div>
          {/* <PrettyPrintJson data={currentUser} /> */}
        </div>
      )}
    </div>
  );
}

export default App;