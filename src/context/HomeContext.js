import { createContext, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserToken, setUser } from '../redux/user/userSlice.reducer';
import { setContacts } from '../redux/channel/channel.reducer';
import { selectContacts } from '../redux/channel/channel.selector';

const HomePageContext = createContext({});

const HomePageContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const [selectedUserToken, setSelectedUserToken] = useState('');

    const userToken = useSelector(selectUserToken);
    const contacts = useSelector(selectContacts);

    const onSelectUser = value => {
        const contact = contacts.find(item => item.token === value);

        setSelectedUserToken(contact.token);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const user = [...contacts].find(user => user.token === selectedUserToken);
        const newContacts = [...contacts].filter(item => item.token !== selectedUserToken);

        dispatch(setUser(user));
        dispatch(setContacts(newContacts));
    };

    return (
        <HomePageContext.Provider
            value={{
                onSelectUser,
                selectedUserToken,
                contacts,
                handleSubmit,
                userToken
            }}
        >
            {children}
        </HomePageContext.Provider>
    );
};

const useHomePageContext = () => useContext(HomePageContext);

const withHomePageContext = Component => () =>
    (
        <HomePageContextProvider>
            <Component />
        </HomePageContextProvider>
    );

export { useHomePageContext, withHomePageContext };
