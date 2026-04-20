import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 border border-border">
        <div>
          <h2 className="text-center text-3xl font-display uppercase tracking-widest text-text">
            Initialize
          </h2>
          <p className="mt-2 text-center text-sm font-mono text-muted uppercase tracking-widest">
            Create Identity File
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Designation (Name)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent bg-accent text-bg font-bold font-mono text-sm uppercase tracking-widest hover:bg-transparent hover:text-accent hover:border-accent transition-all duration-300"
            >
              Construct
            </button>
          </div>
        </form>
        
        <div className="text-center font-mono text-xs text-muted mt-6 uppercase tracking-widest">
          Trace established?{' '}
          <Link to="/login" className="text-text hover:text-accent underline underline-offset-4 decoration-border transition-colors">
            Return to Void
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
