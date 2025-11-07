#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Create tablet screenshots from phone screenshots for Google Play Store
Converts to JPG format and resizes for 7-inch and 10-inch tablets
"""

import os
from PIL import Image
import sys

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# Directories
SCREENSHOTS_DIR = "play-store-assets/screenshots"
OUTPUT_7INCH = "play-store-assets/tablet-7inch"
OUTPUT_10INCH = "play-store-assets/tablet-10inch"

# Tablet sizes (9:16 aspect ratio for portrait)
SIZE_7INCH = (1080, 1920)   # 7-inch tablet portrait
SIZE_10INCH = (1536, 2732)  # 10-inch tablet portrait

def ensure_dirs():
    """Create output directories if they don't exist"""
    os.makedirs(OUTPUT_7INCH, exist_ok=True)
    os.makedirs(OUTPUT_10INCH, exist_ok=True)
    print(f"✓ Created directories: {OUTPUT_7INCH}, {OUTPUT_10INCH}")

def resize_and_convert(input_path, output_path, target_size):
    """
    Resize image to target size and convert to JPG
    Maintains aspect ratio by adding padding if needed
    """
    try:
        # Open image
        img = Image.open(input_path).convert('RGB')
        print(f"  Opening: {input_path} ({img.size[0]}x{img.size[1]})")

        # Calculate scaling to fit within target size
        img_ratio = img.size[0] / img.size[1]
        target_ratio = target_size[0] / target_size[1]

        if img_ratio > target_ratio:
            # Image is wider than target - fit to width
            new_width = target_size[0]
            new_height = int(new_width / img_ratio)
        else:
            # Image is taller than target - fit to height
            new_height = target_size[1]
            new_width = int(new_height * img_ratio)

        # Resize image
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Create new image with target size (white background)
        result = Image.new('RGB', target_size, (255, 255, 255))

        # Calculate position to center the resized image
        x = (target_size[0] - new_width) // 2
        y = (target_size[1] - new_height) // 2

        # Paste resized image onto centered position
        result.paste(img_resized, (x, y))

        # Save as JPG with high quality
        result.save(output_path, 'JPEG', quality=95, optimize=True)
        print(f"  ✓ Saved: {output_path} ({target_size[0]}x{target_size[1]})")

        return True
    except Exception as e:
        print(f"  ✗ Error processing {input_path}: {e}")
        return False

def process_screenshots():
    """Process all screenshots in the screenshots directory"""

    # Get all PNG files from screenshots directory
    if not os.path.exists(SCREENSHOTS_DIR):
        print(f"✗ Screenshots directory not found: {SCREENSHOTS_DIR}")
        return

    png_files = [f for f in os.listdir(SCREENSHOTS_DIR) if f.endswith('.png')]

    if not png_files:
        print(f"✗ No PNG screenshots found in {SCREENSHOTS_DIR}")
        return

    print(f"\nFound {len(png_files)} screenshot(s) to process\n")

    for idx, png_file in enumerate(sorted(png_files), 1):
        input_path = os.path.join(SCREENSHOTS_DIR, png_file)
        base_name = os.path.splitext(png_file)[0]

        print(f"[{idx}/{len(png_files)}] Processing: {png_file}")

        # Create 7-inch tablet version
        output_7_path = os.path.join(OUTPUT_7INCH, f"{base_name}_7inch.jpg")
        resize_and_convert(input_path, output_7_path, SIZE_7INCH)

        # Create 10-inch tablet version
        output_10_path = os.path.join(OUTPUT_10INCH, f"{base_name}_10inch.jpg")
        resize_and_convert(input_path, output_10_path, SIZE_10INCH)

        print()

    print("=" * 60)
    print("✓ All screenshots processed successfully!")
    print(f"✓ 7-inch tablets: {OUTPUT_7INCH}/")
    print(f"✓ 10-inch tablets: {OUTPUT_10INCH}/")
    print("=" * 60)

def main():
    print("=" * 60)
    print("Google Play Store - Tablet Screenshot Generator")
    print("=" * 60)
    print()

    # Ensure output directories exist
    ensure_dirs()

    # Process all screenshots
    process_screenshots()

if __name__ == "__main__":
    main()
