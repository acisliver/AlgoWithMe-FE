import React from 'react';
import Signup from '../../../UI/molecules/Form/Signup';

function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <Signup />
      </div>
    </div>
  );
}

export default SignupPage;
