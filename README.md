# nextjs-bloglist

Blog list built with **Next.js** (App Router), **NextAuth.js**, **Drizzle ORM** over **PostgreSQL** and **Tailwind CSS**. A course project from [Full Stack Open (Next.js)](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs) at the University of Helsinki.

## Technologies

- [Next.js](https://nextjs.org) 16 — App Router, React Server Components
- [React](https://react.dev) 19
- [NextAuth.js](https://next-auth.js.org) — authentication with username/password
- [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) — PostgreSQL serverless
- [Tailwind CSS](https://tailwindcss.com) 4 — styling
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — password hashing
- MDX — blog content
- [Playwright](https://playwright.dev) — end-to-end testing
- TypeScript

## Features

- Blog list with title, author, URL, and likes
- Create blogs (authenticated users)
- Like blogs
- User registration and login
- User profiles and their blogs
- Reading list (mark blogs as read)
- Testing routes for resetting database and users

## Project Structure

```
app/
  page.tsx              # Home page
  blogs/
    page.tsx            # Blog list
    new/                # Create blog
    [id]/               # Blog detail
  users/
    page.tsx            # User list
    [username]/         # User profile
  login/                # Login page
  register/             # Registration page
  me/                   # Authenticated user profile
  api/
    auth/[...nextauth]/ # NextAuth
    me/                 # Current user
    testing/reset/      # Database reset
    testing/users/      # Create test users
  actions/              # Server Actions
  services/             # Data access services
  components/           # UI components
db/
  schema.ts             # Drizzle schema (blogs, users, readingList)
drizzle/                # Drizzle migrations (SQL)
tests/                  # E2E tests with Playwright
content/
  homepage.mdx          # MDX homepage content
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- A PostgreSQL database (e.g., [Neon](https://neon.tech))
- Environment variables configured in `.env.local`

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file from `.env.test` and adjust the values:

```
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require
AUTH_SECRET=secret_for_session_signing
NEXTAUTH_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database

Apply Drizzle migrations:

```bash
npx drizzle-kit migrate
```

### Testing

End-to-end tests with Playwright:

```bash
npm run test:e2e
npm run test:e2e:ui   # Playwright UI
```

### Lint and Build

```bash
npm run lint
npm run build
npm start
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | Linting with ESLint |
| `npm run test:e2e` | E2E tests with Playwright |
| `npm run test:e2e:ui` | E2E tests with Playwright UI |

## License

This project is for educational use as part of the Full Stack Open course.
