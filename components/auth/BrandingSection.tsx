export default function BrandingSection() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
      {/* Background elements... (same as your original) */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
        <div className="max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-24 h-24 transition-transform duration-300 transform bg-white rounded-full shadow-2xl hover:scale-105">
              <span className="text-3xl font-bold text-green-500">2.S</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-wider xl:text-5xl drop-shadow-lg">
              24/7 SMAGRITRADE
            </h1>
            <div className="w-24 h-1 mx-auto bg-white rounded-full opacity-80"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl font-light leading-relaxed opacity-90">
            Your trusted partner for continuous growth and success
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 pt-8">
            {['24/7 Support', 'Secure Platform', 'Global Access'].map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 opacity-90">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}