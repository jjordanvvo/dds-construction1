# DD's Construction — Website

Premium single-page website for DD's Construction, Sacramento CA.  
Built with plain HTML/CSS/JS — no build step required.

---

## File Structure

```
dds-construction/
├── index.html        # Main HTML (all sections)
├── styles.css        # All styles (CSS custom properties, responsive)
├── script.js         # Interactions, animations, form handling
├── logo.png          # Company logo (place your file here)
├── netlify.toml      # Netlify deployment config (includes Netlify Forms)
├── vercel.json       # Vercel deployment config (alternative)
└── README.md         # This file
```

---

## Logo — Making the Background Transparent

The site references `logo.png`. For the best result on the dark navbar, the logo should have a **transparent background** (not white).

### Quick fix using free tools:
1. Go to **remove.bg** or **Adobe Express** (free)
2. Upload your `logo.png`
3. Download the transparent PNG
4. Replace `logo.png` in this folder with the new file

### Or use an image editor:
- **GIMP** (free): Filters → Script-Fu → Console → `(gimp-image-get-active-drawable (car (gimp-file-load RUN-NONINTERACTIVE "logo.png" "logo.png")))` then use "Select by Color" on the white background → Delete → Export as PNG
- **Photoshop**: Magic Wand → select white → Delete → Save as PNG-24 with transparency

> **Fallback**: The site includes a text fallback ("DD's Construction" in serif + gold) that appears automatically if `logo.png` fails to load.

---

## Deploy to Netlify (Recommended — free)

### Option A: Drag & Drop (easiest)
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. From your dashboard, drag the **entire `dds-construction` folder** onto the deploy drop zone
3. Your site is live in ~30 seconds

### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
cd dds-construction
netlify deploy --prod --dir .
```

### Option C: Connect to Git
1. Push this folder to a GitHub/GitLab repo
2. In Netlify: New site → Import from Git → select your repo
3. Build settings: Leave blank (no build command needed), Publish directory: `.`
4. Deploy

### Custom Domain
1. Netlify Dashboard → Site settings → Domain management → Add custom domain
2. Enter `ddsconstructionca.com`
3. Update your DNS: Add a CNAME pointing to your Netlify subdomain (or use Netlify DNS)

### Netlify Forms (Contact Form)
The contact form is pre-wired for Netlify Forms — **no backend code needed**.  
After deploying:
1. Go to Netlify Dashboard → Forms
2. You'll see form submissions appear there automatically
3. Set up email notifications: Forms → contact → Form notifications → Add notification

---

## Deploy to Vercel (Alternative)

### Via Vercel CLI
```bash
npm install -g vercel
cd dds-construction
vercel --prod
```

### Via Dashboard
1. Go to [vercel.com](https://vercel.com) and sign up
2. New Project → Import folder or connect GitHub repo
3. Framework Preset: **Other**
4. Root Directory: `.`
5. Deploy

> **Note**: Vercel doesn't have a built-in form service like Netlify. For the contact form on Vercel, sign up at [formspree.io](https://formspree.io) (free tier), get your form endpoint, and update the `action` attribute on the form in `index.html`.

---

## Customization Guide

### Colors (`styles.css` top of file)
```css
--accent:    #D4890A;   /* Main gold — change to match logo */
--accent-lt: #E89B1C;   /* Lighter gold for gradients */
```

### Company info — search and replace in `index.html`:
- Phone: `(916) 708-7055`
- Email: `info@ddsconstructionca.com`
- License number: `#XXXXXXX` → your actual CA license number

### Adding a favicon
Create a `favicon.ico` (or `favicon.png`) and add to `<head>` in `index.html`:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

### Google Analytics
Add before `</head>` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Performance Notes

- All Unsplash images load via URL (no local storage needed)
- Images below the fold use `loading="lazy"` (native browser lazy loading)
- Google Fonts loaded with `preconnect` for faster initial paint
- CSS and JS are single files — minimal HTTP requests
- Netlify CDN automatically serves from edge nodes worldwide

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions).  
Uses: CSS custom properties, Intersection Observer, CSS Grid, `aspect-ratio`, `clamp()`.  
All have >96% global support as of 2026.

---

## License

All content and design created for DD's Construction.  
Unsplash images are free to use under the [Unsplash License](https://unsplash.com/license).
