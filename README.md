# care-xyz
# Care.xyz - Baby Sitting & Elderly Care Platform

Developed by **Redwan**

## 🚀 Features

- ✅ Baby Care, Elderly Care, Sick People Care services
- ✅ User Authentication (Email/Password)
- ✅ Dynamic Booking System with cost calculation
- ✅ Location-based service (Division → District → Area)
- ✅ Booking Status Tracking (Pending/Confirmed/Completed/Cancelled)
- ✅ Email Invoice on booking
- ✅ Protected Routes with Middleware
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ MongoDB Database
- ✅ Next.js 15 App Router

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (already configured in your .env.local)
- Gmail account for sending emails

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Your `.env.local` file already has MongoDB configured:

```env
MONGODB_URI=mongodb+srv://redwanshahriarshubho1789_db_user:QZzr20jKNXhxZwxE@care-xyz.fqtdzvc.mongodb.net/carexyz?retryWrites=true&w=majority

JWT_SECRET=redwan_care_xyz_super_secret_key_2025_min_32_characters

NEXT_PUBLIC_API_URL=http://localhost:3000

# Configure these for email functionality:
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Setup Gmail for Email Sending

**Important:** You need a Gmail App Password (not your regular password)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Care.xyz" and generate
6. Copy the 16-character password
7. Add to `.env.local`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_char_app_password
   ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
care-xyz/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── register/route.js
│   │   │   └── logout/route.js
│   │   ├── bookings/
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   └── user/route.js
│   ├── booking/[id]/page.js
│   ├── login/page.js
│   ├── register/page.js
│   ├── my-bookings/page.js
│   ├── service/[id]/page.js
│   ├── layout.js
│   ├── page.js
│   ├── not-found.js
│   └── globals.css
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ServiceCard.jsx
│   ├── BookingForm.jsx
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── CancelBookingButton.jsx
├── lib/
│   ├── mongodb.js
│   ├── auth.js
│   ├── email.js
│   └── data.js
├── models/
│   ├── User.js
│   └── Booking.js
├── middleware.js
├── .env.local
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🧪 Testing the Application

### 1. Register a New User
- Go to `/register`
- Fill in: NID, Name, Email, Contact, Password
- Password must have: 6+ chars, 1 uppercase, 1 lowercase
- You'll receive a welcome email

### 2. Login
- Go to `/login`
- Enter email and password

### 3. Book a Service
- Click on any service card
- Click "Book This Service Now"
- Fill in duration and location details
- Confirm booking
- Check your email for invoice

### 4. View Bookings
- Go to "My Bookings" in navbar
- See all your bookings with status
- Cancel pending bookings

## 🗄️ Database Collections

### Users Collection
```javascript
{
  nid: String,
  name: String,
  email: String,
  contact: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  userId: ObjectId,
  serviceId: String,
  serviceName: String,
  duration: Number,
  location: {
    division: String,
    district: String,
    area: String,
    address: String
  },
  totalCost: Number,
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled",
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - EMAIL_USER
   - EMAIL_PASS
5. Deploy!

## 📧 Email Features

- ✅ Welcome email on registration
- ✅ Booking confirmation with invoice
- ✅ Professional HTML email templates
- ✅ Booking details in email

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ HTTP-only cookies
- ✅ Protected routes with middleware
- ✅ Input validation

## 🎨 UI Features

- ✅ Gradient hero sections
- ✅ Smooth animations
- ✅ Responsive cards
- ✅ Status badges
- ✅ Form validation feedback
- ✅ Loading states

## 📝 Assignment Requirements Met

✅ Responsive Design (Mobile, Tablet, Desktop)
✅ User Authentication (Email & Password)
✅ Dynamic Booking with cost calculation
✅ Location selection (Division → District → City → Area)
✅ Booking Status Tracking
✅ My Booking Page with actions
✅ Service Detail Pages with metadata
✅ Protected Routes
✅ Email Invoice on booking
✅ 404 Error Page
✅ MongoDB Integration
✅ Proper file structure (Client & Server components)

## 👨‍💻 Developer

**Redwan Shahriar Shubho**

## 📞 Support

For any issues, contact:
- Email: support@care.xyz
- Location: Level-4, 34, Awal Centre, Banani, Dhaka

---

Built with ❤️ by Redwan using Next.js 15, MongoDB, and Tailwind CSS