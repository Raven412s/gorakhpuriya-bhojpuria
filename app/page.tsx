export default function UpdatingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center space-y-8">
        {/* Animated Spinner */}
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Main Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 animate-pulse">
            Gorakhpuriya Bhojpuria
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 font-semibold ">
            Updating...
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[width_2s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Subtext */}
        <p className="text-gray-500 text-sm">
          Please wait while we update the system
        </p>
      </div>
    </div>
  );
}