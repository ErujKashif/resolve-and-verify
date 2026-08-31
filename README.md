# Resolve & Verify

## A Citizen-Centric Complaint Management System for Islamabad

<p align="center">
  <strong>A Smart Digital Framework for Complaint Management, Resolution Verification, and Municipal Accountability</strong>
</p>

<p align="center">
  <a href="https://github.com/ErujKashif/resolve-and-verify">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Flutter-Mobile-02569B?style=for-the-badge&logo=flutter" alt="Flutter">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

<p align="center">
  <a href="https://resolve-and-verify.vercel.app/">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#system-workflow">Workflow</a> •
  <a href="#technology-stack">Technology Stack</a> •
  <a href="#installation">Installation</a>
</p>

---

## 📌 Overview

**Resolve & Verify** is a full-stack citizen feedback and complaint management system designed for municipal sanitation services in Islamabad.

The platform provides a digital communication and management layer between **citizens, sanitation crews, administrators, and officers**. Citizens can report sanitation-related issues, field crews can manage assigned complaints, and authorized administrative users can monitor and oversee the resolution process.

The key concept behind the system is **resolution verification**. Instead of treating a complaint as permanently resolved immediately after field action, the system introduces a verification step through which the citizen can confirm whether the reported issue has actually been addressed.

This creates a more transparent and accountable complaint lifecycle.

### Core Workflow

