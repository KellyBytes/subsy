export default function Login() {
  return (
    <div className="login">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Submit</button>
      <div className="full-line" />
      <div>
        <p>Don&apos;t have an account?</p>
        <button>Sign Up</button>
      </div>
    </div>
  );
}
