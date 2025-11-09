import { Users, BookOpen, Award, Globe, Target, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Mock Tests",
      description: "Full-length practice exams for all JLPT levels (N5-N1) and JPT tests with real exam conditions."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Study Plans",
      description: "AI-powered study recommendations based on your performance and target exam date."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Engaging exercises, flashcards, and multimedia content to enhance your Japanese skills."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Detailed performance tracking and progress reports to identify strengths and weaknesses."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Support",
      description: "Access to certified Japanese language instructors and community forums."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Ready",
      description: "Preparation materials aligned with official exam formats and scoring criteria."
    }
  ];
  
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need to master Japanese language tests.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-blue-600 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;