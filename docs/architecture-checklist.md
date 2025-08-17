# ✅ Tronava Shop – Architecture Checklist

This checklist helps maintain a clean, scalable, and secure structure for your Node.js e-commerce platform. Review it before adding new features or refactoring existing ones.

---

## 🧩 Route Structure
- [ ] Each router handles only its relevant paths (e.g., `productRouter` handles `/products/...`)
- [ ] Use `app.use('/')` only for `mainRouter` or general routes
- [ ] Define `app.use(...)` in logical order (from general to specific)
- [ ] Protect sensitive routes with middleware like `ensureAuthenticated`

---

## 🔐 Session & Authentication
- [ ] After login, `req.user` is available in all protected routes
- [ ] After registration, user is auto-logged in and session is created
- [ ] Use JWT or session-based auth securely
- [ ] Logout route properly destroys session

---

## 📁 File & Folder Structure
- [ ] Separate folders for `routes`, `controllers`, `models`, `middlewares`, `views`
- [ ] Clear and consistent naming for files and functions
- [ ] Use `index.js` for grouped exports inside folders
- [ ] Organize EJS views into logical folders like `views/auth`, `views/products`, `views/dashboard`

---

## ⚠️ Error Handling & Feedback
- [ ] All forms show clear success and error messages
- [ ] Use flash messages or EJS variables for feedback
- [ ] Redirect users to appropriate pages on error
- [ ] Log errors to console or file for debugging

---

## 🛡️ Security & Validation
- [ ] Server-side validation for forms (email, password, username)
- [ ] Prevent unauthorized access to protected pages
- [ ] Use security middleware like `helmet`, `express-rate-limit`
- [ ] Protect sensitive routes with proper middleware

---

## 📦 Dependency Management
- [ ] Use stable versions of packages
- [ ] Remove unused packages from `package.json`
- [ ] Document key packages in `README.md`

---

## 🧪 Testing & Debugging
- [ ] Manually test all critical routes after changes
- [ ] Use tools like Postman for API testing
- [ ] Check logs for hidden errors

---

## 📄 Documentation
- [ ] Explain routes and project structure in `README.md`
- [ ] Keep architecture checklist in `docs/`
- [ ] Write TODOs for future features

---