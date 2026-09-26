# Amod Kumar Singh - Portfolio

A professional portfolio website built with Next.js, React, and Tailwind CSS, featuring a password-protected admin panel for content management.

## Features

- **Professional Portfolio**: Java Backend & AI/Cloud Integration focused
- **Admin Panel**: Password-protected content management system
- **Dynamic Content**: Edit all portfolio sections from the admin panel
- **Responsive Design**: Works on all devices
- **Dark Mode Support**: Automatic theme switching
- **Modern UI**: Clean, professional design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Admin Password
Create a `.env.local` file in the root directory:
```bash
# Copy from .env.example
cp .env.example .env.local
```

Edit `.env.local` and set your secure password:
```env
ADMIN_PASSWORD=your_secure_password_here
```

### 3. Run Development Server
```bash
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## Admin Panel Usage

### Access Admin Panel
1. Navigate to `http://localhost:3000/admin/login`
2. Enter your admin password (set in `.env.local`)
3. You'll be redirected to the admin dashboard

### Edit Content
The admin panel allows you to edit:
- **Hero Section**: Name, title, and description
- **About Section**: Personal background and information
- **Skills**: Technical skill categories and individual skills
- **Experience**: Work experience details and achievements
- **Projects**: Featured projects with descriptions and features
- **Contact**: Email, location, and social media links

### Save Changes
- Click "Save Changes" button to persist your edits
- Changes are saved to `public/content.json`
- The portfolio automatically updates with new content

### Session Management
- Admin sessions expire after 24 hours
- Click "Logout" to end your session immediately
- Only you can access the admin panel with the correct password

## Security Notes

- **Important**: Never commit `.env.local` to version control
- **Password Security**: Use a strong, unique password for your admin panel
- **Session Security**: Sessions automatically expire for security
- **Content Storage**: Content is stored in `public/content.json`

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Make sure to set `ADMIN_PASSWORD` in your production environment variables.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel routes
│   │   │   ├── login/      # Admin login page
│   │   │   └── dashboard/  # Admin dashboard
│   │   ├── api/
│   │   │   └── content/    # Content API endpoints
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Architecture.tsx
│   │   ├── Contact.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── auth.ts         # Authentication logic
│       └── content.ts      # Content types and defaults
├── public/
│   └── content.json        # Dynamic content storage
└── package.json
```

## Customization

### Update Placeholder Links
Replace placeholder URLs in the admin panel:
- GitHub profile URL
- LinkedIn profile URL
- Email address
- Resume download link

### Add Resume
1. Place your resume PDF in the `public/` folder
2. Update the "Download Resume" button in `Hero.tsx` to link to your resume

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## License

This project is for personal portfolio use.

## Support

For issues or questions, please contact through the portfolio contact section.
