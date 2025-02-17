import React, {ReactNode} from 'react';
import MenuNavigator from "@/components/menu/MenuNavigator";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div>
            <MenuNavigator/>
            {children}
        </div>
    );
};

export default Layout;