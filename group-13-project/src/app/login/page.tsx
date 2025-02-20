import React, { Suspense} from 'react';
import LoginForm from './login-form';

const LoginPage: React.FC = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
