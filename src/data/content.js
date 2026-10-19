// Static, multilingual content arrays for AstaEnterprise
// Each item has { en, id } variants where applicable

export const ecosystem = [
  {
    id: "erp-saas",
    icon: "LayoutDashboard",
    title: { en: "ERP SaaS", id: "ERP SaaS" },
    desc: {
      en: "Manage POS, inventory, buyback, finance, and multi-branch operations in one integrated platform.",
      id: "Kelola POS, inventaris, buyback, keuangan, dan operasional multi-cabang dalam satu platform terintegrasi.",
    },
    href: "/",
  },
  {
    id: "product-service",
    icon: "Gem",
    title: { en: "Product & Service", id: "Produk & Layanan" },
    desc: {
      en: "Explore Asta Emas products and services, from gold buying and selling to repair, consultation, and education.",
      id: "Jelajahi produk dan layanan Asta Emas, dari jual beli emas hingga repair, konsultasi, dan edukasi.",
    },
    href: "/product-service",
  },
  {
    id: "media",
    icon: "Newspaper",
    title: { en: "Media Lifestyle Gold", id: "Media Lifestyle Gold" },
    desc: {
      en: "Insight, market updates, and business stories for the next generation of gold entrepreneurs.",
      id: "Insight, update pasar, dan cerita bisnis untuk generasi pengusaha emas berikutnya.",
    },
    href: "/media",
  },
  {
    id: "academy",
    icon: "GraduationCap",
    title: { en: "Gold Business Academy", id: "Gold Business Academy" },
    desc: {
      en: "Courses, workshops, and practical learning for owners, teams, and future gold business builders.",
      id: "Kursus, workshop, dan pembelajaran praktis untuk owner, tim, dan calon pembangun bisnis emas.",
    },
    href: "/academy",
  },
  {
    id: "books",
    icon: "BookOpen",
    title: { en: "Book & Playbook", id: "Book & Playbook" },
    desc: {
      en: "Practical guides, SOP templates, and business playbooks for modern gold businesses.",
      id: "Panduan praktis, template SOP, dan business playbook untuk bisnis emas modern.",
    },
    href: "/books",
  },
  {
    id: "community",
    icon: "Users",
    title: { en: "Owner Community", id: "Komunitas Owner" },
    desc: {
      en: "A private circle for gold business owners to learn, connect, and grow.",
      id: "Komunitas privat untuk pemilik bisnis emas untuk belajar, terhubung, dan tumbuh.",
    },
    href: "/community",
  },
];

export const erpPreviewFeatures = [
  { icon: "ScanBarcode", title: { en: "Gold POS", id: "Gold POS" } },
  {
    icon: "Boxes",
    title: {
      en: "Inventory by gram, karat, barcode, and photo",
      id: "Inventaris per gram, karat, barcode, dan foto",
    },
  },
  { icon: "Repeat2", title: { en: "Buyback and trade-in", id: "Buyback dan trade-in" } },
  { icon: "Wrench", title: { en: "Repair and custom order", id: "Repair dan custom order" } },
  { icon: "Building2", title: { en: "Multi-branch control", id: "Kontrol multi-cabang" } },
  { icon: "PieChart", title: { en: "Finance and profit report", id: "Laporan keuangan dan profit" } },
  { icon: "LayoutDashboard", title: { en: "Owner dashboard", id: "Owner dashboard" } },
];

export const erpModules = [
  { icon: "ScanBarcode", title: { en: "POS & Transaction", id: "POS & Transaksi" } },
  { icon: "Boxes", title: { en: "Inventory Management", id: "Manajemen Inventaris" } },
  { icon: "QrCode", title: { en: "Barcode & Product Identity", id: "Barcode & Identitas Produk" } },
  { icon: "Repeat2", title: { en: "Buyback & Trade-In", id: "Buyback & Trade-In" } },
  { icon: "Wrench", title: { en: "Repair & Custom Order", id: "Repair & Custom Order" } },
  { icon: "Contact2", title: { en: "Customer CRM", id: "Customer CRM" } },
  { icon: "Truck", title: { en: "Supplier & Purchase", id: "Supplier & Pembelian" } },
  { icon: "PieChart", title: { en: "Finance Report", id: "Laporan Keuangan" } },
  { icon: "Building2", title: { en: "Multi-Branch Management", id: "Manajemen Multi-Cabang" } },
  { icon: "LayoutDashboard", title: { en: "Owner Dashboard", id: "Owner Dashboard" } },
];

