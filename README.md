Resolve & Verify

A Citizen-Centric Complaint Management System for Islamabad

<p align="center">
  <strong>A Smart Citizen-Centric Framework for Complaint Management, Resolution Verification, and Municipal Accountability</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web%20%2B%20Mobile-0A66C2?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Mobile-Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

<p align="center">
  <a href="https://github.com/ErujKashif/resolve-and-verify">Repository</a> •
  <a href="#overview">Overview</a> •
  <a href="#system-workflow">Workflow</a> •
  <a href="#technology-stack">Technology Stack</a> •
  <a href="#installation">Installation</a>
</p>

Overview

Resolve & Verify is a full-stack, citizen-centric complaint management platform designed around municipal sanitation services in Islamabad.

The system is designed to close an important accountability gap in conventional complaint handling: a service provider may mark a complaint as resolved, while the citizen may still consider the issue unresolved.

Resolve & Verify introduces a citizen verification stage after field resolution. The citizen can either:

Accept the resolution, which closes the complaint.

Reject the resolution, which escalates the complaint to an authorized officer for review and further administrative action.

The platform combines:

A React-based web application for administrative and officer workflows.

A Flutter mobile application for citizens and sanitation crews.

A Node.js / Express REST API for backend services.

MongoDB Atlas for persistent data storage.

Firebase Cloud Messaging (FCM) for push notifications.

Email OTP authentication and JWT-based authorization.

The system therefore provides a complete digital trail from complaint submission to verified resolution.

Problem Statement

Traditional municipal complaint handling can suffer from a lack of transparency between the moment a complaint is submitted and the moment it is considered resolved.

Key challenges include:

Limited citizen involvement after complaint submission.

Complaints being marked resolved without citizen confirmation.

Difficulty tracking field-service activities.

Limited evidence for verifying completed work.

Manual or fragmented complaint assignment.

Lack of a structured escalation mechanism.

Difficulty maintaining an auditable complaint history.

Limited accountability when a reported issue remains unresolved.

Resolve & Verify addresses these challenges by connecting citizens, sanitation crews, administrators, and senior officers through a single digital workflow.

Objectives

The primary objectives of the system are to:

Digitize the municipal sanitation complaint process.

Allow citizens to submit and monitor complaints.

Provide administrators with centralized complaint management.

Assign complaints to responsible sanitation crews.

Allow field crews to submit resolution information and evidence.

Give citizens the ability to verify completed work.

Escalate rejected resolutions for officer review.

Maintain a traceable digital record of complaint activity.

Improve transparency and accountability in municipal service delivery.

System Workflow

The complete complaint lifecycle is designed as a closed-loop process:

Citizen
   │
   │ Submit Complaint
   ▼
Complaint Created
   │
   │ Admin Review & Assignment
   ▼
Sanitation Crew
   │
   │ Field Work
   │ Resolution Evidence
   ▼
Complaint Marked Resolved
   │
   │ Citizen Verification
   ▼
┌───────────────────────┐
│   Resolution Accepted?│
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      │           │
     YES          NO
      │           │
      ▼           ▼
   CLOSED     ESCALATED
                  │
                  ▼
           Senior Officer
                Review
                  │
                  ▼
          Administrative Action

User Roles

The system defines four primary operational roles.

Role

Primary Responsibilities

Citizen

Submit complaints, view personal complaints, track status, and verify resolutions

Sanitation Crew

View assigned complaints, perform field work, and submit resolution evidence

Administrator

Monitor complaints, assign complaints, and manage sanitation crews

Senior Officer

Review escalated complaints, compare evidence, and record administrative penalties/actions

Complete Complaint Workflow

Step 1 — Citizen Authentication

The citizen enters an email address and requests an OTP.

The system sends the OTP through the configured email service. After entering the valid OTP, the citizen receives an authenticated session.

Email Address
      │
      ▼
Request OTP
      │
      ▼
Email Service
      │
      ▼
Enter OTP
      │
      ▼
OTP Verification
      │
      ▼
Authenticated Session

