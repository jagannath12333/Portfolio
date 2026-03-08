# 🚀 Hosting Your Portfolio on GitHub Pages (Free)

Follow these step-by-step instructions to get your portfolio live at:
**https://jagannath12333.github.io/portfolio**

---

## 📁 Your File Structure

```
jagannath-portfolio/
├── index.html     ← Main page
├── style.css      ← All styles
├── script.js      ← Animations & interactions
└── README.md      ← This file
```

---

## Step 1 — Install Git (if not already installed)

Download from: https://git-scm.com/downloads
Verify with: `git --version`

---

## Step 2 — Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Set visibility to **Public** ✅
4. Do NOT initialize with README
5. Click **"Create repository"**

---

## Step 3 — Upload Your Files

Open your terminal / command prompt in your portfolio folder:

```bash
# Initialize git in your folder
git init

# Add all files
git add .

# First commit
git commit -m "Initial portfolio launch 🚀"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/jagannath12333/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top tabs)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

---

## Step 5 — Your Site is Live! 🎉

After 1–2 minutes, your portfolio will be live at:

```
https://jagannath12333.github.io/portfolio
```

GitHub will show you the URL in the Pages settings.

---

## 🔄 How to Update Your Portfolio

Whenever you make changes to your files:

```bash
git add .
git commit -m "Update: describe what you changed"
git push
```

Changes go live automatically within ~60 seconds.

---

## 💡 Pro Tips

- **Custom domain**: In Pages settings, add your own domain (e.g., `jagannathiyer.com`)
  if you purchase one from Namecheap or Google Domains.

- **Add a favicon**: Create a small icon at `favicon.ico` and add this to your `<head>`:
  ```html
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  ```

- **SEO**: Add this inside `<head>` in index.html:
  ```html
  <meta name="description" content="Jagannath Iyer — Data Science & ML Engineer Portfolio">
  <meta property="og:title" content="Jagannath Iyer | Portfolio">
  <meta property="og:description" content="MSc Data Science | ML Engineer | NLP Researcher">
  ```

- **Share your URL** on LinkedIn, your resume, and email signature!

---

## 📬 Contact for Help

Email: workjagan2@gmail.com
GitHub: https://github.com/jagannath12333
