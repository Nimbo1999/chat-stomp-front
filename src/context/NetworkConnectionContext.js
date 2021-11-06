import React, { createContext, useEffect, useState, useContext } from 'react';

const initialValue = window.navigator.onLine;

const NetworkConnectionContext = createContext({
    isOnline: initialValue
});

const NetworkConnectionProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(initialValue);

    useEffect(() => {
        function networkListener({ returnValue, type }) {
            if (type === 'online' && !isOnline) {
                return returnValue && setIsOnline(true);
            }
            if (type === 'offline' && isOnline) {
                return returnValue && setIsOnline(false);
            }
        }

        window.addEventListener('online', networkListener);
        window.addEventListener('offline', networkListener);

        return () => {
            window.removeEventListener('online', networkListener);
            window.addEventListener('offline', networkListener);
        };
    }, [isOnline]);

    return (
        <NetworkConnectionContext.Provider value={{ isOnline }}>
            {children}
        </NetworkConnectionContext.Provider>
    );
};

const useNetworkProvider = () => useContext(NetworkConnectionContext);

export { NetworkConnectionProvider as default, useNetworkProvider };
