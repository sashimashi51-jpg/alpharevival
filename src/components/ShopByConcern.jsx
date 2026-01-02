import React from 'react';
import { Link } from 'react-router-dom';

const concerns = [
  {
    title: "Receding hairline and temple regrowth",
    image: "/assets/shopbyconcern/receding_hairline.png",
    link: "/product",
    id: "hairline"
  },
  {
    title: "Crown thinning and bald spots",
    image: "/assets/shopbyconcern/crown_thinning.png",
    link: "/product",
    id: "crown"
  },
  {
    title: "Poor scalp circulation and nutrient absorption",
    image: "/assets/shopbyconcern/scalp_circulation.png",
    link: "/product",
    id: "circulation"
  },
  {
    title: "Overall thinning and lack of density",
    image: "/assets/shopbyconcern/overall_density.png",
    link: "/product",
    id: "density"
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concerns.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-row rounded-3xl bg-[#F5F7FA] overflow-hidden h-56 sm:h-64 md:h-80 transition-shadow hover:shadow-lg no-underline"
            >
              {/* Image Section (Left) - Fixed width approx 40-45% */}
              <div className="w-[45%] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Fade to white gradient on right edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5F7FA]"></div>
              </div>

              {/* Content Section (Right) - Right aligned */}
              <div className="flex-1 p-6 flex flex-col justify-center items-end text-right">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 leading-snug">
                  {item.title}
                </h3>
                <div className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-transform group-hover:-translate-y-1">
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
