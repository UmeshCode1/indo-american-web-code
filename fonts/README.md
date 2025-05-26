# Fonts Directory

This directory should contain custom fonts for the Indo American Play School website.

## Important Note

If you're seeing this file but no fonts, you may be using Google Fonts or other web font services instead of local fonts.

## Current Font Usage

The website currently uses the following fonts:
- Baloo 2 (headings)
- Nunito (body text)

These fonts are loaded from Google Fonts as indicated in the HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
```

## Adding Local Fonts

If you want to use local fonts instead of Google Fonts:
1. Add the font files to this directory (.woff2, .woff, .ttf, etc.)
2. Update the CSS to use @font-face declarations
3. Remove the Google Fonts link from HTML files
