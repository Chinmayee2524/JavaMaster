# Inventory Management System

## Prerequisites
- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **Java 17** (for the Spring Boot backend)
- **PostgreSQL** database

---

## Step 1: Clone the Project
```bash
git clone <your-project-repository-url>
cd <project-directory>
```

---

## Step 2: Set up the Frontend
1. **Install dependencies:**
```bash
npm install
```

2. **Create environment variables:**
   - Create a `.env` file in the root directory with your database credentials.

---

## Step 3: Set up the Backend
1. **Navigate to the backend directory:**
```bash
cd backend
```

2. **Configure your database:**
   - You'll need to set environment variables for your PostgreSQL connection:
```bash
DATABASE_URL=<your-database-url>
PGUSER=<your-database-username>
PGPASSWORD=<your-database-password>
```

3. Ensure these values match the settings in your `application.properties` file.

---

## Step 4: Run the Application
To run the frontend and backend together, from the root directory:
```bash
npm run dev
```
This will start:
- The frontend with **Vite dev server**
- The backend **Spring Boot application**

---

## Step 5: Access Your Application
- Open your web browser and navigate to:
```
http://localhost:5000
```

---

## Troubleshooting
### Port Conflicts
- The application runs on port **5000**. If this port is already in use, change it in:
  - `server/index.ts` (for the Express server)
  - `backend/src/main/resources/application.properties` (for the Spring Boot backend)

### Database Connection Issues
- Ensure **PostgreSQL** is running
- Verify your **database credentials** are correct

### Frontend Not Loading
- Check the terminal for **build errors**
- Verify the **development server** is running correctly

---
### Screenshot
![image](https://github.com/user-attachments/assets/a0ad9b7f-4190-48bb-863f-6bbf6e1a7a9d)

![image](https://github.com/user-attachments/assets/b58c70f0-df05-4936-87b7-671ad64ea79e)


