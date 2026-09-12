# Deployment Guide

## Prerequisites

- Node.js 18+
- Git
- A commercetools account
- A hosting platform (Vercel, AWS, etc.)

## Environment Variables

Set the following environment variables on your hosting platform:

```
NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY=your_project_key
NEXT_PUBLIC_COMMERCETOOLS_CLIENT_ID=your_client_id
COMMERCETOOLS_CLIENT_SECRET=your_client_secret
COMMERCETOOLS_API_URL=https://api.sphere.it
COMMERCETOOLS_AUTH_URL=https://auth.sphere.it
NEXT_PUBLIC_APP_URL=your_production_url
```

## Vercel Deployment

### Step 1: Push to GitHub

```bash
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Import Project in Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure project settings
5. Add environment variables
6. Deploy

### Step 3: Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records at your domain provider

## AWS Deployment

### Using AWS Amplify

1. Connect your GitHub repository to AWS Amplify
2. Configure build settings (auto-detected for Next.js)
3. Add environment variables
4. Deploy

### Using EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <your-repo>
cd commercetools-b2c-storefront

# Install dependencies
npm install

# Build project
npm run build

# Start with PM2
sudo npm install -g pm2
pm2 start "npm start" --name "storefront"
pm2 startup
pm2 save
```

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Push

```bash
docker build -t storefront:latest .
docker run -p 3000:3000 storefront:latest
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify API connections
- [ ] Check mobile responsiveness
- [ ] Test checkout flow
- [ ] Verify SSL certificate
- [ ] Set up monitoring/logging
- [ ] Configure CDN if needed
- [ ] Set up automated backups
- [ ] Monitor performance metrics

## Monitoring

### Vercel Analytics

- Visit Vercel dashboard for real-time metrics
- Monitor Core Web Vitals
- Track error rates

### Application Monitoring

Consider using:
- Sentry for error tracking
- New Relic for performance monitoring
- DataDog for comprehensive monitoring

## Scaling

### Database Caching

- Implement Redis for cart/session caching
- Use CDN for static assets

### API Rate Limiting

- Implement request queuing
- Add caching layers
- Monitor commercetools API usage

## Security

- Enable HTTPS (automatic with Vercel/AWS)
- Set security headers (configured in `next.config.ts`)
- Rotate API credentials regularly
- Use environment variables for secrets
- Implement rate limiting
- Add CORS protection

## Troubleshooting

### Build Failures

```bash
# Clear build cache
rm -rf .next
npm run build
```

### Performance Issues

- Check API response times
- Monitor image optimization
- Review bundle size
- Use Next.js Analytics

### API Connection Issues

- Verify environment variables
- Check API credentials
- Review network logs
- Contact commercetools support
