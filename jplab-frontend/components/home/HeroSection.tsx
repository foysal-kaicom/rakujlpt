import { Star, Users, ArrowRight, Play, Award } from 'lucide-react';
const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                #1 JPT & JLPT Preparation Platform
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Japanese</span> Language Tests
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprehensive mock tests, personalized study plans, and expert guidance to help you pass JPT and JLPT exams with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <a target='_blank' href="https://www.youtube.com/watch?v=PxIEu2mL8yE" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </a>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">50k+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-gray-600">95% Pass Rate</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Mock Test Dashboard</h3>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">JLPT N2</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Reading Comprehension</span>
                      <span className="text-green-300">85%</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Listening</span>
                      <span className="text-yellow-300">72%</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Grammar</span>
                      <span className="text-blue-300">92%</span>
                    </div>
                    <div className="bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-11/12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;