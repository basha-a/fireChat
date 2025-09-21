import { auth } from "../firebase-config.jsx";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="m-2 text-end">
        {isAuth && (
        <div className="sign-out">
          <button className="btn btn-danger" onClick={signUserOut}> Sign Out</button>
        </div>
      )}
        
      </div>

      <div className="app-container">{children}</div>
      
    </div>
  );
};
