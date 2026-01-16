# 🚀 Render Deployment Guide for TalentLink Full-Stack App

This guide will help you deploy your Django + React application to Render with PostgreSQL.

## 📋 Prerequisites

1. A Render account (free tier available at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. This workspace already configured with all necessary files

## 🎯 Deployment Strategy

We're using a **single web service** approach where:
- Django serves both the API endpoints (`/api/*`) and the React frontend
- PostgreSQL database hosted on Render
- Static files served via WhiteNoise

## 📁 Files Created/Modified

✅ **Created:**
- `requirements.txt` - Python dependencies
- `build.sh` - Build script for Render
- `.env.example` - Environment variables template

✅ **Modified:**
- `talentlink/settings.py` - Production-ready Django settings
- `talentlink/urls.py` - Added React app serving
- `frontend/src/api/axios.js` - Dynamic API URL handling

---

## 🚀 Step-by-Step Deployment

### **Step 1: Push Your Code to Git**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Push to your repository (GitHub/GitLab/Bitbucket)
git remote add origin <your-repository-url>
git push -u origin main
```

---

### **Step 2: Create PostgreSQL Database on Render**

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in the details:
   - **Name**: `talentlink-db`
   - **Database**: `talentlink`
   - **User**: `talentlink_user` (auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is fine for testing
4. Click **"Create Database"**
5. ⚠️ **IMPORTANT**: Copy the **Internal Database URL** from the database dashboard
   - It looks like: `postgresql://user:password@hostname:5432/dbname`
   - You'll need this in the next step!

---

### **Step 3: Create Web Service on Render**

1. Click **"New +"** → **"Web Service"**
2. Connect your Git repository
3. Configure the service:

#### **Basic Settings:**
- **Name**: `talentlink` (or your preferred name)
- **Region**: Same as your database
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (since files are at root)
- **Runtime**: `Python 3`

#### **Build & Deploy:**
- **Build Command**: 
  ```bash
  chmod +x build.sh && ./build.sh
  ```
- **Start Command**: 
  ```bash
  gunicorn talentlink.wsgi:application
  ```

#### **Plan:**
- **Instance Type**: Free tier or Starter ($7/month for better performance)

4. Click **"Advanced"** to add environment variables

---

### **Step 4: Configure Environment Variables**

Add these environment variables in Render:

| Key | Value | Notes |
|-----|-------|-------|
| `SECRET_KEY` | Generate a new one | Use: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DEBUG` | `False` | **Never use True in production!** |
| `ALLOWED_HOSTS` | `your-app-name.onrender.com` | Replace with your actual Render URL |
| `DATABASE_URL` | `postgresql://...` | Paste the **Internal Database URL** from Step 2 |
| `CORS_ALLOWED_ORIGINS` | `https://your-app-name.onrender.com` | Replace with your actual Render URL (with https) |
| `PYTHON_VERSION` | `3.11.0` | Optional: specify Python version |

**To generate a new SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

### **Step 5: Deploy**

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install Python dependencies
   - Build the React frontend (`npm install && npm run build`)
   - Collect Django static files
   - Run database migrations
   - Start the Django server with Gunicorn

3. Monitor the deployment logs for any errors

---

### **Step 6: Verify Deployment**

Once deployment is complete:

1. Visit `https://your-app-name.onrender.com`
2. You should see your React frontend
3. Test API endpoints: `https://your-app-name.onrender.com/api/`
4. Test admin: `https://your-app-name.onrender.com/admin/`

---

## 🔧 Troubleshooting

### **Issue: Build fails on npm install**
**Solution**: Make sure `frontend/package.json` is properly committed

### **Issue: Static files not loading**
**Solution**: Check that `collectstatic` ran successfully in build logs

### **Issue: Database connection error**
**Solution**: 
- Verify `DATABASE_URL` is set correctly
- Make sure you used the **Internal Database URL** (not External)
- Check database is in the same region as web service

### **Issue: CORS errors in browser**
**Solution**: 
- Update `CORS_ALLOWED_ORIGINS` to match your Render URL
- Must include `https://` (not `http://`)

### **Issue: 502 Bad Gateway**
**Solution**: 
- Check the logs for Python errors
- Verify gunicorn is starting correctly
- Make sure all migrations ran successfully

---

## 📊 Post-Deployment Tasks

### **Create Superuser**

After deployment, create an admin user:

1. Go to your Render dashboard
2. Click on your web service
3. Go to **"Shell"** tab
4. Run:
```bash
python manage.py createsuperuser
```

### **Check Logs**

Monitor your application:
- Render Dashboard → Your Service → **"Logs"** tab
- View real-time logs for debugging

---

## 🔄 Making Updates

To deploy updates:

1. Make changes to your code locally
2. Commit and push to your repository:
```bash
git add .
git commit -m "Your update message"
git push
```
3. Render will automatically detect the push and redeploy

---

## 💰 Cost Considerations

**Free Tier:**
- Web Service: Free (spins down after inactivity)
- PostgreSQL: Free (expires after 90 days, then $7/month)
- Limitations: 
  - Service sleeps after 15 min inactivity
  - 512 MB RAM
  - Shared CPU

**Paid Tier (Starter - $7/month per service):**
- Always on (no sleeping)
- 512 MB RAM
- Better performance

---

## 🎓 How It Works

1. **Build Phase** (`build.sh`):
   - Installs Python packages
   - Builds React app (`npm run build`)
   - Creates `frontend/build/` directory
   - Collects all static files to `staticfiles/`
   - Runs database migrations

2. **Runtime Phase** (Gunicorn):
   - Django serves API requests from `/api/*`
   - Django serves React's `index.html` for all other routes
   - WhiteNoise serves static files (CSS, JS, images)
   - React Router handles client-side routing

3. **Database**:
   - Render-managed PostgreSQL
   - Connected via `DATABASE_URL` environment variable
   - Persistent storage

---

## 🔐 Security Checklist

- ✅ `DEBUG = False` in production
- ✅ Strong `SECRET_KEY`
- ✅ `ALLOWED_HOSTS` properly configured
- ✅ `CORS_ALLOWED_ORIGINS` restricted to your domain
- ✅ Database credentials via environment variables
- ✅ No hardcoded secrets in code

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/
- Render Community: https://community.render.com/

---

## ✅ Quick Checklist

Before deploying, ensure:
- [ ] Code pushed to Git repository
- [ ] PostgreSQL database created on Render
- [ ] Environment variables configured
- [ ] `build.sh` has execute permissions
- [ ] `requirements.txt` is up to date
- [ ] `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` set correctly

---

**🎉 That's it! Your full-stack application should now be live on Render!**
