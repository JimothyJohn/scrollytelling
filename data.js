window.wrappedData = [
    // 1. fadeInOut (Text)
    { 
        type: "text", 
        header: "07:00 AM", 
        subtext: "System initializing...",
        animation: "fadeInOut" 
    },
    
    // 2. typewriter (Stat)
    { 
        type: "stat", 
        header: "WPM", 
        value: "120", 
        subtext: "Loud mechanical keyboard noises.",
        animation: "typewriter",
        valAnimation: "valGlow"
    },

    // 3. sideEntrance (Text)
    { 
        type: "text", 
        header: "09:00 AM", 
        subtext: "Physically here. Mentally buffering.",
        animation: "sideEntrance",
        direction: "left"
    },

    // 4. slideUp (Stat)
    { 
        type: "stat", 
        header: "Coffees Consumed", 
        value: "3", 
        subtext: "Heart rate optimizing.",
        animation: "slideUp",
        valAnimation: "valGrow"
    },

    // 5. zoomReveal (Text)
    { 
        type: "text", 
        header: "12:00 PM", 
        subtext: "Zooming in on the details.",
        animation: "zoomReveal"
    },

    // 6. traverse (Stat)
    { 
        type: "stat", 
        header: "Browser Tabs", 
        value: "∞", 
        subtext: "I might need that one from 3 weeks ago.",
        animation: "traverse",
        direction: "right"
    },

    // 7. flyIn (Text)
    {
        type: "text",
        header: "03:00 PM",
        subtext: "PagerDuty Triggered.",
        animation: "flyIn",
        direction: "left"
    },

    // 8. jump (Stat)
    { 
        type: "stat", 
        header: "Production DB", 
        value: "Dropped", 
        subtext: "Did you take a backup?",
        animation: "jump",
        direction: "right",
        valAnimation: "valGlow"
    },

    // 9. springHold (Text)
    {
        type: "text",
        header: "06:00 PM",
        subtext: "System shutdown.",
        animation: "springHold"
    },

    // 10. againstTheGrain (Stat)
    { 
        type: "stat", 
        header: "Bugs", 
        value: "Crawling", 
        subtext: "Why are they going backwards?",
        animation: "againstTheGrain"
    },

    // 11. fadewrite (Text)
    {
        type: "text",
        header: "Epilogue",
        subtext: "Fading into the void.",
        animation: "fadewrite"
    }
];