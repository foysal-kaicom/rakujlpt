import { Star } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jisun Aurnob",
      role: "JLPT N2 Passer",
      image: "https://avatars.githubusercontent.com/u/66457643?v=4",
      content: "Hashira mock test Pro helped me pass JLPT N2 on my first try! The mock tests were incredibly similar to the real exam.",
      rating: 5
    },
    {
      name: "Asif Hasan",
      role: "JPT Student",
      image: "https://avatars.githubusercontent.com/u/41231906?v=4",
      content: "The personalized study plan feature is amazing. It adapted to my weak points and helped me improve efficiently.",
      rating: 5
    },
    {
      name: "Touhidul Islam",
      role: "JLPT N1 Achiever",
      image: "https://avatars.githubusercontent.com/u/19886279?v=4",
      content: "From N5 to N1, this platform supported my entire journey. The progress tracking kept me motivated throughout.",
      rating: 5
    }
  ];
  
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of students who achieved their Japanese language goals with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;