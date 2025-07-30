import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Calendar, Download } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      {/* Left Side - Content */}
      <div className="flex-1 p-12 flex flex-col justify-center relative z-10">
        <div className="max-w-2xl">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              let's create
              <br />
              magic.
            </h1>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Marketing strategist & creative director crafting brands that captivate and convert.
            </p>
          </div>

          <div className="space-y-6 mt-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-lg font-medium mb-3 text-purple-200">Ready to elevate your brand?</h2>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                I specialize in digital marketing strategies, brand development, and creative campaigns that drive real
                results for ambitious businesses.
              </p>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-6 backdrop-blur-sm transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                hello@yourname.com
              </Button>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-lg font-medium mb-3 text-blue-200">Want to see my work?</h2>
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                Explore my portfolio of successful campaigns, brand transformations, and marketing strategies that have
                generated millions in revenue.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-6 backdrop-blur-sm transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Portfolio
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full px-6 backdrop-blur-sm transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 p-12 flex flex-col justify-center relative z-10">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Start Your Project
            </h3>

            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm rounded-xl transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm rounded-xl transition-all duration-300"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm rounded-xl transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Budget
                </label>
                <select className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300">
                  <option value="" className="bg-slate-800">
                    Select budget range
                  </option>
                  <option value="5k-10k" className="bg-slate-800">
                    $5k - $10k
                  </option>
                  <option value="10k-25k" className="bg-slate-800">
                    $10k - $25k
                  </option>
                  <option value="25k-50k" className="bg-slate-800">
                    $25k - $50k
                  </option>
                  <option value="50k+" className="bg-slate-800">
                    $50k+
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                  Tell me about your project
                </label>
                <Textarea
                  id="project"
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm rounded-xl resize-none transition-all duration-300"
                  placeholder="Describe your goals, challenges, and what you're looking to achieve..."
                />
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                  id="terms"
                  className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 mt-1 backdrop-blur-sm"
                />
                <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                  I agree to the privacy policy and terms of service
                </label>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl py-3 text-base font-medium shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
