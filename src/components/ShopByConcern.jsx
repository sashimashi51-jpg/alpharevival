import React from 'react';
import { Link } from 'react-router-dom';

const concerns = [
  {
    title: "Poor scalp circulation and nutrient absorption",
    image: "/assets/shopbyconcern/scalp_circulation-removebg-preview.png",
    link: "/product",
    id: "circulation"
  },
  {
    title: "Reclaim your full, thick hair",
    image: "/assets/shopbyconcern/perfect_hair_man-removebg-preview.png",
    link: "/product",
    id: "fullhair"
  }
];

export default function ShopByConcern() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Reactivate Your Growth
          </h2>
          <p className="text-lg text-gray-600">
            Target dormant follicles and maximize absorption where you need it most with the AlphaInfuse™ system.
          </p>
        </div>

        {/* Cards Stacked Vertically - Premium Design */}
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          {concerns.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-row rounded-2xl bg-gradient-to-r from-[#EDF2F6] via-[#E9EFF2] to-[#D1DBE3] overflow-hidden h-[180px] transition-all hover:shadow-xl no-underline w-full"
              style={{ overflow: 'hidden' }}
            >
              {/* Image Section (Left) - 40% width - Lighter side */}
              <div className="w-[40%] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
              </div>

              {/* Content Section (Right) - 60% width - Darker side */}
              <div className="w-[60%] p-5 flex flex-col justify-center items-start">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 leading-snug">
                  {item.title}
                </h3>
                <div className="bg-gradient-to-r from-white to-gray-50 text-black px-6 py-2.5 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-110 hover:-translate-y-1 border border-gray-200 cursor-pointer">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
