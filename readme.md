# 🌿 WildWalk AI

### Go outside. Discover more.

**WildWalk AI** is a browser-based outdoor exploration assistant built for the **Touch Grass** theme.

Instead of using AI to keep people glued to a screen, WildWalk AI uses AI to encourage people to **go outside, explore their surroundings, complete outdoor challenges, and discover nature**.

The project is built entirely with **HTML, CSS, and JavaScript**, with AI running directly in the browser using **TensorFlow.js and MobileNet**.

---

## 🌎 The Problem

Most AI applications increase screen time.

People use AI to:

- Search for information
- Generate content
- Chat
- Study
- Work
- Scroll through personalized feeds

The problem is that more technology often means **less interaction with the physical world**.

WildWalk AI takes the opposite approach.

> **What if AI helped you put your phone down instead of keeping you on it?**

---

# 💡 The Idea

WildWalk AI turns an outdoor walk into an interactive exploration experience.

Users can:

📷 Take a picture of something they discover  
🤖 Let AI analyze the image  
🌿 Record their discoveries  
🚶 Complete outdoor challenges  
📍 Use their location while exploring  
⭐ Earn points  
📊 Track their outdoor progress  

The screen is meant to be used briefly — the actual experience happens **outside**.

---

# ✨ Features

## 🤖 AI Nature Identification

Upload or take a photo and let the browser-based AI analyze it.

The project currently uses:

**TensorFlow.js + MobileNet**

The model runs directly in the browser.

Example:

```text
Upload Photo
      ↓
AI Analysis
      ↓
Object Prediction
      ↓
Confidence Score
      ↓
Discovery Added
```

---

## 🚶 Outdoor Challenges

WildWalk includes simple challenges designed to encourage physical exploration.

Examples:

- Walk for 20 minutes
- Find something green
- Make an AI discovery

Completing challenges gives the user points.

---

## 📍 Location

WildWalk can use the browser's **Geolocation API**.

The user can enable location and see whether GPS access is active.

The project does not require a custom location server.

---

## ⭐ Gamification

Users earn points by:

| Activity | Points |
|---|---:|
| AI Discovery | +25 |
| Outdoor Challenge | +20 |

The score is displayed throughout the experience.

---

## 📖 Discovery History

Every AI discovery is saved locally.

The app records:

- Object name
- AI confidence
- Date and time
- Points earned

Example:

```text
🌿 Bird
92% confidence
+25 points

🌿 Tree
87% confidence
+25 points
```

---

## 💾 Local Storage

WildWalk uses browser `localStorage` to save:

- Points
- Discoveries
- Discovery history

No database is required.

---

## 🌙 Dark Mode

The application includes a simple dark mode for users who prefer a darker interface.

---

# 🧠 Why Open AI?

Open AI is an important part of the project.

WildWalk does not rely on a closed AI API such as a paid cloud-only vision endpoint.

Instead, it uses:

```text
TensorFlow.js
      +
MobileNet
      ↓
Browser-based AI inference
```

This approach makes it possible to:

- Run AI directly in the browser
- Avoid building an AI backend
- Reduce dependency on paid APIs
- Experiment with different models
- Eventually fine-tune models for local wildlife
- Keep the architecture transparent
- Build toward offline-first inference

The long-term goal is to replace the general-purpose vision model with an open model specifically trained for **Indian birds, plants and wildlife**.

---

# 🔐 Privacy

WildWalk is designed with a local-first approach.

When a user uploads an image:

```text
Camera
   ↓
Browser
   ↓
AI Model
   ↓
Prediction
   ↓
Local Discovery
```

There is no WildWalk backend receiving the image.

User discoveries and points are stored locally using browser storage.

> **Your exploration should belong to you.**

---

# 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### AI

- TensorFlow.js
- MobileNet

### Browser APIs

- File API
- Geolocation API
- LocalStorage API

### External Resources

TensorFlow.js and MobileNet are loaded through CDN resources.

---

# 📂 Project Structure

```text
WildWalk-AI/
│
├── index.html
│
├── style.css
│
├── script.js
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/WildWalk-AI.git
```

## 2. Open the project

```bash
cd WildWalk-AI
```

## 3. Run the website

The easiest method is using **VS Code + Live Server**.

Install the Live Server extension in VS Code.

Then:

```text
Right Click index.html
        ↓
Open with Live Server
```

