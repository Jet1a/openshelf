# OpenShelf

OpenShelf is a modern web application for book enthusiasts, allowing users to explore, rent, and manage books conveniently. With OpenShelf, users can select books to rent by specifying a date range, mark books as favorites, and view their rental history. The platform also features an admin interface for managing the book inventory through CRUD operations.

## Features

### User Features
- **Book Rental**: Select a book and choose a date range for borrowing.
- **Favorites**: Add books to your favorites for quick access later.
- **Rental History**: View a comprehensive list of books you've rented.

### Admin Features
- **CRUD Operations**: Add, update, delete, and read book data to manage the inventory effectively.

### Authentication
- Users must register and log in using [NextAuth](https://next-auth.js.org/), which includes:
  - Credentials-based authentication
  - Google authentication
  - GitHub authentication

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- MongoDB connection string
- Google and GitHub API credentials for authentication

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jet1a/openshelf.git
   cd openshelf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and include the following:
   ```env
   DATABASE_URL=<your-mongodb-connection-string>
   NEXTAUTH_URL=<your-app-url>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GITHUB_CLIENT_ID=<your-github-client-id>
   GITHUB_CLIENT_SECRET=<your-github-client-secret>
   ```

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Deployment
You can deploy this application on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure that you configure the environment variables in the hosting platform's settings.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve OpenShelf.

## Acknowledgements
- **NextAuth**: For seamless authentication integration.
- **Prisma**: For simplifying database management.
- **MongoDB**: For scalable data storage.
- **Tailwind CSS**: For rapid UI development.

---

Enjoy exploring and managing your library with OpenShelf!

