import React from 'react';
import Signin from '../../../UI/molecules/Form/Signin';

function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <Signin />
      </div>
    </div>
  );
}

export default SigninPage;