The website should open at something similar to:

```text
http://127.0.0.1:5500
```

---

# 📱 Using WildWalk

### Step 1

Open WildWalk AI.

### Step 2

Click:

```text
Start Walk
```

### Step 3

Enable location if you want GPS functionality.

### Step 4

Go outside.

### Step 5

Find something interesting.

### Step 6

Take a picture.

### Step 7

Click:

```text
🤖 Analyze with AI
```

### Step 8

The AI will classify the image.

### Step 9

Your discovery is added to your journey and you receive points.

---

# 🎯 Touch Grass Philosophy

The main idea behind WildWalk is simple:

> **The best AI experience is sometimes the one that gets you away from the screen.**

Most AI products optimize for longer digital interaction.

WildWalk optimizes for the opposite.

The goal is:

```text
Short screen interaction
          ↓
AI assistance
          ↓
Put phone away
          ↓
Explore
          ↓
Discover
          ↓
Come back
          ↓
Record your experience
```

---

# ⚠️ Current Limitations

This is an early prototype.

The current MobileNet model is a **general-purpose image classification model**.

It can recognize many common objects, but it is **not a specialist wildlife identification model**.

For example, it may recognize:

```text
Bird
Tree
Dog
Flower
Person
Vehicle
```

but it may not reliably distinguish:

```text
Indian Roller
Indian Peafowl
Rose-ringed Parakeet
Common Kingfisher
```

That is an intentional area for future development.

---

# 🔮 Future Improvements

## 🐦 Specialist Wildlife AI

Replace MobileNet with an open model trained specifically on:

- Indian birds
- Plants
- Insects
- Trees
- Wildlife

---

## 🗺️ Smart Trail Generation

Use location data to generate:

- Nature trails
- Walking routes
- Birding routes
- Nearby parks
- Wildlife challenges

---

## 🐦 Bird Call Recognition

Add microphone support to identify birds from their calls.

Example:

```text
Microphone
     ↓
Bird Call
     ↓
AI Audio Model
     ↓
Possible Species
```

---

## 🏆 Leaderboards

Add optional local/community leaderboards:

```text
🥇 Explorer A — 1,240
🥈 Explorer B — 1,120
🥉 Explorer C — 980
```

---

## 🌱 Local Nature Database

Create a specialized dataset for Indian ecosystems.

The model could eventually answer:

> "What species are commonly found around me?"

without requiring a generic global AI model.

---

## 📵 Screen-Time Optimization

A future version could deliberately minimize screen interaction.

For example:

```text
Challenge Started

↓

Phone locked

↓

Walk

↓

AI detects / records discoveries

↓

Return

↓

Open WildWalk

↓

View your report
```

The screen becomes the **start and finish line**, not the destination.

---

# 🏗️ Architecture

```text
                 WILDWALK AI
                      │
          ┌───────────┴───────────┐
          │                       │
       Camera                  GPS
          │                       │
          ▼                       ▼
     TensorFlow.js          Geolocation API
          │
          ▼
       MobileNet
          │
          ▼
    Image Prediction
          │
          ▼
      Discovery
          │
          ▼
       Points
          │
          ▼
      LocalStorage
```

Everything currently happens on the client side.

---

# 🌐 Browser Compatibility

WildWalk works best on modern browsers such as:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Camera and location features may require:

- `localhost`, or
- HTTPS

when deployed.

---

# 🤝 Contributing

Contributions are welcome.

Some useful areas to contribute:

- Better wildlife models
- Indian bird datasets
- Plant recognition
- Bird-call recognition
- Better outdoor challenges
- Accessibility
- UI/UX improvements
- Offline model support

### Contribution flow

```bash
git clone <repository>
```

Create a branch:

```bash
git checkout -b feature/your-feature
```

Make your changes and commit:

```bash
git add .
git commit -m "Add your feature"
```

Push:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

---

# 📜 License

This project is intended as an experimental/open-source project.

Add your preferred license before publishing the repository, such as **MIT License**, if you want others to freely reuse and modify the code.

---

# 🌿 Built for Touch Grass

WildWalk AI was built around one simple question:

> **Can AI help us spend less time using technology and more time experiencing the real world?**

Maybe the best AI isn't the one that gives us another reason to stare at our phones.

Maybe it's the one that tells us:

## **"Put your phone away. Go see what's outside." 🌿**