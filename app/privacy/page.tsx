import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لبوابة عملاء بصمة هاتفي المعتمد",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-12">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-on-surface mb-2">
                سياسة الخصوصية
              </h1>
              <p className="text-primary text-lg font-semibold">
                نحمي بياناتك بكل أمانة وشفافية
              </p>
            </div>
            <div className="text-sm text-secondary bg-surface-container-low px-4 py-2 rounded-full">
              آخر تحديث: ١٥ يونيو ٢٠٢٤
            </div>
          </div>
        </header>

        <article className="space-y-16">
          {/* المقدمة */}
          <section id="introduction" className="scroll-mt-32">
            <div className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/10" style={{ boxShadow: "0 8px 32px rgba(11,28,48,0.06)" }}>
              <h2 className="text-3xl font-bold text-on-surface mb-6">مرحباً بك في بصمة هاتفي المعتمد</h2>
              <p className="text-secondary leading-relaxed mb-6 text-lg">
                في بصمة هاتفي المعتمد، خصوصيتك المالية هي أولويتنا القصوى. تصف سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها ومشاركتها عند استخدامك لبوابة العملاء. نحن ملتزمون بالشفافية الكاملة وتزويدك بالأدوات اللازمة لإدارة بياناتك بفاعلية.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <div>
                    <p className="font-bold text-sm">خصوصية مضمونة</p>
                    <p className="text-xs text-secondary">تشفير متقدم لجميع البيانات</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                  <div>
                    <p className="font-bold text-sm">متوافق مع الأنظمة</p>
                    <p className="text-xs text-secondary">متوافق مع اللوائح المحلية والدولية</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* جمع المعلومات */}
          <section id="information-collection" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-on-surface mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">database</span>
              </span>
              جمع المعلومات
            </h2>
            <div className="space-y-6">
              <div className="bg-surface-container-low p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">المعلومات المقدمة مباشرةً</h3>
                <p className="text-secondary mb-4">عند التسجيل أو استخدام البوابة، نجمع:</p>
                <ul className="space-y-3">
                  {["الاسم وعنوان البريد الإلكتروني ورقم الهاتف", "وثائق الهوية لأغراض التحقق من الهوية (KYC)", "السجل المالي المرتبط بمشترياتك"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-on-surface">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border border-outline-variant/20 rounded-xl hover:bg-surface-container-lowest transition-colors">
                  <h3 className="font-bold mb-2">السجلات التقنية</h3>
                  <p className="text-sm text-secondary">عناوين IP ومعرّفات الأجهزة وأنواع المتصفحات للحماية من الاحتيال وتحسين الأداء.</p>
                </div>
                <div className="p-8 border border-outline-variant/20 rounded-xl hover:bg-surface-container-lowest transition-colors">
                  <h3 className="font-bold mb-2">ملفات تعريف الارتباط</h3>
                  <p className="text-sm text-secondary">نستخدم ملفات تعريف الارتباط الأساسية للحفاظ على أمان جلستك وتذكر تفضيلاتك.</p>
                </div>
              </div>
            </div>
          </section>

          {/* كيف نستخدم بياناتك */}
          <section id="data-usage" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-on-surface mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </span>
              كيف نستخدم بياناتك
            </h2>
            <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-1" style={{ boxShadow: "0 8px 32px rgba(11,28,48,0.06)" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant/10">
                {[
                  { icon: "rocket_launch", title: "تقديم الخدمة", desc: "معالجة المدفوعات وإدارة تسهيلاتك الائتمانية بسهولة." },
                  { icon: "security", title: "الأمان", desc: "رصد الأنشطة المشبوهة والحماية من الجرائم المالية." },
                  { icon: "chat", title: "التواصل", desc: "إرسال تحديثات مهمة حول حسابك والميزات الجديدة." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-8">
                    <span className="material-symbols-outlined text-primary mb-4 block">{icon}</span>
                    <h4 className="font-bold mb-2">{title}</h4>
                    <p className="text-sm text-secondary">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* حقوقك */}
          <section id="your-rights" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-on-surface mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">fingerprint</span>
              </span>
              حقوقك
            </h2>
            <div className="bg-surface-container-low p-10 rounded-xl border-r-4 border-primary">
              <p className="text-lg text-on-surface mb-8">لديك تحكم كامل في بصمتك الرقمية. تشمل هذه الحقوق:</p>
              <div className="space-y-6">
                {[
                  { icon: "visibility", title: "حق الوصول", desc: "طلب نسخة كاملة من بياناتك الشخصية التي نحتفظ بها في أي وقت." },
                  { icon: "edit_square", title: "حق التصحيح", desc: "تصحيح أي معلومات غير دقيقة أو ناقصة في ملفك الشخصي." },
                  { icon: "delete_forever", title: "حق المحو", desc: "طلب حذف حسابك وبياناتك، مع مراعاة قوانين الاحتفاظ التنظيمية." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{title}</h4>
                      <p className="text-sm text-secondary">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* الأمان */}
          <section id="security" className="scroll-mt-32">
            <div className="bg-on-surface text-white p-12 rounded-xl relative overflow-hidden">
              <div className="relative z-10 md:w-2/3">
                <h2 className="text-4xl font-bold mb-4">أمان على مستوى البنوك</h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  نستخدم تشفيراً بمعيار 256-bit والمصادقة متعددة العوامل لضمان عدم وصول أي طرف غير مصرح له إلى بياناتك المالية. تخضع أنظمتنا لمراجعات دورية من شركات أمنية مستقلة.
                </p>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2">
                  مراجعة سجلات الأمان
                  <span className="material-symbols-outlined">shield_lock</span>
                </button>
              </div>
              <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none p-4 hidden md:block">
                <img
                  className="w-80 h-80 object-cover rounded-full mix-blend-screen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrjtaxB8mzbk3-v367Va3svaFXmnuuMFVq06I4qxmoMADAYL8hEmL9Q_WRhjwLb5zZmUQjUR2KXQGzQVGR22-SJU1fvs4AJTu7J-ZydbKp9Esb2FeP1Jo-P4-8nBKMfGZURRtnoKRKipw7LUH3ML54rstoGuIaw1W1-Whs-beCyJBdVLW--PSq84SPHZMUeCMxznPqWqgll5-pRkaMcY5muVLvrdrsJYP_9ia2r-Z52Iul4McllkLo-cG9r0PwfFXLLPDggAukz70"
                  alt="خلفية أمن سيبراني"
                />
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
