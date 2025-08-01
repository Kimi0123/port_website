# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, Tailwind CSS, and Express.js.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Navigation**: Smooth scrolling navigation with active section highlighting
- **Project Showcase**: Featured and regular project sections with live demo and code links
- **Contact Form**: Working contact form with backend API integration
- **Skills Display**: Organized skills section with categories
- **Social Links**: Links to GitHub, LinkedIn, Twitter, and email

## Tech Stack

### Frontend
- React 19
- Tailwind CSS 4
- Vite
- Axios for API calls
- React Router DOM

### Backend
- Node.js
- Express.js
- CORS middleware
- Environment variables support

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Personal_Portfolio
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
# or for development with auto-restart:
npm run dev
```
The server will run on http://localhost:5000

2. Start the frontend development server:
```bash
cd client
npm run dev
```
The frontend will run on http://localhost:5173

## Customization

### Personal Information
Update the following files with your personal information:

1. **Hero Section** (`client/src/components/Hero.jsx`):
   - Change "Your Name" to your actual name
   - Update the title/role
   - Modify the description
   - Update social media links

2. **About Section** (`client/src/components/About.jsx`):
   - Update the personal description
   - Modify skills and technologies
   - Update statistics (projects, experience, etc.)

3. **Projects Section** (`client/src/components/Projects.jsx`):
   - Replace sample projects with your actual projects
   - Update project images, descriptions, and links
   - Modify technologies used

4. **Contact Section** (`client/src/components/Contact.jsx`):
   - Update contact information (email, phone, location)
   - Modify social media links

5. **Footer** (`client/src/components/Footer.jsx`):
   - Update copyright information
   - Modify contact details

### Styling
- Colors and styling can be customized in `client/src/index.css`
- Tailwind CSS classes can be modified throughout the components
- Custom animations and effects are defined in the CSS file

### Adding New Sections
To add new sections:
1. Create a new component in `client/src/components/`
2. Import and add it to `client/src/App.jsx`
3. Update the navigation in `client/src/components/Navigation.jsx`

## Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend:
```bash
cd client
npm run build
```
2. Deploy the `dist` folder to your hosting service

### Backend (Heroku/Railway/DigitalOcean)
1. Set up environment variables on your hosting platform
2. Deploy the server folder
3. Update the API URL in the frontend Contact component

## Environment Variables

Create a `.env` file in the server directory:
```
PORT=5000
# Add other environment variables as needed
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Feel free to reach out if you have any questions or suggestions!

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- GitHub: [Your GitHub](https://github.com/yourusername)
