# Annual Reflection Guide Landing Page

## Setup Instructions

### 1. Create a new folder on your computer

Create a folder called `reflection-guide-landing` and put these files inside:
```
reflection-guide-landing/
├── index.html
├── package.json
└── api/
    └── subscribe.js
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
cd reflection-guide-landing
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to vercel.com and sign in
2. Click "Add New" → "Project"
3. Choose "Import Git Repository" or drag/drop your folder
4. Click "Deploy"

### 3. Add Environment Variables

After deploying, go to your project settings in Vercel:

1. Click on your project
2. Go to "Settings" → "Environment Variables"
3. Add these two variables:

| Name | Value |
|------|-------|
| `BEEHIIV_API_KEY` | `ipLIlelLMqze4tvSOjrpWAaR017BGBxN3jIBjuTzMwwC4LNH9tWTCjmXkwliDuhf` |
| `BEEHIIV_PUBLICATION_ID` | `pub_752df1b2-f815-4c75-9c8a-96f87379d7d1` |

4. Click "Save"
5. Go to "Deployments" and click "Redeploy" on the latest deployment

### 4. Test

1. Visit your Vercel URL (something like `reflection-guide-landing.vercel.app`)
2. Enter a test email
3. Check Beehiiv Audience to confirm the subscriber was added with the tag
4. Confirm your automation sends the PDF email

### 5. Custom Domain (Optional)

To use a custom domain like `nikolaskonstantin.com/reflection-guide`:

1. In Vercel, go to "Settings" → "Domains"
2. Add your domain
3. Follow Vercel's DNS instructions

---

## How It Works

1. User enters email on landing page
2. JavaScript sends email to `/api/subscribe`
3. Vercel function calls Beehiiv API with your credentials
4. Beehiiv adds subscriber with `reflection-guide-download` tag
5. Your Beehiiv automation triggers and sends the PDF email
6. User sees "Thank you" message

## Troubleshooting

**Form submits but nothing happens**
- Check browser console for errors (F12 → Console)
- Verify environment variables are set in Vercel
- Make sure you redeployed after adding env vars

**Subscriber added but no email sent**
- Check your Beehiiv automation is ACTIVE
- Verify the tag filter matches exactly: `reflection-guide-download`

**CORS errors**
- The API already has CORS headers, but if issues persist, check Vercel logs
