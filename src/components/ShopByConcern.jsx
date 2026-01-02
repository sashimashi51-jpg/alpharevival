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
              className="group relative overflow-hidden rounded-2xl bg-[#F5F7FA] block h-64 md:h-80 transition-shadow hover:shadow-lg no-underline"
            >
                {/* Image Background */}
                <div className="absolute inset-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-left opacity-100 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.backgroundColor = '#F5F7FA';
                        }}
                    />
                    {/* Gradient Overlay for Text Readability - lighter on right/bottom */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(245,247,250,0.4)] to-[#F5F7FA]"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-end p-8 text-right z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 max-w-[60%] leading-tight">
                        {item.title}
                    </h3>
                    <div className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm shadow-sm transition-transform group-hover:-translate-y-1">
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