Step 2 — Complaint Creation

The citizen creates a complaint by providing relevant information such as:

Complaint description

Address

GPS location

Before photograph/evidence

Citizen
   │
   ▼
Complaint Form
   ├── Description
   ├── Address
   ├── GPS Location
   └── Before Evidence
   │
   ▼
Complaint Created

Step 3 — Administrative Assignment

The administrator reviews incoming complaints and assigns them to an appropriate sanitation crew.

New Complaint
     │
     ▼
Administrator
     │
     ▼
Review Complaint
     │
     ▼
Assign Crew
     │
     ▼
Assigned Complaint

Step 4 — Field Resolution

The assigned sanitation crew receives the complaint and handles the reported issue.

The crew can review complaint information and submit resolution evidence after completing the required field work.

Assigned Complaint
        │
        ▼
Sanitation Crew
        │
        ▼
Field Work
        │
        ▼
Resolution Evidence
        │
        ▼
Mark as Resolved

Step 5 — Citizen Verification

After the complaint is marked resolved, the citizen is given an opportunity to verify the resolution.

The citizen has two possible outcomes:

Resolution Accepted

The complaint is considered successfully resolved and is closed.

Resolution Rejected

The complaint is escalated to an authorized senior officer for further review and administrative action.

                 RESOLVED
                    │
                    ▼
          Citizen Verification
                    │
             ┌──────┴──────┐
             │             │
           Accept        Reject
             │             │
             ▼             ▼
           CLOSED       ESCALATED
                           │
                           ▼
                    Officer Review

Key Features

Citizen Module

Email OTP authentication

Complaint submission

Complaint description and address

GPS/location information

Before complaint evidence

Personal complaint history

Complaint status tracking

Resolution verification

Resolution acceptance/rejection

Complaint updates and notifications

Sanitation Crew Module

Secure authentication

Assigned complaint dashboard

Complaint details

Location information

Resolution evidence submission

Complaint resolution workflow

Status updates

Administrator Module

Administrative dashboard

Complaint monitoring

Complaint filtering

Crew management

Complaint assignment

Complaint status monitoring

Centralized operational oversight

Senior Officer Module

Escalated complaint management

Complaint investigation

Evidence review

Before/after comparison

Administrative action

Penalty recording where applicable

Evidence-Based Resolution

A key concept of Resolve & Verify is that complaint resolution should be supported by digital evidence.

Citizen-Side Evidence

A complaint may include:

Description of the issue

Address

GPS coordinates

Before photograph/evidence

Crew-Side Evidence

A resolved complaint may include:

Resolution/after photograph

Location information

Resolution timestamp

Additional resolution information

This creates a digital evidence trail that can be reviewed when a citizen rejects a resolution or when an officer investigates an escalation.

        ORIGINAL COMPLAINT
               │
               ▼
        ┌───────────────┐
        │ Before        │
        │ Evidence      │
        └───────┬───────┘
                │
                │ Field Work
                ▼
        ┌───────────────┐
        │ Resolution    │
        │ Evidence      │
        └───────┬───────┘
                │
                ▼
       Citizen Verification
                │
          ┌─────┴─────┐
          │           │
        Accept      Reject
          │           │
          ▼           ▼
       Closed      Officer
                   Review

Technology Stack

Frontend

Technology

Purpose

React.js

Web application development

JavaScript

Application logic

HTML5

Web structure

CSS3

User interface styling

React Router

Client-side routing

Context API

Application state management

Mobile Application

Technology

Purpose

Flutter

Cross-platform mobile application

Dart

Mobile application development

Provider

State management

GoRouter

Application routing

Geolocation

Location services

Image Picker / Camera

Evidence capture

Firebase Messaging

Push notifications

Local Notifications

Local notification handling

Backend

Technology

Purpose

Node.js

Backend runtime

Express.js

REST API framework

REST APIs

Client-server communication

JWT

Authentication/session authorization

Nodemailer

Email/OTP delivery

Firebase Admin SDK

Push notification services

Database

Technology

Purpose

MongoDB

