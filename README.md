# 🎙️ AI Podcast Processor

Transform your podcasts with AI-powered analysis. Upload your audio and get AI-generated summaries, transcripts, social posts, key moments, and more - all in minutes.

## ✨ Features

- **AI-Powered Transcription** - High-accuracy transcription using AssemblyAI with word-level timing
- **Smart Summaries** - Comprehensive summaries with key points, insights, and TL;DR
- **Social Media Posts** - Platform-optimized content for Twitter, LinkedIn, Instagram, TikTok, YouTube, and Facebook
- **SEO Optimization** - AI-generated titles and hashtags for maximum discoverability
- **Key Moments** - Automatically identify viral-worthy moments with timestamps
- **YouTube Chapters** - Auto-generated chapter timestamps for better navigation
- **Speaker Diarization** - Full transcript with speaker identification (ULTRA plan)
- **Parallel Processing** - Fast AI generation with optimized parallel execution

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with compiler optimizations
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Infrastructure
- **Convex** - Real-time backend database with reactive queries
- **Inngest** - Durable workflow orchestration with automatic retries
- **AssemblyAI** - Advanced audio transcription and analysis
- **Google Gemini** - AI content generation
- **Vercel Blob** - File storage and CDN
- **Clerk** - Authentication and user management with billing integration

### Development Tools
- **Biome** - Fast linter and formatter
- **Concurrently** - Run multiple dev processes

## 📋 Prerequisites

- Node.js 20+ and npm/yarn/pnpm
- Accounts and API keys for:
  - [Convex](https://convex.dev) - Backend database
  - [Clerk](https://clerk.com) - Authentication
  - [AssemblyAI](https://www.assemblyai.com) - Transcription
  - [Google AI Studio](https://aistudio.google.com) - Gemini API
  - [Vercel](https://vercel.com) - Blob storage
  - [Inngest](https://www.inngest.com) - Workflow orchestration

## �️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-podcast-youtube
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AssemblyAI
ASSEMBLYAI_API_KEY=

# Google Gemini
GEMINI_API_KEY=

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

4. Set up Convex:
```bash
npx convex dev
```

5. Configure Clerk billing features in your Clerk Dashboard to match the feature identifiers in `lib/tier-config.ts`

## 🏃 Development

Run the development server:

```bash
npm run dev
```

This starts both Next.js (port 3000) and Convex dev server concurrently.

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Build & Deploy

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## 💰 Pricing Tiers

### Free Plan
- 3 lifetime projects
- 10MB max file size
- 10 minutes max duration
- AI summary generation
- Basic transcription

### Pro Plan - $29/month
- 30 active projects
- 200MB max file size
- 2 hours max duration
- All Free features plus:
  - Social media posts
  - Title suggestions
  - Hashtag generation

### Ultra Plan - $69/month
- Unlimited projects
- 3GB max file size
- Unlimited duration
- All Pro features plus:
  - Key moments detection
  - YouTube chapter timestamps
  - Speaker diarization

## 🏗️ Project Structure

```
├── app/                      # Next.js App Router
│   ├── actions/             # Server actions
│   ├── api/                 # API routes
│   ├── dashboard/           # Dashboard pages
│   └── components/          # App-specific components
├── components/              # Reusable UI components
│   ├── home/               # Landing page sections
│   ├── processing-flow/    # Processing status UI
│   ├── project-detail/     # Project detail views
│   ├── project-tabs/       # Content tabs
│   └── ui/                 # Base UI components
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   └── projects.ts         # Project queries/mutations
├── inngest/                 # Workflow orchestration
│   ├── functions/          # Inngest functions
│   ├── steps/              # Processing steps
│   │   ├── ai-generation/  # AI content generation
│   │   ├── persistence/    # Data persistence
│   │   └── transcription/  # Audio transcription
│   └── schemas/            # Output schemas
└── lib/                     # Shared utilities
    ├── tier-config.ts      # Plan limits & features
    └── hooks/              # Custom React hooks
```

## 🔄 Processing Workflow

1. **Upload** - User uploads audio file to Vercel Blob
2. **Trigger** - Server action sends event to Inngest
3. **Transcription** - AssemblyAI transcribes audio with speaker detection
4. **AI Generation** - Parallel execution of 6 AI tasks (based on plan):
   - Summary (all plans)
   - Social posts (Pro+)
   - Titles (Pro+)
   - Hashtags (Pro+)
   - Key moments (Ultra)
   - YouTube timestamps (Ultra)
5. **Persistence** - Results saved to Convex database
6. **Real-time Updates** - UI updates automatically via Convex subscriptions

## 🎯 Key Features

### Durable Workflows
- Automatic retries with exponential backoff
- Individual job error tracking
- Graceful degradation (save successful results even if some jobs fail)

### Parallel Processing
- 5x faster than sequential processing
- Optimized for Inngest's parallel execution
- ~60s total vs ~300s sequential

### Real-time UI
- Convex reactive queries for instant updates
- Granular job status tracking
- Progress indicators for each processing phase

### Tier-based Access Control
- Feature gating based on Clerk billing
- Graceful upgrade prompts
- Retry/regenerate failed jobs

## 🧪 Code Quality

Lint and format code:

```bash
npm run lint
npm run format
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

## 📧 Support

For issues or questions, please contact the project maintainer.
