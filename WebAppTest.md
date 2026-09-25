# Project Overview: [Your App Name]

## 🎯 Core Goals

- **User Base:** A private web application for exactly **6 users**.
- **Cost Constraint:** Must be **100% free** (both development and ongoing usage) by leveraging free tiers of modern services.
- **Core Experience:** A multi-game platform featuring interactive minigames, a persistent "World State," and social features.
- **Mobile-First Design:** The application must be primarily designed for mobile devices, ensuring seamless navigation and interaction on phones before expanding to desktop screens.

## 🛠 Functional Requirements

- **User Accounts:** Unique logins for each of the 6 users with individualized progress tracking.
- **Real-Time World State:** Instant synchronization across all clients for:
  - Game completions.
  - Chat/Text messages.
  - Virtual pet interactions (e.g., feeding).
  - Item gains and trades between users.
- **Multimedia & Input:**
  - Camera integration for QR code scanning.
  - Video playback of short clips hosted in the cloud.
- **Mini-Games:** Multiple distinct interactive games within a single unified web app.
- **Responsive UI/UX:** Touch-friendly interactions (large buttons, swipe gestures) and an adaptive layout that adjusts perfectly to various mobile screen sizes.

## 💻 Technical Stack

| Component                | Technology              | Role                                                                                         |
| :----------------------- | :---------------------- | :------------------------------------------------------------------------------------------- |
| **Build Tool**           | Vite                    | Fast development server and bundling.                                                        |
| **Frontend Framework**   | Vue 3 (Composition API) | UI components and reactive logic.                                                            | \   |
| **Styling**              | Vanilla CSS             | Traditional, clean styling with a focus on responsive design and mobile-first media queries. | \   |
| **State Management**     | Pinia                   | Handling global "World State" across the app.                                                | \   |
| **Backend-as-a-Service** | Supabase                | Handles Auth, Database (PostgreSQL), Realtime Sync, and Storage.                             | \   |

## 🚀 Development Strategy

### Phase 1: Frontend Shell (Current)

_Goal: A fully navigable web app that works perfectly using "fake" data._

**✅ Completed Tasks:**

- [x] Project Initialization (Vite + Vue + Pinia + Router)
- [x] Folder Structure Scaffolding (`views`, `components`, `games`, `features`, `mocks`)
- [x] Core Components Creation (Navbar, PetDisplay, Gamecard)
- [x] View Layouts Created (Dashboard, Gallery, Login)

**⏳ Remaining Tasks:**

1.  **Design System Foundation:**
    - Define cyberpunk theme in `variables.css` (Neon colors, Cyber gradients).
    - Establish base responsive layouts and global typography in `main.css`.
2.  **UI Component Library:**
    - Create "Smart" components in `src/components` (e.g., `CyberButton.vue`, `CyberCard.vue`).
    - Ensure all core UI elements follow the cyberpunk aesthetic consistently.
3.  **Design Sandbox Testing:**
    - Use `App.vue` as a sandbox to verify layout, glow effects, and component behavior before integrating into full pages.
4.  **Navigation & Routing:** Connect the new views to the router so we can move between pages.
5.  **World State Logic:** Create the Pinia store that reads from `src/mocks/worldState.ts`.
6.  **Mock Game Development:** Pick one game (e.g., Puzzle or Virtual Pet) and build its logic using local variables first.
7.  **Messenger UI Layout:** Build out the visual shell of the Chat Window and Message Input within the dashboard and games.

### Phase 2: Authentication & Storage

_Goal: Connect your app to Supabase and make it "Real."_

1.  **Supabase Setup:** Create a free project in Supabase. Set up a `profiles` table for your 6 users and a `messages` table for the chat.
2.  **Authentication:** Replace the mock Login page with actual **Supabase Auth**. This will handle sign-ins and keep sessions active.
3.  **Data Migration (Mock $\rightarrow$ Real):** Start replacing the "Mock" variables in your Pinia stores with real database queries.
    - _Example:_ Instead of `worldState` being a hardcoded object, it now fetches from your PostgreSQL table on load.
4.  **Image/Video Storage:** Connect **Supabase Storage** to allow users to see video clips or upload custom content.

### Phase 3: Real-Time & Social (The Polish)

_Goal: Instant synchronization across all 6 users._

1.  **Real-time Messaging:** Enable **Supabase Realtime**. When one user types in the messenger, the text should appear on everyone else's screen instantly without refreshing.
2.  **World State Sync:** Implement real-time updates for the "Virtual Pet" interactions (e.g., if User A feeds the pet, User B sees the hunger bar move immediately).
3.  **Trade & Interaction Logic:** Build out the logic for item gains and trades between the 6 users.
4.  **Deployment:** Deploy the final site to a free hosting provider (like Vercel or Netlify) to make it accessible to your private group of users.

---

### 🚦 Current Status

**Next Action Item:** Step 1 of Phase 1 — **Design System Foundation** (`variables.css` & `main.css`).