Primary database

MongoDB Atlas

Cloud database hosting

Mongoose

MongoDB object modeling

Development Tools

Tool

Purpose

Git

Version control

GitHub

Source code hosting

Postman

API testing

VS Code

Development environment

Flutter SDK

Mobile development

System Architecture

                         ┌─────────────────────────┐
                         │          USERS          │
                         │                         │
                         │ Citizen | Crew | Admin  │
                         │       | Officer         │
                         └────────────┬────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     │                                 │
                     ▼                                 ▼
           ┌───────────────────┐             ┌───────────────────┐
           │  Flutter Mobile   │             │   React Web App   │
           │                   │             │                   │
           │ Citizen + Crew   │             │ Admin + Officer   │
           └─────────┬─────────┘             └─────────┬─────────┘
                     │                                 │
                     └────────────────┬────────────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │    Node.js / Express    │
                         │                         │
                         │ Authentication          │
                         │ Authorization           │
                         │ Complaint Management    │
                         │ Assignment              │
                         │ Resolution              │
                         │ Verification            │
                         │ Escalation              │
                         │ Notifications            │
                         └───────────┬─────────────┘
                                     │
                     ┌───────────────┼────────────────┐
                     │               │                │
                     ▼               ▼                ▼
              ┌────────────┐  ┌─────────────┐  ┌─────────────┐
              │  MongoDB   │  │  Firebase   │  │    Email    │
              │   Atlas    │  │    FCM      │  │    / OTP    │
              └────────────┘  └─────────────┘  └─────────────┘

Authentication & Authorization

Resolve & Verify uses email OTP authentication together with JWT-based authorization.

Authentication Flow

User
 │
 │ Email
 ▼
Backend
 │
 │ Generate OTP
 ▼
Email Service
 │
 │ OTP
 ▼
User
 │
 │ Enter OTP
 ▼
OTP Verification
 │
 ▼
JWT Session
 │
 ▼
Authenticated User

Role-Based Access

Role

Access

Citizen

Citizen complaint and verification operations

Sanitation Crew

Assigned complaint and resolution operations

Administrator

Complaint assignment and crew management

Senior Officer

Escalation review and administrative actions

Database Design

MongoDB is used as the primary persistent data store.

Main Entities

Users
 ├── Citizen
 ├── Sanitation Crew
 ├── Administrator
 └── Senior Officer

Complaints
 ├── Citizen
 ├── Assigned Crew
 ├── Complaint Information
 ├── Location
 ├── Before Evidence
 ├── Resolution Evidence
 ├── Status
 ├── Verification
 ├── Escalation
 └── Administrative Action

Complaint Data

Field

Description

citizen

Citizen associated with the complaint

address

Reported complaint address

location

Geographic information

beforePhoto

Original complaint evidence

afterPhoto

Resolution evidence

status

Current complaint state

assignedTo

Assigned sanitation crew

resolvedAt

Resolution timestamp

verification

Citizen verification information

escalatedAt

Escalation timestamp

penaltyAmount

Recorded penalty where applicable

penaltyRecordedBy

Officer associated with administrative action

createdAt

Complaint creation timestamp

API Overview

The backend exposes REST APIs for authentication, complaint management, user management, assignment, resolution, verification, escalation, and notifications.

Authentication

Method

Endpoint

Description

POST

/api/auth/send-otp

Send authentication OTP

POST

/api/auth/verify-otp

Verify OTP and issue JWT

GET

/api/auth/me

Get authenticated user

Complaints

Method

Endpoint

Description

POST

/api/complaints

Create complaint

GET

/api/complaints/my

Get citizen complaints

GET

/api/complaints/assigned

Get assigned crew complaints

GET

/api/complaints/all

Get all complaints

GET

/api/complaints/escalated

Get escalated complaints

GET

/api/complaints/:id

Get complaint details

PUT

/api/complaints/:id/assign

Assign complaint

PUT

/api/complaints/:id/resolve

Resolve complaint

PUT

/api/complaints/:id/verify

Verify resolution

POST

