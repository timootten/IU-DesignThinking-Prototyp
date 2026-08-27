# Habit Tracker - Interactive Clickdummy Prototype

A fully functional multi-page interactive prototype (clickdummy) for a Habit Tracker web application designed for young adults building new habits.

## 🎯 Overview

This clickdummy features a clean, gamified interface with Duolingo-style motivation elements. It uses localStorage to simulate a real database, allowing full CRUD operations and persistent state across page reloads and navigation.

## ✨ Features

### Core Functionality

- ✅ **Full localStorage persistence** - All data survives page reloads and navigation
- 🌓 **Light/Dark mode toggle** - Customizable theme preference
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS and Font Awesome icons

### Pages

#### 1. **Dashboard (index.html)**

- Daily motivational quote with favorite button (persists)
- Today's habits list with checkboxes
- Visual streak counters (yellow/gold for days)
- Points system (emerald green for success)
- Growing tree visualization based on progress
- Confetti animation on task completion
- Streak protection indicator
- Navigation to all other pages

#### 2. **Add/Edit Habit (add-edit.html)**

- Dynamic form for creating new habits
- Edit existing habits via URL parameter (?id=habitId)
- Identity-based goal setting ("I am..." statements)
- Icon selection (24 emoji icons)
- Goal breakdown (big goal → daily micro-task)
- Habit stacking (link to existing routines)
- Time of day selection (morning/afternoon/evening)
- Productivity test CTA
- Delete habit functionality

#### 3. **Accountability Buddy (accountability.html)**

- Opt-in/opt-out toggle for accountability feature
- Simulated buddy profile with stats
- Activity feed with photo check-ins
- Like and comment interactions
- Quick actions (share photo, send message)
- Find more buddies CTA

#### 4. **Focus Mode (focus.html)**

- Prominent countdown timer at the top
- Functional timer with start/pause/reset controls
- Preset durations (15, 25, 45, 60 minutes)
- Visual pulse animation during active session
- Focus session statistics (sessions, minutes, streak)
- Auto-schedule functionality
- Create recurring focus time blocks
- Active reminders list with emoji indicators
- Notification support

## 🎨 Design Principles

### Personalization

- **User Profile System**: Each user can set their name, avatar, and preferences.
- **6 Accent Color Themes**: Purple (default), Blue, Green, Pink, Orange, Indigo.
- **Light/Dark Mode**: Full theme customization with persistent preferences.

### Color Psychology

