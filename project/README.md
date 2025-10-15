# Soko Mtaani - Complete Grocery E-commerce App

A production-ready, mobile-first React web application for a Kenyan grocery vendor with complete admin panel, M-Pesa integration, and modern design.

## 🚀 Features

### Customer Features
- **Mobile-first responsive design** optimized for all devices
- **Complete e-commerce flow**: Browse → Cart → Checkout → Track Order
- **Real-time cart management** with persistent storage
- **Product search and filtering** by category, price, and rating
- **User authentication** with signup/signin
- **Order tracking** with delivery timeline
- **M-Pesa payment integration** (placeholder for production setup)
- **WhatsApp/Call integration** for quick customer support
- **Signup popup** with 5% discount offer
- **Accessible design** with ARIA labels and keyboard navigation

### Admin Features
- **Complete admin dashboard** with KPI metrics
- **Order management** with status updates and customer contact
- **Product management** with image upload and inventory tracking
- **Category management** with drag-and-drop image upload
- **Customer analytics** with spending and order history
- **Sales reports** with CSV export functionality
- **Settings panel** for business info, payments, and notifications
- **Inventory alerts** for low stock items

### Technical Features
- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **React Router** for navigation
- **Context API** for state management
- **Local storage** for cart persistence
- **Mock data** with realistic Kenyan products
- **Performance optimized** with lazy loading
- **SEO friendly** with proper meta tags

## 🎨 Design System

### Colors
- **Primary Green**: #3FA34D (buttons, CTAs)
- **Dark Green**: #2F6F39 (text, contrast)
- **Secondary Beige**: #F6F1E7 (backgrounds)
- **Accent Yellow**: #F7C948 (highlights)
- **Neutral Text**: #1F2937
- **Muted Gray**: #9CA3AF

### Typography
- **Headings**: Poppins (display font)
- **Body**: Inter (readable sans-serif)
- **Mobile-first sizing**: 16px base, scaling up for desktop

### Components
- **8px spacing system** for consistent layouts
- **8px border radius** for cards and buttons
- **Soft shadows** for depth and elevation
- **Subtle animations** (300-450ms duration)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd soko-mtaani-grocery-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# M-Pesa Configuration (Production)
VITE_MPESA_CONSUMER_KEY=your_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_consumer_secret
VITE_MPESA_SHORTCODE=your_shortcode
VITE_MPESA_PASSKEY=your_passkey
VITE_MPESA_ENVIRONMENT=sandbox

# SMS/WhatsApp Configuration
VITE_TWILIO_ACCOUNT_SID=your_twilio_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_token
VITE_TWILIO_PHONE_NUMBER=your_twilio_number
VITE_WHATSAPP_BUSINESS_API_KEY=your_whatsapp_key

# Other Configuration
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📱 Demo Credentials

### Customer Account
- **Email**: user@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@sokomotaani.co.ke
- **Password**: admin123

## 🔧 Customization Guide

### Adding Products
1. Navigate to **Admin → Products**
2. Click **"Add Product"**
3. Fill in product details and upload images
4. Products appear immediately in the shop

### Updating Business Information
1. Go to **Admin → Settings**
2. Update business name, address, phone, hours
3. Configure delivery areas and fees
4. Save changes

### Setting Up M-Pesa (Production)
1. Register with [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an app and get credentials
3. Add credentials to **Admin → Settings → M-Pesa**
4. Test connection before going live

### Configuring SMS/WhatsApp
1. Create [Twilio account](https://www.twilio.com/) for SMS
2. Apply for WhatsApp Business API access
3. Add credentials in **Admin → Settings → Notifications**
4. Test services before enabling

## 📊 Mock Data

The app includes realistic sample data:
- **6 categories**: Fruits, Vegetables, Dairy, Staples, Snacks, Drinks
- **12+ products** with Kenyan pricing (KES)
- **Sample orders** with different statuses
- **Customer data** for admin analytics

### Replacing Mock Data
1. **Products**: Edit `src/data/mockData.ts`
2. **Categories**: Update the `categories` array
3. **Images**: Replace Pexels URLs with your own
4. **Business Info**: Update in Admin Settings

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard
4. Set up custom domain if needed

### Other Platforms
- **Vercel**: Connect GitHub repo for auto-deployment
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3**: Upload build files to S3 bucket

## 🔌 API Integration

### Backend Requirements
The app expects these API endpoints:

```
POST /api/auth/login
POST /api/auth/register
GET /api/products
POST /api/orders
GET /api/orders/:id
POST /api/payments/mpesa
POST /api/notifications/sms
```

### M-Pesa Integration
Replace mock M-Pesa functions in:
- `src/pages/CheckoutPage.tsx` (STK Push)
- `src/lib/api/payments.ts` (Payment verification)

### SMS/WhatsApp Integration
Update notification functions in:
- `src/lib/api/notifications.ts`
- `src/pages/admin/AdminOrders.tsx`

## 📈 Performance Optimization

### Implemented Optimizations
- **Lazy loading** for images
- **Code splitting** by routes
- **Local storage** for cart persistence
- **Debounced search** to reduce API calls
- **Optimized images** with proper sizing

### Additional Recommendations
- Use **CDN** for image hosting (Cloudinary, AWS S3)
- Implement **service worker** for offline functionality
- Add **image compression** for uploads
- Use **React.memo** for expensive components

## 🧪 Testing

### Manual Testing Checklist
- [ ] Mobile responsiveness (320px - 1920px)
- [ ] Cart functionality (add, remove, update)
- [ ] Checkout flow (guest and authenticated)
- [ ] Admin panel access and features
- [ ] Search and filtering
- [ ] Image uploads in admin
- [ ] Form validation and error handling

### Automated Testing (Optional)
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

## 🔒 Security Considerations

### Implemented Security
- **Input validation** on all forms
- **XSS protection** with proper escaping
- **Admin route protection** with authentication
- **Secure credential storage** (environment variables)

### Production Security
- Use **HTTPS** for all communications
- Implement **rate limiting** on API endpoints
- Add **CSRF protection** for forms
- Validate **file uploads** on server side
- Use **secure session management**

## 📞 Support & Contact

### Business Contact
- **Phone**: +254 712 345 678
- **WhatsApp**: +254 712 345 678
- **Email**: info@sokomotaani.co.ke
- **Address**: Parklands Road, Nairobi

### Technical Support
For technical issues or customization requests:
1. Check this README first
2. Review the code comments
3. Test with demo credentials
4. Contact the development team

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🙏 Acknowledgments

- **Pexels** for stock images
- **Lucide React** for icons
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Safaricom** for M-Pesa integration docs

---

**Built with ❤️ for Kenyan small businesses**