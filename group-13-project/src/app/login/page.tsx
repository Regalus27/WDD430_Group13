import React, { Suspense} from 'react';
import LoginForm from './login-form';

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
