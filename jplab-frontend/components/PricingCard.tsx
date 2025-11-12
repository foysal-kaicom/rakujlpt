import parse from "html-react-parser";
import { useAuthStore } from "@/stores/useAuthStore";

export default function PricingCard({ plan, subscribeModal }: any) {
  const user = useAuthStore().user;
  return (
    <div
      key={plan.id}
      className={`p-[2px] w-[320px] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br relative ${
        plan.is_popular
          ? "from-purple-500 via-yellow-500 to-pink-500"
          : "from-orange-200 to-violet-300"
      }`}
    >
      {/* Most Popular Badge */}
      {plan.is_popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
            Most Popular
          </span>
        </div>
      )}
      <div className="bg-white rounded-3xl p-8 size-full relative overflow-clip">
        {/* Current Plan Ribbon */}
        <div className="absolute top-6 -left-18 rotate-[-45deg] bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-20 py-1 text-center shadow-md">
          {user?.current_package_id == plan.id
            ? "Current Plan"
            : "Upgrade Plan"}
        </div>

        {/* Plan Info */}
        <div className="text-center mb-8 mt-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-gray-900">
              {plan.price}
            </span>
          </div>
          <span>{plan.short_description && parse(plan.short_description)}</span>
        </div>

        {/* Description */}
        <div className="space-y-4 mb-16">
          <div className="text-gray-600 font-medium">
            {plan.description && parse(plan.description)}
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="w-full flex justify-center absolute bottom-5 left-0 px-8">
          {user?.current_package_id == plan.id ? (
            <button
              className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 cursor-not-allowed bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200`}
            >
              Subscribe
            </button>
          ) : (
            <button
              className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                plan.is_popular
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => subscribeModal(plan)}
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
