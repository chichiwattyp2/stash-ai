# Stash Instagram Content Studio

An AI-powered Instagram content production app specifically designed for the Stash brand. Create professional Instagram content with AI-generated designs, captions, and hashtags.

## Features

### 🎨 Design Studio
- **Instagram Format Presets**: Square (1:1), Story/Reel (9:16), Portrait (4:5), Landscape (1.91:1)
- **Content Categories**: Product Showcase, Promo, Quote, Behind the Scenes, UGC
- **AI Image Generation**: Transform images with brand-consistent designs
- **AI Caption Generation**: Create engaging captions matching your brand voice
- **AI Hashtag Generation**: Generate 15-20 relevant hashtags automatically
- **Instagram Preview**: See exactly how your post will look on Instagram

### 📅 Content Calendar
- **Week & Month Views**: Visualize your content schedule
- **Scheduled Post Management**: Add, edit, and delete scheduled posts
- **Drag-and-Drop Interface**: Easy content organization
- **Batch Generation**: Create multiple days of content at once

### 🎯 Brand Kit
- **Style Guidelines**: Define your brand voice and style rules
- **Brand Colors**: Manage your color palette
- **Logo Library**: Upload and use multiple logo variations
- **Product Catalog**: Manage product images and descriptions
- **Design Templates**: Create reusable content templates with placeholders

### ⚡ Automation
- **Daily Auto-Generation**: Automatically create content every day
- **Template-Based**: Use templates with dynamic placeholders
- **Product Rotation**: Automatically rotate through your product catalog

## Setup

### Prerequisites
- Node.js 18+ installed
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stash-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your Google Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key

4. **Configure your API key**

   Open the `.env` file and add your API key:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:3000`

## How to Use

### Getting Started

1. **Set Up Your Brand Kit** (First Time)
   - Go to the Brand Kit tab
   - Add your style guidelines
   - Add brand colors
   - Upload your logo(s)
   - Add products to your catalog
   - Create design templates

2. **Create Your First Post**
   - Go to Design Studio
   - Select an Instagram format (Square, Story, etc.)
   - Choose a content category
   - Upload an image
   - Add design instructions
   - Click "Generate Instagram Content"
   - Generate caption and hashtags
   - Download or add to calendar

3. **Batch Generate Content**
   - Go to Content Calendar
   - Click "Batch Generate"
   - Select a template
   - Choose number of days (e.g., 7 for a week)
   - Select format
   - Click "Start Generation"
   - Watch as your calendar fills with content!

### Template Placeholders

When creating templates, use these placeholders:

- `[PRODUCT_NAME]` - Name of the product
- `[PRODUCT_DESCRIPTION]` - Product description
- `[DATE]` - Current date
- `[DAY_OF_WEEK]` - Current day of the week

Example template:
```
Showcase our amazing [PRODUCT_NAME] this [DAY_OF_WEEK]!
Perfect for [PRODUCT_DESCRIPTION].
Add vibrant colors and our logo in the corner.
```

## Project Structure

```
stash-ai/
├── index.html          # Main HTML file
├── index.tsx           # Main TypeScript application
├── index.css           # Styles
├── vite.config.ts      # Vite configuration
├── .env                # Environment variables (not in git)
└── README.md           # This file
```

## Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Styling**: Material Design 3
- **AI**: Google Gemini API (2.5 Flash & 2.0 Flash)
- **Build Tool**: Vite
- **Storage**: LocalStorage

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Features in Detail

### AI Caption Generation
- Analyzes your content category and design instructions
- Matches your brand voice from guidelines
- Includes call-to-action
- Optimized length (100-150 characters)

### AI Hashtag Generation
- Generates 15-20 relevant hashtags
- Mix of popular and niche tags
- Always includes #stash
- Optimized for discovery

### Batch Generation
- Generates multiple posts simultaneously
- Uses template system with placeholders
- Rotates through product catalog
- Creates images, captions, and hashtags
- Automatically schedules to calendar

### Content Calendar
- Visual weekly and monthly views
- Click on days to see scheduled posts
- Edit scheduled content
- Delete posts
- Navigate between weeks/months

## Tips for Best Results

1. **Add Detailed Brand Guidelines**: The more context you provide, the better AI-generated content will match your brand
2. **Use High-Quality Product Images**: Better input = better output
3. **Create Multiple Templates**: Different templates for different content types
4. **Experiment with Formats**: Try different Instagram formats for variety
5. **Review Generated Content**: Always review captions and hashtags before posting

## Troubleshooting

### "API Key must be set" Error
- Make sure you've added your API key to the `.env` file
- Restart the dev server after adding the API key
- Check that the key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Image Generation Fails
- Check your internet connection
- Verify your API key has sufficient quota
- Try with a smaller/different image
- Check browser console for specific error messages

### Calendar Not Loading
- Check browser console for errors
- Clear LocalStorage: `localStorage.clear()` in browser console
- Refresh the page

## License

This project is licensed under the Apache License 2.0.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

🤖 Built with [Claude Code](https://claude.com/claude-code)
