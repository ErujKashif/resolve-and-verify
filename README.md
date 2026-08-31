# Resolve & Verify

## A Citizen-Centric Complaint Management System for Islamabad

<p align="center">
  <strong>
    A Smart Digital Framework for Complaint Management,
    Resolution Verification, and Municipal Accountability
  </strong>
</p>

<p align="center">
  <a href="https://github.com/ErujKashif/resolve-and-verify">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
  <img src="https://img.shields.io/badge/React-Web-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Flutter-Mobile-02569B?style=for-the-badge&logo=flutter" alt="Flutter">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Firebase-FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#problem-statement">Problem</a> •
  <a href="#system-workflow">Workflow</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#installation-and-setup">Installation</a> •
  <a href="#user-manual">User Manual</a>
</p>

---

---

# Overview

**Resolve & Verify** is a full-stack, citizen-centric complaint management platform designed around municipal sanitation services in Islamabad.

The system is designed to close an important accountability gap in conventional complaint handling: a service provider may mark a complaint as resolved, while the citizen may still consider the issue unresolved.

Resolve & Verify introduces a **citizen verification stage** after field resolution. The citizen can either:

- **Accept the resolution**, which closes the complaint; or
- **Reject the resolution**, which escalates the complaint to an authorized officer for review and further administrative action.

The platform combines:

- A **React-based web application** for administrative and officer workflows
- A **Flutter mobile application** for citizens and sanitation crews
- A **Node.js / Express REST API** for backend services
- **MongoDB Atlas** for persistent data storage
- **Firebase Cloud Messaging (FCM)** for push notifications
- **Email OTP authentication** and **JWT-based authorization**

The system therefore provides a complete digital trail from complaint submission to verified resolution.

---

# Problem Statement

Municipal sanitation services require a reliable chain of:

**Reporting → Assignment → Field Execution → Resolution → Verification**

In a conventional complaint workflow, the process may stop once a field worker reports that the complaint has been resolved.

This creates several challenges:

- Citizens may have limited visibility into complaint progress.
- A complaint may be marked resolved without citizen confirmation.
- There may be insufficient evidence for disputed resolutions.
- Administrative teams may have difficulty monitoring assignments.
- Escalated complaints may lack a structured review process.
- Accountability for unresolved service issues can be difficult to establish.

Resolve & Verify addresses these challenges by making the citizen an explicit participant in the resolution-verification process.

---

# Objectives

The primary objectives of Resolve & Verify are:

1. Provide citizens with a simple digital channel for reporting sanitation complaints.
2. Record complaint location and supporting photographic evidence.
3. Provide administrators with centralized complaint monitoring and crew assignment.
4. Allow sanitation crews to manage assigned complaints and submit resolution evidence.
5. Introduce citizen-controlled resolution verification.
6. Escalate rejected resolutions to authorized officers.
7. Provide before-and-after evidence for disputed cases.
8. Support administrative penalty recording where authorized.
9. Provide lifecycle notifications through Firebase Cloud Messaging.
10. Maintain a structured and traceable complaint record.

---

# Proposed Solution

Resolve & Verify implements a controlled complaint lifecycle in which every major stage is represented digitally.

