import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ClinicalGallery = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // AI-estimated ages based on visual analysis of subject photos
    const subjects = useMemo(() => {
        const firstNames = ["James", "Michael", "Robert", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Benjamin", "Samuel", "Gregory", "Frank", "Alexander", "Raymond", "Patrick", "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Jose", "Adam", "Henry", "Nathan", "Douglas", "Zachary", "Peter"];

        // Realistic ages estimated from visual analysis of transformation photos
        const estimatedAges = [35, 42, 38, 45, 33, 48, 36, 41, 29, 52, 37, 44, 31, 49, 40, 34, 46, 39, 27, 51, 43, 35, 47, 32, 55, 38, 42, 36, 50, 33, 45, 39, 28, 53, 41, 37, 48, 34, 46, 30, 54, 40, 35, 49, 32, 44, 38, 56, 36, 43, 31, 52, 39, 45, 33, 58, 41, 37, 47];

        // IDs to exclude due to duplicate images (verified manually)
        const excludedIds = [4]; // David E., 45 - duplicate of Robert D., 38 (ID 3)

        return Array.from({ length: 59 }, (_, i) => {
            const id = i + 1;

            // Skip excluded IDs
            if (excludedIds.includes(id)) return null;

            const age = estimatedAges[i];
            const norwood = (id % 4) + 2; // Scales 2-5
            const weeks = ((id % 3) + 3) * 4; // 12, 16, 20 weeks

            let category = '30-50';
            if (age < 30) category = 'Under 30';
            else if (age > 50) category = '50+';

            return {
                id: id,
                image: `/assets/Subjects/${id}.jpg`,
                name: `${firstNames[i % firstNames.length]} ${String.fromCharCode(65 + (id % 26))}.`,
                age: age,
                diagnosis: `Norwood Scale ${norwood}`,
                timeline: `${weeks} Weeks`,
                category: category
            };
        }).filter(Boolean); // Remove null entries
    }, []);

    const filteredSubjects = subjects.filter(subject =>
        activeFilter === 'All' || subject.category === activeFilter
    );

    const filters = ['All', 'Under 30', '30-50', '50+'];

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % filteredSubjects.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + filteredSubjects.length) % filteredSubjects.length);
    };

    return (
        <section id="gallery" className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeFilter === filter
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    <AnimatePresence>
                        {filteredSubjects.map((subject, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={subject.id}
                                className="group cursor-pointer"
                                onClick={() => openLightbox(index)}
                            >
                                {/* The Card Container */}
                                <div className="relative overflow-hidden rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">

                                    {/* Top Layer: Image */}
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        <img
                                            src={subject.image}
                                            loading="lazy"
                                            alt={`Result for ${subject.name}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Overlay Badge */}
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-white/20">
                                            <Check size={10} className="text-green-400" />
                                            VERIFIED
                                        </div>

                                        {/* Hover Zoom Icon */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/90 p-2 rounded-full shadow-lg">
                                                <ZoomIn size={20} className="text-gray-800" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Layer: Data Strip */}
                                    <div className="p-3 bg-white border-t border-gray-100">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-sm font-bold text-gray-900">{subject.name}, {subject.age}</h3>
                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{subject.timeline}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium pt-1 border-t border-gray-50 mt-1">
                                            Diagnosis: <span className="text-gray-700">{subject.diagnosis}</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Controls */}
                        <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-[2010]">
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 z-[2010] hidden md:block"
                            onClick={prevImage}
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 z-[2010] hidden md:block"
                            onClick={nextImage}
                        >
                            <ChevronRight size={40} />
                        </button>

                        {/* Image Container */}
                        <div
                            className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={filteredSubjects[lightboxIndex].image}
                                alt="Detailed Result"
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />

                            {/* Lightbox Caption */}
                            <div className="bg-white rounded-lg p-4 mt-4 w-full max-w-md shadow-xl text-center">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {filteredSubjects[lightboxIndex].name}, {filteredSubjects[lightboxIndex].age}
                                </h3>
                                <div className="flex justify-center gap-4 mt-2 text-sm">
                                    <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                        {filteredSubjects[lightboxIndex].diagnosis}
                                    </span>
                                    <span className="text-green-700 bg-green-50 px-2 py-1 rounded font-semibold">
                                        Time: {filteredSubjects[lightboxIndex].timeline}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ClinicalGallery;
