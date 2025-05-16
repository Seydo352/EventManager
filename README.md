# Event Explorer App

A simple event browser app made with React, TypeScript, and Strapi.

## Setup

### Backend (Strapi)

1. Go to backend folder:
```
cd event-explorer-backend
```

2. Install packages:
```
npm install
```

3. Start Strapi:
```
npm run develop
```

4. Create an admin account when prompted

5. Create events:
   - Go to http://localhost:1337/admin
   - Login with your account
   - Go to Content Manager → Events
   - Create some events with title, date, location, and description
   - Make sure to publish them

6. Set permissions:
   - Go to Settings → Users & Permissions Plugin → Roles → Authenticated
   - Give "find" and "findOne" permissions to Events
   - Save your changes

### Frontend (React)

1. Go to frontend folder:
```
cd event-explorer-frontend
```

2. Install packages:
```
npm install
```

3. Start the app:
```
npm run dev
```

4. Open in browser:
   - Go to http://localhost:5173 (or the URL shown in terminal)

## Usage

1. Create a user account (or use an existing one)
2. Login with your email and password
3. Browse events on the main page
4. Use the search bar to filter events
5. Click on an event to see details
6. Use the back button to return to the events list
7. Click "Sign Out" when finished

## Features

- User authentication
- Event listing with search/filter
- Event details view
- Animated UI with Framer Motion
- Responsive design
- Error handling with React Toastify
- Data fetching with React Query 