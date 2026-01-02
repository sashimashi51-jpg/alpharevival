import React, { useState } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import './SuccessStories.css';

const stories = [
    {
        name: "Alexander L.",
        details: "34, Chicago IL",
        image: "/photoassets/alexan_successful_story.webp",
        alt: "Alexander L. hair regrowth results",
        text: "My barber was the one who finally said something. \"Dude, your temples are really going back fast.\" I'd been pretending it wasn't happening, wearing hats more, avoiding certain angles in photos. My wife kept insisting it wasn't that bad, but I could tell she was just being nice. The worst part was family events. My dad went bald early, and everyone kept making jokes about me following in his footsteps. I almost bought a hair transplant consultation for $8,000, but then I found this. Figured I'd try it first before doing something that drastic. The needle thing seemed scary at first, but honestly you barely feel it. Takes like 30 seconds once a week. About 2 months in, my wife was like \"your hair looks different somehow.\" That's when I knew something was actually working. My barber noticed too, said my hairline looked \"fuller\" without me even mentioning I was using anything. Six months later and I'm not wearing hats anymore. My temples filled in enough that I look normal again. Even my dad was impressed when I saw him at Christmas. Best $300 I ever spent. Way better than shaving it off or spending thousands on surgery."
    },
    {
        name: "Mitch K.",
        details: "57, Montana",
        image: "/photoassets/mitch_successful_story.webp",
        alt: "Mitch K. hair regrowth results",
        text: "Started noticing my part getting wider about two years ago. In every photo of me, I'd see this thin stripe down the middle of my head. Really embarrassing. Tried that foam stuff from the drugstore for 8 months, made my hair look greasy and did nothing.\n Then tried some expensive vitamins that were supposed to help. Also nothing. My wife actually found this online and sent me the link. She was like, \"at least this one seems different from the other stuff you tried.\" \nWhat sold me was reading how it actually gets the ingredients into your scalp instead of just sitting on top. That made sense. Why would rubbing something on the surface work? First month, I didn't see much, but my friends said they noticed that my hair seem slightly fuller. Month 2 is when I started seeing little dark spots along my part where it had been completely bare. Now at 5 months, that wide part is mostly filled in. I can style my hair normally again without worrying about the lighting showing my scalp through. I'm no longer embarrassed to be in photos."
    },
    {
        name: "Mike J.",
        details: "37, NYC",
        image: "/photoassets/mike_successful_story.webp",
        alt: "Mike J. hair regrowth results",
        text: "The back of my head was getting really bad. I'd catch people looking at it in elevators or when I'd bend over to pick something up. Super self-conscious about it. My coworker mentioned he'd tried this after seeing my situation. He showed me his before and after photos on his phone, pretty convincing. I was skeptical because I'd wasted money before on stuff that didn't work. But the weekly thing appealed to me. I'm terrible at remembering daily routines. The application is really simple. Just roll it around on the thin areas and apply the serum. Takes maybe a minute total. Around week 6, I started seeing these tiny hairs coming in where it had been smooth. By month 4, you could actually see coverage from a normal distance. People stopped staring at the back of my head, which was a huge relief. Now when I look in the mirror using the handheld one, there's actually hair there instead of just scalp. Still not perfect, but so much better than where I started. The confidence boost alone was worth it."
    },
    {
        name: "Peter H.",
        details: "64, Los Angeles, CA",
        image: "/photoassets/peter_successful_story.webp",
        alt: "Peter H. hair regrowth results",
        text: "My kids started making jokes about my thinning hair. At first it was funny, but then my daughter said I should \"do something about it\" before I go completely bald like grandpa. I'd been putting off doing anything about it for years. Figured at my age, what's the point? But hearing it from my kids made me realize how obvious it had gotten. Finally decided to give this a shot when my 25-year-old son said he hopes he doesn't end up looking like me when he's older. That hit me harder than I expected. The whole micro-needle thing seemed gimmicky at first, but I read up on it and apparently it's actually used by dermatologists. That gave me more confidence. Started using it religiously every Sunday morning. Easy to remember and doesn't take long. Three months in, my barber asked if I'd been using something on my hair. Said it looked thicker overall. I hadn't even told him I was trying anything. Now at 7 months, my hair has actual thickness to it again. I don't look nearly as old as I did before. My daughter actually complimented my hair the other day, which never happens. And they stopped making jokes about it, too, which tells me it's working."
    },
    {
        name: "George",
        details: "36, Miami FL",
        image: "/photoassets/georgig.webp",
        alt: "George hair regrowth results",
        text: "I kept seeing ads for this and finally caved. Honestly, I didn't expect much given all the snake oil out there. But the science behind the micro-channels made sense to me. The first few weeks were easy, just a quick roll on the weekends. By month 3, the difference was undeniable. Areas that were clearly thinning have filled back in. It's not magic, it takes time, but it clearly works if you stick with it. Highly recommend specifically for the crown area."
    }
];

export default function SuccessStories() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Desktop: Show 4 cards. Max Index = Total - 4.
    // If Total is 5, Max Index is 1.
    const cardsToShow = 4;
    const maxIndex = Math.max(0, stories.length - cardsToShow);

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section className="stories-section">
            <div className="container stories-header">
                <h2>SUCCESS STORIES</h2>
                <p>Real results from verified customers</p>
            </div>

            <div className="stories-slider-wrapper">
                {/* Right Arrow (Desktop Only mostly) */}
                {currentIndex < maxIndex && (
                    <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>
                )}
                {/* Optional Left Arrow if scrolled */}
                {currentIndex > 0 && (
                    <button className="slider-arrow arrow-left" onClick={handlePrev} style={{ right: 'auto', left: 0 }} aria-label="Previous">
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div
                    className="stories-track"
                    style={{
                        '--slider-transform': `calc(-1 * ${currentIndex} * (25% + 0.375rem))`
                    }}
                >
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="story-card"
                        >
                            <div className="story-image-container">
                                <img
                                    src={story.image}
                                    alt={story.alt}
                                    className="story-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                            <div className="story-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                                ))}
                            </div>
                            <p className="story-text">"{story.text}"</p>
                            <div className="story-author">
                                {story.name}
                                <span>{story.details} • Verified Buyer</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

