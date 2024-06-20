import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from '../../index'
export const Context = createContext();
//This context will be used to share the authentication state (user object) across different components in the application.

function AuthContext({ children }) {
    const auth = getAuth(app);
    // It initializes the Firebase Authentication instance using getAuth().
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log(user)
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('user');
                setUser(null);
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    // Check if the logged-in user has the specified email address
    const isUserWithEmail = (email) => {
        return user && user.email === email;
    };

    const values = {
        user: user,
        setUser: setUser,
        isUserWithEmail: isUserWithEmail
    };

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    );
}

export default AuthContext;
