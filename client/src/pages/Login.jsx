const login_uri = "http://localhost:3000/auth"

export default function Login() {
  return (
    <div className='flex justify-center'>
      <div>
        <h1>Login Page:</h1>
        <a href={login_uri}>Login</a>
      </div>
    </div>
  );
}
