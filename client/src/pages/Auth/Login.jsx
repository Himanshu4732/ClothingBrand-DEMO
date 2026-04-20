import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Dispatch login action logic via RTK
    navigate('/shop');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 border border-border">
        <div>
          <h2 className="text-center text-3xl font-display uppercase tracking-widest text-text">
            Enter the Void
          </h2>
          <p className="mt-2 text-center text-sm font-mono text-muted uppercase tracking-widest">
            Identity Authorization
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-muted uppercase tracking-widest">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 accent-accent bg-bg border-border" />
              <label className="ml-2 block">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="hover:text-accent underline underline-offset-4 decoration-accent/30 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent bg-accent text-bg font-bold font-mono text-sm uppercase tracking-widest hover:bg-transparent hover:text-accent hover:border-accent transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="text-center font-mono text-xs text-muted mt-6 uppercase tracking-widest">
          New to the Void?{' '}
          <Link to="/register" className="text-text hover:text-accent underline underline-offset-4 decoration-border transition-colors">
            Initialize Sequence
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
