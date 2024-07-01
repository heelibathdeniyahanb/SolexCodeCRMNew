import React, { useState } from 'react';
import VerifyResetCode from './VerifyResetCode';
import ChangePasswordForm from './ChangePasswordForm';

const ParentComponent = () => {
    const [userId, setUserId] = useState('');

    const handleUserIdChange = (newUserId) => {
        setUserId(newUserId);
    };

    return (
        <div>
           
            <VerifyResetCode onUserIdChange={handleUserIdChange} />
            {userId && <ChangePasswordForm userId={userId} />}
        </div>
    );
};

export default ParentComponent;
