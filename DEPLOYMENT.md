# GitHub Pages + Formspree Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages with Formspree for free email handling.

## 🚀 Quick Deployment Steps

### 1. Setup Formspree (Free Email Service)

1. **Create Formspree Account**
   - Go to [formspree.io](https://formspree.io)
   - Sign up with your email (no payment info required)

2. **Create New Form**
   - Click "New Form"
   - Name it "Portfolio Contact"
   - Copy the form endpoint URL (looks like: `https://formspree.io/f/abcd1234`)

3. **Add Environment Variable**
   - Create a `.env` file in your project root:
   ```bash
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id_here
   ```

### 2. Setup GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Configure GitHub Repository**
   - Go to your GitHub repository
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

3. **Add Formspree Secret**
   - In GitHub repo: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_FORMSPREE_ENDPOINT`
   - Value: `https://formspree.io/f/your_form_id_here`

4. **Deploy**
   - The GitHub Action will automatically run
   - Your site will be available at: `https://yourusername.github.io/Amit_Tiwari/`

## 🔧 Configuration Files Created

- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automatic deployment
- **`vite.config.ts`**: Updated for GitHub Pages base path
- **`client/src/components/Contact.tsx`**: Updated to use Formspree

## 💰 Cost Breakdown

| Service | Cost | Limit |
|---------|------|-------|
| GitHub Pages | **Free** | 1GB storage, 100GB bandwidth/month |
| Formspree | **Free** | 50 form submissions/month |
| **Total** | **$0/month** | Perfect for portfolios |

## 🧪 Testing

1. **Local Testing**
   ```bash
   npm run dev
   ```
   - Test the contact form (it will use your Formspree endpoint)

2. **Production Testing**
   - After deployment, test the live contact form
   - Check your email for form submissions

## 📝 Formspree Features (Free Tier)

- ✅ **50 submissions/month** (more than enough for a portfolio)
- ✅ **Email notifications**
- ✅ **Spam protection**
- ✅ **File uploads**
- ✅ **Custom redirect after submission**
- ✅ **No payment info required**

## 🔗 Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. **Add CNAME file** in your repository root:
   ```
   yourdomain.com
   ```

2. **Configure DNS** with your domain provider:
   - Add CNAME record pointing to `yourusername.github.io`

3. **Update vite.config.ts**:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/' : '/',
   ```

## 🆘 Troubleshooting

**Contact form not working?**
- Check if `VITE_FORMSPREE_ENDPOINT` is set correctly
- Verify the Formspree form ID is correct
- Check browser console for errors

**GitHub Pages deployment failing?**
- Ensure the repository secret is added
- Check the Actions tab for deployment logs

**404 errors on GitHub Pages?**
- Make sure the base path in `vite.config.ts` matches your repo name (`/Amit_Tiwari/`)
- If you rename your repository, update the base path in `vite.config.ts`
- For custom domains, set base to `'/'`

**Need to change repository name?**
- Update the base path in `vite.config.ts` line 21: `'/YourNewRepoName/'`
- Update the URL in this guide to match your new repository name