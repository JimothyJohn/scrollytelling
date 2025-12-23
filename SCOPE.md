**Project Title:** Scrollytelling Experience

**Role:** You are a Senior Frontend Developer with expertise in creative coding, animation, and visualization.

**Objective:** Create a single-page web application that acts as an engaging story in a fun, animated, "scrollytelling" format.

**Core Philosophy:** The experience should feel dynamic and playful. It is telling a story through movement.

---

### 1. Technical Architecture & Constraints

- **Delivery:** The final output must be an `index.html` file that can be opened in any modern browser. It will reference local files like script.js, style.css, and graphics in [assets](assets/).
- **Publication:** This will be hosted as a static website.
- **Dependencies:** CSS-only scroll-driven animations are required, no external libraries can be used.

### 2. Functional Requirements: The "Infinite" Scroll

The core interaction is a long vertical scroll. It is not truly "infinite" in the sense of dynamically loading endless content, but rather a long, sequential narrative page.

- **Behavior:** The page likely starts with a title card. As the user scrolls down, new sections enter the viewport.
- **Scroll Triggering:** Elements must react to the scroll position. They should not just be static on the page. For example:

### 3. Content Structure (Data Input)

We need an easy way for a non-developer to update the story. The content should be separated from the structure, ideally defined in a JSON object in data.js.

**Proposed JSON Data Schema:**

The application should iterate through an array of story objects. The list of objects will determine the order of appearance. Each object should support:

- type: The type of block (e.g., "stat", "text", "hero"). Both will have a header and/or subtext.
    - "stat": A data story block with a header, value, subtext, graphic, and animation.
    - "text": A text block with a header and/or subtext.
- header: The measurement e.g. “number of pins crimped”
- value: The main stat 27,000 (the number of pins crimped).
- subtext: The fun comparison (e.g., "That’s enough to shake hands with every person in Key West!").
- graphic: (Optional) Relative path to a supporting graphic in the assets folder (e.g., `./assets/state-shape.png`).
- animation: (Optional) A tag to vary the animation slightly between blocks so it doesn't look repetitive (e.g., "zoom-in", "slide-left", "pop-up").

**Example Data Payload (for testing):**

JSON

```jsx
[
	{ 
        type: "text", 
        header: "07:00 AM", 
        subtext: "System initializing...",
        animation: "fadeInOut" 
    },
    { 
        type: "stat", 
        header: "Snooze Button", 
        value: "Hit 5x", 
        subtext: "Just 5 more minutes...",
        unit: "regrets"
    },
    { 
        type: "stat", 
        header: "Will to Rise", 
        value: "Loading...", 
        subtext: "Please wait.",
        graphic: { filepath: "assets/handshake.svg", size: 100 }
    }
]
```

### 4. Visual Design Directives

- **Typography:** Text animation is crucial. The user loves seeing text "come to life." The headline and subtext should animate slightly differently (e.g., staggered entrance).
- **Graphics:** The layout needs to accommodate a graphic alongside the text blocks. The graphics should participate in the entrance/exit animations. The graphics should match the accent color of the page.
- **Colors**: The background should be a very subtle off-white diagonal gradient, the text should be gray (#5e6565), but the values should be accented in green (#79b533)

### 5. Definition of Done

The request is complete when:

1. I have an 'index.html' with associated files (CSS, JS, and HTML structure).
2. There is a clear configuration section at the top of the Javascript where I can copy my JSON data array.
3. Scrolling the page results in the data blocks entering, subtly moving while visible, and exiting the screen with smooth, high-quality animations.
4. The layout is responsive and looks good on desktop and laptop screens.