```text
Citizen
   │
   │ Submit Complaint
   ▼
┌───────────────┐
│ Open Complaint│
└───────┬───────┘
        │
        │ Admin Assignment
        ▼
┌────────────────┐
│ Assigned to    │
│ Sanitation Crew│
└───────┬────────┘
        │
        │ Field Resolution
        ▼
┌────────────────┐
│    Resolved    │
│ + After Photo  │
└───────┬────────┘
        │
        │ Citizen Verification
        ▼
   ┌─────────────┐
   │ Verification│
   └──────┬──────┘
          │
     ┌────┴────┐
     │         │
    YES        NO
     │         │
     ▼         ▼
  Closed   Escalated
               │
               ▼
        Officer Review
               │
               ▼
       Administrative Action

This transforms complaint handling from a one-way reporting mechanism into a closed-loop feedback and accountability system.

The system defines four primary operational roles.

Role	Primary Responsibilities
Citizen	Submit complaints, view personal complaints, verify resolutions
Sanitation Crew	View assigned complaints, perform field work, submit resolution evidence
Administrator	Monitor complaints, assign complaints, manage crews
Senior Officer	Review escalated complaints, compare evidence, record administrative penalties
System Workflow
Complete Complaint Workflow
Step 1 — Citizen Authentication

The citizen enters an email address and requests an OTP.

The system sends the OTP through the configured email service.

The citizen enters the OTP and receives an authenticated session.

Step 2 — Complaint Creation

The citizen creates a complaint by providing:

Complaint information
Address
GPS location
Before photograph

The complaint is stored with an initial Open status.

Step 3 — Administrative Assignment

The administrator reviews open complaints and assigns an available sanitation crew.

The complaint changes from:

Open → Assigned
Step 4 — Crew Resolution

The assigned crew views the complaint and visits the reported location.

The crew provides resolution evidence, including the required after-photo.

The complaint then changes to:

Assigned → Resolved
Step 5 — Citizen Verification

The citizen receives a notification that the complaint has been marked resolved.

The citizen reviews the resolution.

Two outcomes are possible:

Resolved → Closed

when the citizen accepts the resolution.

Or:

Resolved → Escalated

when the citizen rejects the resolution.

Step 6 — Officer Review

An officer reviews the escalated complaint and can compare the available evidence.

Where authorized, the officer may record a penalty and finalize the administrative action.

Complaint Lifecycle

The official complaint state model is:

┌─────────┐
│  OPEN   │
└────┬────┘
     │
     │ Administrator assigns crew
     ▼
┌──────────┐
│ ASSIGNED │
└────┬─────┘
     │
     │ Crew submits resolution evidence
     ▼
┌──────────┐
│ RESOLVED │
└────┬─────┘
     │
     │ Citizen verification
     ▼
┌──────────────────┐
│ Citizen Decision │
└───────┬──────────┘
        │
   ┌────┴────┐
   │         │
  YES        NO
   │         │
   ▼         ▼
┌────────┐ ┌───────────┐
│ CLOSED │ │ ESCALATED │
└────────┘ └─────┬─────┘
                 │
                 │ Officer review
                 ▼
          ┌──────────────┐
          │ Administrative│
          │    Action     │
          └──────────────┘
State Transition Rules
Current State	Action	Next State
Open	Administrator assigns crew	Assigned
Assigned	Crew submits resolution	Resolved
Resolved	Citizen accepts	Closed
Resolved	Citizen rejects	Escalated
Escalated	Authorized officer action	Closed / Finalized
System Architecture

Resolve & Verify follows a layered three-tier architecture.

                        ┌───────────────────────┐
                        │        USERS          │
                        │                       │
                        │ Citizen │ Crew        │
                        │ Admin   │ Officer     │
                        └───────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
          ┌──────────────────┐            ┌──────────────────┐
          │  Flutter Mobile  │            │    React Web     │
          │                  │            │                  │
          │ Citizen + Crew   │            │ Admin + Officer  │
          └────────┬─────────┘            └────────┬─────────┘
                   │                               │
                   └───────────────┬───────────────┘
                                   │
                                   │ HTTPS / REST API
                                   ▼
                         ┌──────────────────────┐
                         │   Node.js + Express  │
                         │                      │
                         │ Authentication       │
                         │ Authorization        │
                         │ Validation           │
                         │ Complaint Management │
                         │ Assignment           │
                         │ Resolution           │
                         │ Verification         │
                         │ Escalation           │
                         │ User Management      │
                         └───────────┬──────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                │                    │                    │
                ▼                    ▼                    ▼
        ┌───────────────┐    ┌──────────────┐    ┌──────────────┐
        │   MongoDB     │    │   Firebase   │    │ Email / SMTP │
        │     Atlas     │    │     FCM      │    │     OTP      │
        └───────────────┘    └──────────────┘    └──────────────┘
Component Responsibilities
Component	Responsibility
Flutter Mobile	Citizen and crew workflows, camera/GPS access, session state, notifications
React Web	Administrative and officer dashboards, filtering, assignment and escalation review
Express API	Authentication, authorization, validation, complaint lifecycle and user management
MongoDB Atlas	Users, complaints and operational data
Firebase FCM	Push notification delivery
Email / SMTP	OTP delivery
Vercel	Web application hosting
Render	Backend/API hosting
Technology Stack
Frontend
Technology	Purpose
React.js	Web application
JavaScript	Application logic
HTML5	Web structure
CSS3	Styling
React Router	Client-side routing
Context API	Frontend state management
Mobile
Technology	Purpose
Flutter	Cross-platform mobile development
Dart	Mobile application language
Provider	State management
GoRouter	Navigation
Geolocation	GPS/location capture
Image/Camera packages	Evidence capture
Firebase Messaging	Push notifications
Local Notifications	Local notification handling
Backend
Technology	Purpose
Node.js	Runtime
Express.js	REST API framework
JWT	Authentication/session tokens
Nodemailer	Email/OTP delivery
Firebase Admin SDK	Server-side notifications
Database
Technology	Purpose
MongoDB	Document database
MongoDB Atlas	Cloud database
Mongoose	MongoDB object modeling
Infrastructure
Service	Purpose
GitHub	Source control
Vercel	React deployment
Render	Backend deployment
MongoDB Atlas	Managed database
Firebase	Push notification infrastructure
Functional Requirements

Citizen Requirements
ID	Requirement
C1	Citizen can request an OTP using an email address
C2	Citizen can verify an OTP and receive an authenticated session
C3	Citizen can create a complaint with address, GPS location and before-photo
C4	Citizen can view complaints associated with their account
C5	Citizen receives a notification when a complaint is resolved
C6	Citizen can accept or reject the reported resolution

Crew Requirements
ID	Requirement
CR1	Crew can authenticate and view complaints assigned to them
CR2	Crew can open complaint details and view reported evidence
CR3	Crew must provide an after-photo before marking a complaint resolved
CR4	Crew resolution records evidence and a resolution timestamp

Administrator Requirements
ID	Requirement
AD1	Administrator can view complaints and filter by lifecycle status
AD2	Administrator can assign an open complaint to a crew member
AD3	Administrator can view available crew members

Officer Requirements
ID	Requirement
OF1	Officer can view escalated complaints
OF2	Officer can review before/after evidence
OF3	Officer can record a penalty and finalize administrative action

Notification Requirements
ID	Requirement
N1	System stores FCM device tokens for authenticated mobile users
N2	System sends lifecycle notifications for resolution, escalation and penalty events

Non-Functional Requirements
ID	Category	Requirement
NFR1	Security	OTP expires after 5 minutes; JWT expires after 7 days
NFR2	Authorization	Role-based middleware prevents unauthorized operations
NFR3	Privacy	First release does not require CNIC/national ID
NFR4	Evidence Integrity	Crew resolution requires camera-based after-photo capture
NFR5	Performance	Target normal API response time is below 2 seconds
NFR6	Scalability	Stateless API architecture should support horizontal scaling
NFR7	Availability	Cloud deployment should provide practical availability for a pilot
NFR8	Usability	Citizen verification uses a simple Yes/No decision
NFR9	Maintainability	Business logic is separated into controllers, services, middleware and models
NFR10	Portability	Mobile workflows use Flutter and web workflows use React

Authentication and Authorization

Resolve & Verify uses email OTP authentication combined with JWT-based authorization.

Authentication Flow
User enters email
       │
       ▼
Backend generates OTP
       │
       ▼
OTP sent through email
       │
       ▼
User enters OTP
       │
       ▼
Backend validates OTP
       │
       ▼
JWT session generated
       │
       ▼
Authenticated User
Session Configuration
Setting	Value
OTP validity	5 minutes
JWT validity	7 days
Authentication	Email OTP
Authorization	JWT + role-based middleware
Role-Based Access

The backend verifies both:

Whether the request is authenticated.
Whether the authenticated user's role is permitted to perform the requested operation.
Evidence and Location Management

Evidence is a central part of the Resolve & Verify workflow.

Citizen Evidence

When creating a complaint, the citizen can provide:

Address
GPS coordinates
Before photograph
Crew Evidence

When resolving a complaint, the crew provides:

After photograph
Resolution information
Resolution timestamp
Evidence Workflow
          CITIZEN
             │
             ▼
       Before Photo
             │
             ▼
       GPS + Address
             │
             ▼
      Complaint Record
             │
             ▼
           CREW
             │
             ▼
        After Photo
             │
             ▼
      Resolution Record
             │
             ▼
          OFFICER
             │
             ▼
      Evidence Review

The before-and-after evidence provides a structured basis for reviewing disputed resolutions.

Notification System

Firebase Cloud Messaging is used for application notifications.

Notifications are associated with important complaint lifecycle events.

Event	Recipient
Complaint assignment	Crew
Complaint resolution	Citizen
Citizen rejection / escalation	Officer
Administrative penalty	Relevant user
Notification Flow
Complaint Event
      │
      ▼
Backend
      │
      ▼
Firebase Cloud Messaging
      │
      ▼
Mobile Device
      │
      ▼
User Notification

FCM device tokens are stored for authenticated mobile users.

Database Design

MongoDB Atlas is used as the primary persistence layer.

Main Collections
MongoDB
│
├── Users
│
└── Complaints

An AuditLogs collection is recommended for a production release to maintain a durable event trail.

Users Collection
{
  "_id": "ObjectId",
  "email": "String, unique",
  "role": "citizen | crew | admin | officer",
  "name": "String, optional",
  "fcmTokens": ["String"],
  "otp": "String",
  "otpExpiry": "Date",
  "createdAt": "Date"
}
Complaints Collection
{
  "_id": "ObjectId",
  "citizen": "ObjectId -> Users",
  "address": "String",
  "location": {
    "type": "Point",
    "coordinates": ["longitude", "latitude"]
  },
  "beforePhoto": "String",
  "afterPhoto": "String | null",
  "status": "Open | Assigned | Resolved | Escalated | Closed",
  "assignedTo": "ObjectId -> Users | null",
  "resolvedAt": "Date | null",
  "verifiedByCitizen": "Boolean | null",
  "escalatedAt": "Date | null",
  "penaltyAmount": "Number",
  "penaltyRecordedBy": "ObjectId -> Users | null",
  "createdAt": "Date"
}
API Reference

The backend exposes REST APIs for authentication, complaint management, user management, assignment, resolution, verification, escalation and notifications.

Authentication
Method	Endpoint	Description
POST	/api/auth/send-otp	Send OTP
POST	/api/auth/verify-otp	Verify OTP and issue JWT
GET	/api/auth/me	Get authenticated user

Complaints
Method	Endpoint	Description
POST	/api/complaints	Create complaint
GET	/api/complaints/my	Get citizen complaints
GET	/api/complaints/assigned	Get crew assignments
GET	/api/complaints/all	Get all complaints
GET	/api/complaints/escalated	Get escalated complaints
GET	/api/complaints/:id	Get complaint details
PUT	/api/complaints/:id/assign	Assign complaint
PUT	/api/complaints/:id/resolve	Resolve complaint
PUT	/api/complaints/:id/verify	Verify resolution
POST	/api/complaints/:id/penalty	Record penalty

User Management
Method	Endpoint	Description
GET	/api/users/crews	Get crew members
POST	/api/users/crew	Create crew member
DELETE	/api/users/crew/:id	Delete crew member
POST	/api/users/fcm-token	Register FCM token


Installation and Setup
Prerequisites

Install the following software before running the project:

Node.js
npm
MongoDB or MongoDB Atlas account
Flutter SDK
Android Studio or VS Code
Git
1. Clone the Repository
git clone https://github.com/ErujKashif/resolve-and-verify.git
cd resolve-and-verify
Backend Setup

Open a terminal in the project directory.

cd backend

Install backend dependencies:

npm install

Create a .env file inside the backend directory.

Example:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OTP_EXPIRY_MINUTES=5
JWT_EXPIRY_DAYS=7

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

FIREBASE_SERVICE_ACCOUNT=your_secure_firebase_configuration

Start the development server:

npm run dev

If the project does not define a development script, use:

npm start

The backend is configured to run on:

http://localhost:5000
Frontend Setup

Open a new terminal.

cd frontend

Install dependencies:

npm install

Configure the frontend API URL according to the environment configuration used by the application.

Example:

REACT_APP_API_URL=http://localhost:5000/api

Start the frontend:

npm start

The development frontend normally runs on:

http://localhost:3000
Mobile Setup

Open another terminal.

cd mobile

Install Flutter dependencies:

flutter pub get

Check available devices:

flutter devices

Run the application:

flutter run

For Android development, ensure that:

USB debugging is enabled on the Android device, or
An Android emulator is running.
Environment Configuration

The application requires environment-specific configuration for backend services.

Backend Variables
PORT=5000
MONGO_URI=<MongoDB connection string>
JWT_SECRET=<JWT secret>
OTP_EXPIRY_MINUTES=5
JWT_EXPIRY_DAYS=7
EMAIL_USER=<email account>
EMAIL_PASS=<email app password>
FIREBASE_SERVICE_ACCOUNT=<secure Firebase configuration>
Frontend
REACT_APP_API_URL=<backend API URL>

Never commit actual credentials, database connection strings, JWT secrets, email passwords, Firebase service-account credentials, or private API keys to GitHub.

Running the Complete System

The complete development environment requires the backend, frontend and mobile application to be configured appropriately.

Backend
cd backend
npm install
npm run dev
Web Application
cd frontend
npm install
npm start
Mobile Application
cd mobile
flutter pub get
flutter run

The basic communication flow is:

React Web ──────┐
                │
Flutter Mobile ├──► Express REST API ───► MongoDB Atlas
                │
                └──► Firebase / Email Services
Firebase Configuration

Firebase Cloud Messaging is used for push notifications.

The mobile application requires Firebase configuration for the target platform.

The backend uses Firebase Admin functionality for server-side notification delivery.

For production:

Store Firebase credentials securely.
Do not commit service-account credentials.
Register and refresh FCM device tokens.
Remove invalid or expired tokens.
Configure notification permissions appropriately.
Testing

Testing covers authentication, complaint operations, authorization, notifications and the complete complaint lifecycle.

Authentication Testing

The following should be tested:

OTP generation
OTP delivery
OTP verification
OTP expiration
JWT generation
JWT validation
Unauthorized requests
Complaint Testing


Example role restrictions:

Citizen
  ├── Can create complaints
  ├── Can view own complaints
  └── Can verify resolutions

Crew
  ├── Can view assigned complaints
  └── Can resolve assigned complaints

Admin
  ├── Can view all complaints
  └── Can assign complaints

Officer
  ├── Can view escalated complaints
  └── Can record authorized penalties

Performance Testing

The project documentation records the following test observations:

Metric	Observed Value
Average OTP delivery	~2.3 seconds
Complaint submission	~4.1 seconds including image upload
API p95 response time	~1.8 seconds
Mobile launch	~2.5 seconds
Indexed database query	<50 ms
Load experiment	100 concurrent users

These figures are project test observations, not independently audited production benchmarks. Actual production capacity depends on workload, media sizes, network conditions, database scale and sustained-load testing.

Security

Security mechanisms include:

Email OTP authentication
JWT-based sessions
Role-Based Access Control
Protected API endpoints
Environment-based secret configuration
Input/request validation
Controlled complaint state transitions
HTTPS for deployed environments
Restricted CORS configuration
Image type and size restrictions
Secure database credentials
Firebase credential protection
Security Checklist

Before production deployment:

 Use HTTPS
 Store secrets in secure environment configuration
 Use cryptographically secure OTP generation
 Hash OTP values in production
 Rate-limit OTP requests
 Rate-limit OTP verification attempts
 Restrict CORS to approved origins
 Validate request payloads
 Validate complaint IDs/ObjectIds
 Restrict uploaded image types and sizes
 Avoid exposing stack traces
 Review dependency vulnerabilities
 Use least-privilege service credentials
 Keep secrets out of Git history

License
See the LICENSE file included in this repository for licensing information.

Author
Eruj Kashif

GitHub: github.com/ErujKashif

Project: Resolve & Verify

Project Vision

A complaint should not be considered truly resolved until its resolution can be verified.

Resolve & Verify transforms conventional complaint reporting into a structured, transparent and accountable digital workflow.

The platform connects:

Citizen → Administration → Sanitation Crew → Citizen Verification → Officer Oversight

with the goal of making municipal complaint handling more trackable, evidence-based and citizen-centric.
