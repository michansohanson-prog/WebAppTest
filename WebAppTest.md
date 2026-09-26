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

| Component                | Technology              | Role                                                                                |
| :----------------------- | :---------------------- | :---------------------------------------------------------------------------------- |
| **Build Tool**           | Vite                    | Fast development server and bundling.                                               |
| **Frontend Framework**   | Vue 3 (Composition API) | UI components and reactive logic.                                                   |
| **Styling**              | Vanilla CSS             | Clean, variable-driven styling focusing on mobile-first performance and modularity. |
| **State Management**     | Pinia                   | Handling global "World State" across the app.                                       |
| **Backend-as-a-Service** | Supabase                | Handles Auth, Database (PostgreSQL), Realtime Sync, and Storage.                    |

## 🚀 Development Strategy

### Phase 1: Frontend Shell (Current)

_Goal: A fully navigable web app that works perfectly using "fake" data._

**✅ Completed Tasks:**

- [x] Project Initialization (Vite + Vue + Pinia + Router)
- [x] Folder Structure Scaffolding (`views`, `components`, `games`, `features`, `mocks`)
- [x] **Design System Foundation:** Established a comprehensive variable system in `variables.css` for colors, spacing, fluid typography, and glow effects.
- [x] **Refactored Core Styling:** Streamlined `main.css` to act as a global foundation (Reset, Typography, Branding) rather than containing component logic.
- [x] **Login System Implementation:** Built a functional authentication flow with dummy credentials, loading states, and navigation logic.
- [x] **Global Shell & Navigation:** Created an `App.vue` shell that hosts all views and includes a persistent bottom navigation bar for core sections (Hub, Comm, Messages, Games, Familiars, Inventory, Archives).
- [x] **Comprehensive View Architecture:** Successfully built and refined the UI foundations for all primary application nodes:
  - **LoginView**: Secure entrance with credential validation.
  - **HubView**: Centralized dashboard for navigation.
  - **InventoryView**: Full asset management with filtering and status badges.
  - **MessagesView**: Multi-pane communication interface (Inbox + Content).
  - **FamiliarsView**: Synthetic lifeform interaction system.
  - **GamesView**: Simulation selection grid.
  - **ArchivesView**: Resource library for maps and wiki data.
- [x] **Smart Component Library:**
  - Created `CyberButton.vue`: A robust component supporting sizes (`sm`, `md`, `lg`), color variants with neon gradients, loading states, sound effects, and on/off toggle functionality.
  - Created `CyberTile.vue`: A flexible navigation card handling dynamic backgrounds, dark overlays, multiple text layouts, and color variants.
  - Created `InventoryItem.vue`: A horizontal list-item component designed for selection, featuring custom slots for icons/status badges and specific layout rules for descriptive text.

**⏳ Remaining Tasks:**

1.  **World State Logic (Engine Setup):** Create the Pinia store that reads from `src/mocks/worldState.js`. This must be structured as a **Progress Engine** to handle milestone flags and unlocks.
2.  **AudioManager Implementation:** Build a centralized Audio Manager service to manage global volume, mute toggles, asset preloading, and concurrency for all sound triggers.
3.  **Mock Game Development:** Pick one game (e.g., Puzzle or Virtual Pet) and build its logic using local variables first.
4.  **Messenger UI Layout Finalization:** Refine the real-time text input behavior and transition effects within the Chat Window.

### 🔐 Progression & Gatekeeping Architecture (New)

_Goal: Ensure long-term narrative consistency and prevent unauthorized "skipping" of content._

1.  **Unified Progress Store:** All user progress (Story Chapters, Pet Growth, Game Levels) will be stored as a flat "Flag" system in the database.
2.  **Gatekeeper Middleware:** A centralized utility to check flags before rendering components or allowing navigation (e.g., `canAccess('chapter_2')`).
3.  **Authoritative Unlocks:** Use Supabase Row-Level Security (RLS) to ensure that even if a user navigates to a "locked" URL, the database refuses to serve any data unless the required milestones are met.

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

**Next Action Item:** Begin World State Logic development by creating the Pinia Progress Engine to move from "static" pages to "dynamic" interaction.
