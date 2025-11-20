# إعداد ربط نموذج جوجل (Setup Guide)

لجعل الموقع يعمل مع نموذجك الخاص، اتبع الخطوات التالية:

## 1. تجهيز نموذج جوجل (Google Form)
1. أنشئ نموذج جديد.
2. تأكد من وجود سؤالين أساسيين:
    - **الاسم** (Name) - ليكون العمود الثاني في الجدول.
    - **الإدارة** (Department) - ليكون العمود الثالث. (يفضل استخدام "قائمة منسدلة" Dropdown بنفس أسماء الإدارات في الموقع لضمان التطابق).

## 2. تجهيز جدول البيانات (Google Sheet)
1. اذهب إلى "الردود" (Responses) في النموذج واضغط على أيقونة "إنشاء جدول بيانات" (Create Spreadsheet).
2. في جدول البيانات، اذهب إلى القائمة: **File (ملف) > Share (مشاركة) > Publish to web (نشر على الويب)**.
3. في النافذة التي تظهر:
    - اختر **Entire Document (المستند بالكامل)**.
    - بدلاً من "Web page" (صفحة ويب)، اختر **Comma-separated values (.csv)**.
4. اضغط **Publish (نشر)**.
5. انسخ الرابط الذي يظهر لك.

## 3. تحديث الموقع
1. افتح ملف `script.js`.
2. في السطر الأول، استبدل `YOUR_GOOGLE_SHEET_CSV_URL_HERE` بالرابط الذي نسخته.
   ```javascript
   const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/.../pub?output=csv';
   ```
3. احفظ الملف.

## 4. رفع الموقع (GitHub Pages)
1. ارفع الملفات (`index.html`, `style.css`, `script.js`, `LOGO.png`) إلى مستودع GitHub.
2. اذهب إلى Settings > Pages.
3. اختر الفرع (Branch) `main` واضغط Save.
4. سيظهر لك رابط موقعك بعد دقائق!
