# 🚀 Quick Deployment Checklist

## Before You Start
1. Push code to GitHub/GitLab/Bitbucket
2. Have a Render account ready

## On Render Dashboard

### 1. Create PostgreSQL Database
- Go to: New + → PostgreSQL
- Name: `talentlink-db`
- Plan: Free
- **Copy the Internal Database URL** ⚠️

### 2. Create Web Service
- Go to: New + → Web Service
- Connect your repository
- Configure:

**Build Command:**
```bash
chmod +x build.sh && ./build.sh
```

**Start Command:**
```bash
gunicorn talentlink.wsgi:application
```

### 3. Environment Variables
Add these in "Advanced" section:

```
SECRET_KEY = <generate-new-key>
DEBUG = False
ALLOWED_HOSTS = your-app-name.onrender.com
DATABASE_URL = <paste-from-step-1>
CORS_ALLOWED_ORIGINS = https://your-app-name.onrender.com
```

**Generate SECRET_KEY locally:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Deploy
Click "Create Web Service" and wait for deployment to complete (5-10 minutes)

### 5. Create Admin User
Go to Shell tab in Render dashboard:
```bash
python manage.py createsuperuser
```

## 🎉 Done!
Visit: `https://your-app-name.onrender.com`

---

## ⚡ Quick Commands Reference

**Local Development:**
```bash
# Backend
python manage.py runserver

# Frontend (in another terminal)
cd frontend
npm start
```

**Deploy Updates:**
```bash
git add .
git commit -m "Update message"
git push
```
Render auto-deploys on push!

**Check Render Logs:**
Render Dashboard → Your Service → Logs tab

---

## 🆘 Common Issues

**502 Error:** Check logs, verify migrations ran
**CORS Error:** Update `CORS_ALLOWED_ORIGINS` with `https://`
**Database Error:** Use Internal Database URL, not External
**Static files 404:** Check `collectstatic` ran in build logs

---

## 📝 Important URLs

- **Render Dashboard:** https://dashboard.render.com
- **Your App:** https://your-app-name.onrender.com
- **Your Admin:** https://your-app-name.onrender.com/admin
- **Your API:** https://your-app-name.onrender.com/api

---

For detailed instructions, see: `RENDER_DEPLOYMENT.md`