- **Emerald/Lime Green** (#10b981): Success, completed tasks
- **Yellow/Gold** (#facc15): Streaks (day counters)
- **Purple/Pink**: Primary actions, branding
- **Blue**: Secondary information, tips

### UX Principles

- Minimal visual noise with ample whitespace
- Clear visual hierarchy
- Rounded, friendly UI components
- Duolingo-style gamification elements
- Intuitive navigation
- Motivating feedback (confetti, animations)

## 🚀 Getting Started

### Running the Clickdummy

1. Simply open any HTML file in a modern web browser:
   - `index.html` - Start here (Dashboard)
   - `add-edit.html` - Create/edit habits
   - `accountability.html` - Accountability features
   - `focus.html` - Focus timer and reminders
   - `profile.html` - User profile and settings

2. No build process or server required! All dependencies are loaded via CDN.

3. The app includes a shared configuration file (`shared-config.js`) for centralized theme and profile management.

### Using the Application

#### Creating Your First Habit

1. Click "Add Habit" on the dashboard
2. Fill in the identity statement ("I am...")
3. Choose an icon
4. Enter the habit name and motivation ("Why")
5. Optionally add goal breakdown and habit stacking
6. Select time(s) of day
7. Click "Create Habit"

#### Completing Habits

1. Check the box next to any habit on the dashboard
2. Enjoy the confetti animation! 🎉
3. Watch your streak counter increase
4. See your growth tree evolve

#### Editing Habits

1. Click the edit icon (pencil) next to any habit
2. Modify any fields
3. Click "Update Habit" or delete with the trash icon

#### Using Focus Mode

1. Go to the Focus Mode page
2. Click "Start" on the timer
3. Stay focused during the countdown
4. Get notified when the session completes
5. Schedule recurring focus blocks

#### Enabling Accountability

1. Go to the Accountability Buddy page
2. Toggle the accountability feature on
3. View your buddy's progress feed
4. Share your own updates

###userProfile` - User profile data (name, email, avatar, theme, accentColor, preferences)

- `habits` - Array of habit objects
- `stats` - User statistics (streak, points, completion rate)
- `dailyQuoteData` - Daily quote and favorite status
- `accountabilityEnabled` - Accountability feature toggle
- `focusStats` - Focus session statistics
- `scheduledBlocks` - Scheduled focus time blocks

### User Profile Object Structure

````javascript
{
  name: "John Doe",
  email: "john@example.com",
  avatar: "👤",
  theme: "light" | "dark",
  accentColor: "purple" | "blue" | "green" | "pink" | "orange" | "indigo",
  notifications: true,
  weekStart: "monday" | "sunday" | "saturday",
  language: "en" | "de" | "es" | "fr"
}
``` language)
6. View your statistics
7. Export or reset your data if needed

## 💾 Data Storage

All data is stored in localStorage with the following keys:

- `theme` - Current theme (light/dark)
- `habits` - Array of habit objects
- `stats` - User statistics (streak, points, completion rate)
- `dailyQuoteData` - Daily quote and favorite status
- `accountabilityEnabled` - Accountability feature toggle
- `focusStats` - Focus session statistics
- **shared-config.js** - Centralized configuration management for theme and profile
- `scheduledBlocks` - Scheduled focus time blocks

### Habit Object Structure

```javascript
{
  id: "unique-id",
  name: "Habit name",
  identity: "I am...",
  icon: "⭐",
  why: "Motivation",
  bigGoal: "Long-term goal",
  dailyTask: "Daily micro-task",
  habitStack: "Existing routine",
  schedule: ["morning", "evening"],
  completions: ["2026-07-05T10:30:00.000Z"],
  streak: 5,
  streakFreeze: false,
  createdAt: "2026-07-05T10:30:00.000Z"
}
````

## 🔧 Technical Stack

**NEW: 6 personalized accent color themes**
✅ **NEW: Complete user profile system with avatar selection**
✅ **NEW: Personalized welcome message on dashboard**
✅ Clear color psychology (green = success, yellow = streaks)
✅ Time of day selection with clear icons
✅ Dedicated accountability buddy page with opt-in/out
✅ Prominent focus timer at the top
✅ Easy manual time entry
✅ Full CRUD operations (create, read, update, delete)
✅ **NEW: Data export functionality**
✅ **NEW: Complete data reset option**

## 📱 Browser Support

Works in all modern browsers that support:

- ES6+ JavaScript
- localStorage API
- CSS Grid & Flexbox
- CSS Custom Properties

Tested in:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🎓 User Testing Insights Implemented

Based on the requirements, this prototype implements:

✅ Extremely clean interface (minimal clutter)
✅ Duolingo-style gamification (streaks, points, tree growth, confetti)
✅ Identity-based goals ("I am" statements)
✅ Habit stacking support
✅ Resilience features (streak protection indicators)
✅ Light/Dark mode for user preference
✅ Clear color psychology (green = success, yellow = streaks)
✅ Time of day selection with clear icons
✅ Dedicated accountability buddy page with opt-in/out
✅ Prominent focus timer at the top
✅ Easy manual time entry
✅ Full CRUD operations (create, read, update, delete)

## 📝 Future Enhancements (Beyond Clickdummy)

This prototype could be extended with:

- Backend integration (API calls)
- User authentication
- Real accountability buddy matching
- Push notifications for reminders
- Calendar integration
- Progress charts and analytics
- Export/import data
- Social sharing features
- Productivity test implementation

## 📄 License

This is a prototype/clickdummy for educational and demonstration purposes.

---

**Created:** 2026-07-05  
**Purpose:** IU Design Thinking Prototype  
**Target Audience:** Young adults building new habits
