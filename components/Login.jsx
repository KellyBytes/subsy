'use client';

import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const params = useSearchParams();
  const isReg = params.get('register');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(isReg);
  const [error, setError] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const { signup, login, resetPassword } = useAuth();

  async function handleAuthenticate() {
    if (!email || !email.includes('@') || password.length < 6 || authenticating)
      return;

    setError(null);
    setAuthenticating(true);

    try {
      if (isRegistration) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setResetMessage(
        'Password reset email has been sent. Please check your inbox.'
      );
    } catch (error) {
      setResetMessage(error.message);
    }
  }

  return (
    <div className="login">
      <h2>{isRegistration ? 'Create an account' : 'Login'}</h2>
      {error && (
        <div>
          <p>❌️ {error}</p>
        </div>
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleAuthenticate} disabled={authenticating}>
        {authenticating ? 'Submitting...' : 'Submit'}
      </button>
      <div className="full-line" />
      {!isResettingPassword ? (
        <div className="registration-reset">
          <div className="registration">
            <p>
              {isRegistration
                ? 'Already have an account?'
                : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsRegistration(!isRegistration);
              }}
            >
              {isRegistration ? 'Log in' : 'Sign up'}
            </button>
          </div>
          <div className="reset-password">
            <p>{isRegistration ? '' : 'Forget your password?'}</p>
            {isRegistration ? (
              ''
            ) : (
              <button onClick={() => setIsResettingPassword(true)}>
                Reset your Password
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {!resetMessage ? (
            <form
              onSubmit={handleResetPassword}
              className="reset-password-form"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit">
                <p>Send Reset Link</p>
              </button>
            </form>
          ) : (
            <p className="reset-message">{resetMessage}</p>
          )}
        </>
      )}
    </div>
  );
}
