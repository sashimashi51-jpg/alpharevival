import React from 'react';
import { Link } from 'react-router-dom';

const concerns = [
  {
    title: "Receding hairline and temple regrowth",
    image: "/assets/hairline-temple.jpg",
    link: "/product",
    id: "hairline"
  },
  {
    title: "Crown thinning and bald spots",
    image: "/assets/crown-thinning.jpg",
    link: "/product",
    id: "crown"
  },
  {
    title: "Poor scalp circulation and nutrient absorption",
    image: "/assets/scalp-circulation.jpg",
    link: "/product",
    id: "circulation"
  },
  {
    title: "Overall thinning and lack of density",
    image: "/assets/overall-density.jpg",
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
              className="group rounded-2xl bg-[#F5F7FA] flex h-56 md:h-72 transition-shadow hover:shadow-lg no-underline overflow-hidden"
            >
                {/* Image Section - Left Side */}
                <div className="w-1/2 relative overflow-hidden bg-gray-200">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Content Section - Right Side */}
                <div className="w-1/2 flex flex-col justify-center items-end p-5 md:p-8 text-right">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                        {item.title}
                    </h3>
                    <div className="bg-white text-gray-900 px-5 py-2 rounded-full font-semibold text-sm shadow-sm border border-gray-100 transition-transform group-hover:-translate-y-1 whitespace-nowrap">
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