export const erpBenefits = [
  { en: "Better stock control", id: "Kontrol stok lebih baik" },
  { en: "Faster daily transactions", id: "Transaksi harian lebih cepat" },
  { en: "Cleaner financial reporting", id: "Pelaporan keuangan lebih rapi" },
  { en: "Easier branch monitoring", id: "Monitoring cabang lebih mudah" },
  { en: "Reduced operational mistakes", id: "Mengurangi kesalahan operasional" },
  { en: "More data-driven decision making", id: "Pengambilan keputusan berbasis data" },
];

export const erpPricing = [
  {
    id: "starter",
    name: "Starter",
    tagline: {
      en: "For single-store gold businesses starting their digital journey.",
      id: "Untuk bisnis emas single-store yang memulai perjalanan digital.",
    },
    features: [
      { en: "POS & Inventory", id: "POS & Inventaris" },
      { en: "Barcode system", id: "Sistem barcode" },
      { en: "Basic finance report", id: "Laporan keuangan dasar" },
      { en: "Single branch", id: "Single cabang" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    highlighted: true,
    tagline: {
      en: "For growing businesses with multi-branch operations and richer reporting.",
      id: "Untuk bisnis yang berkembang dengan multi-cabang dan pelaporan lebih lengkap.",
    },
    features: [
      { en: "All Starter features", id: "Semua fitur Starter" },
      { en: "Multi-branch control", id: "Multi-cabang" },
      { en: "Buyback & repair modules", id: "Modul buyback & repair" },
      { en: "Owner dashboard", id: "Owner dashboard" },
      { en: "Priority support", id: "Support prioritas" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: {
      en: "For established gold groups with custom requirements and integrations.",
      id: "Untuk grup bisnis emas mapan dengan kebutuhan dan integrasi khusus.",
    },
    features: [
      { en: "All Growth features", id: "Semua fitur Growth" },
      { en: "Custom integrations", id: "Integrasi kustom" },
      { en: "Dedicated success manager", id: "Dedicated success manager" },
      { en: "Onsite training", id: "Training onsite" },
      { en: "SLA & uptime guarantee", id: "Jaminan SLA & uptime" },
    ],
  },
];

export const services = [
  {
    id: "jual-beli",
    title: "Jual Beli Emas",
    desc: {
      en: "A trusted gold buying and selling service designed to help customers transact gold easily, securely, and transparently.",
      id: "Layanan jual beli emas untuk membantu pelanggan melakukan transaksi emas dengan mudah, aman, dan transparan.",
    },
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "emas-rusak",
    title: "Beli Emas Rusak / Tanpa Surat",
    desc: {
      en: "Buying broken gold or gold without certificates, with a clear and professional appraisal process.",
      id: "Layanan pembelian emas rusak atau emas tanpa surat dengan proses penilaian yang jelas dan profesional.",
    },
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cuci-repair",
    title: "Cuci & Repair Perhiasan",
    desc: {
      en: "Jewelry cleaning, care, and repair services to maintain the value and appearance of your gold.",
      id: "Layanan perawatan, pembersihan, dan perbaikan perhiasan agar nilai dan tampilan emas tetap terjaga.",
    },
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "konsultasi",
    title: "Konsultasi Penilaian Emas",
    desc: {
      en: "Consultation to help customers understand the value, karat, weight, condition, and price estimate of gold.",
      id: "Layanan konsultasi untuk membantu pelanggan memahami nilai emas, kadar, berat, kondisi, dan estimasi harga.",
    },
    image:
      "https://images.unsplash.com/photo-1556228724-4d3f4f7f9b67?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "edukasi",
    title: "Media Edukasi Emas",
    desc: {
      en: "Educational content on gold, gold prices, investment, jewelry trends, and how to understand gold value.",
      id: "Konten edukasi seputar emas, harga emas, investasi emas, tren perhiasan, dan cara memahami nilai emas.",
    },
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lifestyle",
    title: "Gold Lifestyle Content",
    desc: {
      en: "Lifestyle content that positions gold not only as an asset, but as part of a modern lifestyle.",
      id: "Konten lifestyle yang menjadikan emas bukan hanya aset, tetapi bagian dari gaya hidup modern.",
    },
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80",
  },
];

export const mediaCategories = [
  "Gold Business Insight",
  "Gold Market Update",
  "Gold Technology",
  "Owner Mindset",
  "Jewelry Lifestyle",
  "Asta Emas Education",
];



export const courses = [
  {
    id: "c1",
    title: { en: "How to Build a Modern Gold Store", id: "Cara Membangun Toko Emas Modern" },
    level: { en: "Beginner", id: "Pemula" },
    duration: "6 weeks",
    lessons: 18,
  },
  {
    id: "c2",
    title: {
      en: "Gold Pricing, Buyback, and Margin Strategy",
      id: "Strategi Pricing, Buyback, dan Margin Emas",
    },
    level: { en: "Intermediate", id: "Menengah" },
    duration: "4 weeks",
    lessons: 12,
  },
  {
    id: "c3",
    title: {
      en: "Digital Transformation for Gold Stores",
      id: "Transformasi Digital untuk Toko Emas",
    },
    level: { en: "Intermediate", id: "Menengah" },
    duration: "5 weeks",
    lessons: 15,
  }
];

export const books = [
  {
    id: "b1",
    title: "Gold Business Playbook",
    subtitle: { en: "The owner's operating system.", id: "Sistem operasi owner." },
    pages: 184,
    accent: "maroon",
  },
  {
    id: "b2",
    title: "Digitalization Guide for Gold Stores",
    subtitle: {
      en: "From manual to data-driven, step by step.",
      id: "Dari manual ke data-driven, langkah demi langkah.",
    },
    pages: 142,
    accent: "gold",
  },
  {
    id: "b3",
    title: "SOP Toko Emas Modern",
    subtitle: {
      en: "Standard operating procedures, codified.",
      id: "Standar operasional, dikodifikasi.",
    },
    pages: 96,
    accent: "neutral",
  },
  {
    id: "b4",
    title: "The Future of Gold Business in Indonesia",
    subtitle: {
      en: "Market, mindset, and modernization.",
      id: "Pasar, mindset, dan modernisasi.",
    },
    pages: 220,
    accent: "maroon",
  },
  {
    id: "b5",
    title: "Gold Pricing & Margin Guide",
    subtitle: { en: "A field manual for daily decisions.", id: "Manual lapangan untuk keputusan harian." },
    pages: 118,
    accent: "gold",
  },
];

export const communityTiers = [
  {
    id: "free",
    name: { en: "Free Community", id: "Komunitas Gratis" },
    price: { en: "Free", id: "Gratis" },
    features: [
      { en: "Private owner community", id: "Komunitas owner privat" },
      { en: "Monthly market update discussion", id: "Diskusi update pasar bulanan" },
      { en: "Newsletter access", id: "Akses newsletter" },
    ],
  },
  {
    id: "pro",
    name: { en: "Pro Membership", id: "Pro Membership" },
    price: { en: "Coming Soon", id: "Segera Hadir" },
    highlighted: true,
    features: [
      { en: "All Free benefits", id: "Semua benefit Free" },
      { en: "Weekly gold business insight", id: "Insight bisnis emas mingguan" },
      { en: "Monthly webinar", id: "Webinar bulanan" },
      { en: "SOP and business templates", id: "Template SOP dan bisnis" },
      { en: "Business case studies", id: "Studi kasus bisnis" },
    ],
  },
  {
    id: "owner",
    name: { en: "Owner Circle", id: "Owner Circle" },
    price: { en: "By application", id: "Melalui aplikasi" },
    features: [
      { en: "All Pro benefits", id: "Semua benefit Pro" },
      { en: "Early access to ERP features", id: "Akses awal fitur ERP" },
      { en: "Networking with gold business owners", id: "Networking sesama pemilik bisnis emas" },
      { en: "Private owner retreats", id: "Retreat owner privat" },
    ],
  },
];

export const aboutValues = [
  { en: "Clarity", id: "Kejelasan" },
  { en: "Trust", id: "Kepercayaan" },
  { en: "Modernization", id: "Modernisasi" },
  { en: "Premium Experience", id: "Premium Experience" },
  { en: "Community", id: "Komunitas" },
  { en: "Data-driven Growth", id: "Pertumbuhan Berbasis Data" },
];

export const businessTypes = [
  { value: "gold-store-owner", en: "Gold Store Owner", id: "Pemilik Toko Emas" },
  { value: "jewelry-business", en: "Jewelry Business", id: "Bisnis Perhiasan" },
  { value: "gold-investor", en: "Gold Investor", id: "Investor Emas" },
  { value: "future-entrepreneur", en: "Future Gold Entrepreneur", id: "Calon Entrepreneur Emas" },
  { value: "media-partnership", en: "Media/Partnership", id: "Media / Partnership" },
  { value: "other", en: "Other", id: "Lainnya" },
];
