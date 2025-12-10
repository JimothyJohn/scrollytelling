**Project Title:** Internal "Company Wrapped" Scrollytelling Experience

**Role:** You are a Senior Frontend Developer with expertise in creative coding, animation, and data visualization.

**Objective:** Create a single-page web application that acts as an engaging end-of-year newsletter for employees. The concept is inspired by "Spotify Wrapped," presenting company statistics in a fun, animated, "scrollytelling" format.

**Core Philosophy:** The experience should feel dynamic and playful. It is not just presenting data; it is telling a story through movement.

---

### 1. Technical Architecture & Constraints

- **Delivery:** The final output must be a single `index.html` file that can be opened in any modern browser.
    - *Constraint Note:* While the goal is a single file, we acknowledge that external assets (images/graphics) make this difficult. The solution is to incorporate a build.py script that is able to embed the data JSON file into the script tag and the images as base64.
- **Privacy:** This will be hosted on a private internal network. No authentication or external database connections are required.
- **Dependencies:** CSS-only scroll-driven animations are required, no external libraries can be used. No JS external libraries may be used either.

### 2. Functional Requirements: The "Infinite" Scroll

The core interaction is a long vertical scroll. It is not truly "infinite" in the sense of dynamically loading endless content, but rather a long, sequential narrative page.

- **Behavior:** The page starts with a title card and a subtext that says “scroll down” with arrows indicating what to do. As the user scrolls down, discrete "Data Story Blocks" enter the viewport.
- **Scroll Triggering:** Elements must react to the scroll position. They should not just be static on the page.
    - **Entrance:** As a block enters the bottom of the viewport, it should fade in.
    - **Active State:** While the block is in the center of the viewport, it should have subtle, continuous movement (e.g., a slow floating effect, a gentle panning motion) to keep it feeling "alive." The animation type will be selected in the data.json file.
    - **Exit:** As the block leaves the top of the viewport, it should slowly fade way to an opacity level of 0.

### 3. Content Structure (Data Input)

We need an easy way for a non-developer to update the stats and text. The content should be separated from the structure, ideally defined in a JSON object embedded within a `<script>` tag at the top of the HTML file.

**Proposed JSON Data Schema:**

The application should iterate through an array of story objects. Each object should support:

1. **`id`**: Unique identifier indicating order (e.g., 1, 2, 3).
2. header: The measurement e.g. “number of pins crimped”
3. value: The main stat 27,000 (the number of pins crimped).
4. subtext: The fun comparison (e.g., "That’s enough to shake hands with every person in Key West!").
5. **graphic**: (Optional) Relative path to a supporting graphic in the assets folder (e.g., `./assets/state-shape.png`).
6. **`animation`**: (Optional) A tag to vary the animation slightly between blocks so it doesn't look repetitive (e.g., "zoom-in", "slide-left", "pop-up").

**Example Data Payload (for testing):**

JSON

```jsx
[
	{
		type: "stat",
		header: "Coffee consumed",
    value: "4,500",
    unit: "gallons",
    context: "Fueling innovation, one cup at a time.",
    image: "assets/graphic-coffee.svg",
    animation: "zoom-in"
	}
]
```

### 4. Visual Design Directives

- **Typography:** Text animation is crucial. The user loves seeing text "come to life." The headline and subtext should animate slightly differently (e.g., staggered entrance).
- **Graphics:** The layout needs to accommodate a graphic alongside the text blocks. The graphics should participate in the entrance/exit animations. The graphics should match the accent color of the page.
- **Colors**: The background should be a very subtle off-white diagonal gradient, the text should be gray (#5e6565), but the values should be accented in green (#79b533)

### 5. Definition of Done

The request is complete when:

1. I have a single `index.html` file containing the CSS, JS, and HTML structure.
2. There is a clear configuration section at the top of the Javascript where I can paste my JSON data array.
3. Scrolling the page results in the example data blocks entering, subtly moving while visible, and exiting the screen with smooth, high-quality animations.
4. The layout is responsive and looks good on desktop and laptop screens.
