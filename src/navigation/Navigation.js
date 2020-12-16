import * as React from 'react';
import { useSelector } from 'react-redux';
import PrivateNavigation from './PrivateNavigation';
import PublicNavigation from './PublicNavigation';
import DrawerNavigation from './DrawerNavigation'

function Navigation() {
    const { isAuthenticated } = useSelector(state => state.auth)
    return (
        isAuthenticated  ? <DrawerNavigation /> : <PublicNavigation />
    );
}

export default Navigation 