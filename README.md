# Focusly - Your All-in-One Productivity & Collaboration Hub

Focusly is a comprehensive web application designed to streamline productivity and enhance team collaboration. It integrates essential tools like task management, mind mapping, a Pomodoro timer, real-time chat, and a unified calendar into a single, cohesive platform. Built with Next.js and a modern tech stack, Focusly aims to help individuals and teams organize their work, visualize ideas, and stay synchronized.

✨ **[Watch the Demo Video](https://placeholder)** ✨

![Focusly Landing Page](public/images/landing.png)

![Focusly Dashboard](public/images/dashboard_black.png)

## Key Features

Focusly offers a rich set of features to boost your productivity and teamwork:

- **Task Management & Notes:**
  Create, organize, and track tasks and notes with an enhanced editor. Assign tasks, add categories, tag items, set due dates, add images, and see them reflected in your calendar.
  ![Task Management](public/images/task_with_image.png)
  ![Task Edit](public/images/task_edit_black.png)

- **Mind Maps:**
  Visually build out projects and ideas with interactive mind maps. Customize nodes and edges, collaborate with your team by tagging, and assign users directly to mind map elements.
  ![Mind Maps](public/images/mind_map_edit_black.png)
  ![Mind Map Connections](public/images/connection_type_black.png)

- **Integrated Calendar:**
  Keep track of all scheduled tasks, deadlines, and events in a unified calendar view, ensuring clear visibility of project timelines for the whole team.
  ![Integrated Calendar](public/images/calendar_black.png)

- **Pomodoro Timer:**
  Enhance your focus with a built-in Pomodoro timer. Customize work sessions, rounds, break times, and alert sounds to match your productivity style.
  ![Pomodoro Timer](public/images/pomodoro_black.png)

- **Real-time Group Chat:**
  Engage in discussions with your team, share files, and receive instant notifications to stay in sync. Features include message editing, file previews, and more.
  ![Real-time Group Chat](public/images/group_chat_black.png)

- **User Roles & Permissions:**
  Manage your workspace effectively with a robust role system. Admins and owners can assign roles (Owner, Admin, Member, Read-Only), control access, and manage workspace settings.
  ![User Roles & Permissions](public/images/workspace_members_black.png)

- **Starred Items & Quick Access:**
  Easily star important tasks and mind maps for quick access. Utilize search and filtering options by users or tags to find what you need efficiently.
  ![Starred Items & Quick Access](public/images/starred_black.png)

- **Onboarding & User Profiles:**
  A smooth onboarding process helps new users set up their profiles and initial workspace. Manage your account settings, profile image, and password.
  ![Onboarding](public/images/onboarding_black.png)

- **Settings:**
  Customize your Focusly experience with a variety of settings. Change your theme, update your profile, and manage your account.
  ![Settings](public/images/account_settings_black.png)

- **Workspace Settings:**
  Manage your workspace settings, including the workspace name, image, and members.
  ![Workspace Settings](public/images/workspace_settings_black.png)

- **Quick Add & Notifications:**
  Quickly add tasks from anywhere in the application and stay up-to-date with notifications for important events.
  ![Quick Add](public/images/quick_add_task_black.png)
  ![Notifications](public/images/notifications_black.png)

- **Assigned to Me:**
  View all tasks and mind maps assigned to you in one place.
  ![Assigned to Me](public/images/assigned_black.png)

## Tech Stack

Focusly is built with a modern and robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **State Management:** React Context API, [React Query](https://tanstack.com/query/latest) for server state
- **Real-time Features (User Activity):** [Supabase](https://supabase.io/) (Realtime Presence)
- **File Uploads:** [UploadThing](https://uploadthing.com/)
- **Form Validation:** [Zod](https://zod.dev/)
- **Date Management:** [Day.js](https://day.js.org/)
- **API Communication:** [Axios](https://axios-http.com/)
- **UI Components & Libraries:**
  - [React Flow](https://reactflow.dev/) (for Mind Maps)
  - [Tiptap Editor](https://tiptap.dev/) (for rich text editing)
  - [Framer Motion](https://www.framer.com/motion/) (for animations)
  - [Lucide Icons](https://lucide.dev/) (for icons)
  - `embla-carousel` (for image carousels)
  - `cmdk` (for command menus)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm, yarn, or pnpm
- A database instance compatible with Prisma (e.g., PostgreSQL)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/focusly.git
    cd focusly
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    - Duplicate the `.env.example` file and rename it to `.env`.
    - Fill in the required environment variables. Key variables will include:
      - `DATABASE_URL`: Your database connection string.
      - `NEXTAUTH_SECRET`: A secret key for NextAuth.js.
      - `NEXTAUTH_URL`: The canonical URL (e.g., `http://localhost:3000`).
      - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
      - `GITHUB_ID` / `GITHUB_SECRET`
      - `UPLOADTHING_SECRET` / `UPLOADTHING_APP_ID`
      - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure Overview

The project follows a structure typical of Next.js applications using the App Router:

```
focusly/
├── app/                      # Next.js App Router: pages, layouts, API routes
│   ├── [locale]/             # Internationalization (i18n) support
│   │   ├── (auth)/           # Authentication pages
│   │   ├── dashboard/        # Dashboard pages
│   │   └── page.tsx          # Landing page
│   ├── api/                  # API route handlers
│   └── globals.css           # Global styles
├── components/               # Reusable UI components
│   ├── auth/
│   ├── common/
│   ├── home/                 # Landing page specific components
│   ├── ui/                   # Base UI elements (shadcn/ui)
│   └── ...
├── context/                  # React Context providers
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities, Prisma client, Auth config
├── messages/                 # i18n message files
├── prisma/                   # Prisma schema and migrations
├── public/                   # Static assets (images, fonts)
├── providers/                # Global context providers wrapper
├── schema/                   # Zod validation schemas
├── types/                    # TypeScript type definitions
├── .env.example
├── next.config.js
├── package.json
└── tsconfig.json
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`
  Runs the app in development mode.

- `npm run build` or `yarn build`
  Builds the app for production.

- `npm run start` or `yarn start`
  Starts the production server.

- `npm run lint` or `yarn lint`
  Runs the Next.js linter.

## License 📄

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author ✍️

- **Sarthak Rawat** - [GitHub Profile](https://github.com/SarthakRawat-1)
