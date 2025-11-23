import { Star } from "lucide-react";
import { FaUser } from "react-icons/fa";
interface Review {
  id: null | number;
  body: string;
  reviewer_name: string;
  reviewer_designation: string;
  rating: number;
  image: string;
}

const reviewList = async (): Promise<Review[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/list`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
};

export default async function TestimonialsSection() {
  const testimonials = await reviewList();

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore real stories of learners who advanced their Japanese
            proficiency through our Mock Test platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.body}"
              </p>
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
                    {testimonial.reviewer_designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
