# هيكل المشروع

```
pay/
├── app/
│   ├── components/
│   │   ├── BottomNav.tsx       # شريط التنقل السفلي (موبايل)
│   │   ├── Footer.tsx          # تذييل الصفحة
│   │   ├── Header.tsx          # رأس الصفحة والشعار
│   │   └── HomeAnimations.tsx  # تأثيرات الصفحة الرئيسية
│   │
│   ├── api/
│   │   ├── card-settings/      # إعدادات البطاقة
│   │   ├── card-transactions/  # معاملات البطاقة
│   │   ├── customers/          # بيانات العملاء
│   │   ├── otp/                # التحقق بالرمز
│   │   ├── requests/           # الطلبات
│   │   └── settings/           # الإعدادات العامة
│   │
│   ├── checkout/
│   │   ├── card/               # صفحة بيانات البطاقة
│   │   ├── details/            # صفحة التفاصيل
│   │   ├── otp/                # صفحة رمز التحقق
│   │   └── verify/             # صفحة التحقق
│   │
│   ├── features/               # صفحة المميزات
│   ├── admin/                  # لوحة الإدارة
│   ├── support/                # مركز المساعدة
│   │
│   ├── layout.tsx              # التخطيط الرئيسي (خطوط، metadata، JSON-LD)
│   ├── page.tsx                # الصفحة الرئيسية
│   ├── globals.css             # الأنماط العامة
│   ├── opengraph-image.tsx     # صورة Open Graph
│   ├── robots.ts               # ملف robots
│   └── sitemap.ts              # خريطة الموقع
│
├── lib/
│   ├── models/
│   │   ├── CardFieldSettings.ts
│   │   ├── CardTransaction.ts
│   │   ├── Customer.ts
│   │   ├── ServiceRequest.ts
│   │   └── SiteSettings.ts
│   ├── mongodb.ts              # اتصال قاعدة البيانات
│   ├── types.ts                # أنواع TypeScript المشتركة
│   └── useSettings.ts          # hook لجلب الإعدادات
│
├── public/                     # الملفات الثابتة (أيقونات، صور)
│
├── .env.local                  # متغيرات البيئة
├── next.config.ts              # إعدادات Next.js
├── tsconfig.json               # إعدادات TypeScript
└── package.json
```
