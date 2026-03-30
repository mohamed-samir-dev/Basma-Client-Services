export interface SiteSettings {
  storeName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroDescription: string;
  successMessage: string;
  successSubMessage: string;
  fields: {
    birthDate: { enabled: boolean; required: boolean };
    phone: { enabled: boolean; required: boolean };
    expiryDate: { enabled: boolean };
    cvv: { enabled: boolean };
  };
}

export type TransactionType = "installments" | "deduction" | "refund" | "payment";
export type RequestStatus = "new" | "reviewing" | "completed" | "rejected";

export interface FormData {
  customerName: string;
  cardHolderName: string;
  nationalId: string;
  age: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  transactionType: TransactionType;
  installmentDay?: number;
  amount?: number;
}

export const TRANSACTION_LABELS: Record<TransactionType, string> = {
  installments: "تنظيم الأقساط الشهرية",
  deduction: "استقطاع شهري",
  refund: "استرجاع الدفعة",
  payment: "دفع فاتورة",
};

export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "جديد",
  reviewing: "تحت المراجعة",
  completed: "مكتمل",
  rejected: "مرفوض",
};

export const STATUS_COLORS: Record<RequestStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewing: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};
