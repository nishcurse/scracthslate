
export const HERO = {
  badge: "Real-time collaboration",

  version: "v1.0 / 1000+ teams",

  title: {
    first: "Think. Less",
    highlight: "Do. More",
  },

  description:
    "Real-time collaborative whiteboarding built for teams that move fast. Sketch ideas, map systems, brainstorm with teammates, and stay in sync—without breaking your flow.",

  primaryButton: "Sign in with Google",

  secondaryButton: "Visit Github",

  features: [
    {
        icon: "ph:check-square-bold",
        label: "No sync lag",
    },
    {
        icon: "ph:check-square-bold",
        label: "Always saved",
    },
    {
        icon: "ph:check-square-bold",
        label: "Team ready",
    },
] as const,

  cards: [
    {
      value: "1000+",
      label: "Teams sketching",
      variant: "paper",
    },
    {
      value: "0ms",
      label: "Sync Latency",
      variant: "ink",
    },
    {
      value: "✓",
      label: "Focus Safe",
      variant: "acid",
    },
    {
      value: "10M+",
      label: "Strokes/Session",
      variant: "paper",
    },
  ],
} as const;

export const WHY_SECTION = {
  section: "01 / Why ScratchSlate",

  title: "Real collaboration, zero friction",

  cards: [
    {
      icon: "ph:lightning-bold",

      title: "Real-Time Collaboration",

      description:
        "Draw together with teammates. Every stroke appears instantly across connected devices. No lag, just flow.",

      variant: "acid",
    },

    {
      icon: "ph:square-half-bold",

      title: "Infinite Canvas",

      description:
        "From quick sketches to complex diagrams, your workspace grows with your ideas. Never run out of space.",

      variant: "paper",
    },

    {
      icon: "ph:floppy-disk-bold",

      title: "Auto-Saved",

      description:
        "Every change is synced and persisted automatically. Your team's brain, safely stored in the cloud.",

      variant: "ink",
    },
  ],
} as const;

export const MARQUEE_ITEMS = [
  "Instant sync",
  "Infinite canvas",
  "Zero latency",
  "Always saved",
  "Team-powered",
] as const;

export const FEATURES_SECTION = {
  section: "02 / What you can build",

  title: "Build anything on your canvas",

  cards: [
    {
      icon: "ph:graph-bold",

      title: "System Diagrams",

      description:
        "Map complex architectures with low-latency syncing for engineering teams.",

      variant: "paper",
    },

    {
      icon: "ph:brain-bold",

      title: "Brainstorm Sessions",

      description:
        "Unleash creativity with infinite tools and shapes for high-speed sessions.",

      variant: "ink",
    },

    {
      icon: "ph:flow-arrow-bold",

      title: "Flowcharts",

      description:
        "Automate your logic with sticky lines and smart containers that just snap.",

      variant: "paper",
    },

    {
      icon: "ph:cursor-click-bold",

      title: "UI Wireframes",

      description:
        "Quickly block out layouts and user journeys before you move to hi-fi.",

      variant: "paper",
    },

    {
      icon: "ph:users-three-bold",

      title: "Retrospectives",

      description:
        "Host team meetings that are actually engaging with visual feedback loops.",

      variant: "acid",
    },

    {
      icon: "ph:chatbot-bold",

      title: "Technical Discussions",

      description:
        "Explain complex problems with visual aids that persist forever.",

      variant: "paper",
    },
  ],
} as const;

export const DEVELOPER_SECTION = {
  section: "03 / Built for developers",

  title: "Hate limits. Host your own.",

  description:
    "Deploy ScratchSlate on your own infrastructure. Full control, zero vendor lock-in. Docker Compose setup gets you running in minutes with Postgres and Redis.",

  button: "View documentation",

  filename: "docker-compose.yml",

  code: `version: '3.8'
services:
  whiteboard-app:
    image: scratchslate/core:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/db
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=insecure

  redis:
    image: redis:7-alpine`,
} as const;

export const PRICING_SECTION = {
  section: "04 / For everyone",

  title: "No pricing plans. Just build.",

  description:
    "ScratchSlate is built for humans, not for profit. No monthly fees, no credit cards, just pure creative space.",
} as const;

export const CTA_SECTION = {
  title: {
    first: "Ready to turn",
    second: "ideas into reality?",
  },

  description:
    "Whether you're planning your next startup, designing software architecture, or brainstorming with your team, ScratchSlate gives you a shared canvas where ideas come alive.",

  button: "Start Drawing — It's Free",
} as const;

export const FOOTER = {
  brand: "ScratchSlate",

  subtitle: "Whiteboard",

  copyright: "@Copyright 2026 / Built By Nish",
} as const;