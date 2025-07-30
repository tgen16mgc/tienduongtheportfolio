import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Briefcase } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Content */}
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-16 leading-tight">
            just
            <br />
            send it.
          </h1>

          <div className="space-y-12">
            <div>
              <h2 className="text-lg font-medium mb-4 text-gray-300">You don't like forms?</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Refokus is a design-driven Webflow agency creating amazing websites for amazing brands with amazing
                people.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-gray-600 text-white hover:bg-gray-800 rounded-full px-6"
              >
                <Mail className="w-4 h-4 mr-2" />
                hello@refokus.com
              </Button>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4 text-gray-300">Looking to do great work?</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Refokus is a design-driven Webflow agency creating amazing websites for amazing brands with amazing
                people.
              </p>
              <Button
                variant="outline"
                className="bg-transparent border-gray-600 text-white hover:bg-gray-800 rounded-full px-6"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Job Openings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md w-full">
          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                placeholder=""
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <Input
                id="company"
                type="text"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                placeholder=""
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600"
                placeholder=""
              />
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-300 mb-2">
                Tell us about your project
              </label>
              <Textarea
                id="project"
                rows={6}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600 resize-none"
                placeholder=""
              />
            </div>

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox
                id="terms"
                className="border-gray-600 data-[state=checked]:bg-white data-[state=checked]:border-white mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                I hereby accept Refokus General Terms and Privacy Policy
              </label>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-transparent border border-gray-600 text-white hover:bg-gray-800 rounded-full py-3 text-base font-medium"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
