document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const app = document.getElementById('app');

    // --- SMOTH SCROLL SETUP (LENIS) ---
    const lenis = new Lenis({
        duration: 1.5, // Even slower/smoother
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- CONTENT RENDERING ---
    const data = window.wrappedData || [];

    data.forEach((item, index) => {
        const section = document.createElement('section');
        section.className = `story-block type-${item.type}`;
        section.id = `block-${index}`;
        section.dataset.bgcolor = '#ffffff';

        let contentHTML = '';

        if (item.type === 'hero') {
            // Hero now uses header/subtext
            contentHTML = `
                <div class="headline hero-text" style="font-size: clamp(6rem, 16vw, 12rem);">${item.header}</div>
                <div class="subtext hero-subtext" style="font-size: 3rem; letter-spacing: 3px; text-transform: uppercase;">${item.subtext}</div>
            `;
        } else if (item.type === 'stat') {
            // Start Graphic logic
            let graphicHTML = '';
            if (item.graphic) {
                const imgStr = item.graphic.trim();
                if (imgStr.startsWith('<svg') || imgStr.startsWith('<?xml')) {
                        // It's raw SVG
                        graphicHTML = `<div class="svg-container" style="max-height: 100px; display: block; margin: 0 auto 1rem auto; width: 100%; display: flex; justify-content: center;">${item.graphic}</div>`;
                } else {
                    // It's a URL or Base64
                    graphicHTML = `<img src="${item.graphic}" alt="${item.header}" style="max-height: 100px; display: block; margin: 0 auto 1rem auto;">`;
                }
            }
            // End Graphic logic
            
            // Header is optional
            const headerHTML = item.header ? `<div class="headline stat-header">${item.header}</div>` : '';
            
            // Value/Unit are optional (e.g. if just a text stat)
            let valueUnitHTML = '';
            if (item.value || item.unit) {
                valueUnitHTML = `
                <div class="stat-value-container">
                    <span class="stat-value">${item.value || ''}</span>
                    <span class="stat-unit">${item.unit || ''}</span>
                </div>`;
            }

            contentHTML = `
                ${headerHTML}
                ${valueUnitHTML}
                <div class="subtext stat-context">${item.subtext || ''}</div>
                ${graphicHTML}
            `;
        } else if (item.type === 'text') {
            const headerHTML = item.header ? `<div class="headline stat-header">${item.header}</div>` : '';
            const subtextHTML = item.subtext ? `<div class="subtext stat-context">${item.subtext}</div>` : '';
            contentHTML = `
                ${headerHTML}
                ${subtextHTML}
            `;
        } else if (item.type === 'outro') {
             // Outro uses header/subtext too (mapped from prev text/subtext usually, but let's conform)
             // User's example didn't explicitly show 'outro' type in new schema, but data.js has 'text' type for end.
             // But if we stick to the old 'outro' type in data.js or migrate it to text?
             // The user's new schema only mentions "stat", "text", "hero".
             // Let's assume 'outro' is just 'text' type or similar. 
             // However, current data.js has type 'text' for the last item "Here's to 2026!".
             // So we should handle 'text' generally.
             // If there is legacy 'outro', we can map it or just rely on 'text'.
             // I'll keep 'outro' fallback but aligned to use header/subtext if present.
            contentHTML = `
                <div class="headline outro-text" style="font-size: clamp(6rem, 16vw, 12rem);">${item.header || item.text}</div>
                <div class="subtext outro-subtext">${item.subtext || ''}</div>
            `;
        }

        section.innerHTML = `
            <div class="content-wrapper">
                ${contentHTML}
            </div>
        `;
        app.appendChild(section);
    });

    // --- ANIMATION SETUP ---
    const sections = gsap.utils.toArray('.story-block');

    sections.forEach((section, i) => {
        const isHero = i === 0;
        const content = section.querySelector('.content-wrapper');
        const statValue = section.querySelector('.stat-value');
        const subtexts = section.querySelectorAll('.subtext, .stat-unit');

        // 1. Entrance / Flow
        // Continuous flow: Things slide up and stay visible until they go off top naturally.
        // We still want them to "enter" gracefully though.
        if (isHero) {
            gsap.set(content, { opacity: 0, y: 50 });
            gsap.to(content, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.2
            });
        } else {
            // Access the data item for this section
            const item = data[i];

        if (item.animation === 'fadeInOut') {
                gsap.fromTo(content, {
                opacity: 0
            }, {
                opacity: 0, 
                keyframes: {
                    "0%":   { opacity: 0, y: "20vh" },
                    "40%":  { opacity: 1, y: 0 },   // Fully visible near center
                    "60%":  { opacity: 1, y: 0 },   // Stay visible for a bit
                    "100%": { opacity: 0, y: "-20vh" } // Fade out as it goes up
                },
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",   // When top of section hits bottom of viewport
                    end: "bottom top",     // Wait until it hits top to fade out
                    scrub: true            // Smooth scrubbing
                },
                ease: "none"
            });
        } else if (item.animation === 'zoomReveal') {
            gsap.fromTo(content, {
                scale: 0.5,
                opacity: 0
            }, {
                keyframes: {
                    "0%":   { scale: 0.5, opacity: 0 },
                    "50%":  { scale: 1.2, opacity: 1 },
                    "100%": { scale: 1.0, opacity: 1 }
                },
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    end: "bottom top",
                    scrub: 1
                },
                ease: "none"
            });
        } else if (item.animation === 'sideEntrance') {
            gsap.fromTo(content, {
                x: "-100vw",
                opacity: 0
            }, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "center center", // Extend duration
                    scrub: 1
                },
                x: 0,
                opacity: 1,
                ease: "power2.out"
            });
        } else if (item.animation === 'slideRight') {
            gsap.fromTo(content, {
                x: "100vw",
                opacity: 0
            }, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "center center", 
                    scrub: 1
                },
                x: 0,
                opacity: 1,
                ease: "power2.out"
            });
        } else {
            // Animation: 'slideUp' (Default)
            // explicitly check for 'slideUp' or fallback for undefined
            gsap.fromTo(content, {
                opacity: 0,
                y: 150 // Start lower down
            }, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Start animating when section top hits 80% viewport
                    end: "top 40%",   // Fully visible by 40% viewport
                    scrub: 1,
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
        }
        }

        // *NO EXIT ANIMATION* - We removed the code that fades it out at "top -20%".

        // IMAGE ANIMATION (Simple pop in)
        const img = content.querySelector('img');
        if (img) {
            gsap.fromTo(img, { scale: 0.8, opacity: 0 }, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                }
            });
        }

        // 2. Value Highlighting ("Pop" Effect)
        // Only apply if it's the default (slideUp) or fadeInOut. 
        // Don't apply for special entrances to keep them clean.
        let currentAnim; 
        if (data[i]) {
            currentAnim = data[i].animation;
        }
        
        if (statValue && (currentAnim === 'slideUp' || currentAnim === 'fadeInOut' || !currentAnim)) {
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
        }

        // 3. Subtle Background Text Animation
        // Parallax effect for subtext to make it feel detached and "floaty"
        if (subtexts.length > 0) {
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
    });

    // Global Progress Bar
    gsap.to('.progress-bar', {
        width: '100%',
        scrollTrigger: {
            trigger: '#app',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0
        }
    });
});
