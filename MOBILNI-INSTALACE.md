# 📱 Mobile Installation Guide

You have **2 options** to get the application on your mobile:

## ⚡ Option 1: PWA (FASTEST - recommended)

**Advantages**: No software installation, works immediately, automatic updates  
**Disadvantages**: Less system integration than native applications

### Steps:

1. **Run the application on your computer**:
   ```bash
   cd C:\Temp\DaveWeatherForecast
   npm start
   ```

2. **Open a browser on your mobile** (Chrome or Firefox)

3. **Enter the address**: 
   - Find your computer's IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - On your mobile, open: `http://192.168.0.XXX:3000` (replace XXX with your IP)

4. **Install PWA**:
   - **Android Chrome**: Click on ⋮ → "Add to Home Screen"
   - **iOS Safari**: Click on Share → "Add to Home Screen"

✅ **Done!** The application will be added to the home screen like a normal application.

---

## 📦 Option 2: Native Android APK (advanced)

**Advantages**: Full native application, can be uploaded to Google Play  
**Disadvantages**: Requires Android Studio installation

### What you need:

1. **Android Studio** with Android SDK:
   - Download from: https://developer.android.com/studio
   - Install with Android SDK (minimum API 22)
   - Set the `ANDROID_HOME` environment variable

### Steps to create APK:

1. **Check that you have Android Studio**:
   ```bash
   # Check ANDROID_HOME
   echo %ANDROID_HOME%
   
   # Should display a path like:
   # C:\Users\USERNAME\AppData\Local\Android\Sdk
   ```

2. **Create a production build**:
   ```bash
   cd C:\Temp\DaveWeatherForecast
   npm run build
   ```

3. **Synchronize Capacitor**:
   ```bash
   npx cap sync android
   ```

4. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

5. **In Android Studio**:
   - Wait for Gradle to finish syncing (may take 5-10 minutes the first time)
   - Menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - After completion, click **locate** and find the APK

6. **Installation on mobile**:
   - Find the APK at: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Copy to your mobile and install
   - (You may need to enable "Unknown Sources" in settings)

---

## 🌐 Option 3: Deploy to web hosting

**Advantages**: Accessible from anywhere on the internet  
**Disadvantages**: Requires hosting

### Quick deploy options:

#### A) Netlify (free):
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --dir=dist --prod
```

#### B) Vercel (free):
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (automatically builds)
vercel --prod
```

#### C) GitHub Pages:
1. Push project to GitHub
2. In repository Settings → Pages
3. Select branch and folder `/dist`

After deployment you can open the application on your mobile and install it as a PWA!

---

## ❓ Troubleshooting

### PWA is not offered for installation
- Check that you are using HTTPS or localhost/192.168.x.x
- Manifest.json must be accessible
- Try Hard Refresh (Ctrl+Shift+R)

### I can't open the IP on my mobile
- Make sure your mobile and PC are on the same WiFi
- Temporarily disable the firewall on your PC
- Try using the IP instead of localhost

### Android Studio APK build fails
- Make sure you have JDK 11 or newer installed
- Check that Gradle sync completed successfully
- Try **File** → **Invalidate Caches** → **Restart**

---

## 📊 Comparison of options

| Feature | PWA | APK | Web Deploy |
|---------|-----|-----|------------|
| Installation speed | ⚡⚡⚡ | ⏱️ (2-3 hours) | ⚡⚡ |
| Offline functionality | ✅ | ✅ | ✅ |
| Auto updates | ✅ | ❌ | ✅ |
| Requires Android Studio | ❌ | ✅ | ❌ |
| Distribution | Just a link | APK file | URL |
| Google Play | ❌ | ✅ | ❌ |

---

## 🎯 Recommendations

**For personal use**: Use **PWA** (Option 1) - fastest and simplest!

**For distribution**: Use **Web Deploy** (Option 3) + PWA

**For Google Play**: Create **APK** (Option 2) - but requires time and experience

---

Created: 2026-02-01
