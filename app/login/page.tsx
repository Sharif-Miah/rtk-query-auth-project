import LoginForm from '@/componets/auth/LoginForm';


const LoginPage = () => {

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image & Text */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-200 via-orange-100 to-orange-200 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-16">
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              To keep connected with<br />largest shop in the world.
            </h1>
          </div>
          
          <div className="flex justify-center items-end">
            <div className="relative">
              {/* Decorative panel background */}
              <div className="absolute inset-0 bg-orange-300 opacity-40 rounded-t-3xl transform translate-y-8"></div>
              
              {/* Clothing rack */}
              <div className="relative bg-gradient-to-b from-orange-200 to-orange-300 rounded-t-3xl p-8 pt-12">
                <div className="flex justify-center gap-2">
                  {/* Hangers */}
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="relative">
                      <div className="w-1 h-16 bg-orange-400 opacity-60"></div>
                      <div 
                        className={`w-8 h-20 rounded-b-lg ${
                          i < 4 ? 'bg-orange-100' : 
                          i < 8 ? 'bg-gray-800' : 
                          i < 11 ? 'bg-orange-200' : 
                          'bg-gray-900'
                        }`}
                        style={{ marginTop: '4px' }}
                      ></div>
                    </div>
                  ))}
                </div>
                {/* Rod */}
                <div className="absolute top-4 left-0 right-0 h-2 bg-orange-400 rounded-full"></div>
                <div className="absolute top-4 left-4 w-2 h-24 bg-orange-400 rounded-full"></div>
                <div className="absolute top-4 right-4 w-2 h-24 bg-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-right mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Oxyy</h3>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
