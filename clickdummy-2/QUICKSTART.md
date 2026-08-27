# Schnellstart-Anleitung 🚀

## Neue Features

### 🎨 Profil & Personalisierung

Die neue **Profile-Seite** (profile.html) ermöglicht vollständige Personalisierung:

#### 1. Benutzer-Avatar

- Wähle aus 8 verschiedenen Emojis als deinen Avatar
- Der Avatar wird auf dem Dashboard angezeigt

#### 2. Theme-Einstellungen

- **Light Mode**: Helles, freundliches Design
- **Dark Mode**: Augenschonend für abends

#### 3. Akzentfarben (6 Optionen)

- 🟣 **Purple** (Standard) - Kreativ & motivierend
- 🔵 **Blue** - Ruhig & fokussiert
- 🟢 **Green** - Natürlich & wachstumsorientiert
- 🩷 **Pink** - Energetisch & positiv
- 🟠 **Orange** - Warm & enthusiastisch
- 🔮 **Indigo** - Tiefgründig & reflektiert

#### 4. Präferenzen

- Benachrichtigungen an/aus
- Wochenstart (Montag/Sonntag/Samstag)
- Sprache (EN/DE/ES/FR)

#### 5. Statistiken

- Gesamtanzahl deiner Habits
- Mitgliedsdauer

#### 6. Datenverwaltung

- **Export**: Sichere alle deine Daten als JSON-Datei
- **Reset**: Lösche alle Daten (mit Sicherheitsabfrage)

---

## 🔧 Technische Verbesserungen

### Zentrale Konfiguration

Die neue `shared-config.js` Datei verwaltet:

- Theme-Einstellungen (Light/Dark)
- Benutzerprofile
- Farbschemata
- Einheitliches Theme-Management über alle Seiten

### Fixes

✅ **Dark/Light Mode funktioniert jetzt korrekt** über alle Seiten
✅ Theme-Präferenz wird in Benutzerprofil gespeichert
✅ Konsistentes Theme beim Navigieren zwischen Seiten
✅ Profile-Link in der Bottom-Navigation auf allen Seiten

---

## 📱 Navigation

Die Bottom-Navigation wurde erweitert:

- 🏠 **Home** - Dashboard
- ➕ **Add** - Habit erstellen/bearbeiten
- ⏰ **Focus** - Timer & Reminders
- 👥 **Buddy** - Accountability Partner
- 👤 **Profile** - Einstellungen (NEU!)

---

## 🎯 So verwendest du die neuen Features

### 1. Personalisiere dein Profil

```
1. Klicke auf das Profile-Icon in der Navigation (unten rechts)
2. Wähle einen Avatar
3. Gib deinen Namen ein
4. Wähle dein bevorzugtes Theme (Light/Dark)
5. Wähle deine Lieblingsfarbe
6. Klicke "Save Settings"
```

### 2. Theme wechseln

- **Option 1**: Klicke auf den Theme-Toggle Button (oben rechts, Mond/Sonne Icon)
- **Option 2**: Gehe zu Profile → Theme Mode → Wähle Light/Dark

### 3. Farbe ändern

```
Profile → Accent Color → Wähle eine der 6 Farben
```

Die Farbe wird sofort auf der gesamten App angewendet!

### 4. Daten exportieren

```
Profile → Scrolle runter zu "Danger Zone" → Klicke "Export Data"
```

Eine JSON-Datei mit allen deinen Daten wird heruntergeladen.

### 5. Personalisierte Begrüßung

Sobald du deinen Namen im Profil gespeichert hast, wird auf dem Dashboard statt "Welcome back!" dein Name angezeigt:

```
"Welcome back, Max! 🌟"
```

Dein Avatar erscheint neben dem Titel.

---

## 💾 LocalStorage Struktur

Alle Daten werden in deinem Browser gespeichert:

```javascript
// Benutzerprofil (NEU)
localStorage.userProfile = {
  name: "Max Mustermann",
  email: "max@example.com",
  avatar: "🚀",
  theme: "dark",
  accentColor: "blue",
  notifications: true,
  weekStart: "monday",
  language: "de"
}

// Bestehende Daten
localStorage.habits = [...]
localStorage.stats = {...}
localStorage.focusStats = {...}
// ... etc.
```

---

## 🎨 Farbsystem

Die 6 Akzentfarben verwenden folgende Farbverläufe:

1. **Purple**: `from-purple-500 to-pink-500`
2. **Blue**: `from-blue-500 to-cyan-500`
3. **Green**: `from-green-500 to-emerald-500`
4. **Pink**: `from-pink-500 to-rose-500`
5. **Orange**: `from-orange-500 to-amber-500`
6. **Indigo**: `from-indigo-500 to-purple-500`

Diese Farben werden für:

- Gradient-Cards (z.B. Daily Quote, Stats)
- Primäre Buttons
- Aktive Navigation-Links
- Hervorhebungen

---

## 🐛 Bekannte Limitierungen

Da dies ein Clickdummy/Prototyp ist:

- Akzentfarben ändern momentan nicht alle UI-Elemente (nur in Profil sichtbar)
- Sprache ändert keine Texte (nur als Einstellung gespeichert)
- Für vollständige Farbthemen müsste CSS mit Custom Properties erweitert werden

Für eine Produktions-Version würde man:

- Tailwind JIT Mode mit CSS Custom Properties verwenden
- Alle Texte in i18n-Dateien auslagern
- Backend-Integration für echte Benutzerkonten

---

## 📖 Weitere Informationen

Siehe [README.md](README.md) für die vollständige Dokumentation.

---

**Viel Spaß beim Testen! 🎉**
