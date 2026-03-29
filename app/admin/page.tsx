"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  TransactionType,
  RequestStatus,
  TRANSACTION_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  SiteSettings,
} from "@/lib/types";

type Tab = "requests" | "settings" | "customers";

interface ServiceRequest {
  _id: string;
  trackingNumber: string;
  fullName: string;
  identityNumber: string;
  birthDate?: string;
  orderNumber: string;
  verificationCode: string;
  transactionType: TransactionType;
  installmentDay?: number;
  amount?: number;
  status: RequestStatus;
  adminNotes: string;
  createdAt: string;
}

interface Customer {
  _id: string;
  name: string;
  identityNumber: string;
  birthDate?: string;
  phone?: string;
  orderNumber: string;
  verificationCode: string;
  status: string;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("requests");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterType) params.set("type", filterType);
    if (filterStatus) params.set("status", filterStatus);
    const res = await fetch(`/api/requests?${params}`);
    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  }, [search, filterType, filterStatus]);

  const fetchSettings = async () => {
    const res = await fetch("/api/settings");
    setSettings(await res.json());
  };

  const fetchCustomers = async () => {
    const res = await fetch("/api/customers/manage");
    const data = await res.json();
    setCustomers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    Promise.all([fetchRequests(), fetchSettings(), fetchCustomers()]).finally(() => setLoading(false));
  }, [fetchRequests]);

  useEffect(() => {
    fetchRequests();
  }, [search, filterType, filterStatus, fetchRequests]);

  const updateRequestStatus = async (id: string, status: RequestStatus) => {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast.success("تم تحديث الحالة");
    fetchRequests();
  };

  const updateNotes = async (id: string, adminNotes: string) => {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNotes }),
    });
    toast.success("تم حفظ الملاحظات");
  };

  const saveSettings = async () => {
    if (!settings) return;
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    toast.success("تم حفظ الإعدادات");
  };

  const [newCustomer, setNewCustomer] = useState({ name: "", identityNumber: "", birthDate: "", phone: "", orderNumber: "", verificationCode: "" });

  const addCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/customers/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });
    if (res.ok) {
      toast.success("تم إضافة العميل");
      setNewCustomer({ name: "", identityNumber: "", birthDate: "", phone: "", orderNumber: "", verificationCode: "" });
      fetchCustomers();
    } else {
      toast.error("حدث خطأ");
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "requests", label: "الطلبات" },
    { key: "customers", label: "العملاء" },
    { key: "settings", label: "الإعدادات" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">لوحة التحكم</h1>
        <a href="/" className="text-sm text-primary hover:underline">عرض الموقع</a>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${tab === t.key ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Requests Tab */}
        {tab === "requests" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <input className="input-field max-w-xs" placeholder="بحث بالاسم أو رقم الهوية أو الطلب..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="input-field max-w-[200px]" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">كل الأنواع</option>
                {Object.entries(TRANSACTION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select className="input-field max-w-[200px]" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">كل الحالات</option>
                {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <a href="/api/requests/export" className="btn-secondary text-sm flex items-center gap-1" download>تصدير CSV</a>
            </div>

            <div className="text-sm text-gray-500">إجمالي: {requests.length} طلب</div>

            {requests.length === 0 ? (
              <div className="card text-center text-gray-400 py-12">لا توجد طلبات</div>
            ) : (
              <div className="space-y-3">
                {requests.map((r) => (
                  <div key={r._id} className="card space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-lg">{r.fullName}</span>
                        <span className="text-sm text-gray-400 mr-3">{r.trackingNumber}</span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[r.status]}`}>
                        {STATUS_LABELS[r.status]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      <div><span className="text-gray-400">الهوية: </span>{r.identityNumber}</div>
                      <div><span className="text-gray-400">الطلب: </span>{r.orderNumber}</div>
                      <div><span className="text-gray-400">النوع: </span>{TRANSACTION_LABELS[r.transactionType]}</div>
                      {r.installmentDay && <div><span className="text-gray-400">يوم القسط: </span>{r.installmentDay}</div>}
                      {r.amount && <div><span className="text-gray-400">المبلغ: </span>{r.amount} ر.س</div>}
                      <div><span className="text-gray-400">التاريخ: </span>{new Date(r.createdAt).toLocaleDateString("ar-SA")}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                      <label className="text-sm text-gray-500">الحالة:</label>
                      <select className="input-field max-w-[160px] text-sm py-1" value={r.status} onChange={(e) => updateRequestStatus(r._id, e.target.value as RequestStatus)}>
                        {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                      <input className="input-field flex-1 text-sm py-1" placeholder="ملاحظات الإدارة..." defaultValue={r.adminNotes} onBlur={(e) => updateNotes(r._id, e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {tab === "customers" && (
          <div className="space-y-6">
            <form onSubmit={addCustomer} className="card space-y-4">
              <h3 className="font-bold text-lg">إضافة عميل جديد</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">الاسم *</label>
                  <input className="input-field" value={newCustomer.name} onChange={(e) => setNewCustomer((p) => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="label">رقم الهوية *</label>
                  <input className="input-field" value={newCustomer.identityNumber} onChange={(e) => setNewCustomer((p) => ({ ...p, identityNumber: e.target.value.replace(/\D/g, "") }))} required />
                </div>
                <div>
                  <label className="label">رقم الطلب *</label>
                  <input className="input-field" value={newCustomer.orderNumber} onChange={(e) => setNewCustomer((p) => ({ ...p, orderNumber: e.target.value }))} required />
                </div>
                <div>
                  <label className="label">كود التحقق *</label>
                  <input className="input-field" value={newCustomer.verificationCode} onChange={(e) => setNewCustomer((p) => ({ ...p, verificationCode: e.target.value }))} required />
                </div>
                <div>
                  <label className="label">تاريخ الميلاد</label>
                  <input type="date" className="input-field" value={newCustomer.birthDate} onChange={(e) => setNewCustomer((p) => ({ ...p, birthDate: e.target.value }))} />
                </div>
                <div>
                  <label className="label">رقم الجوال</label>
                  <input className="input-field" value={newCustomer.phone} onChange={(e) => setNewCustomer((p) => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <button type="submit" className="btn-primary">إضافة العميل</button>
            </form>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">العملاء المسجلون ({customers.length})</h3>
              {customers.length === 0 ? (
                <p className="text-gray-400 text-center py-8">لا يوجد عملاء</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                        <th className="py-2 text-right">الاسم</th>
                        <th className="py-2 text-right">الهوية</th>
                        <th className="py-2 text-right">رقم الطلب</th>
                        <th className="py-2 text-right">كود التحقق</th>
                        <th className="py-2 text-right">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c._id} className="border-b border-gray-50">
                          <td className="py-2">{c.name}</td>
                          <td className="py-2">{c.identityNumber}</td>
                          <td className="py-2">{c.orderNumber}</td>
                          <td className="py-2">{c.verificationCode}</td>
                          <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.status === "active" ? "نشط" : "غير نشط"}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {tab === "settings" && settings && (
          <div className="card space-y-6">
            <h3 className="font-bold text-lg">إعدادات الموقع</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">اسم المتجر</label>
                <input className="input-field" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} />
              </div>
              <div>
                <label className="label">رابط الشعار</label>
                <input className="input-field" value={settings.logoUrl} onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="label">اللون الرئيسي</label>
                <div className="flex gap-2">
                  <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="h-10 w-14 rounded cursor-pointer" />
                  <input className="input-field" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">اللون الثانوي</label>
                <div className="flex gap-2">
                  <input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="h-10 w-14 rounded cursor-pointer" />
                  <input className="input-field" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">العنوان الرئيسي</label>
                <input className="input-field" value={settings.heroTitle} onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })} />
              </div>
              <div>
                <label className="label">الوصف</label>
                <textarea className="input-field" rows={2} value={settings.heroDescription} onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })} />
              </div>
              <div>
                <label className="label">رسالة النجاح</label>
                <input className="input-field" value={settings.successMessage} onChange={(e) => setSettings({ ...settings, successMessage: e.target.value })} />
              </div>
              <div>
                <label className="label">الرسالة الفرعية للنجاح</label>
                <input className="input-field" value={settings.successSubMessage} onChange={(e) => setSettings({ ...settings, successSubMessage: e.target.value })} />
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3">التحكم في الحقول</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.fields.birthDate.enabled} onChange={(e) => setSettings({ ...settings, fields: { ...settings.fields, birthDate: { ...settings.fields.birthDate, enabled: e.target.checked } } })} />
                    <span className="text-sm">تاريخ الميلاد - مفعّل</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.fields.birthDate.required} onChange={(e) => setSettings({ ...settings, fields: { ...settings.fields, birthDate: { ...settings.fields.birthDate, required: e.target.checked } } })} />
                    <span className="text-sm">إجباري</span>
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.fields.phone.enabled} onChange={(e) => setSettings({ ...settings, fields: { ...settings.fields, phone: { ...settings.fields.phone, enabled: e.target.checked } } })} />
                    <span className="text-sm">رقم الجوال - مفعّل</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={settings.fields.phone.required} onChange={(e) => setSettings({ ...settings, fields: { ...settings.fields, phone: { ...settings.fields.phone, required: e.target.checked } } })} />
                    <span className="text-sm">إجباري</span>
                  </label>
                </div>
              </div>
            </div>

            <button onClick={saveSettings} className="btn-primary">حفظ الإعدادات</button>
          </div>
        )}
      </div>
    </div>
  );
}
