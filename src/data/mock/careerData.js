/**
 * Career Categories and Job Roles Mock Dataset
 * Prepared for scalable extension with hundreds of roles.
 * Full trilingual support for English ('en'), Hindi ('hi'), and Bengali ('bn').
 */
export const CAREER_CATEGORIES = [
  {
    "id": "bfsi",
    "name": "BFSI",
    "name_hi": "बीएफएसआई (बैंकिंग)",
    "name_bn": "বিএফএসআই (ব্যাংকিং)",
    "fullName": "Banking, Financial Services & Insurance",
    "fullName_hi": "बैंकिंग, वित्तीय सेवाएं एवं बीमा",
    "fullName_bn": "ব্যাংকিং, আর্থিক পরিষেবা ও বীমা",
    "description": "Manage financial records, assist branch customers, handle credit and insurance queries.",
    "description_hi": "वित्तीय रिकॉर्ड प्रबंधित करें, शाखा ग्राहकों की सहायता करें और ऋण व बीमा संबंधी पूछताछ संभालें।",
    "description_bn": "আর্থিক হিসাব পরিচালনা, ব্যাংকের গ্রাহকদের সহায়তা প্রদান এবং ঋণ ও বীমা সংক্রান্ত কাজ পরিচালনা করুন।",
    "icon": "🏦",
    "roles": [
      {
        "id": "bfsi-1",
        "title": "Banking Executive",
        "title_hi": "बैंकिंग एग्जीक्यूटिव",
        "title_bn": "ব্যাংকিং এক্সিকিউটিভ",
        "description": "Assists customers with everyday transactions, opening accounts, and providing basic branch support.",
        "description_hi": "ग्राहकों को दैनिक लेन-देन, खाता खोलने और बुनियादी बैंकिंग कार्यों में सहायता प्रदान करते हैं।",
        "description_bn": "গ্রাহকদের দৈনন্দিন লেনদেন, অ্যাকাউন্ট খোলা এবং প্রাথমিক ব্যাংকিং সেবায় সহায়তা করা।",
        "skills": [
          "Basic Mathematics",
          "Customer Communication",
          "Record Keeping"
        ],
        "skills_hi": [
          "बुनियादी गणित",
          "ग्राहक संवाद",
          "रिकॉर्ड प्रबंधन"
        ],
        "skills_bn": [
          "প্রাথমিক গণিত",
          "গ্রাহক যোগাযোগ",
          "রেকর্ড সংরক্ষণ"
        ],
        "eligibility": "12th Standard / Graduate in any stream"
      },
      {
        "id": "bfsi-2",
        "title": "Banking Associate",
        "title_hi": "बैंकिंग एसोसिएट",
        "title_bn": "ব্যাংকিং সহযোগী",
        "description": "Supports loan processing, document verification, and account maintenance with accuracy.",
        "description_hi": "ऋण प्रक्रिया, दस्तावेजों के सत्यापन और खाता प्रबंधन में सटीकता से सहायता करते हैं।",
        "description_bn": "ঋণ অনুমোদন প্রক্রিয়া, নথিপত্র যাচাইকরণ এবং অ্যাকাউন্টের সঠিক তথ্যের তদারকি করা।",
        "skills": [
          "Attention to Detail",
          "Basic Computer Skills",
          "Document Verification"
        ],
        "skills_hi": [
          "बारीकियों पर ध्यान",
          "बुनियादी कंप्यूटर ज्ञान",
          "दस्तावेज़ सत्यापन"
        ],
        "skills_bn": [
          "সতর্ক দৃষ্টি",
          "কম্পিউটার জ্ঞান",
          "নথিপত্র যাচাই"
        ],
        "eligibility": "Graduate in any stream"
      },
      {
        "id": "bfsi-3",
        "title": "Customer Service Executive",
        "title_hi": "ग्राहक सेवा एग्जीक्यूटिव",
        "title_bn": "গ্রাহক সেবা এক্সিকিউটিভ",
        "description": "Handles incoming telephone and in-person inquiries, resolving client questions professionally.",
        "description_hi": "टेलीफोन और प्रत्यक्ष पूछताछ का समाधान करते हैं और ग्राहकों की समस्याओं को हल करते हैं।",
        "description_bn": "ফোন ও সরাসরি আসা অনুসন্ধান পরিচালনা এবং পেশাদারিত্বের সাথে গ্রাহকদের প্রশ্নের সমাধান।",
        "skills": [
          "Active Listening",
          "Friendly Demeanor",
          "Problem Solving"
        ],
        "skills_hi": [
          "सक्रिय श्रवण",
          "मैत्रीपूर्ण व्यवहार",
          "समस्या समाधान"
        ],
        "skills_bn": [
          "মনোযোগ দিয়ে শোনা",
          "বন্ধুত্বপূর্ণ আচরণ",
          "সমস্যা সমাধান"
        ],
        "eligibility": "12th Standard / Diploma / Graduate"
      },
      {
        "id": "bfsi-4",
        "title": "Relationship Executive",
        "title_hi": "रिलेशनशिप एग्जीक्यूटिव",
        "title_bn": "রিলেশনশিপ এক্সিকিউটিভ",
        "description": "Maintains ongoing connection with account holders, introducing them to suitable savings and insurance products.",
        "description_hi": "खाताधारकों से संपर्क बनाए रखते हैं और उन्हें बचत व बीमा योजनाओं की जानकारी देते हैं।",
        "description_bn": "গ্রাহকদের সাথে দীর্ঘমেয়াদী সুসম্পর্ক বজায় রাখা এবং সঞ্চয় ও বীমা পরিকল্পনার পরামর্শ দেওয়া।",
        "skills": [
          "Relationship Building",
          "Clear Speaking",
          "Trustworthiness"
        ],
        "skills_hi": [
          "संबंध निर्माण",
          "स्पष्ट संवाद",
          "विश्वसनीयता"
        ],
        "skills_bn": [
          "সম্পর্ক গড়ে তোলা",
          "স্পষ্ট উচ্চারণ",
          "বিশ্বাসযোগ্যতা"
        ],
        "eligibility": "Graduate (preferred)"
      },
      {
        "id": "bfsi-5",
        "title": "Relationship Officer",
        "title_hi": "रिलेशनशिप ऑफिसर",
        "title_bn": "রিলেশনশিপ অফিসার",
        "description": "Coordinates specialized services for retail banking clients and monitors satisfaction.",
        "description_hi": "खुदरा बैंकिंग ग्राहकों के लिए विशेष सेवाओं का समन्वय करते हैं और संतुष्टि सुनिश्चित करते हैं।",
        "description_bn": "ব্যাংকের বিশেষ গ্রাহকদের উন্নত পরিষেবা প্রদান এবং তাদের সন্তুষ্টির ওপর নজর রাখা।",
        "skills": [
          "Professional Communication",
          "Organizational Skills",
          "Financial Basics"
        ],
        "skills_hi": [
          "पेशेवर संवाद",
          "संगठनात्मक कौशल",
          "वित्तीय समझ"
        ],
        "skills_bn": [
          "পেশাদার যোগাযোগ",
          "সংগঠন দক্ষতা",
          "আর্থিক ধারণা"
        ],
        "eligibility": "Graduate in Commerce / Arts / Science"
      }
    ]
  },
  {
    "id": "it",
    "name": "Information Technology",
    "name_hi": "सूचना प्रौद्योगिकी (आईटी)",
    "name_bn": "তথ্য প্রযুক্তি (আইটি)",
    "fullName": "IT, Digital Services & Technical Support",
    "fullName_hi": "आईटी, डिजिटल सेवाएं एवं तकनीकी सहायता",
    "fullName_bn": "তথ্যপ্রযুক্তি, ডিজিটাল সেবা ও প্রযুক্তিগত সহায়তা",
    "description": "Support computer hardware, software applications, database entry, and user assistance.",
    "description_hi": "कंप्यूटर हार्डवेयर, सॉफ्टवेयर, डेटाबेस प्रविष्टि और तकनीकी सहायता में सहयोग दें।",
    "description_bn": "কম্পিউটার হার্ডওয়্যার, সফটওয়্যার, ডেটাবেস এবং ব্যবহারকারীদের প্রযুক্তিগত সহায়তা প্রদান।",
    "icon": "💻",
    "roles": [
      {
        "id": "it-1",
        "title": "Technical Support Associate",
        "title_hi": "तकनीकी सहायता एसोसिएट",
        "title_bn": "টেকনিক্যাল সাপোর্ট সহযোগী",
        "description": "Assists users with computer troubleshooting, basic software setups, and hardware issues.",
        "description_hi": "कंप्यूटर की खराबी ठीक करने, सॉफ्टवेयर सेटअप और हार्डवेयर समस्याओं में उपयोगकर्ताओं की मदद करते हैं।",
        "description_bn": "কম্পিউটারের ত্রুটি সমাধান, সফটওয়্যার সেটআপ এবং ব্যবহারকারীদের সহায়তা করা।",
        "skills": [
          "Computer Basics",
          "Troubleshooting",
          "Patient Communication"
        ],
        "skills_hi": [
          "कंप्यूटर का ज्ञान",
          "समस्या निवारण",
          "धैर्यपूर्ण संवाद"
        ],
        "skills_bn": [
          "কম্পিউটার জ্ঞান",
          "ত্রুটি সমাধান",
          "ধৈর্যশীল যোগাযোগ"
        ],
        "eligibility": "12th with Computers / IT Diploma / Graduate"
      },
      {
        "id": "it-2",
        "title": "Data Operations Assistant",
        "title_hi": "डेटा संचालन सहायक",
        "title_bn": "ডেটা অপারেশন সহকারী",
        "description": "Enters and organizes institutional records with speed, care, and data accuracy.",
        "description_hi": "संस्थागत रिकॉर्ड को गति, सावधानी और शुद्धता के साथ डेटाबेस में दर्ज करते हैं।",
        "description_bn": "নির্ভুলভাবে এবং দ্রুততার সাথে প্রাতিষ্ঠানিক তথ্য ডেটাবেসে সংরক্ষণ ও পরিচালনা।",
        "skills": [
          "Typing Speed",
          "Data Accuracy",
          "Spreadsheet Basics"
        ],
        "skills_hi": [
          "टाइपिंग गति",
          "सटीक डेटा प्रविष्टि",
          "स्प्रेडशीट ज्ञान"
        ],
        "skills_bn": [
          "টাইপিং গতি",
          "নির্ভুল তথ্য এন্ট্রি",
          "এক্সেল ধারণা"
        ],
        "eligibility": "12th Standard / Any Graduate"
      },
      {
        "id": "it-3",
        "title": "IT Helpdesk Officer",
        "title_hi": "आईटी हेल्पडेस्क अधिकारी",
        "title_bn": "আইটি হেল্পডেস্ক অফিসার",
        "description": "Logs IT tickets, coordinates hardware repairs, and guides office staff on software tools.",
        "description_hi": "आईटी समस्याओं को दर्ज करते हैं, मरम्मत का समन्वय करते हैं और कर्मचारियों का मार्गदर्शन करते हैं।",
        "description_bn": "প্রযুক্তিগত সমস্যার টিকিট গ্রহণ, যন্ত্রাংশ মেরামত এবং অফিসের কর্মীদের সফটওয়্যার ব্যবহারের নিয়ম বোঝানো।",
        "skills": [
          "Ticketing Tools",
          "Communication",
          "Customer Service"
        ],
        "skills_hi": [
          "हेल्पडेस्क टूल्स",
          "संवाद कौशल",
          "ग्राहक सेवा"
        ],
        "skills_bn": [
          "টিকেটিং টুলস",
          "যোগাযোগ",
          "গ্রাহক সেবা"
        ],
        "eligibility": "BCA / BSc IT / Diploma in IT"
      }
    ]
  },
  {
    "id": "retail",
    "name": "Retail & Operations",
    "name_hi": "रिटेल एवं संचालन",
    "name_bn": "খুচরা ব্যবসা ও পরিচালনা",
    "fullName": "Retail Stores, Inventory & Customer Care",
    "fullName_hi": "रिटेल स्टोर्स, इन्वेंट्री एवं ग्राहक सेवा",
    "fullName_bn": "খুচরা দোকান, স্টক ও গ্রাহক সেবা",
    "description": "Manage store displays, assist walk-in customers, track merchandise and checkout desks.",
    "description_hi": "स्टोर डिस्प्ले का प्रबंधन करें, ग्राहकों की सहायता करें, इन्वेंट्री और बिलिंग संभालें।",
    "description_bn": "দোকানের সাজসজ্জা রক্ষা, আগত ক্রেতাদের সহায়তা, পন্যের স্টক এবং ক্যাশ কাউন্টার পরিচালনা।",
    "icon": "🛍️",
    "roles": [
      {
        "id": "ret-1",
        "title": "Retail Store Associate",
        "title_hi": "रिटेल स्टोर एसोसिएट",
        "title_bn": "রিটেল স্টোর সহযোগী",
        "description": "Welcomes store visitors, answers product questions, and maintains neat product displays.",
        "description_hi": "आने वाले ग्राहकों का स्वागत करते हैं, उत्पादों की जानकारी देते हैं और डिस्प्ले सजाते हैं।",
        "description_bn": "ক্রেতাদের স্বাগত জানানো, পণ্যের বিবরণ বুঝিয়ে বলা এবং দোকানের ডিসপ্লে সুন্দর রাখা।",
        "skills": [
          "Customer Care",
          "Product Knowledge",
          "Punctuality"
        ],
        "skills_hi": [
          "ग्राहक सेवा",
          "उत्पाद की समझ",
          "समयनिष्ठा"
        ],
        "skills_bn": [
          "গ্রাহক সেবা",
          "পণ্য পরিচিতি",
          "সময়নিষ্ঠতা"
        ],
        "eligibility": "10th / 12th Standard or equivalent"
      },
      {
        "id": "ret-2",
        "title": "Inventory & Stock Coordinator",
        "title_hi": "इन्वेंट्री एवं स्टॉक समन्वयक",
        "title_bn": "স্টক ও ইনভেন্টরি সমন্বয়কারী",
        "description": "Tracks store inventory, records received goods, and monitors stock availability.",
        "description_hi": "स्टोर के स्टॉक पर नज़र रखते हैं, नए सामान का मिलान करते हैं और उपलब्धता दर्ज करते हैं।",
        "description_bn": "পণ্যের মজুদ পরীক্ষা করা, সরবরাহ গ্রহণ এবং সঠিক হিসাব রাখা।",
        "skills": [
          "Stock Counting",
          "Organization",
          "Basic Record Keeping"
        ],
        "skills_hi": [
          "स्टॉक गणना",
          "संगठनात्मक कौशल",
          "रिकॉर्ड रखना"
        ],
        "skills_bn": [
          "স্টক গণনা",
          "শৃঙ্খলা",
          "হিসাব সংরক্ষণ"
        ],
        "eligibility": "12th Standard / Diploma"
      },
      {
        "id": "ret-3",
        "title": "Checkout & Billing Cashier",
        "title_hi": "चेकआउट एवं बिलिंग कैशियर",
        "title_bn": "বিলিং ও ক্যাশ কাউন্টার সহকারী",
        "description": "Operates point-of-sale cash registers, processes payments, and provides receipts.",
        "description_hi": "बिलिंग काउंटर संभालते हैं, भुगतान लेते हैं और ग्राहकों को रसीद प्रदान करते हैं।",
        "description_bn": "ক্যাশ রেজিস্টার পরিচালনা, মূল্য গ্রহণ এবং বিক্রয়ের রসিদ প্রদান করা।",
        "skills": [
          "Basic Math",
          "Cash Handling",
          "Friendly Courtesy"
        ],
        "skills_hi": [
          "बुनियादी गणना",
          "नकदी प्रबंधन",
          "विनम्र व्यवहार"
        ],
        "skills_bn": [
          "হিসাব দক্ষতা",
          "ক্যাশ হ্যান্ডলিং",
          "নম্র আচরণ"
        ],
        "eligibility": "12th Standard"
      }
    ]
  },
  {
    "id": "healthcare",
    "name": "Healthcare Support",
    "name_hi": "स्वास्थ्य सेवा सहायता",
    "name_bn": "স্বাস্থ্যসেবা সহায়তা",
    "fullName": "Hospital Coordination & Patient Services",
    "fullName_hi": "अस्पताल समन्वय एवं रोगी सेवाएं",
    "fullName_bn": "হাসপাতাল সমন্বয় ও রোগী সেবা",
    "description": "Assist hospital administration, coordinate patient registration, and manage appointment schedules.",
    "description_hi": "अस्पताल प्रशासन में सहयोग करें, रोगी पंजीकरण का समन्वय करें और समय-सारणी प्रबंधित करें।",
    "description_bn": "হাসপাতাল প্রশাসনে সহায়তা, রোগীদের রেজিস্ট্রেশন এবং চিকিৎসকের অ্যাপয়েন্টমেন্ট পরিচালনা।",
    "icon": "🏥",
    "roles": [
      {
        "id": "hc-1",
        "title": "Patient Care Coordinator",
        "title_hi": "रोगी देखभाल समन्वयक",
        "title_bn": "রোগী পরিচর্যা সমন্বয়কারী",
        "description": "Guides patients to the right medical departments, assists with registration forms and queues.",
        "description_hi": "मरीजों को उचित विभाग तक पहुंचाते हैं, पंजीकरण फॉर्म भरने और कतार में मदद करते हैं।",
        "description_bn": "রোগীদের সঠিক বিভাগে যেতে সাহায্য করা, ফর্ম পূরণে সহায়তা এবং লাইনের তদারকি করা।",
        "skills": [
          "Empathy",
          "Patience",
          "Verbal Communication"
        ],
        "skills_hi": [
          "सहानुभूति",
          "धैर्य",
          "स्पष्ट संवाद"
        ],
        "skills_bn": [
          "সহানুভূতি",
          "ধৈর্য",
          "মৌখিক যোগাযোগ"
        ],
        "eligibility": "12th Standard in any stream"
      },
      {
        "id": "hc-2",
        "title": "Medical Records Assistant",
        "title_hi": "मेडिकल रिकॉर्ड सहायक",
        "title_bn": "মেডিকেল রেকর্ড সহকারী",
        "description": "Files, scans, and securely archives physical and electronic patient records.",
        "description_hi": "रोगियों के कागजी और डिजिटल मेडिकल रिकॉर्ड को सुरक्षित रूप से व्यवस्थित और संग्रहीत करते हैं।",
        "description_bn": "রোগীদের নথিপত্র এবং ডিজিটাল মেডিকেল ফাইল নিরাপদে সাজিয়ে রাখা।",
        "skills": [
          "Confidentiality",
          "Filing Systems",
          "Attention to Detail"
        ],
        "skills_hi": [
          "गोपनीयता",
          "फ़ाइल प्रबंधन",
          "बारीकियों पर ध्यान"
        ],
        "skills_bn": [
          "গোপনীয়তা রক্ষা",
          "ফাইল সিস্টেম",
          "সতর্ক দৃষ্টি"
        ],
        "eligibility": "12th Standard / Diploma in Healthcare Admin"
      }
    ]
  }
]

/**
 * Returns localized category array based on language
 * @param {Array} cats 
 * @param {string} language - 'en' | 'hi' | 'bn'
 * @returns {Array}
 */
export function getLocalizedCareerCategories(cats = CAREER_CATEGORIES, language = 'en') {
  if (language === 'hi') {
    return cats.map((cat) => ({
      ...cat,
      name: cat.name_hi || cat.name,
      fullName: cat.fullName_hi || cat.fullName,
      description: cat.description_hi || cat.description,
      roles: (cat.roles || []).map((role) => ({
        ...role,
        title: role.title_hi || role.title,
        description: role.description_hi || role.description,
        skills: role.skills_hi || role.skills,
      })),
    }))
  }
  if (language === 'bn') {
    return cats.map((cat) => ({
      ...cat,
      name: cat.name_bn || cat.name,
      fullName: cat.fullName_bn || cat.fullName,
      description: cat.description_bn || cat.description,
      roles: (cat.roles || []).map((role) => ({
        ...role,
        title: role.title_bn || role.title,
        description: role.description_bn || role.description,
        skills: role.skills_bn || role.skills,
      })),
    }))
  }
  return cats
}

export default CAREER_CATEGORIES