/api/complaints/:id/penalty

Record penalty

User Management

Method

Endpoint

Description

GET

/api/users/crews

Get crew members

POST

/api/users/crew

Add crew member

DELETE

/api/users/crew/:id

Delete crew member

POST

/api/users/fcm-token

Register FCM token

Notification System

Firebase Cloud Messaging is used to support push notifications.

Event

Recipient

Complaint assigned

Sanitation Crew

Complaint resolved

Citizen

Verification required

Citizen

Resolution rejected

Senior Officer

Administrative action recorded

Relevant user

Project Structure

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

Installation

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

Create a .env file inside the backend directory:

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

3. Frontend Setup

Open a new terminal:

cd frontend
npm install

Configure the backend API URL according to the environment configuration used by the frontend.

Example:

REACT_APP_API_URL=http://localhost:5000/api

Start the React application:

npm start

4. Mobile Setup

cd mobile
flutter pub get
flutter devices
flutter run

Firebase Configuration

Firebase services are used for notification functionality.

For mobile development, configure Firebase for the target platform according to the Firebase project configuration.

The backend may use Firebase Admin credentials to send notifications.

Security: Never commit Firebase private credentials, service-account files, JWT secrets, MongoDB credentials, email passwords, or other secrets to GitHub.

Testing

Testing should cover the complete complaint lifecycle as well as individual application components.

Authentication Testing

OTP generation

OTP verification

OTP expiry

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

API Testing

API endpoints can be tested using Postman.

Security

The system incorporates several security considerations:

Email OTP authentication

JWT-based authorization

Role-Based Access Control

Protected API endpoints

Environment variables for secrets

Role-specific operations

Controlled complaint state transitions

Secure deployment configuration

Sensitive Files

The following must not be committed:

.env
.env.*
MongoDB credentials
JWT secrets
Firebase service-account credentials
Email passwords
Private API keys

Deployment

The project is structured to support cloud deployment.

                         GitHub
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
           Vercel                       Render
              │                           │
              ▼                           ▼
       React Web App              Node / Express API
                                          │
                                          ▼
                                   MongoDB Atlas
                                          │
                                          ▼
                                  Firebase Services

Component

Technology / Platform

Web Frontend

React

Frontend Hosting

Vercel

Backend API

Node.js + Express

Backend Hosting

Render

Database

MongoDB Atlas

Mobile Application

Flutter

Push Notifications

Firebase Cloud Messaging

Source Control

Git + GitHub

Future Enhancements

Potential future improvements include:

Urdu and multilingual support

Offline support for field crews

GIS-based complaint visualization

Automatic zone-based crew assignment

Advanced complaint analytics

Predictive complaint analysis

Live sanitation vehicle tracking

IoT-enabled waste-bin integration

Contractor performance analytics

Excel/PDF reporting

Repeat-issue detection

Advanced municipal reporting dashboards

Project Information

Field

Details

Project Name

Resolve & Verify

Project Type

Full-Stack Web & Mobile Application

Domain

Civic Technology / Municipal Complaint Management

Target Area

Islamabad

Organization

National Engineering and Scientific Commission (NESCOM)

Author

Eruj Kashif

Supervisor

Dr. Inayatullah Khan Yousafzai

Date

August 2026

Author

Eruj Kashif
Software Engineering Student
Full-Stack & Mobile Application Developer

GitHub: https://github.com/ErujKashif

Project Repository: https://github.com/ErujKashif/resolve-and-verify

License

This project is licensed under the MIT License. See the LICENSE file for details.

Project Vision

A complaint should not be considered truly resolved until its resolution can be verified.

Resolve & Verify transforms traditional complaint reporting into a trackable, verifiable, and accountable digital workflow, giving citizens a meaningful role in the resolution process while providing municipal stakeholders with structured tools for monitoring and accountability.

<p align="center">
  <strong>Resolve & Verify</strong><br>
  <em>Report. Resolve. Verify.</em><br><br>
  Built with React • Flutter • Node.js • Express • MongoDB • Firebase
</p>
