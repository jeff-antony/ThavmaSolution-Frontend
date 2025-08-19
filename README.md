# Thavma Solutions - Admin Panel

A modern React-based admin panel for Thavma Solutions with project management, contact form handling, and content management capabilities.

## Features

### Admin Panel
- **Secure Authentication**: JWT-based login system
- **Project Management**: Add, edit, delete projects with image upload
- **Contact Form Management**: View and respond to user messages
- **Real-time Updates**: Projects automatically appear on homepage
- **Image Upload**: Drag & drop image upload for projects
- **Email Integration**: Respond to contact form submissions via email

### Public Website
- **Dynamic Project Gallery**: Projects loaded from admin panel
- **Contact Form**: User-friendly contact form with validation
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Content**: Content updates reflect immediately

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation
- React Query for data fetching
- React Hook Form for form handling

### Backend
- Node.js with Express
- JWT for authentication
- Multer for file uploads
- Nodemailer for email functionality
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the server directory:
```env
PORT=3001
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note**: For Gmail, you'll need to use an App Password instead of your regular password.

### 4. Start the Backend Server
```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

### 5. Start the Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:8080`

## Usage

### Admin Access
1. Navigate to `/login`
2. Use the default credentials:
   - Username: `admin`
   - Password: `password`
3. Access the admin panel at `/admin`

### Managing Projects
1. **Add New Project**: Click "Add Project" button
2. **Upload Images**: Drag & drop or click to upload project images
3. **Edit Project**: Click the edit icon on any project card
4. **Delete Project**: Click the delete icon (with confirmation)

### Managing Contact Messages
1. **View Messages**: All contact form submissions appear in the Messages tab
2. **Mark as Read**: Click on any message to mark it as read
3. **Respond**: Click on a message and use the response dialog to send emails
4. **Status Tracking**: Messages are color-coded by status (unread, read, responded)

### Contact Form
- Users can submit messages through the contact form on the main website
- Messages are stored and accessible in the admin panel
- Admin can respond directly via email

## File Structure

```
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ProjectForm.tsx      # Project creation/editing form
│   │   │   └── ContactMessages.tsx  # Contact message management
│   │   ├── ContactForm.tsx          # Public contact form
│   │   └── ...                      # Other components
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication context
│   ├── lib/
│   │   └── api.ts                   # API service functions
│   ├── pages/
│   │   ├── Admin.tsx                # Admin dashboard
│   │   ├── Login.tsx                # Login page
│   │   └── ...                      # Other pages
│   └── ...
├── server/
│   ├── index.js                     # Express server
│   ├── package.json                 # Server dependencies
│   └── uploads/                     # Uploaded images (auto-created)
└── ...
```

## API Endpoints

### Authentication
- `POST /api/login` - Admin login

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (with image upload)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `PUT /api/contact/:id` - Update message status
- `POST /api/contact/:id/respond` - Send email response

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- File upload validation
- CORS configuration
- Input validation and sanitization

## Production Deployment

### Frontend
```bash
npm run build
```

### Backend
1. Set up environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Heroku, or any Node.js hosting
- **Database**: Consider migrating to MongoDB or PostgreSQL for production

## Customization

### Adding New Project Categories
1. Update the categories array in `ProjectForm.tsx`
2. Update the filter categories in `ProjectGallery.tsx`

### Modifying Email Templates
Edit the email configuration in `server/index.js` under the respond endpoint.

### Styling Changes
The project uses Tailwind CSS. Modify the classes in components or update the Tailwind config.

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure both frontend and backend are running
4. Check network connectivity between frontend and backend

## License

MIT License - see LICENSE file for details.
