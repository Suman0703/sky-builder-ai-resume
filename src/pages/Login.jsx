import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // Toggle between Login and Signup modes (Default to false = Signup mode)
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() !== '') {
      // In a real backend, you would save this data or verify it.
      // For the hackathon, we push them right into the builder!
      navigate('/builder');
    } else {
      alert('Please enter your name to continue.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md border-t-4 border-brand-blue">
        
        <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">Sky Builder</h1>
        <p className="text-gray-500 mb-6 text-center">
          {isLogin ? 'Welcome back! Log in to continue.' : 'Create an account to build your AI Resume.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field - ONLY shows on Sign Up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                placeholder="you@example.com"
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-dark text-white p-3 rounded font-semibold hover:bg-black transition mt-4"
          >
            {isLogin ? 'Log In' : 'Sign Up & Start Building'}
          </button>
        </form>

        {/* Toggle between Sign Up and Log In */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-brand-blue font-semibold hover:underline focus:outline-none"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;