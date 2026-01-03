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

        {/* Cards Stacked Vertically - Premium Mobile-First Design */}
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
          {concerns.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-col md:flex-row rounded-2xl bg-gradient-to-br from-[#E9EFF2] to-[#D8E4EC] overflow-hidden transition-all hover:shadow-xl no-underline w-full"
              style={{ overflow: 'hidden' }}
            >
              {/* Image Section - Vertical on mobile, 40% on desktop */}
              <div className="w-full md:w-[40%] h-[240px] md:h-[180px] relative overflow-hidden bg-gradient-to-br from-[#E9EFF2] to-[#D8E4EC]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
              </div>

              {/* Content Section - Below image on mobile, 60% on desktop */}
              <div className="w-full md:w-[60%] p-6 md:p-5 flex flex-col justify-center items-start">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 leading-snug">
                  {item.title}
                </h3>
                <div className="bg-gradient-to-r from-white to-gray-50 text-black px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all group-hover:scale-105 border border-gray-200">
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
