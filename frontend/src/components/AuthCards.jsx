export default function AuthCard({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background shapes */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 -right-24 w-72 h-72 bg-indigo-500 rounded-full opacity-20"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        {children}
      </div>
    </div>
  );
}
