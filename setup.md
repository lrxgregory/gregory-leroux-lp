# 🚀 Quick Setup Guide

Welcome! This guide will help you customize this landing page template for a new client in **under 30 minutes**.

---

## ⏱️ Quick Start (10 Minutes)

### Step 1: Clone the Project

```bash
git clone [this-repo-url] [client-name]-website
cd [client-name]-website
npm install
```

### Step 2: Choose Pricing Plan

**First, select the pricing plan the client purchased:**

**Open `src/config/client.ts`** and set the pricing plan:

```typescript
export const clientData: ClientConfig = {
  // 🔥 STEP 1: Choose pricing plan
  pricingPlan: 'pro', // Options: 'vitrine' | 'pro' | 'premium' | 'custom'

  // Leave undefined for standard plan, or customize features:
  featureOverrides: undefined,
```

**Pricing Plans:**
- **Vitrine** (890€ HT): Basic visibility (no contact form, no reviews)
- **Pro** (1490€ HT) ⭐ **Most Popular**: Contact form + Google reviews + FAQ
- **Premium** (2490€ HT): Pro + CMS editing + Booking system + Google Business

See full feature comparison in [CUSTOMIZATION.md](CUSTOMIZATION.md#-pricing-plans--feature-flags)

### Step 3: Configure Client Data

**Continue in `src/config/client.ts`** - Update client information:

```typescript
  // 🔥 STEP 2: Update business information
  business: {
    name: 'Your Client Name',              // ⬅️ CHANGE THIS
    tagline: 'Their tagline',              // ⬅️ CHANGE THIS
    description: 'Full description...',     // ⬅️ CHANGE THIS
    industry: 'plumber' // or electrician, heating, contractor, landscaper
  },

  contact: {
    phone: {
      main: '01 23 45 67 89',              // ⬅️ CHANGE THIS
      mainLink: '+33123456789',             // ⬅️ CHANGE THIS
      whatsapp: '33123456789',              // ⬅️ CHANGE THIS (no +)
    },
    email: {
      main: 'contact@client.com',           // ⬅️ CHANGE THIS
    },
    address: {
      street: 'Client Address',             // ⬅️ CHANGE THIS
      city: 'City',                         // ⬅️ CHANGE THIS
      postalCode: '12345',                  // ⬅️ CHANGE THIS
    }
  },

  // ... continue updating all sections
}
```

### Step 4: Update Site Configuration

**Open `src/config/config.ts`**:

```typescript
export const configData: Config = {
  siteTitle: 'Client Name - Service | Location',  // ⬅️ CHANGE THIS
  siteDescription: 'SEO description...',          // ⬅️ CHANGE THIS
  // ...
}
```

### Step 5: Setup Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# SendGrid API Key (for contact form)
SENDGRID_API_KEY=your_sendgrid_api_key

# Email addresses
EMAIL_FROM=contact@client.com        # ⬅️ CHANGE THIS
EMAIL_TO=contact@client.com          # ⬅️ CHANGE THIS

# Site URL
PUBLIC_SITE_URL=https://client.com   # ⬅️ CHANGE THIS
```

### Step 5: Test Locally

```bash
npm run dev
```

Visit `http://localhost:4321` and verify:
- [  ] Business name displays correctly
- [ ] Phone numbers work
- [ ] Email addresses correct
- [ ] Address is accurate
- [ ] Services are relevant

---

## 🎨 Customization (20 Minutes)

### Update Colors

**Open `tailwind.config.mjs`**:

```javascript
colors: {
  primary: {
    // Change these to match client's brand
    '500': '#267dd1',  // Main brand color
    '600': '#1862b1',  // Darker shade
    // ...
  }
}
```

**Tip**: Use [tailwindshades.com](https://www.tailwindshades.com/) to generate a color palette.

### Replace Images

1. **Logo**: Replace `/public/logo.svg` with client logo
2. **Favicon**: Replace `/public/favicon.ico`
3. **OG Image**: Replace `/public/og.jpg` (1200x630px)
4. **Service Images**: Replace images in `/src/assets/cards/`

**Image Requirements**:
- Service cards: 800x600px (aspect ratio 4:3)
- OG image: 1200x630px
- Logo: SVG format (scalable)
- Favicon: 32x32px ICO or PNG

### Update Services

In `src/config/client.ts`, update the `services` array:

```typescript
services: [
  {
    title: 'Service Name',
    subtitle: 'Short tagline',
    description: 'Full description of the service...',
    image: '/src/assets/cards/service1.jpg'  // Your image path
  },
  // Add more services...
]
```

### Update FAQ

In `src/config/client.ts`, update the `faq` array:

```typescript
faq: [
  {
    question: 'Common question?',
    answer: 'Detailed answer...'
  },
  // Add more FAQ items...
]
```

### Update Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for client's address
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Update `location.mapEmbedUrl` in `src/config/client.ts`

### Configure Social Media & WhatsApp (Optional but Recommended)

In `src/config/client.ts`, update the `socialMedia` section:

```typescript
socialMedia: {
  facebook: 'https://facebook.com/yourpage',      // ⬅️ Client's Facebook page
  instagram: 'https://instagram.com/yourprofile',  // ⬅️ Client's Instagram
  linkedin: 'https://linkedin.com/company/name',   // ⬅️ Optional (B2B)
  // twitter, youtube, tiktok also available

  // WhatsApp Configuration (NEW!)
  whatsapp: {
    enabled: true,                                 // ⬅️ Show WhatsApp in floating buttons
    number: '33612345678',                        // ⬅️ WhatsApp number (no +)
    message: 'Bonjour, je souhaite un devis.'     // ⬅️ Pre-filled message
  },

  floatingButtons: {
    enabled: true,                                 // Show floating buttons (includes WhatsApp)
    position: 'bottom-right'                      // Where to position them
  }
}
```

**How it works:**
- WhatsApp appears **FIRST** in floating buttons (green, most visible)
- Followed by Facebook, Instagram, etc.
- Max 3 platforms shown in floating buttons
- All platforms also appear in footer social links

**Options:**

**Disable WhatsApp:**
```typescript
whatsapp: { enabled: false }
```

**Disable all floating buttons** (keep only footer links):
```typescript
floatingButtons: { enabled: false }
```

**Note:**
- If client has **no social media**, leave `socialMedia` undefined
- All components automatically hide if not configured
- Positions available: `bottom-right`, `bottom-left`, `top-right`, `top-left`

### Configure Footer Branding (Your Free Advertising!)

```typescript
footerBranding: {
  enabled: true,              // Show your branding in footer
  text: 'Site créé par',
  link: 'https://yoursite.com',
  name: 'Your Name'
}
```

**Business Strategy:**
- Keep `enabled: true` by default for free marketing
- Offer to remove branding as premium option (+150€)
- Small, unobtrusive placement at very bottom of footer

---

## 📋 Complete Checklist

### Business Information
- [ ] Business name
- [ ] Tagline/subtitle
- [ ] Full description
- [ ] Industry type

### Contact Details
- [ ] Main phone number
- [ ] Secondary phone (if applicable)
- [ ] WhatsApp number
- [ ] Email address
- [ ] Physical address
- [ ] Business hours

### Reviews & Social Proof
- [ ] Google reviews rating
- [ ] Number of reviews
- [ ] Review link (Google/Yelp/etc.)
- [ ] Trust badges/certifications

### Social Media (Optional)
- [ ] Facebook page URL
- [ ] Instagram profile URL
- [ ] LinkedIn company page
- [ ] Twitter/X profile
- [ ] YouTube channel
- [ ] TikTok profile
- [ ] Enable/disable floating social buttons
- [ ] Choose floating button position

### Location
- [ ] GPS coordinates
- [ ] Google Maps embed URL
- [ ] Service areas/cities

### Services
- [ ] Update all service titles
- [ ] Update service descriptions
- [ ] Replace service images
- [ ] Verify service relevance

### FAQ
- [ ] Update all questions
- [ ] Update all answers
- [ ] Add industry-specific FAQs
- [ ] Remove irrelevant FAQs

### Branding
- [ ] Replace logo
- [ ] Update favicon
- [ ] Change primary color
- [ ] Update OG image

### SEO
- [ ] Page title (config.ts)
- [ ] Meta description (config.ts)
- [ ] Keywords (client.ts)
- [ ] OG image updated

### Environment
- [ ] SendGrid API key configured
- [ ] Email addresses set
- [ ] Site URL configured

### Testing
- [ ] Contact form works
- [ ] Phone links work (mobile)
- [ ] Email links work
- [ ] WhatsApp button works
- [ ] Google Maps loads
- [ ] All images display
- [ ] Dark mode works
- [ ] Mobile responsive

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial setup for [Client Name]"
git remote add origin [your-github-repo]
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `SENDGRID_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`
   - `PUBLIC_SITE_URL`
6. Click "Deploy"

**Done!** Your site will be live at `https://[project-name].vercel.app`

### Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add client's domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🧪 Testing Checklist

Before showing to client, test:

### Desktop
- [ ] Homepage loads correctly
- [ ] All sections display properly
- [ ] Contact form submits successfully
- [ ] Phone numbers are clickable
- [ ] Email links work
- [ ] Google Maps displays
- [ ] Reviews section accurate
- [ ] FAQ expands/collapses
- [ ] Dark mode toggle works

### Mobile
- [ ] Responsive layout works
- [ ] Navigation menu opens
- [ ] WhatsApp button appears
- [ ] Phone numbers tap-to-call
- [ ] Forms are usable
- [ ] Images load properly
- [ ] Text is readable

### Performance
- [ ] PageSpeed score > 90
- [ ] Images optimized
- [ ] No console errors
- [ ] Fast load time

---

## 🆘 Troubleshooting

### Contact Form Not Working

**Problem**: Form submission fails
**Solution**:
1. Check `.env` file has correct `SENDGRID_API_KEY`
2. Verify SendGrid account is active
3. Check browser console for errors
4. Test SendGrid API key separately

### Images Not Loading

**Problem**: Service images don't appear
**Solution**:
1. Verify image paths in `client.ts`
2. Check images exist in `/src/assets/cards/`
3. Ensure correct file extensions (.jpg, .png, .webp)
4. Run `npm run dev` to rebuild

### WhatsApp Button Not Working

**Problem**: WhatsApp link doesn't open
**Solution**:
1. Verify phone number format in `client.ts` (no + or spaces)
2. Test on mobile device (WhatsApp must be installed)
3. Check browser console for errors

### Maps Not Displaying

**Problem**: Google Maps doesn't load
**Solution**:
1. Verify embed URL is correct
2. Check URL includes all parameters
3. Ensure no API restrictions
4. Test URL in browser directly

---

## 📞 Support

If you need help:

1. Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for advanced options
2. Review the [CLAUDE.md](CLAUDE.md) for technical architecture
3. Check component-specific documentation in code comments

---

## ⏭️ Next Steps

After basic setup is complete:

1. **Content Review**: Have client review all text
2. **Image Quality**: Get professional photos if needed
3. **SEO Optimization**: Submit sitemap to Google Search Console
4. **Google Business**: Link to Google Business Profile
5. **Analytics**: Set up Google Analytics tracking
6. **Legal Pages**: Customize privacy policy and terms

---

**🎉 Congratulations!** Your client's website is ready to launch!
