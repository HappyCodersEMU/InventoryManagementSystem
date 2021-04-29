import React, {useContext} from "react";
import {AuthContext} from "../../context/auth.context";

function Header() {
    const auth = useContext(AuthContext)

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="logo-block">
                        Logo block
                    </div>
                    <div className="user-block">
                        User block
                        <div>
                            <button onClick={logoutHandler}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;