🥗 NutriLife Admin – Nutrition Management System
📌 Project Overview
NutriLife Admin is a full-stack web application developed for managing nutrition clients and their subscription-based programs.
The platform is designed for nutritionists or administrators who need a centralized system to track patients, monitor active plans, and control access through secure authentication.
The application focuses on clarity, security, and real-time insights, making it suitable as both a professional tool and a full-stack portfolio project.
🏗️ Architecture & System Design
The project follows a client–server architecture, with a clear separation between frontend and backend responsibilities.
Backend (Server)
Built using ASP.NET Core Web API
Exposes RESTful endpoints for authentication and patient management
Uses in-memory data structures (can be extended to a database)
Handles business logic, security, and data validation
Frontend (Client)
Built as a Single Page Application (SPA) using React
Communicates with the backend via HTTP requests using Axios
Implements protected routes based on authentication state
Responsive UI built with Bootstrap
✨ Core Functionalities
🔐 Authentication & Security
JWT-based login system
Token stored in browser localStorage
Backend endpoints protected using authorization middleware
Frontend route guards prevent unauthorized access
👤 Patient Management
Create, list, and delete patients
Store essential data: name, email, goal, weight, allergies
Automatic ID generation for new patients
📅 Subscription Logic
Subscription status determined by NextConsultationDate
Real-time classification of subscriptions:
Active
Expired
Automatic dashboard updates based on date comparison
📊 Admin Dashboard
Displays:
Total number of patients
Active subscriptions
Expired subscriptions
Nutritional focus breakdown:
Weight Loss
Muscle Gain
Maintenance
Performance
Recovery
Alerts for expired subscriptions
🧠 Data Normalization Strategy
To ensure consistent statistics regardless of language accents or formatting, nutritional goals are normalized on the frontend:
Converted to lowercase
Diacritics removed
Trimmed for consistency
This prevents mismatches such as:
Slăbire
slabire
SLĂBIRE
🛠️ Technology Stack
Backend
C#
ASP.NET Core Web API
JWT Authentication
REST architecture
Frontend
React
React Router
Axios
Bootstrap 5
Development Tools
Visual Studio / VS Code
Git & GitHub
.NET CLI
npm

🚀 Local Setup Instructions
Backend Setup
Navigate to the root backend directory:
cd NutriLifeApp
Restore dependencies:
dotnet restore
Run the API:
dotnet run
Backend will start on:
http://localhost:5000
Frontend Setup
Navigate to the frontend folder:
cd ClientApp
Install dependencies:
npm install
Start development server:
npm start
Access the app at:
http://localhost:3000
🔒 Security Measures
JWT validation on protected endpoints
Authorization headers required for admin actions
Client-side route protection
Controlled access to dashboard and management pages
🎯 Purpose of the Project
NutriLife Admin was developed to demonstrate:
Full-stack application design
Secure authentication flow
Real-world admin dashboard logic
Clean React state management
Practical ASP.NET API implementation
The project is suitable for:
Portfolio presentation
Technical interviews
Further extension with database persistence and roles
📌 Future Improvements (Optional)
Persistent database (SQL Server / SQLite)
Role-based authorization (Admin / Nutritionist)
Edit patient functionality
Pagination and search
Deployment with Docker
