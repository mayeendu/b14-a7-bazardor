# 🛒 বাজার দর | BazarDor

### Your Daily Market Price Guide for Bangladesh 🇧🇩

**BazarDor (বাজার দর)** is a web application designed to help people in Bangladesh check daily prices of essential commodities in one place. Users can explore product prices, compare today's prices with yesterday's, and view price changes to make more informed shopping decisions.

---

## 🚀 Key Features

### 1. 📊 Daily Market Price Updates

View the latest available prices of essential products, including rice, lentils, vegetables, fish, meat, eggs, and spices.

### 2. 📈 Price Change Tracking

Compare today's prices with yesterday's prices and identify price increases or decreases through clear visual indicators.

### 3. 🔍 Product Search and Category Filtering

Find products quickly and explore items by category for a smoother browsing experience.

### 4. 📉 Market Price Comparison

Explore market price information, including minimum, average, and maximum prices, where available, to better understand price variations.

### 5. 🔐 User Authentication

Register for an account and sign in using Better Auth. The application is being developed with email/password authentication and Google and GitHub sign-in support.

---

## 🛠️ Technologies Used

| Technology      | Purpose                                          |
| --------------- | ------------------------------------------------ |
| Next.js         | React framework and application routing          |
| React           | Building interactive user interfaces             |
| TypeScript      | Type-safe application development                |
| Tailwind CSS    | Responsive styling                               |
| DaisyUI         | UI components and design utilities               |
| MongoDB         | Database for authentication and application data |
| Better Auth     | User authentication and session management       |
| React Hot Toast | Notifications and feedback messages              |
| REST API        | Fetching product and category data               |

---

## 💻 Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* A MongoDB Atlas account for database-backed authentication

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd b14-a7-bazardor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=YOUR_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URL=YOUR_MONGODB_CONNECTION_STRING
```

Replace the placeholders with your own values. Never commit `.env.local` or expose your database credentials.

**5. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📂 Project Purpose

BazarDor aims to make everyday market price information more accessible to people in Bangladesh through a simple, responsive, and user-friendly interface.

The project also serves as a practical demonstration of modern full-stack web development using Next.js, TypeScript, REST APIs, and database-backed authentication.

---

## 👨‍💻 Developer

Developed as a web application project using modern JavaScript technologies.

---

⭐ **If you find this project useful, consider giving the repository a star!**
