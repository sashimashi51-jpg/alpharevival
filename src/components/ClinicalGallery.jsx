import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ClinicalGallery = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Curated list of verified success stories
    const subjects = useMemo(() => [
        {
            "id": 1,
            "image": "/assets/Subjects/1.jpg?v=2",
            "name": "James B.",
            "age": 35,
            "diagnosis": "Norwood Scale 3",
            "timeline": "16 Weeks",
            "category": "30-50"
        },
        {
            "id": 3,
            "image": "/assets/Subjects/3.jpg?v=2",
            "name": "Robert D.",
            "age": 38,
            "diagnosis": "Norwood Scale 5",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 5,
            "image": "/assets/Subjects/5.jpg?v=2",
            "name": "William F.",
            "age": 33,
            "diagnosis": "Norwood Scale 3",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 6,
            "image": "/assets/Subjects/6.jpg?v=2",
            "name": "Richard G.",
            "age": 48,
            "diagnosis": "Norwood Scale 4",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 7,
            "image": "/assets/Subjects/7.jpg?v=2",
            "name": "Joseph H.",
            "age": 56,
            "diagnosis": "Norwood Scale 5",
            "timeline": "12 Weeks",
            "category": "50+"
        },
        {
            "id": 8,
            "image": "/assets/Subjects/8.jpg?v=2",
            "name": "Thomas I.",
            "age": 39,
            "diagnosis": "Norwood Scale 2",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 11,
            "image": "/assets/Subjects/11.jpg?v=2",
            "name": "Daniel L.",
            "age": 37,
            "diagnosis": "Norwood Scale 5",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 12,
            "image": "/assets/Subjects/12.jpg?v=2",
            "name": "Matthew M.",
            "age": 44,
            "diagnosis": "Norwood Scale 2",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 16,
            "image": "/assets/Subjects/16.jpg?v=2",
            "name": "Steven Q.",
            "age": 45,
            "diagnosis": "Norwood Scale 2",
            "timeline": "16 Weeks",
            "category": "30-50"
        },
        {
            "id": 17,
            "image": "/assets/Subjects/17.jpg?v=2",
            "name": "Jeremy Lin",
            "age": 27,
            "diagnosis": "Norwood Scale 3",
            "timeline": "14 Weeks",
            "category": "Under 30"
        },
        {
            "id": 19,
            "image": "/assets/Subjects/19.jpg?v=2",
            "name": "Joshua T.",
            "age": 38,
            "diagnosis": "Norwood Scale 5",
            "timeline": "16 Weeks",
            "category": "30-50"
        },
        {
            "id": 20,
            "image": "/assets/Subjects/20.jpg?v=2",
            "name": "Kenneth U.",
            "age": 51,
            "diagnosis": "Norwood Scale 2",
            "timeline": "12 Weeks",
            "category": "50+"
        },
        {
            "id": 23,
            "image": "/assets/Subjects/23.jpg?v=2",
            "name": "George X.",
            "age": 55,
            "diagnosis": "Norwood Scale 5",
            "timeline": "12 Weeks",
            "category": "50+"
        },
        {
            "id": 24,
            "image": "/assets/Subjects/24.jpg?v=2",
            "name": "Edward Y.",
            "age": 32,
            "diagnosis": "Norwood Scale 2",
            "timeline": "16 Weeks",
            "category": "30-50"
        },
        {
            "id": 28,
            "image": "/assets/Subjects/28.jpg?v=2",
            "name": "Jeffrey C.",
            "age": 36,
            "diagnosis": "Norwood Scale 2",
            "timeline": "16 Weeks",
            "category": "30-50"
        },
        {
            "id": 38,
            "image": "/assets/Subjects/38.jpg?v=2",
            "name": "Scott M.",
            "age": 61,
            "diagnosis": "Norwood Scale 4",
            "timeline": "16 Weeks",
            "category": "50+"
        },
        {
            "id": 39,
            "image": "/assets/Subjects/39.jpg?v=2",
            "name": "Jasmine L.",
            "age": 47,
            "diagnosis": "Norwood Scale 5",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 40,
            "image": "/assets/Subjects/40.jpg?v=2",
            "name": "Benjamin O.",
            "age": 30,
            "diagnosis": "Norwood Scale 2",
            "timeline": "10 Weeks",
            "category": "30-50"
        },
        {
            "id": 41,
            "image": "/assets/Subjects/41.jpg?v=2",
            "name": "Vanessa I.",
            "age": 54,
            "diagnosis": "Norwood Scale 3",
            "timeline": "12 Weeks",
            "category": "50+"
        },
        {
            "id": 42,
            "image": "/assets/Subjects/42.jpg?v=2",
            "name": "Gregory Q.",
            "age": 60,
            "diagnosis": "Norwood Scale 4",
            "timeline": "5 Months",
            "category": "50+"
        },
        {
            "id": 44,
            "image": "/assets/Subjects/44.jpg?v=2",
            "name": "Alexander S.",
            "age": 49,
            "diagnosis": "Norwood Scale 2",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 48,
            "image": "/assets/Subjects/48.jpg?v=2",
            "name": "Dennis W.",
            "age": 56,
            "diagnosis": "Norwood Scale 2",
            "timeline": "14 Weeks",
            "category": "50+"
        },
        {
            "id": 50,
            "image": "/assets/Subjects/50.jpg?v=2",
            "name": "Tyler Y.",
            "age": 43,
            "diagnosis": "Norwood Scale 4",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 53,
            "image": "/assets/Subjects/53.jpg?v=2",
            "name": "Adam B.",
            "age": 39,
            "diagnosis": "Norwood Scale 3",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 54,
            "image": "/assets/Subjects/54.jpg?v=2",
            "name": "Henry C.",
            "age": 45,
            "diagnosis": "Norwood Scale 4",
            "timeline": "12 Weeks",
            "category": "30-50"
        },
        {
            "id": 59,
            "image": "/assets/Subjects/59.jpg?v=2",
            "name": "James H.",
            "age": 31,
            "diagnosis": "Norwood Scale 5",
            "timeline": "14 Weeks",
            "category": "30-50"
        }
    ], []);

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
