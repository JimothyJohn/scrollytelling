document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const app = document.getElementById('app');

    // --- SMOTH SCROLL SETUP (LENIS) ---
    const lenis = new Lenis({
        duration: 2.5, // Even slower/smoother
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
    // The data is now a flat list. 
    // We iterate through it and maintain a "currentSectionAnimation" state.
    // If a type="text" item has a "sectionAnimation" property, we update the state.
    // Subsequent items inherit this unless they have their own "animation".
    
    const rawData = window.wrappedData || [];
    const data = []; // This will contain the final items with resolved 'animation' property.

    let currentSectionAnimation = null;

    rawData.forEach(item => {
        // If it's a context-setting text item
        if (item.type === 'text') {
            if (item.animation !== undefined) {
                currentSectionAnimation = item.animation;
            } else {
                // If it doesn't specify one, reset to static.
                currentSectionAnimation = null;
            }
        }
        
        // Resolve animation for this item
        let finalAnim = item.animation; // Explicit logic
        if (!finalAnim && currentSectionAnimation) {
             finalAnim = currentSectionAnimation; // Inherited logic
        }
        
        // Clone item to avoid mutating original if we re-run
        const newItem = { ...item, animation: finalAnim };
        data.push(newItem);
    });

    data.forEach((item, index) => {
        const section = document.createElement('section');
        // Add animation class for specific styling overrides (e.g. traverse height)
        const animClass = item.animation ? `anim-${item.animation}` : 'anim-static';
        section.className = `story-block type-${item.type} ${animClass}`;
        section.id = `block-${index}`;
        section.dataset.bgcolor = '#ffffff';

        let contentHTML = '';

        if (item.type === 'stat') {
            // Start Graphic logic
            let graphicHTML = '';
            if (item.graphic) {
                let imgStr = '';
                let sizeInput = null;

                // Handle graphic as Object or String
                if (typeof item.graphic === 'object' && item.graphic !== null) {
                    imgStr = (item.graphic.filepath || '').trim();
                    sizeInput = item.graphic.size;
                } else {
                    imgStr = String(item.graphic).trim();
                    sizeInput = null;
                }
                
                // Determine size (default to 100px if not provided)
                let sizeVal = '100px';
                if (sizeInput) {
                    if (typeof sizeInput === 'number') {
                        sizeVal = sizeInput + 'px';
                    } else {
                        sizeVal = sizeInput;
                    }
                }

                if (imgStr.startsWith('<svg') || imgStr.startsWith('<?xml')) {
                        // It's raw SVG
                        graphicHTML = `<div class="svg-container" style="max-height: ${sizeVal}; display: block; margin: 0 auto 1rem auto; width: 100%; display: flex; justify-content: center;">${imgStr}</div>`;
                } else if (imgStr) {
                    // It's a URL or Base64 (only if imgStr is not empty)
                    graphicHTML = `<img src="${imgStr}" alt="${item.header}" style="max-height: ${sizeVal}; display: block; margin: 0 auto 1rem auto;">`;
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
        const content = section.querySelector('.content-wrapper');
        const statValue = section.querySelector('.stat-value');
        const subtexts = section.querySelectorAll('.subtext, .stat-unit');

        // Access the data item for this section (already flattened)
        const item = data[i];
        
        // Resolve animation function
        // If item.animation is set (inherited or explicit), use it.
        // Otherwise, do NOTHING (static scroll).
        if (item.animation && window.Animations[item.animation]) {
            window.Animations[item.animation](content, section, item);
        }

        // IMAGE ANIMATION
        // Only run if there is an animation, otherwise static
        const img = content.querySelector('img');
        if (item.animation && window.Animations.popIn) {
            window.Animations.popIn(img, section);
        }

        // 2. Value Highlighting ("Pop" Effect)
        // Only apply if it's 'slideUp' or 'fadeInOut'
        if (statValue && (item.animation === 'slideUp' || item.animation === 'fadeInOut')) {
            if (window.Animations.popStat) {
                window.Animations.popStat(statValue, section);
            }
        }

        // 3. Subtle Background Text Animation
        // Always good to have a little life, but user said "static along with users movement".
        // Let's only Apply parallax if there is an animation defined to stick to the rule.
        if (item.animation && window.Animations.parallaxSubtext) {
            window.Animations.parallaxSubtext(subtexts, section);
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
