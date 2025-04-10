# Resume Builder — Frontend

This is the frontend of the Resume Builder application, built using **Vue.js** and the **Quasar Framework**. It allows users to create, preview, and download professional resumes in both English and Persian. The app supports multilingual forms, live preview, PDF generation, and local storage persistence.

---

## 🧩 Features

- Form-based resume builder with personal info, skills, experiences, projects, etc.
- Real-time preview of the resume before download.
- PDF generation of the final resume with pre-designed templates.
- Full RTL/LTR support with language switcher (English & Persian).
- Avatar upload with preview and delete options.
- Import/export resume data as JSON.
- Persistent data storage via `localStorage` until explicitly cleared.
- Responsive layout, mobile-first design.
- Custom form sections with dynamic repeatable items (skills, experience, projects, socials).
- Preview rendered via `<iframe>` for style isolation.

---

## 📦 Tech Stack

- **Vue 3**
- **Quasar Framework**
- **Vue I18n** (for multilingual support)
- **Vite** (as bundler)
- **localStorage** (for client-side persistence)

---

## 📂 Project Setup

### Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Format the files
```bash
yarn format
# or
npm run format
```

### Build the app for production
```bash
quasar build
```

---

## 🛠 Customization

You can modify and extend the Quasar config via:
[Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)

---

## 📁 Directory Structure

```
src/
│
├── assets/              # Static assets and icons
├── components/          # Reusable form and layout components
├── i18n/                # Language files (en, fa)
├── layouts/             # Main layout structure
├── pages/               # Main app views (Builder, Preview, etc.)
├── plugins/             # Plugin initializers (i18n, Quasar)
├── router/              # Vue Router setup
├── stores/              # Pinia stores (form data, language, etc.)
├── templates/           # Resume HTML templates
└── App.vue              # Root component
```

---

## 📜 License

This project is licensed under the MIT License.
