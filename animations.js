window.Animations = {
    // Shared Configuration
    DEFAULTS: {
        trigger: {
            start: "center bottom",
            end: "center 75%", // Standard "Finish Early" point
            scrub: 1
        },
        ease: "power2.out"
    },

    fadeInOut: (content, section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: window.Animations.DEFAULTS.trigger.start,
                end: "bottom top",
                scrub: true
            }
        });
        
        tl.fromTo(content, {
            opacity: 0
        }, {
            opacity: 0, 
            keyframes: {
                "0%":   { opacity: 0, y: "20vh" },
                "40%":  { opacity: 1, y: 0 },
                "60%":  { opacity: 1, y: 0 },
                "100%": { opacity: 0, y: "-20vh" }
            },
            ease: "none"
        });
    },

    zoomReveal: (content, section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: window.Animations.DEFAULTS.trigger.start,
                end: "bottom top",
                scrub: 1
            }
        });

        tl.fromTo(content, {
            scale: 0.5,
            opacity: 0
        }, {
            keyframes: {
                "0%":   { scale: 0.5, opacity: 0 },
                "50%":  { scale: 1.2, opacity: 1 },
                "100%": { scale: 1.0, opacity: 1 }
            },
            ease: "none"
        });
    },

    sideEntrance: (content, section, item) => {
        const direction = item.direction === 'right' ? 1 : -1;
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                ...window.Animations.DEFAULTS.trigger
            }
        });

        tl.fromTo(content, {
            x: direction * -100 + "vw",
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            ease: window.Animations.DEFAULTS.ease
        });
    },

    flyIn: (content, section, item) => {
        const direction = item.direction === 'right' ? 1 : -1;
        const xStart = direction * 100 + "vw";
        const skewStart = direction * -45;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                ...window.Animations.DEFAULTS.trigger
            }
        });

        tl.fromTo(content, {
            x: xStart,
            skewX: skewStart,
            opacity: 0
        }, {
            keyframes: {
                "0%":   { x: xStart, skewX: skewStart, opacity: 0 },
                "70%":  { x: 0, skewX: direction * 20, opacity: 1 },
                "80%":  { x: 0, skewX: 0, opacity: 1 },
                "100%": { x: 0, skewX: 0, opacity: 1 }
            },
            ease: window.Animations.DEFAULTS.ease
        });
    },

    jump: (content, section, item) => {
        const direction = item.direction === 'right' ? 1 : -1;
        const xStart = direction * -120 + "vw";
        const xEnd = direction * 120 + "vw";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom", 
                end: "bottom top",
                scrub: 1
            }
        });

        tl.fromTo(content, {
            x: xStart,
            opacity: 1
        }, {
            x: xEnd,
            ease: "none"
        });
    },

    traverse: (content, section, item) => {
        const direction = item.direction === 'right' ? 1 : -1;
        // Reduced distance (slower)
        const xStart = direction * -90 + "vw";
        const xEnd = direction * 90 + "vw";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "center center",
                end: "+=150%", // Long pin
                pin: true,
                scrub: 1
            }
        });

        tl.fromTo(content, {
            x: xStart,
            opacity: 1
        }, {
            x: xEnd,
            ease: "none"
        });
    },

    againstTheGrain: (content, section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        tl.fromTo(content, {
            y: "-100vh"
        }, {
            y: "100vh",
            ease: "none"
        });
    },

    fadewrite: (content, section) => {
        // Find all text elements in document order
        const textElements = content.querySelectorAll('.headline, .subtext, .stat-value, .stat-unit');
        if (!textElements.length) return;

        let allSpans = [];

        textElements.forEach(el => {
            const text = el.innerText;
            const chars = text.split('').map(char => {
                if (char === ' ') return '<span style="opacity:0">&nbsp;</span>';
                return `<span style="opacity:0">${char}</span>`;
            }).join('');
            el.innerHTML = chars;
            
            const spans = Array.from(el.querySelectorAll('span'));
            allSpans = allSpans.concat(spans);
        });
            
        // already Refactored to Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "center bottom", 
                end: "center 30%",
                scrub: true
            }
        });

        tl.to(allSpans, {
            opacity: 1,
            stagger: 0.1,
            ease: "none"
        });
    },

    typewriter: (content, section) => {
        // Find all text elements in document order
        const textElements = content.querySelectorAll('.headline, .subtext, .stat-value, .stat-unit');
        if (!textElements.length) return;

        let allSpans = [];

        textElements.forEach(el => {
            const text = el.innerText;
            const chars = text.split('').map(char => {
                if (char === ' ') return '<span style="opacity:0">&nbsp;</span>';
                return `<span style="opacity:0">${char}</span>`;
            }).join('');
            el.innerHTML = chars;
            
            const spans = Array.from(el.querySelectorAll('span'));
            allSpans = allSpans.concat(spans);
        });
            
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "center bottom", 
                end: "center 30%",
                scrub: true
            }
        });

        // Discrete animation: instant opacity change
        tl.to(allSpans, {
            opacity: 1,
            duration: 0, // Instant
            stagger: 0.1,
            ease: "none"
        });
    },

    springHold: (content, section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: window.Animations.DEFAULTS.trigger.start,
                end: "bottom+=100% top",
                scrub: 1
            }
        });

        tl.fromTo(content, {
            y: "100vh",
            opacity: 0
        }, {
            keyframes: {
                "0%":   { y: "100vh", opacity: 0 },
                "25%":  { y: "0", opacity: 1, ease: "back.out(1.2)" },
                "85%":  { y: "0", opacity: 1 },
                "100%": { y: "-100vh", opacity: 0 }
            },
            ease: "none"
        });
    },

    slideUp: (content, section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: window.Animations.DEFAULTS.trigger.start,
                end: "center center",
                scrub: 1,
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(content, {
            opacity: 0,
            y: 150
        }, {
            opacity: 1,
            y: 0,
            ease: window.Animations.DEFAULTS.ease
        });
    },

    // Helper for Image Pop
    popIn: (img, section) => {
        if (!img) return;
        gsap.fromTo(img, { scale: 0.8, opacity: 0 }, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: section,
                start: window.Animations.DEFAULTS.trigger.start,
            }
        });
    },

    // Helper for Stat Value Pop
    popStat: (statValue, section) => {
        if (!statValue) return;
        gsap.fromTo(statValue, {
            scale: 1,
            filter: "brightness(1)",
            color: "#79b436"
        }, {
            scrollTrigger: {
                trigger: section,
                start: "center 80%", // When center of section hits 60% viewport (sweet spot)
                end: "center 60%",
                scrub: 0, // No scrub, just a trigger animation
                toggleActions: "play reverse play reverse"
            },
            scale: 1.15,
            filter: "brightness(1.2)",
            color: "#8cd140", // Slightly lighter/brighter green pop
            duration: 1.0,    // Slower
            ease: "back.out(1.7)"
        });
    },

    // Helper for Subtext Parallax
    parallaxSubtext: (subtexts, section) => {
        if (!subtexts || subtexts.length === 0) return;
        gsap.to(subtexts, {
            y: -30, // Move up slightly faster than container
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
};
