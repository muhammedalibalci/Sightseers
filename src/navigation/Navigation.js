import * as React from 'react';
import { useSelector } from 'react-redux';
import PrivateNavigation from './PrivateNavigation';
import PublicNavigation from './PublicNavigation';

function Navigation() {
    const { isAuthenticated } = useSelector(state => state.auth)
    return (
        isAuthenticated  ? <PrivateNavigation /> : <PublicNavigation />
    );
}

export default Navigation 