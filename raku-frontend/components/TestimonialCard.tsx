import { Star } from "lucide-react";
import { FaUser } from "react-icons/fa";

interface Testimonial {
  id: null | number;
  body: string;
  reviewer_name: string;
  reviewer_designation: string;
  rating: number;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div key={testimonial.id} className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 m-3 h-[300px]">
      <div className="flex items-center mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.body}"</p>
      <div className="flex items-center">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.reviewer_name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <FaUser className="w-12 h-12 rounded-full mr-4 object-cover text-purple-400 ring-2" />
        )}

        <div>
          <h4 className="font-semibold text-gray-900">
            {testimonial.reviewer_name}
          </h4>
          <p className="text-gray-600 text-sm">
            {testimonial.reviewer_designation || 'Student'}
          </p>
        </div>
      </div>
    </div>
  );
}