```text
Citizen Reports Issue
        │
        ▼
Complaint Created
        │
        ▼
Administrator Assigns Crew
        │
        ▼
Crew Handles Complaint
        │
        ▼
Complaint Marked Resolved
        │
        ▼
Citizen Verifies Resolution
        │
        ├───────────────┐
        │               │
       YES              NO
        │               │
        ▼               ▼
     CLOSED         ESCALATED
                        │
                        ▼
                 Officer Review
🎯 Problem Statement

Municipal complaint systems can face challenges when citizens have limited visibility into what happens after a complaint is submitted.

Common challenges include:

Limited citizen involvement after complaint submission
Complaints being marked resolved without direct citizen confirmation
Difficulty tracking complaint progress
Lack of centralized complaint information
Limited accountability for unresolved issues
Manual coordination between citizens and service providers
Difficulty reviewing escalated complaints
Limited transparency in the overall complaint lifecycle

Resolve & Verify addresses these challenges by creating a structured digital workflow that connects complaint reporting, assignment, resolution, verification, and escalation.

💡 Proposed Solution

Resolve & Verify introduces a centralized platform where each complaint moves through a controlled lifecycle.

The system enables:
Citizens to report sanitation issues.
Complaint information to be stored digitally.
Administrators to manage and assign complaints.
Sanitation crews to access assigned complaints.
Crews to submit resolution information.
Resolved complaints to be presented for citizen verification.
Citizens to confirm or reject the reported resolution.
Rejected resolutions to enter an escalation workflow.
Officers to review escalated complaints.
Appropriate administrative action to be recorded where required.

This transforms complaint handling from a simple "report → resolve" process into a "report → resolve → verify → close/escalate" workflow.

✨ Features
👤 Citizen Module
Citizen authentication
Complaint submission
Sanitation issue reporting
Complaint details and description
Location information
Evidence submission
Complaint status tracking
Complaint history
Resolution verification
Resolution acceptance or rejection
Complaint updates and notifications
🚛 Sanitation Crew Module
Secure crew authentication
Assigned complaint management
Complaint detail viewing
Access to reported issue information
Resolution handling
Resolution evidence submission
Complaint status updates
🧑‍💼 Administrator Module
Administrative dashboard
Complaint monitoring
Complaint status management
Complaint assignment
Sanitation crew management
Complaint progress monitoring
Centralized complaint overview
👨‍⚖️ Officer Module
Officer dashboard
Escalated complaint monitoring
Complaint review
Resolution evidence review
Rejected-resolution investigation
Administrative action
Penalty/action recording where applicable
🔄 System Workflow

The complete complaint lifecycle is designed around accountability and verification.

┌─────────────────┐
│     CITIZEN     │
│ Reports Issue   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    COMPLAINT    │
│     CREATED     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      ADMIN      │
│ Assigns Crew    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      CREW       │
│ Handles Issue   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     RESOLVED    │
└────────┬────────┘
         │
         ▼
┌────────────────────────┐
│   CITIZEN VERIFICATION │
└───────────┬────────────┘
            │
      ┌─────┴─────┐
      │           │
     YES          NO
      │           │
      ▼           ▼
┌─────────┐  ┌───────────┐
│ CLOSED  │  │ ESCALATED │
└─────────┘  └─────┬─────┘
                   │
                   ▼
             ┌─────────────┐
             │   OFFICER   │
             │    REVIEW   │
             └─────────────┘
🏗️ System Architecture

Resolve & Verify is structured as a multi-platform full-stack application consisting of a web application, mobile application, backend services, and database.

                         ┌──────────────────────┐
                         │        USERS         │
                         │                      │
                         │ Citizen / Crew       │
                         │ Admin / Officer      │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌──────────────────┐            ┌──────────────────┐
          │  Flutter Mobile  │            │    React Web     │
          │                  │            │                  │
          │ Citizen + Crew  │            │ Admin + Officer  │
          └────────┬─────────┘            └────────┬─────────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   │
                                   │ REST API
                                   ▼
                         ┌──────────────────────┐
                         │ Node.js + Express    │
                         │                      │
                         │ Authentication       │
                         │ Authorization        │
                         │ Complaint Management  │
                         │ Assignment            │
                         │ Resolution            │
                         │ Verification          │
                         │ Escalation            │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
          │   MongoDB   │   │   Firebase   │   │    Email     │
          │    Atlas    │   │     FCM      │   │     OTP      │
          └─────────────┘   └──────────────┘   └──────────────┘
🛠️ Technology Stack
Frontend
React.js
JavaScript
HTML5
CSS3
React Router
Context API
Mobile Application
Flutter
Dart
Provider
GoRouter
Geolocation
Image/Camera handling
Firebase Cloud Messaging
Local notifications
Backend
Node.js
Express.js
RESTful APIs
JWT Authentication
Nodemailer
Firebase Admin SDK
Database
MongoDB
MongoDB Atlas
Mongoose
Authentication & Authorization
Email OTP authentication
JWT-based authentication
Role-Based Access Control
Protected API routes
Environment-based configuration
Deployment & Cloud
Vercel
Render
MongoDB Atlas
Firebase Cloud Messaging
Development Tools
Git
GitHub
Visual Studio Code
Postman
npm
Flutter SDK
👥 User Roles
Role	Responsibilities
👤 Citizen	Report complaints, track progress, and verify resolution
🚛 Sanitation Crew	View assigned complaints and submit resolution information
🧑‍💼 Administrator	Manage complaints, assignments, and crew members
👨‍⚖️ Officer	Review escalated complaints and take appropriate administrative action
🔐 Authentication & Authorization

The application uses authentication and role-based authorization to provide controlled access to different areas of the system.

Authentication Flow
User
 │
 │ Email
 ▼
┌────────────────┐
│  Backend API   │
│ Generate OTP   │
└───────┬────────┘
        │
        ▼
   Email Service
        │
        ▼
      User
        │
        │ OTP
        ▼
┌────────────────┐
│  Verify OTP    │
└───────┬────────┘
        │
        ▼
   JWT Generated
        │
        ▼
Authenticated User
Role-Based Access
Citizen
   └── Citizen-specific operations

Crew
   └── Assigned complaint operations

Admin
   └── Administrative operations

Officer
   └── Escalation and review operations
📍 Location & Evidence

Location and evidence are important components of the complaint management process.

Complaint information can include:

Address information
Geographic coordinates
Complaint description
Before evidence
Resolution/after evidence
Complaint timestamps
Resolution information

This provides a digital record that can support complaint monitoring, verification, and escalation.

🔔 Notifications

Firebase Cloud Messaging is used to support application notifications.

Notifications can be used during important workflow events such as:

Complaint assignment
Complaint resolution
Citizen verification request
Complaint escalation
Administrative updates

Example:

┌────────────────────────────────────────────┐
│ 🔔 Complaint Resolved                     │
│                                            │
│ Your complaint has been marked as resolved │
│ Please verify the resolution.              │
│                                            │
│             View Complaint                 │
└────────────────────────────────────────────┘
🗄️ Database

MongoDB is used as the primary database.

The application primarily works with entities such as users and complaints.

User
User
│
├── _id
├── name
├── email
├── role
├── authentication information
├── notification information
└── createdAt
Complaint
Complaint
│
├── _id
├── citizen
├── description
├── address
├── location
├── evidence
├── assigned crew
├── status
├── resolution information
├── verification information
├── escalation information
└── createdAt
🔌 API Overview

The backend exposes RESTful APIs for communication between the frontend/mobile applications and server.

Authentication
Method	Endpoint	Purpose
POST	/api/auth/send-otp	Send authentication OTP
POST	/api/auth/verify-otp	Verify OTP and authenticate user
GET	/api/auth/me	Retrieve authenticated user
Complaints
Method	Endpoint	Purpose
POST	/api/complaints	Create complaint
GET	/api/complaints/my	Retrieve citizen complaints
GET	/api/complaints/assigned	Retrieve assigned complaints
GET	/api/complaints/all	Retrieve complaints
GET	/api/complaints/escalated	Retrieve escalated complaints
GET	/api/complaints/:id	Retrieve complaint details
PUT	/api/complaints/:id/assign	Assign complaint
PUT	/api/complaints/:id/resolve	Resolve complaint
PUT	/api/complaints/:id/verify	Verify complaint resolution
POST	/api/complaints/:id/penalty	Record penalty/action
User Management
Method	Endpoint	Purpose
GET	/api/users/crews	Retrieve crew members
POST	/api/users/crew	Add crew member
DELETE	/api/users/crew/:id	Delete crew member
POST	/api/users/fcm-token	Register notification token
📱 Mobile Application

The Flutter application focuses on mobile workflows for citizens and sanitation crews.

Citizen Flow
Login
  │
  ▼
OTP Verification
  │
  ▼
Citizen Dashboard
  │
  ├── Submit Complaint
  │      ├── Complaint Details
  │      ├── Location
  │      └── Evidence
  │
  ├── My Complaints
  │
  └── Complaint Details
          │
          ▼
      Verification
        /       \
       YES       NO
        │         │
        ▼         ▼
      Close    Escalate
Crew Flow
Login
  │
  ▼
Crew Dashboard
  │
  ▼
Assigned Complaints
  │
  ▼
Complaint Details
  │
  ▼
Handle Complaint
  │
  ▼
Submit Resolution Information
  │
  ▼
Mark Resolved
💻 Web Dashboard

The React web application provides role-specific interfaces for administrative and supervisory workflows.

Administrator Dashboard

The administrator interface supports:

Complaint overview
Complaint monitoring
Complaint assignment
Crew management
Status tracking
Complaint progress monitoring
Officer Dashboard

The officer interface supports:

Escalated complaint monitoring
Complaint review
Evidence review
Resolution investigation
Administrative action
📂 Project Structure
resolve-and-verify/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── mobile/
│   ├── lib/
│   ├── android/
│   ├── ios/
│   ├── pubspec.yaml
│   └── ...
│
├── .gitignore
├── LICENSE
├── vercel.json
└── README.md
⚙️ Installation
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB / MongoDB Atlas
Flutter SDK
Android Studio or VS Code
Git
1. Clone the Repository
git clone https://github.com/ErujKashif/resolve-and-verify.git
cd resolve-and-verify
2. Backend Setup
cd backend
npm install

Create a .env file in the backend directory.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OTP_EXPIRY_MINUTES=5
JWT_EXPIRY_DAYS=7

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

Start the backend:

npm run dev

or:

npm start

The backend will normally run on:

http://localhost:5000
3. Frontend Setup

Open a new terminal:

cd frontend
npm install

Configure the backend API URL according to the environment configuration used by the frontend.

Example:

REACT_APP_API_URL=http://localhost:5000/api

Start the frontend:

npm start

The frontend will normally run on:

http://localhost:3000
4. Mobile Setup

Navigate to the mobile application:

cd mobile
flutter pub get

Check connected devices:

flutter devices

Run the application:

flutter run
🔥 Firebase Configuration

Firebase services are used to support notification functionality.

For mobile development, configure Firebase according to the target platform and project configuration.

Important: Never commit Firebase private credentials, service-account files, API secrets, JWT secrets, database credentials, or email passwords to GitHub.

🌐 Deployment

The application architecture supports deployment using modern cloud platforms.

                    GitHub
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
          Vercel               Render
             │                   │
             ▼                   ▼
      React Frontend       Node/Express API
                                 │
                                 ▼
                         MongoDB Atlas
                                 │
                                 ▼
                         Firebase Services
Deployment Components
Component	Technology / Platform
Web Frontend	React
Frontend Hosting	Vercel
Backend	Node.js + Express
Backend Hosting	Render
Database	MongoDB Atlas
Mobile Application	Flutter
Notifications	Firebase Cloud Messaging
Source Control	Git + GitHub
🧪 Testing

The system should be tested across authentication, complaint management, authorization, and complete workflow scenarios.

Authentication Testing
OTP generation
OTP verification
OTP expiration
JWT generation
JWT validation
Unauthorized access handling
Complaint Testing
Complaint creation
Complaint retrieval
Complaint assignment
Complaint resolution
Citizen verification
Complaint rejection
Complaint escalation
Administrative action
Authorization Testing
Citizen
 ├── Can submit complaints
 └── Cannot perform administrative operations

Crew
 ├── Can access assigned complaints
 └── Cannot perform administrative operations

Admin
 ├── Can manage complaints
 └── Can assign complaints

Officer
 ├── Can review escalated complaints
 └── Can perform officer-level actions
🔒 Security Considerations

The application incorporates several security practices:

JWT-based authentication
Role-Based Access Control
Protected API endpoints
OTP-based authentication
Environment variables for sensitive configuration
Role-specific authorization
Controlled complaint operations
Secure deployment configuration
Sensitive Information

The following information must never be committed to the repository:

.env
MongoDB credentials
JWT secrets
Firebase service-account credentials
Email passwords
Private API keys

Always keep sensitive configuration in environment variables and ensure appropriate entries exist in .gitignore.

📸 Screenshots

Screenshots can be added to the repository to demonstrate the application's interfaces.

Recommended structure:

screenshots/
│
├── citizen/
│   ├── login.png
│   ├── dashboard.png
│   ├── complaint-form.png
│   └── verification.png
│
├── crew/
│   ├── dashboard.png
│   └── complaint-resolution.png
│
├── admin/
│   ├── dashboard.png
│   └── assignment.png
│
└── officer/
    ├── dashboard.png
    └── escalation-review.png

Example:

## Screenshots

### Citizen Dashboard

![Citizen Dashboard](screenshots/citizen/dashboard.png)

### Complaint Submission

![Complaint Submission](screenshots/citizen/complaint-form.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin/dashboard.png)

### Officer Dashboard

![Officer Dashboard](screenshots/officer/dashboard.png)
🚀 Future Enhancements

Potential future improvements include:

🇵🇰 Urdu and multilingual support
📡 Offline functionality for field crews
🗺️ GIS-based complaint visualization
📍 Zone-based crew assignment
📊 Advanced analytics and reporting
🤖 Predictive complaint analysis
🚛 Live sanitation vehicle tracking
📡 IoT-enabled smart waste bins
📈 Contractor performance analytics
📤 Excel/PDF reporting
🔎 Repeat-offender detection
🔔 Advanced notification workflows
🏙️ Integration with municipal GIS systems
🎓 Project Information
Field	Details
Project Name	Resolve & Verify
Project Type	Full-Stack Web & Mobile Application
Domain	Civic Technology / Municipal Complaint Management
Target Area	Islamabad
Organization	National Engineering and Scientific Commission (NESCOM)
Author	Eruj Kashif
Supervisor	Dr. Inayatullah Khan Yousafzai
Date	August 2026
🤖 AI-Assisted Development

AI tools were used as development assistants during the software development process.

Tools Used
DeepSeek
Claude
Areas of Assistance

AI-assisted development was used for:

Code generation
Debugging
Refactoring
Development assistance
UI implementation
Test generation
Documentation assistance
Problem solving

All AI-assisted output was reviewed and adapted before integration into the project.

The development process followed a human-in-the-loop approach, with architectural decisions, requirements, business logic, security considerations, testing, and final implementation remaining under developer control.

📚 Documentation

The project documentation covers areas including:

System requirements
System architecture
Complaint workflow
User roles
Database design
API architecture
Authentication
Authorization
Testing
Deployment
Future enhancements
👨‍💻 Author
Eruj Kashif

Software Engineering Student
Full-Stack & Mobile Application Developer

GitHub

github.com/ErujKashif

Project Repository

Resolve & Verify

📄 License

This project is licensed under the MIT License.

See the LICENSE file for more information.

⭐ Project Vision

A complaint should not be considered truly resolved until its resolution can be verified.

Resolve & Verify aims to create a transparent connection between citizens and municipal service providers by transforming traditional complaint reporting into a trackable, verifiable, and accountable digital workflow.

<p align="center"> <strong>Resolve & Verify</strong> <br> <em>Report. Resolve. Verify.</em> <br><br> Built with React • Flutter • Node.js • Express • MongoDB • Firebase </p> ```
