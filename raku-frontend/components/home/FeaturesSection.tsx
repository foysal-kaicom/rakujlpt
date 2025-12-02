'use client'

import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect , useState } from "react";

interface feature {
  id: null | number;
  title: string;
  description: string;
  icon: string;
}

export default function FeaturesSection() {

  const [features , setFeatures] = useState<feature[]>([])

  const featureList = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/feature/list`,
    );
     setFeatures(res?.data?.data || [])
  } catch (error) {
   setFeatures([]);
  }
};

useEffect(()=>{
  featureList()
},[])

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and resources you
            need to master Japanese language tests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {feature.icon ? (
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="size-8 mb-6"
                />
              ) : (
                <BookOpen className="w-8 h-8 text-fuchsia-600 mb-6" />
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
