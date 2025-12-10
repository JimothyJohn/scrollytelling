#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import base64
import json
import mimetypes
import os

TEMPLATE_FILE = "template.html"
DATA_FILE = "data.json"
OUTPUT_FILE = "index.html"
ASSETS_DIR = "assets"

def get_base64_image(image_path):
    """
    Reads an image file and returns a base64 data URI.
    """
    # Image path from data.json might be 'foo.svg' or 'assets/foo.svg'
    
    full_path = os.path.join(ASSETS_DIR, image_path)
    
    if not os.path.exists(full_path):
        # Fallback: check if the path works as-is (e.g. if user included assets/)
        if os.path.exists(image_path):
            full_path = image_path
        else:
            print(f"Warning: Image not found: {full_path}")
            return image_path # Return original info if not found


    if full_path.lower().endswith(".svg"):
        # SVG: Read as text/XML
        with open(full_path, "r", encoding="utf-8") as f:
            return f.read()

    mime_type, _ = mimetypes.guess_type(full_path)
    if not mime_type:
        mime_type = 'application/octet-stream'

    with open(full_path, "rb") as f:
        encoded_string = base64.b64encode(f.read()).decode('utf-8')
        
    return f"data:{mime_type};base64,{encoded_string}"

def process_data(data):
    """
    Recursively traverses data to find 'image' keys and inline them.
    """
    if isinstance(data, list):
        return [process_data(item) for item in data]
    elif isinstance(data, dict):
        new_dict = {}
        for key, value in data.items():
            if key == "image" and isinstance(value, str):
                print(f"Inlining image: {value}")
                new_dict[key] = get_base64_image(value)
            else:
                new_dict[key] = process_data(value)
        return new_dict
    else:
        return data

def main():
    print("Starting build...")
    
    if not os.path.exists(TEMPLATE_FILE):
        print(f"Error: {TEMPLATE_FILE} not found.")
        exit(1)
        
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.")
        exit(1)

    # 1. Read Data
    with open(DATA_FILE, "r") as f:
        try:
            data_content = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            exit(1)

    # 2. Process Data (Inline Images)
    processed_data = process_data(data_content)
    
    # Convert back to JSON string, then to JS assignment
    json_string = json.dumps(processed_data, indent=4)
    js_content = f"window.wrappedData = {json_string};"
    
    # 3. Read Template
    with open(TEMPLATE_FILE, "r") as f:
        template_content = f.read()

    # 4. Inject Data
    # Look for <script src="data.js"></script>
    # We replaced data.js with JSON, but the template might still use the old tag.
    script_tag = '<script src="data.js"></script>'
    
    if script_tag not in template_content:
        print(f"Warning: {script_tag} not found in template. Appending data to body end.")
        new_content = template_content.replace('</body>', f'<script>\n{js_content}\n</script>\n</body>')
    else:
        replacement = f'<script>\n{js_content}\n</script>'
        new_content = template_content.replace(script_tag, replacement)

    # 5. Write Output
    with open(OUTPUT_FILE, "w") as f:
        f.write(new_content)
        
    print(f"Build complete. Output written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
