import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TDL</span>
              </div>
              <span className="text-white font-bold text-lg">TO-DO-LIST</span>
            </div>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <span className=" rounded-full bg-gradient-to-r ">
              
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Borem Ipsum
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Lorem Ipsum
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 rounded-lg">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg  from-blue-500 to-cyan-500 hover:to-cyan-600 text-white border-0 rounded-lg">
                Sign In
              </Button>
            </Link>
          </div>
          </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Everything You Need
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
              <p className="text-slate-400 leading-relaxed">
                Bcrypt password hashing and JWT token-based authentication with automatic token refresh and session management.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Complete Dashboard</h3>
              <p className="text-slate-400 leading-relaxed">
                Full-featured dashboard with user profiles, task management, search, filtering, and real-time updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lorem Ipsum</h3>
              <p className="text-slate-400 leading-relaxed">
               
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Form Validation</h3>
              <p className="text-slate-400 leading-relaxed">
                Client-side and server-side validation with Zod schemas ensuring data integrity and security.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Protected Routes</h3>
              <p className="text-slate-400 leading-relaxed">
                Secure route protection requiring authentication with automatic redirects and session validation.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">REST API</h3>
              <p className="text-slate-400 leading-relaxed">
                Well-structured REST API with MongoDB integration, CRUD operations, and comprehensive error handling.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4"></h2>
          <p className="text-slate-300 mb-8 text-lg">
            Create your account .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6  from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 rounded-lg">
                Sign In Instead
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2025 ScalerAuth. Made with 🤍 Sohaib Shaikh</p>
        </div>
      </footer>
    </div>
  );
}
