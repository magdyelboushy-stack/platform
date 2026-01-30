# Platform

منصة تعليمية (Frontend + Backend).

## الهيكل

- **الجذر (root)** — تطبيق الفرونت إند (React + Vite) — مناسب للنشر على Vercel
- **backend/** — الباك إند (PHP) — ينشر على استضافة تدعم PHP (مثل Laragon، shared hosting، أو VPS)

## التشغيل محلياً

### الفرونت إند
```bash
npm install
npm run dev
```

### الباك إند
```bash
cd backend
composer install
# ضبط .env من .env.example وتشغيل خادم PHP (مثلاً عبر Laragon أو php -S)
```

## النشر

- **Vercel:** إنشاء مشروع جديد وربطه بهذا الريبو، وتعيين **Root Directory** إلى `.` (الجذر) حتى يستخدم Vercel ملفات الفرونت إند ويبني المشروع من `package.json`.
