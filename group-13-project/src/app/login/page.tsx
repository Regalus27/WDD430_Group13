import React, { Suspense} from 'react';
import LoginForm from './login-form';
import { authenticate } from "../../lib/actions";

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <LoginForm Login={authenticate} />
    </Suspense>
  );
};

export default LoginPage;
