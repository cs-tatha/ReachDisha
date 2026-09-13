/**
 * 45 Calibrated Career Assessment Questions with Hidden Multi-Area Scoring Matrix
 * Complete Multilingual Support: English ('en'), Hindi ('hi'), Bengali ('bn')
 */

const QUESTION_BANK = [
  {
    "id": 1,
    "sectionId": "aptitude",
    "category": "Numerical Reasoning",
    "question": "You need to find the total cost of several items with different prices. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Add the prices quickly and use the result.",
        "level": 2,
        "contributions": [
          {
            "trait": "numerical_reasoning",
            "level": 2
          },
          {
            "trait": "speed",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 2
          }
        ],
        "textHi": "कीमतों को जल्दी से जोड़ेंगे और परिणाम का उपयोग करेंगे।",
        "textBn": "দামগুলি দ্রুত যোগ করে ফলাফল ব্যবহার করবেন।"
      },
      {
        "id": "b",
        "text": "Arrange the prices clearly and check the total before using it.",
        "level": 4,
        "contributions": [
          {
            "trait": "numerical_reasoning",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "कीमतों को स्पष्ट रूप से व्यवस्थित करेंगे और उपयोग करने से पहले कुल योग की जांच करेंगे।",
        "textBn": "দামগুলি স্পষ্টভাবে সাজিয়ে নেবেন এবং ব্যবহারের আগে মোট যোগফল পরীক্ষা করবেন।"
      },
      {
        "id": "c",
        "text": "Guess the total if it looks close enough.",
        "level": 1,
        "contributions": [
          {
            "trait": "numerical_reasoning",
            "level": 1
          },
          {
            "trait": "quality_orientation",
            "level": 1
          }
        ],
        "textHi": "यदि कुल लगभग सही लगता है तो केवल अनुमान लगा लेंगे।",
        "textBn": "মোট যোগফল কাছাকাছি মনে হলে অনুমান করে নেবেন।"
      },
      {
        "id": "d",
        "text": "Add everything carefully once.",
        "level": 3,
        "contributions": [
          {
            "trait": "numerical_reasoning",
            "level": 3
          },
          {
            "trait": "structured_work",
            "level": 3
          }
        ],
        "textHi": "एक बार सब कुछ ध्यानपूर्वक जोड़ेंगे।",
        "textBn": "একবার সবকিছু সতর্কতার সাথে যোগ করবেন।"
      },
      {
        "id": "e",
        "text": "Calculate it carefully, check it again, and find the reason if something does not match.",
        "level": 5,
        "contributions": [
          {
            "trait": "numerical_reasoning",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          }
        ],
        "textHi": "सावधानी से गणना करेंगे, दोबारा जांच करेंगे, और यदि कुछ मेल नहीं खाता तो कारण खोजेंगे।",
        "textBn": "সতর্কতার সাথে গণনা করবেন, পুনরায় পরীক্ষা করবেন এবং কোনো অমিল থাকলে কারণ খুঁজবেন।"
      }
    ],
    "categoryHi": "संख्यात्मक तर्क (Numerical Reasoning)",
    "categoryBn": "গাণিতিক যুক্তি (Numerical Reasoning)",
    "questionHi": "आपको अलग-अलग कीमतों वाली कई वस्तुओं की कुल लागत निकालनी है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে বিভিন্ন মূল্যের বেশ কয়েকটি পণ্যের মোট খরচ বের করতে হবে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 2,
    "sectionId": "aptitude",
    "category": "Logical Reasoning",
    "question": "A work process keeps giving the same mistake again and again. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Continue the work and fix the mistake each time.",
        "level": 2,
        "contributions": [
          {
            "trait": "logical_reasoning",
            "level": 2
          },
          {
            "trait": "routine_work",
            "level": 3
          }
        ],
        "textHi": "काम जारी रखेंगे और हर बार गलती को ठीक करते रहेंगे।",
        "textBn": "কাজ চালিয়ে যাবেন এবং প্রতিবার ভুলটি ঠিক করবেন।"
      },
      {
        "id": "b",
        "text": "Stop and try to find why the mistake keeps happening.",
        "level": 5,
        "contributions": [
          {
            "trait": "logical_reasoning",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 5
          },
          {
            "trait": "critical_thinking",
            "level": 5
          }
        ],
        "textHi": "रुकेंगे और यह जानने की कोशिश करेंगे कि गलती बार-बार क्यों हो रही है।",
        "textBn": "থামবেন এবং ভুলটি কেন বারবার হচ্ছে তা খুঁজে বের করার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone else to handle it.",
        "level": 1,
        "contributions": [
          {
            "trait": "logical_reasoning",
            "level": 1
          },
          {
            "trait": "responsibility",
            "level": 1
          }
        ],
        "textHi": "किसी और से इसे संभालने के लिए कहेंगे।",
        "textBn": "অন্য কাউকে এটি সামলাতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Check the steps one by one to find where the problem starts.",
        "level": 4,
        "contributions": [
          {
            "trait": "logical_reasoning",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 4
          },
          {
            "trait": "troubleshooting",
            "level": 4
          }
        ],
        "textHi": "शुरुआत कहाँ से हुई यह जानने के लिए चरणों की एक-एक करके जांच करेंगे।",
        "textBn": "সমস্যাটি কোথা থেকে শুরু হয়েছে তা জানতে একের পর এক ধাপ পরীক্ষা করবেন।"
      },
      {
        "id": "e",
        "text": "Follow the same process more carefully.",
        "level": 3,
        "contributions": [
          {
            "trait": "logical_reasoning",
            "level": 3
          },
          {
            "trait": "persistence",
            "level": 3
          }
        ],
        "textHi": "उसी प्रक्रिया का अधिक सावधानी से पालन करेंगे।",
        "textBn": "একই প্রক্রিয়া আরও সতর্কতার সাথে অনুসরণ করবেন।"
      }
    ],
    "categoryHi": "तार्किक तर्क (Logical Reasoning)",
    "categoryBn": "যৌক্তিক যুক্তি (Logical Reasoning)",
    "questionHi": "कार्य प्रक्रिया में बार-बार वही गलती हो रही है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "কাজের প্রক্রিয়ায় বারবার একই ভুল হচ্ছে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 3,
    "sectionId": "aptitude",
    "category": "Analytical Reasoning",
    "question": "You receive information from different people, and some of it does not match. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Use the information that seems most likely to be correct.",
        "level": 2,
        "contributions": [
          {
            "trait": "analytical_thinking",
            "level": 2
          },
          {
            "trait": "decision_making",
            "level": 2
          }
        ],
        "textHi": "जो जानकारी सबसे सही लगती है उसका उपयोग करेंगे।",
        "textBn": "যে তথ্যটি সবচেয়ে সঠিক মনে হয় তা ব্যবহার করবেন।"
      },
      {
        "id": "b",
        "text": "Ask someone else which information to use.",
        "level": 1,
        "contributions": [
          {
            "trait": "analytical_thinking",
            "level": 1
          },
          {
            "trait": "independent_working",
            "level": 1
          }
        ],
        "textHi": "किसी और से पूछेंगे कि कौन सी जानकारी उपयोग करनी चाहिए।",
        "textBn": "অন্য কাউকে জিজ্ঞাসা করবেন কোন তথ্য ব্যবহার করা উচিত।"
      },
      {
        "id": "c",
        "text": "Compare the information and check where the differences come from.",
        "level": 5,
        "contributions": [
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "critical_thinking",
            "level": 5
          },
          {
            "trait": "investigative",
            "level": 5
          }
        ],
        "textHi": "जानकारी की तुलना करेंगे और जांचेंगे कि अंतर कहाँ से आ रहा है।",
        "textBn": "তথ্যগুলি তুলনা করবেন এবং অমিলগুলি কোথা থেকে আসছে তা যাচাই করবেন।"
      },
      {
        "id": "d",
        "text": "Choose the information from the most trusted source.",
        "level": 3,
        "contributions": [
          {
            "trait": "analytical_thinking",
            "level": 3
          },
          {
            "trait": "decision_making",
            "level": 3
          }
        ],
        "textHi": "सबसे भरोसेमंद स्रोत से मिली जानकारी को चुनेंगे।",
        "textBn": "সবচেয়ে বিশ্বস্ত উৎসের তথ্য বেছে নেবেন।"
      },
      {
        "id": "e",
        "text": "Check the important points before making a decision.",
        "level": 4,
        "contributions": [
          {
            "trait": "analytical_thinking",
            "level": 4
          },
          {
            "trait": "decision_making",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "निर्णय लेने से पहले महत्वपूर्ण बिंदुओं की जांच करेंगे।",
        "textBn": "সিদ্ধান্ত নেওয়ার আগে গুরুত্বপূর্ণ বিষয়গুলি পরীক্ষা করবেন।"
      }
    ],
    "categoryHi": "विश्लेषणात्मक तर्क (Analytical Reasoning)",
    "categoryBn": "বিশ্লেষণাত্মক যুক্তি (Analytical Reasoning)",
    "questionHi": "आपको अलग-अलग लोगों से जानकारी मिलती है, और उसमें से कुछ मेल नहीं खाती। आप क्या करेंगे?",
    "questionBn": "আপনি বিভিন্ন ব্যক্তির কাছ থেকে তথ্য পান এবং তার কিছু অংশ মিলছে না। আপনি কী করবেন?"
  },
  {
    "id": 4,
    "sectionId": "aptitude",
    "category": "Verbal Reasoning",
    "question": "You read a short message, but one part is not clear. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Read it again and try to understand what it means.",
        "level": 3,
        "contributions": [
          {
            "trait": "verbal_reasoning",
            "level": 3
          },
          {
            "trait": "persistence",
            "level": 3
          }
        ],
        "textHi": "इसे फिर से पढ़ेंगे और समझने की कोशिश करेंगे कि इसका क्या अर्थ है।",
        "textBn": "এটি আবার পড়বেন এবং এর অর্থ বোঝার চেষ্টা করবেন।"
      },
      {
        "id": "b",
        "text": "Ignore the unclear part and continue.",
        "level": 1,
        "contributions": [
          {
            "trait": "verbal_reasoning",
            "level": 1
          },
          {
            "trait": "quality_orientation",
            "level": 1
          }
        ],
        "textHi": "अस्पष्ट हिस्से को अनदेखा करेंगे और आगे बढ़ेंगे।",
        "textBn": "অস্পষ্ট অংশটি উপেক্ষা করবেন এবং এগিয়ে যাবেন।"
      },
      {
        "id": "c",
        "text": "Ask for an explanation if the unclear part is important.",
        "level": 4,
        "contributions": [
          {
            "trait": "verbal_reasoning",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "यदि अस्पष्ट हिस्सा महत्वपूर्ण है तो स्पष्टीकरण मांगेंगे।",
        "textBn": "অস্পষ্ট অংশটি গুরুত্বপূর্ণ হলে ব্যাখ্যা চাইবেন।"
      },
      {
        "id": "d",
        "text": "Try to understand the meaning from the words around it.",
        "level": 5,
        "contributions": [
          {
            "trait": "verbal_reasoning",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          },
          {
            "trait": "reading_comprehension",
            "level": 5
          }
        ],
        "textHi": "आस-पास के शब्दों के संदर्भ से अर्थ समझने की कोशिश करेंगे।",
        "textBn": "আশেপাশের শব্দের প্রসঙ্গ থেকে অর্থ বোঝার চেষ্টা করবেন।"
      },
      {
        "id": "e",
        "text": "Guess what the person probably means.",
        "level": 2,
        "contributions": [
          {
            "trait": "verbal_reasoning",
            "level": 2
          }
        ],
        "textHi": "अनुमान लगाएंगे कि सामने वाला शायद क्या कहना चाहता है।",
        "textBn": "অনুমান করবেন যে ব্যক্তিটি সম্ভবত কী বোঝাতে চেয়েছেন।"
      }
    ],
    "categoryHi": "मौखिक तर्क (Verbal Reasoning)",
    "categoryBn": "মৌখিক যুক্তি (Verbal Reasoning)",
    "questionHi": "आप एक छोटा संदेश पढ़ते हैं, लेकिन एक हिस्सा स्पष्ट नहीं है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনি একটি ছোট বার্তা পড়েন, কিন্তু একটি অংশ স্পষ্ট নয়। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 5,
    "sectionId": "aptitude",
    "category": "Reading Comprehension",
    "question": "You read a page with a lot of information. You are asked to explain the main idea. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Remember a few points and give an answer.",
        "level": 2,
        "contributions": [
          {
            "trait": "reading_comprehension",
            "level": 2
          }
        ],
        "textHi": "कुछ बिंदु याद रखेंगे और उत्तर देंगे।",
        "textBn": "কয়েকটি বিষয় মনে রাখবেন এবং উত্তর দেবেন।"
      },
      {
        "id": "b",
        "text": "Read the full page again very carefully.",
        "level": 4,
        "contributions": [
          {
            "trait": "reading_comprehension",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "पूरा पृष्ठ बहुत ध्यान से दोबारा पढ़ेंगे।",
        "textBn": "পুরো পৃষ্ঠাটি আবার খুব মনোযোগ দিয়ে পড়বেন।"
      },
      {
        "id": "c",
        "text": "Pick the first important-looking point.",
        "level": 1,
        "contributions": [
          {
            "trait": "reading_comprehension",
            "level": 1
          }
        ],
        "textHi": "पहला महत्वपूर्ण दिखने वाला बिंदु चुन लेंगे।",
        "textBn": "প্রথম গুরুত্বপূর্ণ মনে হওয়া বিষয়টি বেছে নেবেন।"
      },
      {
        "id": "d",
        "text": "Look for the main message and connect it with the important points.",
        "level": 5,
        "contributions": [
          {
            "trait": "reading_comprehension",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "मुख्य संदेश की पहचान करेंगे और उसे महत्वपूर्ण बिंदुओं से जोड़ेंगे।",
        "textBn": "মূল বার্তাটি খুঁজবেন এবং গুরুত্বপূর্ণ বিষয়গুলির সাথে যুক্ত করবেন।"
      },
      {
        "id": "e",
        "text": "Read the important parts and then explain what you understood.",
        "level": 3,
        "contributions": [
          {
            "trait": "reading_comprehension",
            "level": 3
          },
          {
            "trait": "verbal_reasoning",
            "level": 3
          }
        ],
        "textHi": "महत्वपूर्ण हिस्सों को पढ़ेंगे और फिर जो समझा उसे समझाएंगे।",
        "textBn": "গুরুত্বপূর্ণ অংশগুলি পড়বেন এবং যা বুঝেছেন তা ব্যাখ্যা করবেন।"
      }
    ],
    "categoryHi": "पठन बोध (Reading Comprehension)",
    "categoryBn": "পাঠ অনুধাবন (Reading Comprehension)",
    "questionHi": "आप बहुत सारी जानकारी वाला एक पृष्ठ पढ़ते हैं। आपसे मुख्य विचार समझाने के लिए कहा जाता है। आप क्या करेंगे?",
    "questionBn": "আপনি প্রচুর তথ্য সম্বলিত একটি পৃষ্ঠা পড়েন। আপনাকে মূল ভাবটি ব্যাখ্যা করতে বলা হয়েছে। আপনি কী করবেন?"
  },
  {
    "id": 6,
    "sectionId": "aptitude",
    "category": "Spatial Reasoning",
    "question": "You are given a picture of an object and need to imagine how it would look after being turned around. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Try to imagine the object from different sides.",
        "level": 4,
        "contributions": [
          {
            "trait": "spatial_reasoning",
            "level": 4
          },
          {
            "trait": "visual_thinking",
            "level": 4
          }
        ],
        "textHi": "वस्तु को अलग-अलग दिशाओं से देखने की कल्पना करेंगे।",
        "textBn": "বস্তুটিকে বিভিন্ন দিক থেকে দেখার কল্পনা করার চেষ্টা করবেন।"
      },
      {
        "id": "b",
        "text": "Guess the answer.",
        "level": 1,
        "contributions": [
          {
            "trait": "spatial_reasoning",
            "level": 1
          }
        ],
        "textHi": "उत्तर का केवल अनुमान लगाएंगे।",
        "textBn": "উত্তরের অনুমান করবেন।"
      },
      {
        "id": "c",
        "text": "Look at the shape and slowly imagine how each part moves.",
        "level": 5,
        "contributions": [
          {
            "trait": "spatial_reasoning",
            "level": 5
          },
          {
            "trait": "visual_thinking",
            "level": 5
          },
          {
            "trait": "structured_work",
            "level": 4
          }
        ],
        "textHi": "आकार को देखेंगे और धीरे-धीरे कल्पना करेंगे कि प्रत्येक भाग कैसे घूमता है।",
        "textBn": "আকৃতিটি দেখবেন এবং ধীরে ধীরে প্রতিটি অংশ কীভাবে ঘুরে তা কল্পনা করবেন।"
      },
      {
        "id": "d",
        "text": "Choose the position that looks most similar.",
        "level": 2,
        "contributions": [
          {
            "trait": "spatial_reasoning",
            "level": 2
          }
        ],
        "textHi": "वह स्थिति चुनेंगे जो सबसे अधिक मिलती-जुलती दिखती है।",
        "textBn": "যে অবস্থানটি সবচেয়ে সাদৃশ্যপূর্ণ দেখায় সেটি বেছে নেবেন।"
      },
      {
        "id": "e",
        "text": "Think about the object turning and then choose an answer.",
        "level": 3,
        "contributions": [
          {
            "trait": "spatial_reasoning",
            "level": 3
          }
        ],
        "textHi": "वस्तु के घूमने के बारे में सोचेंगे और फिर उत्तर चुनेंगे।",
        "textBn": "বস্তুটি ঘোরার কথা চিন্তা করবেন এবং তারপর একটি উত্তর বেছে নেবেন।"
      }
    ],
    "categoryHi": "स्थानिक तर्क (Spatial Reasoning)",
    "categoryBn": "স্থানিক যুক্তি (Spatial Reasoning)",
    "questionHi": "आपको किसी वस्तु का चित्र दिया गया है और कल्पना करनी है कि घुमाने के बाद वह कैसी दिखेगी। आप क्या करेंगे?",
    "questionBn": "আপনাকে একটি বস্তুর ছবি দেওয়া হয়েছে এবং ঘোরানোর পর সেটি কেমন দেখাবে তা কল্পনা করতে হবে। আপনি কী করবেন?"
  },
  {
    "id": 7,
    "sectionId": "aptitude",
    "category": "Pattern Recognition",
    "question": "You notice that something follows a pattern: 2, 4, 6, 8, __. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Look at how the numbers change and find the next one.",
        "level": 4,
        "contributions": [
          {
            "trait": "pattern_recognition",
            "level": 4
          },
          {
            "trait": "numerical_reasoning",
            "level": 4
          }
        ],
        "textHi": "देखेंगे कि संख्याएँ कैसे बदल रही हैं और अगली संख्या खोजेंगे।",
        "textBn": "সংখ্যাগুলি কীভাবে পরিবর্তিত হচ্ছে তা দেখে পরবর্তী সংখ্যাটি বের করবেন।"
      },
      {
        "id": "b",
        "text": "Pick a number that seems possible.",
        "level": 1,
        "contributions": [
          {
            "trait": "pattern_recognition",
            "level": 1
          }
        ],
        "textHi": "कोई ऐसी संख्या चुनेंगे जो संभावित लगती हो।",
        "textBn": "সম্ভাব্য মনে হয় এমন একটি সংখ্যা বেছে নেবেন।"
      },
      {
        "id": "c",
        "text": "Check the difference between the numbers before choosing.",
        "level": 3,
        "contributions": [
          {
            "trait": "pattern_recognition",
            "level": 3
          },
          {
            "trait": "logical_reasoning",
            "level": 3
          }
        ],
        "textHi": "चुनने से पहले संख्याओं के बीच के अंतर की जांच करेंगे।",
        "textBn": "বেছে নেওয়ার আগে সংখ্যাগুলির মধ্যকার পার্থক্য যাচাই করবেন।"
      },
      {
        "id": "d",
        "text": "Try different possible patterns until you find one that fits all the numbers.",
        "level": 5,
        "contributions": [
          {
            "trait": "pattern_recognition",
            "level": 5
          },
          {
            "trait": "investigative",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 5
          }
        ],
        "textHi": "विभिन्न संभावित पैटर्नों को तब तक आजमाएंगे जब तक कि सभी संख्याओं पर सटीक बैठने वाला पैटर्न न मिल जाए।",
        "textBn": "যতক্ষণ না সব সংখ্যার সাথে মেলে এমন একটি প্যাটার্ন পাওয়া যায় ততক্ষণ বিভিন্ন সম্ভাবনা খতিয়ে দেখবেন।"
      },
      {
        "id": "e",
        "text": "Use the most simple pattern you can see.",
        "level": 2,
        "contributions": [
          {
            "trait": "pattern_recognition",
            "level": 2
          }
        ],
        "textHi": "जो सबसे सरल पैटर्न दिखता है उसका उपयोग करेंगे।",
        "textBn": "সবচেয়ে সহজ যে প্যাটার্নটি দেখতে পাচ্ছেন তা ব্যবহার করবেন।"
      }
    ],
    "categoryHi": "पैटर्न पहचान (Pattern Recognition)",
    "categoryBn": "প্যাটার্ন শনাক্তকরণ (Pattern Recognition)",
    "questionHi": "आप देखते हैं कि कुछ एक पैटर्न का पालन कर रहा है: 2, 4, 6, 8, __। आप क्या करेंगे?",
    "questionBn": "আপনি লক্ষ্য করলেন যে কিছু একটি প্যাটার্ন অনুসরণ করছে: ২, ৪, ৬, ৮, __। আপনি কী করবেন?"
  },
  {
    "id": 8,
    "sectionId": "aptitude",
    "category": "Critical Thinking",
    "question": "Someone tells you that a new way of working is much better. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Believe it because the person says so.",
        "level": 1,
        "contributions": [
          {
            "trait": "critical_thinking",
            "level": 1
          }
        ],
        "textHi": "उस पर विश्वास कर लेंगे क्योंकि सामने वाले ने ऐसा कहा है।",
        "textBn": "বিশ্বাস করে নেবেন কারণ সেই ব্যক্তিটি তাই বলেছেন।"
      },
      {
        "id": "b",
        "text": "Try the new way and see what happens.",
        "level": 3,
        "contributions": [
          {
            "trait": "critical_thinking",
            "level": 3
          },
          {
            "trait": "adaptability",
            "level": 3
          }
        ],
        "textHi": "नया तरीका आजमाकर देखेंगे कि क्या परिणाम आता है।",
        "textBn": "নতুন পদ্ধতিটি চেষ্টা করে দেখবেন কী ঘটে।"
      },
      {
        "id": "c",
        "text": "Ask why it is better and look at the results before deciding.",
        "level": 5,
        "contributions": [
          {
            "trait": "critical_thinking",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "decision_making",
            "level": 4
          }
        ],
        "textHi": "पूछेंगे कि यह बेहतर क्यों है और निर्णय लेने से पहले परिणामों का विश्लेषण करेंगे।",
        "textBn": "জানতে চাইবেন কেন এটি ভালো এবং সিদ্ধান্ত নেওয়ার আগে ফলাফলগুলি খতিয়ে দেখবেন।"
      },
      {
        "id": "d",
        "text": "Compare the old and new ways before choosing.",
        "level": 4,
        "contributions": [
          {
            "trait": "critical_thinking",
            "level": 4
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "चुनने से पहले पुराने और नए तरीकों की तुलना करेंगे।",
        "textBn": "বেছে নেওয়ার আগে পুরোনো এবং নতুন পদ্ধতির তুলনা করবেন।"
      },
      {
        "id": "e",
        "text": "Follow it if other people are already using it.",
        "level": 2,
        "contributions": [
          {
            "trait": "critical_thinking",
            "level": 2
          }
        ],
        "textHi": "यदि अन्य लोग पहले से इसका उपयोग कर रहे हैं तो इसे अपनाएंगे।",
        "textBn": "অন্যান্য লোকেরা ইতিমধ্যে এটি ব্যবহার করলে তা অনুসরণ করবেন।"
      }
    ],
    "categoryHi": "महत्वपूर्ण सोच (Critical Thinking)",
    "categoryBn": "সমালোচনামূলক চিন্তাভাবনা (Critical Thinking)",
    "questionHi": "कोई आपसे कहता है कि काम करने का एक नया तरीका बहुत बेहतर है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "কেউ আপনাকে বলল যে কাজ করার একটি নতুন পদ্ধতি অনেক বেশি ভালো। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 9,
    "sectionId": "aptitude",
    "category": "Problem Solving",
    "question": "You are given a task, but the usual way of doing it is not working. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Keep trying the same way.",
        "level": 2,
        "contributions": [
          {
            "trait": "problem_solving",
            "level": 2
          },
          {
            "trait": "routine_work",
            "level": 3
          }
        ],
        "textHi": "उसी तरीके से कोशिश करते रहेंगे।",
        "textBn": "একই পদ্ধতিতে চেষ্টা চালিয়ে যাবেন।"
      },
      {
        "id": "b",
        "text": "Stop and wait for someone to solve it.",
        "level": 1,
        "contributions": [
          {
            "trait": "problem_solving",
            "level": 1
          },
          {
            "trait": "independent_working",
            "level": 1
          }
        ],
        "textHi": "रुक जाएंगे और किसी के समाधान करने की प्रतीक्षा करेंगे।",
        "textBn": "থেমে যাবেন এবং কারো সমাধানের জন্য অপেক্ষা করবেন।"
      },
      {
        "id": "c",
        "text": "Try another way and see if it works.",
        "level": 3,
        "contributions": [
          {
            "trait": "problem_solving",
            "level": 3
          },
          {
            "trait": "adaptability",
            "level": 3
          }
        ],
        "textHi": "कोई दूसरा तरीका आजमाएंगे और देखेंगे कि क्या वह काम करता है।",
        "textBn": "অন্য কোনো উপায় চেষ্টা করে দেখবেন তা কাজ করে কিনা।"
      },
      {
        "id": "d",
        "text": "Understand the problem first and then try different ways to solve it.",
        "level": 5,
        "contributions": [
          {
            "trait": "problem_solving",
            "level": 5
          },
          {
            "trait": "critical_thinking",
            "level": 5
          },
          {
            "trait": "creativity",
            "level": 4
          }
        ],
        "textHi": "पहले समस्या को समझेंगे और फिर इसे हल करने के विभिन्न तरीके आजमाएंगे।",
        "textBn": "প্রথমে সমস্যাটি বুঝবেন এবং তারপর সমাধানের বিভিন্ন উপায় চেষ্টা করবেন।"
      },
      {
        "id": "e",
        "text": "Break the problem into smaller parts and solve them one by one.",
        "level": 4,
        "contributions": [
          {
            "trait": "problem_solving",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "समस्या को छोटे-छोटे हिस्सों में बांटेंगे और उन्हें एक-एक करके हल करेंगे।",
        "textBn": "সমস্যাটিকে ছোট ছোট অংশে ভাগ করবেন এবং একটির পর একটি সমাধান করবেন।"
      }
    ],
    "categoryHi": "समस्या समाधान (Problem Solving)",
    "categoryBn": "সমস্যা সমাধান (Problem Solving)",
    "questionHi": "आपको एक कार्य दिया गया है, लेकिन इसे करने का सामान्य तरीका काम नहीं कर रहा है। आप क्या करेंगे?",
    "questionBn": "আপনাকে একটি কাজ দেওয়া হয়েছে, কিন্তু এটি করার স্বাভাবিক পদ্ধতি কাজ করছে না। আপনি কী করবেন?"
  },
  {
    "id": 10,
    "sectionId": "aptitude",
    "category": "Decision Making",
    "question": "You have to make a decision, but you do not have all the information you want. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Wait until someone tells you what to do.",
        "level": 1,
        "contributions": [
          {
            "trait": "decision_making",
            "level": 1
          },
          {
            "trait": "leadership",
            "level": 1
          }
        ],
        "textHi": "तब तक प्रतीक्षा करेंगे जब तक कोई आपको न बताए कि क्या करना है।",
        "textBn": "কেউ কী করতে হবে তা না বলা পর্যন্ত অপেক্ষা করবেন।"
      },
      {
        "id": "b",
        "text": "Use the information you have and make a simple decision.",
        "level": 3,
        "contributions": [
          {
            "trait": "decision_making",
            "level": 3
          },
          {
            "trait": "speed",
            "level": 3
          }
        ],
        "textHi": "उपलब्ध जानकारी का उपयोग करेंगे और एक सीधा निर्णय लेंगे।",
        "textBn": "হাতে থাকা তথ্য ব্যবহার করে একটি সহজ সিদ্ধান্ত নেবেন।"
      },
      {
        "id": "c",
        "text": "Quickly choose the option that feels right.",
        "level": 2,
        "contributions": [
          {
            "trait": "decision_making",
            "level": 2
          }
        ],
        "textHi": "जल्दी से वह विकल्प चुनेंगे जो सही महसूस हो।",
        "textBn": "দ্রুত সেই বিকল্পটি বেছে নেবেন যা সঠিক মনে হয়।"
      },
      {
        "id": "d",
        "text": "Check the important information, think about the possible results, and then decide.",
        "level": 5,
        "contributions": [
          {
            "trait": "decision_making",
            "level": 5
          },
          {
            "trait": "strategic_thinking",
            "level": 5
          },
          {
            "trait": "risk_management",
            "level": 4
          }
        ],
        "textHi": "महत्वपूर्ण जानकारी की जांच करेंगे, संभावित परिणामों पर विचार करेंगे और फिर निर्णय लेंगे।",
        "textBn": "গুরুত্বপূর্ণ তথ্য পরীক্ষা করবেন, সম্ভাব্য ফলাফল বিবেচনা করবেন এবং তারপর সিদ্ধান্ত নেবেন।"
      },
      {
        "id": "e",
        "text": "Compare the available choices before deciding.",
        "level": 4,
        "contributions": [
          {
            "trait": "decision_making",
            "level": 4
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "निर्णय लेने से पहले उपलब्ध विकल्पों की तुलना करेंगे।",
        "textBn": "সিদ্ধান্ত নেওয়ার আগে উপলব্ধ বিকল্পগুলির তুলনা করবেন।"
      }
    ],
    "categoryHi": "निर्णय लेना (Decision Making)",
    "categoryBn": "সিদ্ধান্ত গ্রহণ (Decision Making)",
    "questionHi": "आपको एक निर्णय लेना है, लेकिन आपके पास पूरी वांछित जानकारी नहीं है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে একটি সিদ্ধান্ত নিতে হবে, কিন্তু আপনার কাছে প্রয়োজনীয় সব তথ্য নেই। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 11,
    "sectionId": "personality",
    "category": "Self-Confidence",
    "question": "You are asked to do something you have never done before. What would you most likely think?",
    "options": [
      {
        "id": "a",
        "text": "“I may not know it yet, but I can learn and try.”",
        "level": 5,
        "contributions": [
          {
            "trait": "self_confidence",
            "level": 5
          },
          {
            "trait": "adaptability",
            "level": 5
          },
          {
            "trait": "growth_mindset",
            "level": 5
          }
        ],
        "textHi": "“हो सकता है कि मैं इसे अभी न जानूँ, लेकिन मैं सीख सकता हूँ और प्रयास कर सकता हूँ।”",
        "textBn": "“আমি হয়তো এটি এখনও জানি না, তবে আমি শিখতে পারি এবং চেষ্টা করতে পারি।”"
      },
      {
        "id": "b",
        "text": "“I should avoid it because I may make a mistake.”",
        "level": 1,
        "contributions": [
          {
            "trait": "self_confidence",
            "level": 1
          },
          {
            "trait": "risk_tolerance",
            "level": 1
          }
        ],
        "textHi": "“मुझे इससे बचना चाहिए क्योंकि मुझसे गलती हो सकती है।”",
        "textBn": "“আমার এটি এড়ানো উচিত কারণ আমার ভুল হতে পারে।”"
      },
      {
        "id": "c",
        "text": "“I will try if someone helps me.”",
        "level": 3,
        "contributions": [
          {
            "trait": "self_confidence",
            "level": 3
          },
          {
            "trait": "teamwork",
            "level": 4
          }
        ],
        "textHi": "“यदि कोई मेरी मदद करे तो मैं कोशिश करूँगा।”",
        "textBn": "“কেউ সাহায্য করলে আমি চেষ্টা করব।”"
      },
      {
        "id": "d",
        "text": "“I am not sure, but I will give it a try.”",
        "level": 4,
        "contributions": [
          {
            "trait": "self_confidence",
            "level": 4
          },
          {
            "trait": "persistence",
            "level": 4
          }
        ],
        "textHi": "“मुझे पूरा भरोसा नहीं है, लेकिन मैं एक बार प्रयास अवश्य करूँगा।”",
        "textBn": "“আমি নিশ্চিত নই, তবে আমি একবার চেষ্টা করে দেখব।”"
      },
      {
        "id": "e",
        "text": "“Someone else can probably do it better than me.”",
        "level": 2,
        "contributions": [
          {
            "trait": "self_confidence",
            "level": 2
          }
        ],
        "textHi": "“शायद कोई अन्य व्यक्ति मुझसे बेहतर कर सकता है।”",
        "textBn": "“অন্য কেউ সম্ভবত আমার চেয়ে এটি ভালো করতে পারে।”"
      }
    ],
    "categoryHi": "आत्मविश्वास (Self-Confidence)",
    "categoryBn": "আত্মবিশ্বাস (Self-Confidence)",
    "questionHi": "आपसे कुछ ऐसा करने के लिए कहा जाता है जो आपने पहले कभी नहीं किया है। आप सबसे अधिक क्या सोचेंगे?",
    "questionBn": "আপনাকে এমন কিছু করতে বলা হয়েছে যা আপনি আগে কখনও করেননি। আপনি সবচেয়ে বেশি কী ভাববেন?"
  },
  {
    "id": 12,
    "sectionId": "personality",
    "category": "Responsibility",
    "question": "You make a mistake at work. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Stay quiet and hope nobody notices.",
        "level": 1,
        "contributions": [
          {
            "trait": "responsibility",
            "level": 1
          },
          {
            "trait": "integrity",
            "level": 1
          }
        ],
        "textHi": "शांत रहेंगे और उम्मीद करेंगे कि किसी का ध्यान न जाए।",
        "textBn": "চুপ থাকবেন এবং আশা করবেন যেন কেউ খেয়াল না করে।"
      },
      {
        "id": "b",
        "text": "Tell the right person and try to correct it.",
        "level": 4,
        "contributions": [
          {
            "trait": "responsibility",
            "level": 4
          },
          {
            "trait": "integrity",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "संबंधित व्यक्ति को बताएंगे और इसे ठीक करने का प्रयास करेंगे।",
        "textBn": "সঠিক ব্যক্তিকে জানাবেন এবং তা সংশোধন করার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Correct it if you can without telling anyone.",
        "level": 3,
        "contributions": [
          {
            "trait": "responsibility",
            "level": 3
          },
          {
            "trait": "problem_solving",
            "level": 3
          }
        ],
        "textHi": "यदि संभव हो तो किसी को बताए बिना इसे ठीक कर देंगे।",
        "textBn": "কাউকে না জানিয়ে পারলে নিজেই তা ঠিক করে দেবেন।"
      },
      {
        "id": "d",
        "text": "Tell the person responsible, fix the mistake, and think about how to avoid it next time.",
        "level": 5,
        "contributions": [
          {
            "trait": "responsibility",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          },
          {
            "trait": "leadership",
            "level": 4
          }
        ],
        "textHi": "जिम्मेदार व्यक्ति को सूचित करेंगे, गलती सुधारेंगे, और विचार करेंगे कि अगली बार इससे कैसे बचा जाए।",
        "textBn": "দায়িত্বপ্রাপ্ত ব্যক্তিকে জানাবেন, ভুলটি সংশোধন করবেন এবং ভবিষ্যতে কীভাবে এটি এড়ানো যায় তা ভাববেন।"
      },
      {
        "id": "e",
        "text": "Wait to see if someone else finds the mistake.",
        "level": 2,
        "contributions": [
          {
            "trait": "responsibility",
            "level": 2
          }
        ],
        "textHi": "देखेंगे कि क्या कोई दूसरा व्यक्ति गलती पकड़ पाता है।",
        "textBn": "অপেক্ষা করবেন অন্য কেউ ভুলটি ধরতে পারে কিনা তা দেখার জন্য।"
      }
    ],
    "categoryHi": "ज़िम्मेदारी (Responsibility)",
    "categoryBn": "দায়িত্বশীলতা (Responsibility)",
    "questionHi": "काम के दौरान आपसे कोई गलती हो जाती है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "কাজের সময় আপনার কোনো ভুল হয়ে গেছে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 13,
    "sectionId": "personality",
    "category": "Patience",
    "question": "You are working with someone who takes more time than you expected. How do you usually react?",
    "options": [
      {
        "id": "a",
        "text": "Get annoyed and try to finish the work yourself.",
        "level": 2,
        "contributions": [
          {
            "trait": "patience",
            "level": 2
          },
          {
            "trait": "independent_working",
            "level": 4
          }
        ],
        "textHi": "झुंझला जाएंगे और काम खुद पूरा करने की कोशिश करेंगे।",
        "textBn": "বিরক্ত হবেন এবং নিজেই কাজটি শেষ করার চেষ্টা করবেন।"
      },
      {
        "id": "b",
        "text": "Give the person some time and help when needed.",
        "level": 4,
        "contributions": [
          {
            "trait": "patience",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "सामने वाले को थोड़ा समय देंगे और ज़रूरत पड़ने पर मदद करेंगे।",
        "textBn": "সেই ব্যক্তিকে কিছুটা সময় দেবেন এবং প্রয়োজন হলে সাহায্য করবেন।"
      },
      {
        "id": "c",
        "text": "Feel very uncomfortable when things move slowly.",
        "level": 1,
        "contributions": [
          {
            "trait": "patience",
            "level": 1
          }
        ],
        "textHi": "जब काम धीमी गति से होता है तो बहुत असहज महसूस करेंगे।",
        "textBn": "কাজ ধীরগতিতে চললে খুব অস্বস্তি বোধ করবেন।"
      },
      {
        "id": "d",
        "text": "Stay calm, understand their situation, and give them enough time.",
        "level": 5,
        "contributions": [
          {
            "trait": "patience",
            "level": 5
          },
          {
            "trait": "empathy",
            "level": 5
          },
          {
            "trait": "emotional_intelligence",
            "level": 5
          }
        ],
        "textHi": "शांत रहेंगे, उनकी स्थिति को समझेंगे और उन्हें पर्याप्त समय देंगे।",
        "textBn": "শান্ত থাকবেন, তাদের পরিস্থিতি বুঝবেন এবং তাদের পর্যাপ্ত সময় দেবেন।"
      },
      {
        "id": "e",
        "text": "Wait, but become a little impatient.",
        "level": 3,
        "contributions": [
          {
            "trait": "patience",
            "level": 3
          }
        ],
        "textHi": "प्रतीक्षा करेंगे, लेकिन थोड़े अधीर हो जाएंगे।",
        "textBn": "অপেক্ষা করবেন, তবে কিছুটা অধৈর্য হয়ে উঠবেন।"
      }
    ],
    "categoryHi": "धैर्य (Patience)",
    "categoryBn": "ধৈর্য (Patience)",
    "questionHi": "आप किसी ऐसे व्यक्ति के साथ काम कर रहे हैं जो आपकी अपेक्षा से अधिक समय लेता है। आपकी सामान्य प्रतिक्रिया क्या होती है?",
    "questionBn": "আপনি এমন একজনের সাথে কাজ করছেন যিনি আপনার প্রত্যাশার চেয়ে বেশি সময় নিচ্ছেন। আপনি সাধারণত কীভাবে প্রতিক্রিয়া জানান?"
  },
  {
    "id": 14,
    "sectionId": "personality",
    "category": "Adaptability",
    "question": "Your workplace suddenly changes the way a task is done. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Find it difficult and prefer the old way.",
        "level": 2,
        "contributions": [
          {
            "trait": "adaptability",
            "level": 2
          },
          {
            "trait": "routine_work",
            "level": 4
          }
        ],
        "textHi": "इसे कठिन पाएंगे और पुराने तरीके को प्राथमिकता देंगे।",
        "textBn": "এটি কঠিন মনে করবেন এবং পুরোনো পদ্ধতি পছন্দ করবেন।"
      },
      {
        "id": "b",
        "text": "Refuse to change unless someone makes you.",
        "level": 1,
        "contributions": [
          {
            "trait": "adaptability",
            "level": 1
          }
        ],
        "textHi": "जब तक कोई मजबूर न करे तब तक बदलाव से इनकार करेंगे।",
        "textBn": "বাধ্য না করা পর্যন্ত পরিবর্তন মেনে নিতে অস্বীকার করবেন।"
      },
      {
        "id": "c",
        "text": "Learn the new way and slowly get used to it.",
        "level": 4,
        "contributions": [
          {
            "trait": "adaptability",
            "level": 4
          },
          {
            "trait": "persistence",
            "level": 4
          }
        ],
        "textHi": "नया तरीका सीखेंगे और धीरे-धीरे इसके अभ्यस्त हो जाएंगे।",
        "textBn": "নতুন পদ্ধতি শিখবেন এবং ধীরে ধীরে এতে অভ্যস্ত হবেন।"
      },
      {
        "id": "d",
        "text": "Ask questions, learn the new way, and adjust quickly.",
        "level": 5,
        "contributions": [
          {
            "trait": "adaptability",
            "level": 5
          },
          {
            "trait": "growth_mindset",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "सवाल पूछेंगे, नया तरीका अच्छी तरह सीखेंगे और तेजी से तालमेल बिठाएंगे।",
        "textBn": "প্রশ্ন করবেন, নতুন পদ্ধতি শিখবেন এবং দ্রুত মানিয়ে নেবেন।"
      },
      {
        "id": "e",
        "text": "Follow the new way even if you do not fully understand it yet.",
        "level": 3,
        "contributions": [
          {
            "trait": "adaptability",
            "level": 3
          }
        ],
        "textHi": "नए तरीके का पालन करेंगे भले ही अभी पूरी तरह समझ न आया हो।",
        "textBn": "নতুন পদ্ধতি অনুসরণ করবেন যদিও এখনও পুরোপুরি বুঝতে পারেননি।"
      }
    ],
    "categoryHi": "अनुकूलनशीलता (Adaptability)",
    "categoryBn": "মানিয়ে নেওয়ার ক্ষমতা (Adaptability)",
    "questionHi": "आपके कार्यस्थल पर अचानक किसी कार्य को करने का तरीका बदल दिया जाता है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনার কর্মক্ষেত্রে হঠাৎ একটি কাজ করার পদ্ধতি পরিবর্তন করা হলো। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 15,
    "sectionId": "personality",
    "category": "Creativity",
    "question": "You are asked to improve something that people use every day. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Keep it the same because it already works.",
        "level": 2,
        "contributions": [
          {
            "trait": "creativity",
            "level": 2
          },
          {
            "trait": "routine_work",
            "level": 4
          }
        ],
        "textHi": "इसे वैसा ही रहने देंगे क्योंकि यह पहले से काम कर रहा है।",
        "textBn": "এটি একই রকম রাখবেন কারণ এটি ইতিমধ্যেই কাজ করছে।"
      },
      {
        "id": "b",
        "text": "Try to think of a new and better way to use or design it.",
        "level": 5,
        "contributions": [
          {
            "trait": "creativity",
            "level": 5
          },
          {
            "trait": "design_thinking",
            "level": 5
          },
          {
            "trait": "innovation",
            "level": 5
          }
        ],
        "textHi": "इसके उपयोग या डिज़ाइन का एक नया और बेहतर तरीका सोचने की कोशिश करेंगे।",
        "textBn": "এটি ব্যবহার বা ডিজাইনের একটি নতুন এবং উন্নত উপায় চিন্তা করার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Copy a solution that already works somewhere else.",
        "level": 3,
        "contributions": [
          {
            "trait": "creativity",
            "level": 3
          },
          {
            "trait": "practicality",
            "level": 4
          }
        ],
        "textHi": "किसी अन्य जगह पहले से काम कर रहे समाधान की नकल करेंगे।",
        "textBn": "অন্য কোথাও সফল হওয়া একটি সমাধানের অনুকরণ করবেন।"
      },
      {
        "id": "d",
        "text": "Wait for someone else to give an idea.",
        "level": 1,
        "contributions": [
          {
            "trait": "creativity",
            "level": 1
          }
        ],
        "textHi": "किसी अन्य व्यक्ति के विचार देने की प्रतीक्षा करेंगे।",
        "textBn": "অন্য কেউ কোনো ধারণা দেওয়ার জন্য অপেক্ষা করবেন।"
      },
      {
        "id": "e",
        "text": "Make a few changes and see whether they improve it.",
        "level": 4,
        "contributions": [
          {
            "trait": "creativity",
            "level": 4
          },
          {
            "trait": "experimentation",
            "level": 4
          }
        ],
        "textHi": "कुछ छोटे बदलाव करेंगे और देखेंगे कि क्या उनसे सुधार होता है।",
        "textBn": "কয়েকটি পরিবর্তন করবেন এবং দেখবেন যে সেগুলি উন্নতি করছে কিনা।"
      }
    ],
    "categoryHi": "रचनात्मकता (Creativity)",
    "categoryBn": "সৃজনশীলতা (Creativity)",
    "questionHi": "आपसे किसी ऐसी वस्तु में सुधार करने के लिए कहा जाता है जिसे लोग हर दिन इस्तेमाल करते हैं। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে এমন কিছু উন্নত করতে বলা হলো যা মানুষ প্রতিদিন ব্যবহার করে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 16,
    "sectionId": "personality",
    "category": "Persistence",
    "question": "You try something several times but still cannot do it correctly. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Stop because it is not working.",
        "level": 1,
        "contributions": [
          {
            "trait": "persistence",
            "level": 1
          }
        ],
        "textHi": "रुक जाएंगे क्योंकि यह काम नहीं कर रहा है।",
        "textBn": "থামবেন কারণ এটি কাজ করছে না।"
      },
      {
        "id": "b",
        "text": "Try again after taking a short break.",
        "level": 3,
        "contributions": [
          {
            "trait": "persistence",
            "level": 3
          },
          {
            "trait": "stress_management",
            "level": 4
          }
        ],
        "textHi": "थोड़ा विराम लेने के बाद फिर से प्रयास करेंगे।",
        "textBn": "একটি সংক্ষিপ্ত বিরতি নেওয়ার পর আবার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone to do it for you.",
        "level": 2,
        "contributions": [
          {
            "trait": "persistence",
            "level": 2
          }
        ],
        "textHi": "किसी और से अपने लिए इसे करने को कहेंगे।",
        "textBn": "অন্য কাউকে এটি করে দেওয়ার জন্য বলবেন।"
      },
      {
        "id": "d",
        "text": "Keep trying, learn from the mistakes, and change your method if needed.",
        "level": 5,
        "contributions": [
          {
            "trait": "persistence",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 5
          },
          {
            "trait": "growth_mindset",
            "level": 5
          }
        ],
        "textHi": "प्रयास जारी रखेंगे, गलतियों से सीखेंगे और ज़रूरत पड़ने पर अपनी कार्यप्रणाली बदलेंगे।",
        "textBn": "চেষ্টা চালিয়ে যাবেন, ভুল থেকে শিখবেন এবং প্রয়োজন হলে কাজের পদ্ধতি পরিবর্তন করবেন।"
      },
      {
        "id": "e",
        "text": "Try several more times and ask for help if necessary.",
        "level": 4,
        "contributions": [
          {
            "trait": "persistence",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          }
        ],
        "textHi": "कुछ और बार प्रयास करेंगे और आवश्यक होने पर सहायता मांगेंगे।",
        "textBn": "আরও কয়েকবার চেষ্টা করবেন এবং প্রয়োজনে সাহায্য চাইবেন।"
      }
    ],
    "categoryHi": "दृढ़ता (Persistence)",
    "categoryBn": "অধ্যবসায় (Persistence)",
    "questionHi": "आप कई बार प्रयास करते हैं लेकिन फिर भी इसे सही ढंग से नहीं कर पाते। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনি বেশ কয়েকবার চেষ্টা করেছেন কিন্তু তবুও সঠিকভাবে করতে পারছেন না। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 17,
    "sectionId": "personality",
    "category": "Leadership",
    "question": "A group is working on a task, but nobody is taking the lead. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Wait for someone else to take charge.",
        "level": 1,
        "contributions": [
          {
            "trait": "leadership",
            "level": 1
          }
        ],
        "textHi": "किसी और के ज़िम्मेदारी संभालने की प्रतीक्षा करेंगे।",
        "textBn": "অন্য কেউ দায়িত্ব নেওয়ার জন্য অপেক্ষা করবেন।"
      },
      {
        "id": "b",
        "text": "Take the lead, divide the work, and help the group move forward.",
        "level": 5,
        "contributions": [
          {
            "trait": "leadership",
            "level": 5
          },
          {
            "trait": "team_coordination",
            "level": 5
          },
          {
            "trait": "target_orientation",
            "level": 5
          }
        ],
        "textHi": "आगे बढ़कर नेतृत्व करेंगे, काम का विभाजन करेंगे और समूह को आगे बढ़ने में मदद करेंगे।",
        "textBn": "নেতৃত্ব গ্রহণ করবেন, কাজ ভাগ করে দেবেন এবং দলকে এগিয়ে যেতে সাহায্য করবেন।"
      },
      {
        "id": "c",
        "text": "Help the group but let someone else make the main decisions.",
        "level": 3,
        "contributions": [
          {
            "trait": "leadership",
            "level": 3
          },
          {
            "trait": "teamwork",
            "level": 4
          }
        ],
        "textHi": "समूह की सहायता करेंगे लेकिन मुख्य निर्णय किसी और को लेने देंगे।",
        "textBn": "দলকে সাহায্য করবেন তবে প্রধান সিদ্ধান্ত অন্য কাউকে নিতে দেবেন।"
      },
      {
        "id": "d",
        "text": "Suggest a plan and encourage others to take part.",
        "level": 4,
        "contributions": [
          {
            "trait": "leadership",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          }
        ],
        "textHi": "एक योजना का सुझाव देंगे और दूसरों को भाग लेने के लिए प्रोत्साहित करेंगे।",
        "textBn": "একটি পরিকল্পনার প্রস্তাব দেবেন এবং অন্যদের অংশ নিতে উৎসাহিত করবেন।"
      },
      {
        "id": "e",
        "text": "Do your own part and let the others manage theirs.",
        "level": 2,
        "contributions": [
          {
            "trait": "leadership",
            "level": 2
          },
          {
            "trait": "independent_working",
            "level": 3
          }
        ],
        "textHi": "अपना हिस्सा पूरा करेंगे और दूसरों को अपना काम संभालने देंगे।",
        "textBn": "নিজের অংশটি করবেন এবং অন্যদের তাদেরটা সামলাতে দেবেন।"
      }
    ],
    "categoryHi": "नेतृत्व (Leadership)",
    "categoryBn": "নেতৃত্ব (Leadership)",
    "questionHi": "एक समूह किसी कार्य पर काम कर रहा है, लेकिन कोई भी आगे बढ़कर नेतृत्व नहीं कर रहा है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "একটি দল একটি কাজে কাজ করছে, কিন্তু কেউ নেতৃত্ব দিচ্ছে না। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 18,
    "sectionId": "work_style",
    "category": "Teamwork",
    "question": "You are given a task that needs several people to complete. How would you prefer to work?",
    "options": [
      {
        "id": "a",
        "text": "Work with others, share ideas, and help when needed.",
        "level": 5,
        "contributions": [
          {
            "trait": "teamwork",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 5
          },
          {
            "trait": "collaboration",
            "level": 5
          }
        ],
        "textHi": "दूसरों के साथ काम करेंगे, विचार साझा करेंगे और ज़रूरत पड़ने पर मदद करेंगे।",
        "textBn": "অন্যদের সাথে কাজ করবেন, ধারণা বিনিময় করবেন এবং প্রয়োজনে সাহায্য করবেন।"
      },
      {
        "id": "b",
        "text": "Do only your part and avoid group discussion.",
        "level": 2,
        "contributions": [
          {
            "trait": "teamwork",
            "level": 2
          },
          {
            "trait": "independent_working",
            "level": 3
          }
        ],
        "textHi": "केवल अपना हिस्सा करेंगे और सामूहिक चर्चा से बचेंगे।",
        "textBn": "শুধু নিজের অংশটি করবেন এবং দলীয় আলোচনা এড়িয়ে চলবেন।"
      },
      {
        "id": "c",
        "text": "Work with the group but mostly wait for instructions.",
        "level": 3,
        "contributions": [
          {
            "trait": "teamwork",
            "level": 3
          }
        ],
        "textHi": "समूह के साथ काम करेंगे लेकिन अधिकांश समय निर्देशों की प्रतीक्षा करेंगे।",
        "textBn": "দলের সাথে কাজ করবেন তবে বেশিরভাগ সময় নির্দেশের জন্য অপেক্ষা করবেন।"
      },
      {
        "id": "d",
        "text": "Prefer to work alone whenever possible.",
        "level": 1,
        "contributions": [
          {
            "trait": "teamwork",
            "level": 1
          },
          {
            "trait": "independent_working",
            "level": 5
          }
        ],
        "textHi": "जब भी संभव हो अकेले काम करना पसंद करेंगे।",
        "textBn": "যতটা সম্ভব একা কাজ করতে পছন্দ করবেন।"
      },
      {
        "id": "e",
        "text": "Take part in the group and help make sure everyone works together.",
        "level": 4,
        "contributions": [
          {
            "trait": "teamwork",
            "level": 4
          },
          {
            "trait": "team_coordination",
            "level": 4
          }
        ],
        "textHi": "समूह में सक्रिय भागीदारी करेंगे और सुनिश्चित करेंगे कि सब मिलकर काम करें।",
        "textBn": "দলে সক্রিয় অংশ নেবেন এবং সবাই যাতে একসাথে কাজ করে তা নিশ্চিত করতে সাহায্য করবেন।"
      }
    ],
    "categoryHi": "टीम वर्क (Teamwork)",
    "categoryBn": "দলগত কাজ (Teamwork)",
    "questionHi": "आपको एक ऐसा कार्य दिया गया है जिसे पूरा करने के लिए कई लोगों की आवश्यकता है। आप किस प्रकार काम करना पसंद करेंगे?",
    "questionBn": "আপনাকে এমন একটি কাজ দেওয়া হয়েছে যা সম্পূর্ণ করতে একাধিক ব্যক্তির প্রয়োজন। আপনি কীভাবে কাজ করতে পছন্দ করবেন?"
  },
  {
    "id": 19,
    "sectionId": "work_style",
    "category": "Independent Working",
    "question": "You are given a task and told what result is needed, but nobody will watch you while you work. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Keep waiting for someone to check each step.",
        "level": 1,
        "contributions": [
          {
            "trait": "independent_working",
            "level": 1
          }
        ],
        "textHi": "हर कदम पर किसी के जांच करने का इंतजार करते रहेंगे।",
        "textBn": "প্রতিটি ধাপে কেউ পরীক্ষা করার জন্য অপেক্ষা করতে থাকবেন।"
      },
      {
        "id": "b",
        "text": "Start the task and ask questions only when needed.",
        "level": 4,
        "contributions": [
          {
            "trait": "independent_working",
            "level": 4
          },
          {
            "trait": "responsibility",
            "level": 4
          }
        ],
        "textHi": "कार्य शुरू करेंगे और केवल आवश्यकता पड़ने पर ही प्रश्न पूछेंगे।",
        "textBn": "কাজ শুরু করবেন এবং কেবল প্রয়োজন হলেই প্রশ্ন জিজ্ঞাসা করবেন।"
      },
      {
        "id": "c",
        "text": "Do the task on your own and check your work before finishing.",
        "level": 5,
        "contributions": [
          {
            "trait": "independent_working",
            "level": 5
          },
          {
            "trait": "responsibility",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          }
        ],
        "textHi": "अपने दम पर कार्य पूरा करेंगे और समाप्त करने से पहले अपने काम की जांच करेंगे।",
        "textBn": "নিজের মতো কাজটি করবেন এবং শেষ করার আগে নিজের কাজ যাচাই করবেন।"
      },
      {
        "id": "d",
        "text": "Start working but ask for help often.",
        "level": 3,
        "contributions": [
          {
            "trait": "independent_working",
            "level": 3
          },
          {
            "trait": "teamwork",
            "level": 3
          }
        ],
        "textHi": "काम शुरू करेंगे लेकिन बार-बार मदद मांगते रहेंगे।",
        "textBn": "কাজ শুরু করবেন তবে ঘন ঘন সাহায্য চাইবেন।"
      },
      {
        "id": "e",
        "text": "Do only the easiest parts on your own.",
        "level": 2,
        "contributions": [
          {
            "trait": "independent_working",
            "level": 2
          }
        ],
        "textHi": "अपने आप केवल सबसे आसान हिस्से ही करेंगे।",
        "textBn": "নিজের মতো করে কেবল সবচেয়ে সহজ অংশগুলি করবেন।"
      }
    ],
    "categoryHi": "स्वतंत्र कार्य (Independent Working)",
    "categoryBn": "স্বাধীন কাজ (Independent Working)",
    "questionHi": "आपको एक कार्य दिया गया है और बताया गया है कि क्या परिणाम चाहिए, लेकिन काम करते समय कोई आपकी निगरानी नहीं करेगा। आप क्या करेंगे?",
    "questionBn": "আপনাকে একটি কাজ দিয়ে ফলাফল কী প্রত্যাশিত তা জানানো হয়েছে, কিন্তু কাজের সময় কেউ আপনাকে পর্যবেক্ষণ করবে না। আপনি কী করবেন?"
  },
  {
    "id": 20,
    "sectionId": "work_style",
    "category": "Structured Work",
    "question": "You are given clear steps for doing a task. How do you feel about working this way?",
    "options": [
      {
        "id": "a",
        "text": "I prefer clear steps and usually follow them carefully.",
        "level": 5,
        "contributions": [
          {
            "trait": "structured_work",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          },
          {
            "trait": "conventional",
            "level": 5
          }
        ],
        "textHi": "मैं स्पष्ट चरण पसंद करता हूँ और आमतौर पर उनका सावधानीपूर्वक पालन करता हूँ।",
        "textBn": "আমি সুস্পষ্ট ধাপ পছন্দ করি এবং সাধারণত সেগুলি সতর্কতার সাথে অনুসরণ করি।"
      },
      {
        "id": "b",
        "text": "I follow the steps but may change them if needed.",
        "level": 4,
        "contributions": [
          {
            "trait": "structured_work",
            "level": 4
          },
          {
            "trait": "adaptability",
            "level": 4
          }
        ],
        "textHi": "मैं चरणों का पालन करता हूँ लेकिन आवश्यकता पड़ने पर उनमें बदलाव कर सकता हूँ।",
        "textBn": "আমি ধাপগুলি অনুসরণ করি তবে প্রয়োজনে সেগুলি পরিবর্তন করতে পারি।"
      },
      {
        "id": "c",
        "text": "I can follow them, but I prefer some freedom.",
        "level": 3,
        "contributions": [
          {
            "trait": "structured_work",
            "level": 3
          },
          {
            "trait": "creativity",
            "level": 3
          }
        ],
        "textHi": "मैं उनका पालन कर सकता हूँ, लेकिन मुझे थोड़ी स्वतंत्रता पसंद है।",
        "textBn": "আমি সেগুলি অনুসরণ করতে পারি, তবে আমি কিছুটা স্বাধীনতা পছন্দ করি।"
      },
      {
        "id": "d",
        "text": "I do not like following fixed steps.",
        "level": 1,
        "contributions": [
          {
            "trait": "structured_work",
            "level": 1
          },
          {
            "trait": "artistic",
            "level": 4
          }
        ],
        "textHi": "मुझे तय चरणों का पालन करना पसंद नहीं है।",
        "textBn": "আমি নির্ধারিত ধাপ অনুসরণ করতে পছন্দ করি না।"
      },
      {
        "id": "e",
        "text": "I follow the main steps but may skip some small ones.",
        "level": 2,
        "contributions": [
          {
            "trait": "structured_work",
            "level": 2
          }
        ],
        "textHi": "मैं मुख्य चरणों का पालन करता हूँ लेकिन कुछ छोटे चरणों को छोड़ सकता हूँ।",
        "textBn": "আমি প্রধান ধাপগুলি অনুসরণ করি তবে কিছু ছোট ধাপ এড়িয়ে যেতে পারি।"
      }
    ],
    "categoryHi": "संरचित कार्य (Structured Work)",
    "categoryBn": "সুসংগঠিত কাজ (Structured Work)",
    "questionHi": "आपको कार्य करने के स्पष्ट चरण दिए गए हैं। इस तरीके से काम करने के बारे में आप क्या महसूस करते हैं?",
    "questionBn": "আপনাকে একটি কাজ করার জন্য সুস্পষ্ট ধাপ দেওয়া হয়েছে। এইভাবে কাজ করার ব্যাপারে আপনি কেমন বোধ করেন?"
  },
  {
    "id": 21,
    "sectionId": "work_style",
    "category": "Routine Work",
    "question": "You need to do the same type of task every day. How would you feel?",
    "options": [
      {
        "id": "a",
        "text": "I would quickly lose interest.",
        "level": 1,
        "contributions": [
          {
            "trait": "routine_work",
            "level": 1
          },
          {
            "trait": "creativity",
            "level": 4
          }
        ],
        "textHi": "मेरी रुचि जल्दी ही समाप्त हो जाएगी।",
        "textBn": "আমার আগ্রহ দ্রুত হারিয়ে যাবে।"
      },
      {
        "id": "b",
        "text": "I can do it if there are some small changes.",
        "level": 3,
        "contributions": [
          {
            "trait": "routine_work",
            "level": 3
          }
        ],
        "textHi": "यदि कुछ छोटे बदलाव हों तो मैं इसे कर सकता हूँ।",
        "textBn": "কিছু ছোটখাটো পরিবর্তন থাকলে আমি এটি করতে পারি।"
      },
      {
        "id": "c",
        "text": "I am comfortable doing the same task and can stay focused.",
        "level": 5,
        "contributions": [
          {
            "trait": "routine_work",
            "level": 5
          },
          {
            "trait": "persistence",
            "level": 4
          },
          {
            "trait": "conventional",
            "level": 5
          }
        ],
        "textHi": "मैं एक ही काम करने में सहज हूँ और एकाग्र रह सकता हूँ।",
        "textBn": "আমি একই কাজ করতে স্বাচ্ছন্দ্য বোধ করি এবং মনোযোগী থাকতে পারি।"
      },
      {
        "id": "d",
        "text": "I can handle it, especially when the task has a clear goal.",
        "level": 4,
        "contributions": [
          {
            "trait": "routine_work",
            "level": 4
          },
          {
            "trait": "target_orientation",
            "level": 4
          }
        ],
        "textHi": "मैं इसे संभाल सकता हूँ, विशेषकर जब कार्य का लक्ष्य स्पष्ट हो।",
        "textBn": "আমি এটি সামলাতে পারি, বিশেষ করে যখন কাজের একটি স্পষ্ট লক্ষ্য থাকে।"
      },
      {
        "id": "e",
        "text": "I would find it a little boring but could continue.",
        "level": 2,
        "contributions": [
          {
            "trait": "routine_work",
            "level": 2
          }
        ],
        "textHi": "मुझे यह थोड़ा उबाऊ लगेगा लेकिन मैं जारी रख सकता हूँ।",
        "textBn": "আমার এটি কিছুটা একঘেয়ে মনে হবে তবে আমি চালিয়ে যেতে পারব।"
      }
    ],
    "categoryHi": "नियमित कार्य (Routine Work)",
    "categoryBn": "দৈনন্দিন কাজ (Routine Work)",
    "questionHi": "आपको हर दिन एक ही प्रकार का कार्य करना है। आपको कैसा लगेगा?",
    "questionBn": "আপনাকে প্রতিদিন একই ধরনের কাজ করতে হবে। আপনার কেমন লাগবে?"
  },
  {
    "id": 22,
    "sectionId": "work_style",
    "category": "Target Orientation",
    "question": "You are given a target that needs to be completed by the end of the day. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Work toward the target but take things at a normal pace.",
        "level": 3,
        "contributions": [
          {
            "trait": "target_orientation",
            "level": 3
          }
        ],
        "textHi": "लक्ष्य की दिशा में काम करेंगे लेकिन सामान्य गति से चलेंगे।",
        "textBn": "লক্ষ্যের দিকে কাজ করবেন তবে স্বাভাবিক গতিতে চলবেন।"
      },
      {
        "id": "b",
        "text": "Focus strongly on reaching the target and plan your work around it.",
        "level": 5,
        "contributions": [
          {
            "trait": "target_orientation",
            "level": 5
          },
          {
            "trait": "planning",
            "level": 5
          },
          {
            "trait": "sales_acumen",
            "level": 4
          }
        ],
        "textHi": "लक्ष्य हासिल करने पर पूरा ध्यान केंद्रित करेंगे और उसके अनुसार काम की योजना बनाएंगे।",
        "textBn": "লক্ষ্য অর্জনে দৃঢ়ভাবে মনোনিবেশ করবেন এবং সেই অনুযায়ী কাজের পরিকল্পনা করবেন।"
      },
      {
        "id": "c",
        "text": "Start working and see how much you can finish.",
        "level": 2,
        "contributions": [
          {
            "trait": "target_orientation",
            "level": 2
          }
        ],
        "textHi": "काम शुरू करेंगे और देखेंगे कि कितना पूरा हो पाता है।",
        "textBn": "কাজ শুরু করবেন এবং দেখবেন কতটা শেষ করতে পারেন।"
      },
      {
        "id": "d",
        "text": "Break the work into smaller goals and keep checking your progress.",
        "level": 4,
        "contributions": [
          {
            "trait": "target_orientation",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 4
          },
          {
            "trait": "planning",
            "level": 4
          }
        ],
        "textHi": "काम को छोटे-छोटे लक्ष्यों में बांटेंगे और अपनी प्रगति की नियमित जांच करेंगे।",
        "textBn": "কাজটিকে ছোট ছোট লক্ষ্যে ভাগ করবেন এবং অগ্রগতির নিয়মিত খোঁজ রাখবেন।"
      },
      {
        "id": "e",
        "text": "Feel less concerned about the target if the work is difficult.",
        "level": 1,
        "contributions": [
          {
            "trait": "target_orientation",
            "level": 1
          }
        ],
        "textHi": "यदि काम कठिन हो तो लक्ष्य के बारे में कम चिंतित होंगे।",
        "textBn": "কাজ কঠিন হলে লক্ষ্য নিয়ে কম উদ্বিগ্ন হবেন।"
      }
    ],
    "categoryHi": "लक्ष्य उन्मुखता (Target Orientation)",
    "categoryBn": "লক্ষ্যমুখী কাজ (Target Orientation)",
    "questionHi": "आपको एक लक्ष्य दिया गया है जिसे दिन के अंत तक पूरा करना है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে একটি লক্ষ্য দেওয়া হয়েছে যা দিনের শেষে সম্পূর্ণ করতে হবে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 23,
    "sectionId": "work_style",
    "category": "Quality Orientation",
    "question": "You finish a task a little earlier than expected, but there is still time to check your work. What would you do?",
    "options": [
      {
        "id": "a",
        "text": "Submit it immediately because it is already finished.",
        "level": 1,
        "contributions": [
          {
            "trait": "quality_orientation",
            "level": 1
          }
        ],
        "textHi": "इसे तुरंत जमा कर देंगे क्योंकि यह पहले ही पूरा हो चुका है।",
        "textBn": "তৎক্ষণাৎ জমা দিয়ে দেবেন কারণ এটি ইতিমধ্যে শেষ হয়ে গেছে।"
      },
      {
        "id": "b",
        "text": "Quickly look over it for major mistakes.",
        "level": 3,
        "contributions": [
          {
            "trait": "quality_orientation",
            "level": 3
          }
        ],
        "textHi": "बड़ी गलतियों के लिए इस पर एक त्वरित नज़र डालेंगे।",
        "textBn": "বড় কোনো ভুল আছে কিনা তা দ্রুত একবার দেখে নেবেন।"
      },
      {
        "id": "c",
        "text": "Check the important parts before submitting it.",
        "level": 4,
        "contributions": [
          {
            "trait": "quality_orientation",
            "level": 4
          },
          {
            "trait": "responsibility",
            "level": 4
          }
        ],
        "textHi": "जमा करने से पहले महत्वपूर्ण हिस्सों की दोबारा जांच करेंगे।",
        "textBn": "জমা দেওয়ার আগে গুরুত্বপূর্ণ অংশগুলি যাচাই করবেন।"
      },
      {
        "id": "d",
        "text": "Carefully check the work and fix anything that could affect the final result.",
        "level": 5,
        "contributions": [
          {
            "trait": "quality_orientation",
            "level": 5
          },
          {
            "trait": "responsibility",
            "level": 5
          },
          {
            "trait": "precision",
            "level": 5
          }
        ],
        "textHi": "काम की सावधानीपूर्वक जांच करेंगे और ऐसी किसी भी चीज़ को ठीक करेंगे जो अंतिम परिणाम को प्रभावित कर सकती है।",
        "textBn": "মনোযোগ দিয়ে কাজ পরীক্ষা করবেন এবং চূড়ান্ত ফলাফলকে প্রভাবিত করতে পারে এমন যেকোনো ত্রুটি সংশোধন করবেন।"
      },
      {
        "id": "e",
        "text": "Submit it if you feel it is probably correct.",
        "level": 2,
        "contributions": [
          {
            "trait": "quality_orientation",
            "level": 2
          }
        ],
        "textHi": "यदि लगता है कि यह शायद सही है तो इसे जमा कर देंगे।",
        "textBn": "সম্ভবত ঠিক আছে মনে হলে জমা দিয়ে দেবেন।"
      }
    ],
    "categoryHi": "गुणवत्ता उन्मुखता (Quality Orientation)",
    "categoryBn": "মান সচেতনতা (Quality Orientation)",
    "questionHi": "आप उम्मीद से थोड़ा पहले काम पूरा कर लेते हैं, लेकिन काम की जांच के लिए अभी भी समय बचा है। आप क्या करेंगे?",
    "questionBn": "আপনি প্রত্যাশার চেয়ে কিছুটা আগেই কাজ শেষ করেছেন, তবে কাজ পরীক্ষা করার মতো সময় এখনও আছে। আপনি কী করবেন?"
  },
  {
    "id": 24,
    "sectionId": "career_interest",
    "category": "Hands-on Interest",
    "question": "Imagine you have a free day and can choose one activity. Which would you naturally enjoy?",
    "options": [
      {
        "id": "a",
        "text": "Build, repair, or work with physical objects.",
        "level": 5,
        "contributions": [
          {
            "trait": "realistic",
            "level": 5
          },
          {
            "trait": "hands_on",
            "level": 5
          },
          {
            "trait": "technical_aptitude",
            "level": 4
          }
        ],
        "textHi": "भौतिक वस्तुओं का निर्माण, मरम्मत या उनके साथ काम करना।",
        "textBn": "হাতে-কলমে কোনো বস্তু তৈরি, মেরামত বা শারীরিক কাজ করা।"
      },
      {
        "id": "b",
        "text": "Organize information or records.",
        "level": 2,
        "contributions": [
          {
            "trait": "conventional",
            "level": 5
          },
          {
            "trait": "data_analytics",
            "level": 3
          }
        ],
        "textHi": "जानकारी या रिकॉर्ड को व्यवस्थित करना।",
        "textBn": "তথ্য বা নথিপত্র সুসংগঠিত করা।"
      },
      {
        "id": "c",
        "text": "Help someone learn or solve a personal problem.",
        "level": 3,
        "contributions": [
          {
            "trait": "social",
            "level": 5
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "किसी को कुछ सीखने या व्यक्तिगत समस्या हल करने में मदद करना।",
        "textBn": "কাউকে কিছু শিখতে বা ব্যক্তিগত সমস্যা সমাধানে সাহায্য করা।"
      },
      {
        "id": "d",
        "text": "Study how something works and find answers.",
        "level": 4,
        "contributions": [
          {
            "trait": "investigative",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "कोई चीज़ कैसे काम करती है इसका अध्ययन करना और उत्तर खोजना।",
        "textBn": "কোনো কিছু কীভাবে কাজ করে তা অধ্যয়ন করা এবং উত্তর খোঁজা।"
      },
      {
        "id": "e",
        "text": "Make something creative such as a drawing or design.",
        "level": 1,
        "contributions": [
          {
            "trait": "artistic",
            "level": 5
          },
          {
            "trait": "creativity",
            "level": 5
          }
        ],
        "textHi": "कोई रचनात्मक कार्य करना जैसे ड्राइंग या डिज़ाइन बनाना।",
        "textBn": "চিত্রাঙ্কন বা নকশার মতো সৃজনশীল কিছু তৈরি করা।"
      }
    ],
    "categoryHi": "व्यावहारिक रुचि (Hands-on Interest)",
    "categoryBn": "হাতে-কলমে কাজের আগ্রহ (Hands-on Interest)",
    "questionHi": "कल्पना करें कि आपका एक खाली दिन है और आप कोई एक गतिविधि चुन सकते हैं। आप स्वाभाविक रूप से किसमें आनंद लेंगे?",
    "questionBn": "ভাবুন আপনার একটি ছুটির দিন আছে এবং একটি কাজ বেছে নিতে পারেন। আপনি স্বাভাবিকভাবে কোনটিতে আনন্দ পাবেন?"
  },
  {
    "id": 25,
    "sectionId": "career_interest",
    "category": "Investigative Interest",
    "question": "You see something that you do not understand. What are you most likely to do?",
    "options": [
      {
        "id": "a",
        "text": "Ask someone who already knows about it.",
        "level": 2,
        "contributions": [
          {
            "trait": "social",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 3
          }
        ],
        "textHi": "किसी ऐसे व्यक्ति से पूछेंगे जो इसके बारे में पहले से जानता हो।",
        "textBn": "এমন কাউকে জিজ্ঞাসা করবেন যিনি এটি আগে থেকেই জানেন।"
      },
      {
        "id": "b",
        "text": "Try to find out how and why it works.",
        "level": 5,
        "contributions": [
          {
            "trait": "investigative",
            "level": 5
          },
          {
            "trait": "research_aptitude",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 4
          }
        ],
        "textHi": "यह जानने की कोशिश करेंगे कि यह कैसे और क्यों काम करता है।",
        "textBn": "এটি কীভাবে এবং কেন কাজ করে তা জানার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Try using it yourself.",
        "level": 3,
        "contributions": [
          {
            "trait": "realistic",
            "level": 4
          },
          {
            "trait": "hands_on",
            "level": 4
          }
        ],
        "textHi": "इसे स्वयं उपयोग करके देखने का प्रयास करेंगे।",
        "textBn": "নিজে এটি ব্যবহার করে দেখার চেষ্টা করবেন।"
      },
      {
        "id": "d",
        "text": "Write down the information and organize it.",
        "level": 1,
        "contributions": [
          {
            "trait": "conventional",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 3
          }
        ],
        "textHi": "जानकारी को नोट करेंगे और उसे व्यवस्थित करेंगे।",
        "textBn": "তথ্য লিখে রাখবেন এবং তা সাজিয়ে রাখবেন।"
      },
      {
        "id": "e",
        "text": "Think of a new or unusual way to look at it.",
        "level": 4,
        "contributions": [
          {
            "trait": "artistic",
            "level": 4
          },
          {
            "trait": "creativity",
            "level": 4
          }
        ],
        "textHi": "इसे देखने का एक नया या अनोखा तरीका सोचेंगे।",
        "textBn": "এটিকে দেখার একটি নতুন বা অনন্য উপায় চিন্তা করবেন।"
      }
    ],
    "categoryHi": "खोजी रुचि (Investigative Interest)",
    "categoryBn": "অনুসন্ধানী আগ্রহ (Investigative Interest)",
    "questionHi": "आप कुछ ऐसा देखते हैं जो आपको समझ नहीं आता। आप सबसे अधिक क्या करने की संभावना रखते हैं?",
    "questionBn": "আপনি এমন কিছু দেখলেন যা বুঝতে পারছেন না। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 26,
    "sectionId": "career_interest",
    "category": "Artistic Interest",
    "question": "You are asked to make something that looks attractive. What part would you enjoy most?",
    "options": [
      {
        "id": "a",
        "text": "Making the design look different and interesting.",
        "level": 5,
        "contributions": [
          {
            "trait": "artistic",
            "level": 5
          },
          {
            "trait": "creativity",
            "level": 5
          },
          {
            "trait": "visual_thinking",
            "level": 5
          }
        ],
        "textHi": "डिज़ाइन को अनूठा और दिलचस्प रूप देना।",
        "textBn": "নকশাটিকে ব্যতিক্রমী এবং আকর্ষণীয় করে তোলা।"
      },
      {
        "id": "b",
        "text": "Following a clear design that is already given.",
        "level": 2,
        "contributions": [
          {
            "trait": "conventional",
            "level": 4
          },
          {
            "trait": "routine_work",
            "level": 4
          }
        ],
        "textHi": "पहले से दिए गए स्पष्ट डिज़ाइन का पालन करना।",
        "textBn": "আগে থেকেই দেওয়া স্পষ্ট কোনো নকশা অনুসরণ করা।"
      },
      {
        "id": "c",
        "text": "Making sure it works properly.",
        "level": 3,
        "contributions": [
          {
            "trait": "realistic",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "यह सुनिश्चित करना कि यह ठीक से काम करे।",
        "textBn": "এটি সঠিকভাবে কাজ করছে কিনা তা নিশ্চিত করা।"
      },
      {
        "id": "d",
        "text": "Understanding how people may react to the design.",
        "level": 4,
        "contributions": [
          {
            "trait": "social",
            "level": 4
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "यह समझना कि लोग डिज़ाइन पर क्या प्रतिक्रिया दे सकते हैं।",
        "textBn": "মানুষ নকশাটিতে কেমন প্রতিক্রিয়া জানাতে পারে তা বোঝা।"
      },
      {
        "id": "e",
        "text": "Finding information about what makes the design effective.",
        "level": 1,
        "contributions": [
          {
            "trait": "investigative",
            "level": 4
          }
        ],
        "textHi": "डिज़ाइन को क्या चीज़ प्रभावी बनाती है, इसके बारे में जानकारी प्राप्त करना।",
        "textBn": "কীসের জন্য নকশাটি কার্যকর হয় সে সম্পর্কে তথ্য খুঁজে বের করা।"
      }
    ],
    "categoryHi": "कलात्मक रुचि (Artistic Interest)",
    "categoryBn": "শিল্পমূলক আগ্রহ (Artistic Interest)",
    "questionHi": "आपसे कुछ ऐसा बनाने के लिए कहा जाता है जो आकर्षक दिखे। आप किस हिस्से में सबसे अधिक आनंद लेंगे?",
    "questionBn": "আপনাকে আকর্ষণীয় দেখতে এমন কিছু তৈরি করতে বলা হয়েছে। কোন অংশে আপনি সবচেয়ে বেশি আনন্দ পাবেন?"
  },
  {
    "id": 27,
    "sectionId": "career_interest",
    "category": "Social Interest",
    "question": "Someone is having trouble learning something. Which activity would you naturally prefer?",
    "options": [
      {
        "id": "a",
        "text": "Give them time to understand it on their own.",
        "level": 2,
        "contributions": [
          {
            "trait": "conventional",
            "level": 3
          },
          {
            "trait": "patience",
            "level": 3
          }
        ],
        "textHi": "उन्हें अपने दम पर समझने के लिए समय देना।",
        "textBn": "তাদের নিজের মতো বোঝার জন্য কিছুটা সময় দেওয়া।"
      },
      {
        "id": "b",
        "text": "Show them how to do it and support them.",
        "level": 5,
        "contributions": [
          {
            "trait": "social",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 5
          },
          {
            "trait": "empathy",
            "level": 5
          }
        ],
        "textHi": "उन्हें करके दिखाना और उनका मार्गदर्शन व समर्थन करना।",
        "textBn": "কীভাবে করতে হয় তা দেখিয়ে দেওয়া এবং পাশে থেকে সাহায্য করা।"
      },
      {
        "id": "c",
        "text": "Find out why they are having difficulty.",
        "level": 4,
        "contributions": [
          {
            "trait": "investigative",
            "level": 4
          },
          {
            "trait": "problem_solving",
            "level": 4
          }
        ],
        "textHi": "यह पता लगाना कि उन्हें कठिनाई क्यों आ रही है।",
        "textBn": "তাদের কেন অসুবিধা হচ্ছে তা খুঁজে বের করা।"
      },
      {
        "id": "d",
        "text": "Demonstrate the task practically.",
        "level": 3,
        "contributions": [
          {
            "trait": "realistic",
            "level": 4
          },
          {
            "trait": "hands_on",
            "level": 4
          }
        ],
        "textHi": "कार्य का व्यावहारिक प्रदर्शन करके समझाना।",
        "textBn": "কাজটি ব্যবহারিক বা হাতে-কলমে প্রদর্শন করা।"
      },
      {
        "id": "e",
        "text": "Find a creative way to explain it.",
        "level": 1,
        "contributions": [
          {
            "trait": "artistic",
            "level": 4
          },
          {
            "trait": "creativity",
            "level": 4
          }
        ],
        "textHi": "इसे समझाने का कोई रचनात्मक तरीका खोजना।",
        "textBn": "এটি ব্যাখ্যা করার জন্য একটি সৃজনশীল উপায় বের করা।"
      }
    ],
    "categoryHi": "सामाजिक रुचि (Social Interest)",
    "categoryBn": "সামাজিক আগ্রহ (Social Interest)",
    "questionHi": "किसी को कुछ सीखने में कठिनाई हो रही है। आप स्वाभाविक रूप से किस गतिविधि को प्राथमिकता देंगे?",
    "questionBn": "কারো কিছু শিখতে সমস্যা হচ্ছে। আপনি স্বাভাবিকভাবে কোন কাজটি পছন্দ করবেন?"
  },
  {
    "id": 28,
    "sectionId": "career_interest",
    "category": "Enterprising Interest",
    "question": "You are part of a group trying to achieve a goal. Which role would naturally interest you?",
    "options": [
      {
        "id": "a",
        "text": "Keep track of the records and information.",
        "level": 2,
        "contributions": [
          {
            "trait": "conventional",
            "level": 5
          },
          {
            "trait": "structured_work",
            "level": 4
          }
        ],
        "textHi": "रिकॉर्ड और जानकारी का हिसाब रखना।",
        "textBn": "নথিপত্র ও তথ্যের হিসাব রাখা।"
      },
      {
        "id": "b",
        "text": "Work with tools or handle the practical work.",
        "level": 1,
        "contributions": [
          {
            "trait": "realistic",
            "level": 5
          },
          {
            "trait": "hands_on",
            "level": 4
          }
        ],
        "textHi": "औज़ारों के साथ काम करना या व्यावहारिक कार्य संभालना।",
        "textBn": "যন্ত্রপাতি দিয়ে কাজ করা বা ব্যবহারিক দায়িত্ব সামলানো।"
      },
      {
        "id": "c",
        "text": "Encourage people, make plans, and help the group reach the goal.",
        "level": 5,
        "contributions": [
          {
            "trait": "enterprising",
            "level": 5
          },
          {
            "trait": "leadership",
            "level": 5
          },
          {
            "trait": "sales_acumen",
            "level": 5
          }
        ],
        "textHi": "लोगों को प्रेरित करना, योजनाएं बनाना और समूह को लक्ष्य तक पहुंचाने में मदद करना।",
        "textBn": "মানুষকে উৎসাহিত করা, পরিকল্পনা করা এবং দলকে লক্ষ্যে পৌঁছাতে সাহায্য করা।"
      },
      {
        "id": "d",
        "text": "Study the problem and suggest the best solution.",
        "level": 3,
        "contributions": [
          {
            "trait": "investigative",
            "level": 4
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "समस्या का अध्ययन करना और सर्वोत्तम समाधान का सुझाव देना।",
        "textBn": "সমস্যাটি খতিয়ে দেখা এবং সেরা সমাধানের পরামর্শ দেওয়া।"
      },
      {
        "id": "e",
        "text": "Help people work together and solve disagreements.",
        "level": 4,
        "contributions": [
          {
            "trait": "social",
            "level": 5
          },
          {
            "trait": "conflict_management",
            "level": 5
          }
        ],
        "textHi": "लोगों को साथ मिलकर काम करने में मदद करना और मतभेदों को सुलझाना।",
        "textBn": "মানুষকে একসাথে কাজ করতে সাহায্য করা এবং মতভেদ দূর করা।"
      }
    ],
    "categoryHi": "उद्यमी रुचि (Enterprising Interest)",
    "categoryBn": "উদ্যোগী আগ্রহ (Enterprising Interest)",
    "questionHi": "आप एक लक्ष्य प्राप्त करने की कोशिश कर रहे समूह का हिस्सा हैं। कौन सी भूमिका आपको स्वाभाविक रूप से आकर्षित करेगी?",
    "questionBn": "আপনি একটি লক্ষ্য অর্জনে সচেষ্ট একটি দলের অংশ। কোন ভূমিকাটি আপনাকে স্বাভাবিকভাবে আগ্রহী করবে?"
  },
  {
    "id": 29,
    "sectionId": "career_interest",
    "category": "Conventional Interest",
    "question": "You receive a lot of information that needs to be arranged properly. Which activity would you prefer?",
    "options": [
      {
        "id": "a",
        "text": "Put the information into a clear order and make sure nothing is missing.",
        "level": 5,
        "contributions": [
          {
            "trait": "conventional",
            "level": 5
          },
          {
            "trait": "structured_work",
            "level": 5
          },
          {
            "trait": "data_precision",
            "level": 5
          }
        ],
        "textHi": "जानकारी को एक स्पष्ट क्रम में रखना और सुनिश्चित करना कि कुछ भी छूटा न हो।",
        "textBn": "তথ্যগুলি একটি স্পষ্ট ক্রমানুসারে সাজানো এবং নিশ্চিত করা যে কোনো কিছু বাদ পড়েনি।"
      },
      {
        "id": "b",
        "text": "Look for patterns in the information.",
        "level": 4,
        "contributions": [
          {
            "trait": "investigative",
            "level": 4
          },
          {
            "trait": "pattern_recognition",
            "level": 4
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "जानकारी में पैटर्न या रुझानों की तलाश करना।",
        "textBn": "তথ্যের মধ্যকার নির্দিষ্ট ধরণ বা প্যাটার্ন খোঁজা।"
      },
      {
        "id": "c",
        "text": "Ask people about the information.",
        "level": 2,
        "contributions": [
          {
            "trait": "social",
            "level": 3
          },
          {
            "trait": "communication",
            "level": 3
          }
        ],
        "textHi": "लोगों से जानकारी के बारे में पूछना।",
        "textBn": "তথ্য সম্পর্কে মানুষদের জিজ্ঞাসা করা।"
      },
      {
        "id": "d",
        "text": "Find a creative way to present it.",
        "level": 1,
        "contributions": [
          {
            "trait": "artistic",
            "level": 4
          },
          {
            "trait": "visual_thinking",
            "level": 4
          }
        ],
        "textHi": "इसे प्रस्तुत करने का एक रचनात्मक तरीका खोजना।",
        "textBn": "এটি উপস্থাপনের জন্য একটি সৃজনশীল উপায় বের করা।"
      },
      {
        "id": "e",
        "text": "Use the information to plan a practical activity.",
        "level": 3,
        "contributions": [
          {
            "trait": "realistic",
            "level": 3
          },
          {
            "trait": "planning",
            "level": 3
          }
        ],
        "textHi": "व्यावहारिक गतिविधि की योजना बनाने के लिए जानकारी का उपयोग करना।",
        "textBn": "একটি ব্যবহারিক কাজের পরিকল্পনা করতে তথ্যটি ব্যবহার করা।"
      }
    ],
    "categoryHi": "पारंपरिक रुचि (Conventional Interest)",
    "categoryBn": "প্রথাগত আগ্রহ (Conventional Interest)",
    "questionHi": "आपको बहुत सारी जानकारी मिलती है जिसे ठीक से व्यवस्थित करने की आवश्यकता है। आप किस गतिविधि को प्राथमिकता देंगे?",
    "questionBn": "আপনি প্রচুর তথ্য পেয়েছেন যা সঠিকভাবে সাজানো প্রয়োজন। আপনি কোন কাজটি পছন্দ করবেন?"
  },
  {
    "id": 30,
    "sectionId": "emotional_intelligence",
    "category": "Self-Awareness",
    "question": "You notice that your mood has changed during work. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Ignore it and continue working.",
        "level": 2,
        "contributions": [
          {
            "trait": "self_awareness",
            "level": 2
          }
        ],
        "textHi": "इसे अनदेखा करेंगे और काम जारी रखेंगे।",
        "textBn": "উপেক্ষা করবেন এবং কাজ চালিয়ে যাবেন।"
      },
      {
        "id": "b",
        "text": "Notice the feeling and think about what may have caused it.",
        "level": 5,
        "contributions": [
          {
            "trait": "self_awareness",
            "level": 5
          },
          {
            "trait": "emotional_intelligence",
            "level": 5
          },
          {
            "trait": "self_regulation",
            "level": 4
          }
        ],
        "textHi": "भावना पर ध्यान देंगे और विचार करेंगे कि इसका क्या कारण हो सकता है।",
        "textBn": "অনুভূতিটি লক্ষ্য করবেন এবং কী কারণে এমন হলো তা ভাববেন।"
      },
      {
        "id": "c",
        "text": "Tell someone immediately that you are upset.",
        "level": 3,
        "contributions": [
          {
            "trait": "self_awareness",
            "level": 3
          },
          {
            "trait": "communication",
            "level": 3
          }
        ],
        "textHi": "तुरंत किसी को बताएंगे कि आप परेशान हैं।",
        "textBn": "কাউকে সঙ্গে সঙ্গে জানাবেন যে আপনি বিরক্ত।"
      },
      {
        "id": "d",
        "text": "Try to understand your feelings before deciding what to do.",
        "level": 4,
        "contributions": [
          {
            "trait": "self_awareness",
            "level": 4
          },
          {
            "trait": "self_control",
            "level": 4
          }
        ],
        "textHi": "क्या करना है यह तय करने से पहले अपनी भावनाओं को समझने की कोशिश करेंगे।",
        "textBn": "কী করবেন তা ঠিক করার আগে নিজের অনুভূতি বোঝার চেষ্টা করবেন।"
      },
      {
        "id": "e",
        "text": "Avoid thinking about it.",
        "level": 1,
        "contributions": [
          {
            "trait": "self_awareness",
            "level": 1
          }
        ],
        "textHi": "इसके बारे में सोचने से बचेंगे।",
        "textBn": "এটি নিয়ে চিন্তা করা এড়িয়ে চলবেন।"
      }
    ],
    "categoryHi": "आत्म-जागरूकता (Self-Awareness)",
    "categoryBn": "আত্ম-সচেতনতা (Self-Awareness)",
    "questionHi": "आप देखते हैं कि काम के दौरान आपका मूड बदल गया है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনি খেয়াল করলেন যে কাজের সময় আপনার মেজাজ বদলে গেছে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 31,
    "sectionId": "emotional_intelligence",
    "category": "Self-Control",
    "question": "A customer becomes angry and speaks to you in a rude way. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Speak loudly because the customer is being rude.",
        "level": 1,
        "contributions": [
          {
            "trait": "self_control",
            "level": 1
          },
          {
            "trait": "customer_service",
            "level": 1
          }
        ],
        "textHi": "ज़ोर से बोलेंगे क्योंकि ग्राहक अशिष्टता दिखा रहा है।",
        "textBn": "উচ্চস্বরে কথা বলবেন কারণ গ্রাহক রূঢ় আচরণ করছেন।"
      },
      {
        "id": "b",
        "text": "Stay quiet but feel very angry inside.",
        "level": 2,
        "contributions": [
          {
            "trait": "self_control",
            "level": 2
          }
        ],
        "textHi": "चुप रहेंगे लेकिन अंदर ही अंदर बहुत गुस्सा महसूस करेंगे।",
        "textBn": "চুপ থাকবেন তবে ভেতরে ভেতরে প্রচণ্ড রাগ অনুভব করবেন।"
      },
      {
        "id": "c",
        "text": "Stay calm and try to understand the customer’s problem.",
        "level": 4,
        "contributions": [
          {
            "trait": "self_control",
            "level": 4
          },
          {
            "trait": "customer_service",
            "level": 4
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "शांत रहेंगे और ग्राहक की समस्या को समझने का प्रयास करेंगे।",
        "textBn": "শান্ত থাকবেন এবং গ্রাহকের समस्याটি বোঝার চেষ্টা করবেন।"
      },
      {
        "id": "d",
        "text": "Calm yourself first, listen carefully, and respond politely.",
        "level": 5,
        "contributions": [
          {
            "trait": "self_control",
            "level": 5
          },
          {
            "trait": "customer_service",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 5
          }
        ],
        "textHi": "पहले खुद को शांत करेंगे, ध्यान से सुनेंगे, और विनम्रता से जवाब देंगे।",
        "textBn": "প্রথমে নিজেকে শান্ত করবেন, মনোযোগ দিয়ে শুনবেন এবং বিনীতভাবে উত্তর দেবেন।"
      },
      {
        "id": "e",
        "text": "Ask the customer to calm down and then continue the conversation.",
        "level": 3,
        "contributions": [
          {
            "trait": "self_control",
            "level": 3
          }
        ],
        "textHi": "ग्राहक से शांत होने का अनुरोध करेंगे और फिर बातचीत जारी रखेंगे।",
        "textBn": "গ্রাহককে শান্ত হতে অনুরোধ করবেন এবং তারপর কথা চালিয়ে যাবেন।"
      }
    ],
    "categoryHi": "आत्म-नियंत्रण (Self-Control)",
    "categoryBn": "আত্মনিয়ন্ত্রণ (Self-Control)",
    "questionHi": "एक ग्राहक क्रोधित हो जाता है और आपसे अशिष्टता से बात करता है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "একজন গ্রাহক রেগে গিয়ে আপনার সাথে রূঢ়ভাবে কথা বলছেন। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 32,
    "sectionId": "emotional_intelligence",
    "category": "Empathy",
    "question": "A coworker who normally works well makes several mistakes today. What would you most likely think?",
    "options": [
      {
        "id": "a",
        "text": "They should simply work more carefully.",
        "level": 2,
        "contributions": [
          {
            "trait": "empathy",
            "level": 2
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "उन्हें बस अधिक सावधानी से काम करना चाहिए।",
        "textBn": "তাদের আরও সতর্কতার সাথে কাজ করা উচিত।"
      },
      {
        "id": "b",
        "text": "They may be having a difficult day, so I would first try to understand what happened.",
        "level": 5,
        "contributions": [
          {
            "trait": "empathy",
            "level": 5
          },
          {
            "trait": "teamwork",
            "level": 5
          },
          {
            "trait": "social_perception",
            "level": 5
          }
        ],
        "textHi": "उनका आज का दिन कठिन हो सकता है, इसलिए मैं पहले यह समझने की कोशिश करूँगा कि क्या हुआ है।",
        "textBn": "তাদের হয়তো আজ খারাপ দিন যাচ্ছে, তাই আমি প্রথমে বোঝার চেষ্টা করব কী ঘটেছে।"
      },
      {
        "id": "c",
        "text": "Everyone makes mistakes, so I would not worry about it.",
        "level": 3,
        "contributions": [
          {
            "trait": "empathy",
            "level": 3
          }
        ],
        "textHi": "गलतियाँ सभी से होती हैं, इसलिए मैं इस पर ज़्यादा ध्यान नहीं दूँगा।",
        "textBn": "ভুল সবারই হয়, তাই আমি এটা নিয়ে চিন্তা করব না।"
      },
      {
        "id": "d",
        "text": "I would ask if something is wrong and offer help if needed.",
        "level": 4,
        "contributions": [
          {
            "trait": "empathy",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "मैं पूछूँगा कि क्या कोई समस्या है और ज़रूरत पड़ने पर मदद की पेशकश करूँगा।",
        "textBn": "আমি জানতে চাইব কোনো সমস্যা আছে কিনা এবং প্রয়োজনে সাহায্যের হাত বাড়িয়ে দেব।"
      },
      {
        "id": "e",
        "text": "Their problems are not my concern.",
        "level": 1,
        "contributions": [
          {
            "trait": "empathy",
            "level": 1
          }
        ],
        "textHi": "उनकी समस्याएं मेरी चिंता का विषय नहीं हैं।",
        "textBn": "তাদের সমস্যা আমার মাথাব্যথা নয়।"
      }
    ],
    "categoryHi": "सहानुभूति (Empathy)",
    "categoryBn": "সহমর্মিতা (Empathy)",
    "questionHi": "एक सहकर्मी जो आमतौर पर अच्छा काम करता है, आज कई गलतियाँ कर रहा है। आप सबसे अधिक क्या सोचेंगे?",
    "questionBn": "একজন সহকর্মী যিনি সাধারণত ভালো কাজ করেন, তিনি আজ বেশ কয়েকটি ভুল করছেন। আপনি সবচেয়ে বেশি কী ভাববেন?"
  },
  {
    "id": 33,
    "sectionId": "emotional_intelligence",
    "category": "Conflict Management",
    "question": "Two people in your team have a serious disagreement. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Stay away because it is not your problem.",
        "level": 1,
        "contributions": [
          {
            "trait": "conflict_management",
            "level": 1
          }
        ],
        "textHi": "दूर रहेंगे क्योंकि यह आपकी समस्या नहीं है।",
        "textBn": "দূরে থাকবেন কারণ এটি আপনার সমস্যা নয়।"
      },
      {
        "id": "b",
        "text": "Support the person you agree with.",
        "level": 2,
        "contributions": [
          {
            "trait": "conflict_management",
            "level": 2
          }
        ],
        "textHi": "उस व्यक्ति का समर्थन करेंगे जिससे आप सहमत हैं।",
        "textBn": "যাঁর সাথে আপনি একমত তাঁকে সমর্থন করবেন।"
      },
      {
        "id": "c",
        "text": "Ask both people what happened and try to understand both sides.",
        "level": 5,
        "contributions": [
          {
            "trait": "conflict_management",
            "level": 5
          },
          {
            "trait": "leadership",
            "level": 4
          },
          {
            "trait": "communication",
            "level": 5
          }
        ],
        "textHi": "दोनों व्यक्तियों से पूछेंगे कि क्या हुआ और दोनों पक्षों को समझने की कोशिश करेंगे।",
        "textBn": "উভয় পক্ষকে জিজ্ঞাসা করবেন কী ঘটেছে এবং দুই দিকের কথাই বোঝার চেষ্টা করবেন।"
      },
      {
        "id": "d",
        "text": "Suggest that they talk calmly and find a solution.",
        "level": 4,
        "contributions": [
          {
            "trait": "conflict_management",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          }
        ],
        "textHi": "सुझाव देंगे कि वे शांति से बात करें और कोई समाधान निकालें।",
        "textBn": "তাদের শান্তভাবে কথা বলতে এবং একটি সমাধান খুঁজতে পরামর্শ দেবেন।"
      },
      {
        "id": "e",
        "text": "Wait until they solve it themselves.",
        "level": 3,
        "contributions": [
          {
            "trait": "conflict_management",
            "level": 3
          }
        ],
        "textHi": "तब तक इंतजार करेंगे जब तक वे इसे खुद हल न कर लें।",
        "textBn": "তারা নিজেরাই এটি সমাধান না করা পর্যন্ত অপেক্ষা করবেন।"
      }
    ],
    "categoryHi": "विवाद प्रबंधन (Conflict Management)",
    "categoryBn": "দ্বন্দ্ব ব্যবস্থাপনা (Conflict Management)",
    "questionHi": "आपकी टीम के दो लोगों के बीच गहरा मतभेद हो जाता है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনার দলের দুজনের মধ্যে একটি গুরুতর মতবিরোধ তৈরি হয়েছে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 34,
    "sectionId": "emotional_intelligence",
    "category": "Stress Management",
    "question": "You have several tasks to finish in a short time. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Become worried and find it hard to start.",
        "level": 1,
        "contributions": [
          {
            "trait": "stress_management",
            "level": 1
          }
        ],
        "textHi": "चिंतित हो जाएंगे और शुरुआत करना कठिन लगेगा।",
        "textBn": "উদ্বিগ্ন হয়ে পড়বেন এবং শুরু করা কঠিন মনে হবে।"
      },
      {
        "id": "b",
        "text": "Start with the easiest task.",
        "level": 2,
        "contributions": [
          {
            "trait": "stress_management",
            "level": 2
          }
        ],
        "textHi": "सबसे आसान काम से शुरुआत करेंगे।",
        "textBn": "সবচেয়ে সহজ কাজটি দিয়ে শুরু করবেন।"
      },
      {
        "id": "c",
        "text": "Make a simple plan and work through the tasks one by one.",
        "level": 4,
        "contributions": [
          {
            "trait": "stress_management",
            "level": 4
          },
          {
            "trait": "planning",
            "level": 4
          },
          {
            "trait": "structured_work",
            "level": 4
          }
        ],
        "textHi": "एक सीधी योजना बनाएंगे और एक-एक करके कार्यों को पूरा करेंगे।",
        "textBn": "একটি সহজ পরিকল্পনা করবেন এবং একটির পর একটি কাজ সম্পন্ন করবেন।"
      },
      {
        "id": "d",
        "text": "Stay calm, decide what is most important, and manage your time carefully.",
        "level": 5,
        "contributions": [
          {
            "trait": "stress_management",
            "level": 5
          },
          {
            "trait": "decision_making",
            "level": 5
          },
          {
            "trait": "planning",
            "level": 5
          }
        ],
        "textHi": "शांत रहेंगे, तय करेंगे कि क्या सबसे महत्वपूर्ण है, और समय का सावधानीपूर्वक प्रबंधन करेंगे।",
        "textBn": "শান্ত থাকবেন, কোনটি সবচেয়ে গুরুত্বপূর্ণ তা নির্ধারণ করবেন এবং সময় সচেতনভাবে পরিচালনা করবেন।"
      },
      {
        "id": "e",
        "text": "Start working on everything at the same time.",
        "level": 3,
        "contributions": [
          {
            "trait": "stress_management",
            "level": 3
          }
        ],
        "textHi": "एक ही समय में सभी कार्यों पर काम करना शुरू कर देंगे।",
        "textBn": "একই সময়ে সমস্ত কাজে হাত দেবেন।"
      }
    ],
    "categoryHi": "तनाव प्रबंधन (Stress Management)",
    "categoryBn": "চাপ ব্যবস্থাপনা (Stress Management)",
    "questionHi": "आपको कम समय में कई कार्य पूरे करने हैं। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে অল্প সময়ের মধ্যে বেশ কয়েকটি কাজ শেষ করতে হবে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 35,
    "sectionId": "emotional_intelligence",
    "category": "Receiving Feedback",
    "question": "Someone tells you that you made a mistake in your work. How would you usually react?",
    "options": [
      {
        "id": "a",
        "text": "Feel bad and avoid the person.",
        "level": 2,
        "contributions": [
          {
            "trait": "receiving_feedback",
            "level": 2
          },
          {
            "trait": "growth_mindset",
            "level": 2
          }
        ],
        "textHi": "बुरा महसूस करेंगे और उस व्यक्ति से बचेंगे।",
        "textBn": "খারাপ লাগবে এবং সেই ব্যক্তিকে এড়িয়ে চলবেন।"
      },
      {
        "id": "b",
        "text": "Listen to what they say and think about whether you can improve.",
        "level": 4,
        "contributions": [
          {
            "trait": "receiving_feedback",
            "level": 4
          },
          {
            "trait": "growth_mindset",
            "level": 4
          },
          {
            "trait": "responsibility",
            "level": 4
          }
        ],
        "textHi": "उनकी बात सुनेंगे और सोचेंगे कि क्या आप सुधार कर सकते हैं।",
        "textBn": "তাদের বক্তব্য শুনবেন এবং আপনি উন্নতি করতে পারেন কিনা তা ভেবে দেখবেন।"
      },
      {
        "id": "c",
        "text": "Immediately explain why the mistake was not your fault.",
        "level": 1,
        "contributions": [
          {
            "trait": "receiving_feedback",
            "level": 1
          }
        ],
        "textHi": "तुरंत सफाई देंगे कि गलती आपकी वजह से नहीं हुई थी।",
        "textBn": "সঙ্গে সঙ্গে ব্যাখ্যা করবেন কেন ভুলটি আপনার কারণে হয়নি।"
      },
      {
        "id": "d",
        "text": "Ask questions, understand the feedback, and use it to improve your work.",
        "level": 5,
        "contributions": [
          {
            "trait": "receiving_feedback",
            "level": 5
          },
          {
            "trait": "growth_mindset",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 4
          }
        ],
        "textHi": "प्रश्न पूछेंगे, प्रतिक्रिया को समझेंगे और अपने काम को बेहतर बनाने के लिए इसका उपयोग करेंगे।",
        "textBn": "প্রশ্ন জিজ্ঞাসা করবেন, মতামতটি বুঝবেন এবং কাজ উন্নত করতে তা ব্যবহার করবেন।"
      },
      {
        "id": "e",
        "text": "Listen to it but do not think much about it afterward.",
        "level": 3,
        "contributions": [
          {
            "trait": "receiving_feedback",
            "level": 3
          }
        ],
        "textHi": "सुन लेंगे लेकिन बाद में इस पर ज़्यादा विचार नहीं करेंगे।",
        "textBn": "শুনবেন তবে পরে এটি নিয়ে বেশি ভাববেন না।"
      }
    ],
    "categoryHi": "प्रतिक्रिया स्वीकारना (Receiving Feedback)",
    "categoryBn": "মতামত গ্রহণ (Receiving Feedback)",
    "questionHi": "कोई आपको बताता है कि आपने अपने काम में गलती की है। आपकी सामान्य प्रतिक्रिया क्या होगी?",
    "questionBn": "কেউ আপনাকে জানাল যে আপনি আপনার কাজে একটি ভুল করেছেন। আপনি সাধারণত কীভাবে প্রতিক্রিয়া জানাবেন?"
  },
  {
    "id": 36,
    "sectionId": "skill_and_abilities",
    "category": "Communication",
    "question": "You need to explain a task to someone who does not understand it. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Explain it in the same way again.",
        "level": 2,
        "contributions": [
          {
            "trait": "communication",
            "level": 2
          }
        ],
        "textHi": "उसी तरह दोबारा समझाएंगे।",
        "textBn": "একইভাবে আবার বোঝাবেন।"
      },
      {
        "id": "b",
        "text": "Tell them to ask someone else.",
        "level": 1,
        "contributions": [
          {
            "trait": "communication",
            "level": 1
          },
          {
            "trait": "teamwork",
            "level": 1
          }
        ],
        "textHi": "उनसे किसी और से पूछने के लिए कहेंगे।",
        "textBn": "তাদের অন্য কাউকে জিজ্ঞাসা করতে বলবেন।"
      },
      {
        "id": "c",
        "text": "Explain the main points in simple words.",
        "level": 3,
        "contributions": [
          {
            "trait": "communication",
            "level": 3
          }
        ],
        "textHi": "सरल शब्दों में मुख्य बिंदुओं को समझाएंगे।",
        "textBn": "সহজ কথায় মূল বিষয়গুলি ব্যাখ্যা করবেন।"
      },
      {
        "id": "d",
        "text": "Change your explanation based on what the person understands and check if they have understood.",
        "level": 5,
        "contributions": [
          {
            "trait": "communication",
            "level": 5
          },
          {
            "trait": "empathy",
            "level": 4
          },
          {
            "trait": "leadership",
            "level": 4
          }
        ],
        "textHi": "सामने वाले की समझ के आधार पर समझाने का तरीका बदलेंगे और पुष्टि करेंगे कि वे समझ गए हैं।",
        "textBn": "সামনের মানুষটি কতটা বুঝছেন তার ওপর ভিত্তি করে ব্যাখ্যা পরিবর্তন করবেন এবং তিনি বুঝেছেন কিনা যাচাই করবেন।"
      },
      {
        "id": "e",
        "text": "Give an example and ask them if it is clear.",
        "level": 4,
        "contributions": [
          {
            "trait": "communication",
            "level": 4
          },
          {
            "trait": "creativity",
            "level": 3
          }
        ],
        "textHi": "एक उदाहरण देंगे और उनसे पूछेंगे कि क्या यह स्पष्ट है।",
        "textBn": "একটি উদাহরণ দেবেন এবং জানতে চাইবেন বিষয়টি পরিষ্কার কিনা।"
      }
    ],
    "categoryHi": "संचार कौशल (Communication)",
    "categoryBn": "যোগাযোগ দক্ষতা (Communication)",
    "questionHi": "आपको किसी ऐसे व्यक्ति को कार्य समझाना है जिसे यह समझ नहीं आ रहा है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে এমন কাউকে একটি কাজ বোঝাতে হবে যিনি তা বুঝতে পারছেন না। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 37,
    "sectionId": "skill_and_abilities",
    "category": "Computer Skills",
    "question": "You are given a computer task that you have not done before. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Try to learn it step by step.",
        "level": 4,
        "contributions": [
          {
            "trait": "computer_skills",
            "level": 4
          },
          {
            "trait": "growth_mindset",
            "level": 4
          }
        ],
        "textHi": "इसे चरणबद्ध तरीके से सीखने का प्रयास करेंगे।",
        "textBn": "ধাপে ধাপে এটি শেখার চেষ্টা করবেন।"
      },
      {
        "id": "b",
        "text": "Avoid doing it because you do not know it.",
        "level": 1,
        "contributions": [
          {
            "trait": "computer_skills",
            "level": 1
          }
        ],
        "textHi": "इसे करने से बचेंगे क्योंकि आप इसे नहीं जानते।",
        "textBn": "না জানার কারণে কাজটি করা এড়িয়ে চলবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone to do it for you.",
        "level": 2,
        "contributions": [
          {
            "trait": "computer_skills",
            "level": 2
          }
        ],
        "textHi": "किसी और से अपने लिए इसे करने को कहेंगे।",
        "textBn": "অন্য কাউকে এটি করে দিতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Try it yourself, use available help, and learn how to do it correctly.",
        "level": 5,
        "contributions": [
          {
            "trait": "computer_skills",
            "level": 5
          },
          {
            "trait": "troubleshooting",
            "level": 5
          },
          {
            "trait": "independent_working",
            "level": 4
          }
        ],
        "textHi": "स्वयं प्रयास करेंगे, उपलब्ध सहायता/ट्यूटोरियल का उपयोग करेंगे और सही तरीका सीखेंगे।",
        "textBn": "নিজে চেষ্টা করবেন, উপলব্ধ সহায়িকা ব্যবহার করবেন এবং সঠিকভাবে করতে শিখবেন।"
      },
      {
        "id": "e",
        "text": "Try a few things and see what works.",
        "level": 3,
        "contributions": [
          {
            "trait": "computer_skills",
            "level": 3
          }
        ],
        "textHi": "कुछ तरीके आजमाएंगे और देखेंगे कि क्या काम करता है।",
        "textBn": "কয়েকটি জিনিস চেষ্টা করে দেখবেন কোনটি কাজ করে।"
      }
    ],
    "categoryHi": "कंप्यूटर कौशल (Computer Skills)",
    "categoryBn": "কম্পিউটার দক্ষতা (Computer Skills)",
    "questionHi": "आपको कंप्यूटर पर एक ऐसा कार्य दिया गया है जो आपने पहले कभी नहीं किया है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনাকে কম্পিউটারে এমন একটি কাজ দেওয়া হয়েছে যা আপনি আগে করেননি। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 38,
    "sectionId": "skill_and_abilities",
    "category": "Excel",
    "question": "You have a large list of numbers in Excel and need to find the total and compare the results. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Add the numbers manually without checking.",
        "level": 2,
        "contributions": [
          {
            "trait": "excel_skills",
            "level": 2
          },
          {
            "trait": "numerical_reasoning",
            "level": 2
          }
        ],
        "textHi": "बिना जांचे मैन्युअल रूप से संख्याओं को जोड़ लेंगे।",
        "textBn": "যাচাই না করে নিজে নিজে সংখ্যাগুলি যোগ করবেন।"
      },
      {
        "id": "b",
        "text": "Use Excel tools or formulas and check the result.",
        "level": 4,
        "contributions": [
          {
            "trait": "excel_skills",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 4
          },
          {
            "trait": "data_precision",
            "level": 4
          }
        ],
        "textHi": "एक्सेल टूल या फ़ार्मुलों का उपयोग करेंगे और परिणाम की जांच करेंगे।",
        "textBn": "এক্সেল টুল বা ফর্মুলা ব্যবহার করবেন এবং ফলাফল পরীক্ষা করবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone else to do it.",
        "level": 1,
        "contributions": [
          {
            "trait": "excel_skills",
            "level": 1
          }
        ],
        "textHi": "किसी और से इसे करने के लिए कहेंगे।",
        "textBn": "অন্য কাউকে এটি করতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Use formulas, check the result, and look for errors if the numbers do not match.",
        "level": 5,
        "contributions": [
          {
            "trait": "excel_skills",
            "level": 5
          },
          {
            "trait": "data_analytics",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          }
        ],
        "textHi": "फ़ार्मुलों का उपयोग करेंगे, परिणाम की जांच करेंगे और संख्याएँ मेल न खाने पर त्रुटियाँ खोजेंगे।",
        "textBn": "ফর্মুলা ব্যবহার করবেন, ফলাফল যাচাই করবেন এবং সংখ্যা না মিললে ভুল খুঁজবেন।"
      },
      {
        "id": "e",
        "text": "Use a simple formula to get the total.",
        "level": 3,
        "contributions": [
          {
            "trait": "excel_skills",
            "level": 3
          }
        ],
        "textHi": "कुल योग प्राप्त करने के लिए एक सरल फ़ॉर्मूले का उपयोग करेंगे।",
        "textBn": "মোট যোগফল বের করতে একটি সহজ ফর্মুলা ব্যবহার করবেন।"
      }
    ],
    "categoryHi": "एक्सेल कौशल (Excel Skills)",
    "categoryBn": "এক্সেল দক্ষতা (Excel Skills)",
    "questionHi": "एक्सेल में आपके पास संख्याओं की एक बड़ी सूची है और आपको कुल योग निकालना है और परिणामों की तुलना करनी है। आप क्या करेंगे?",
    "questionBn": "এক্সেল-এ আপনার কাছে প্রচুর সংখ্যার তালিকা আছে এবং আপনাকে মোট যোগফল বের করে ফলাফলের তুলনা করতে হবে। আপনি কী করবেন?"
  },
  {
    "id": 39,
    "sectionId": "skill_and_abilities",
    "category": "Sales",
    "question": "A customer is interested in a product but is not ready to buy. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Keep asking them to buy until they agree.",
        "level": 2,
        "contributions": [
          {
            "trait": "sales_acumen",
            "level": 2
          },
          {
            "trait": "persistence",
            "level": 3
          }
        ],
        "textHi": "जब तक वे सहमत न हों, बार-बार खरीदने के लिए कहते रहेंगे।",
        "textBn": "সম্মতি না দেওয়া পর্যন্ত বারবার কেনার জন্য বলতে থাকবেন।"
      },
      {
        "id": "b",
        "text": "Leave them alone without asking what they need.",
        "level": 1,
        "contributions": [
          {
            "trait": "sales_acumen",
            "level": 1
          }
        ],
        "textHi": "उनकी ज़रूरत पूछे बिना उन्हें छोड़ देंगे।",
        "textBn": "তাদের কী প্রয়োজন তা না জেনেই তাদের ছেড়ে দেবেন।"
      },
      {
        "id": "c",
        "text": "Explain the product again and answer their questions.",
        "level": 3,
        "contributions": [
          {
            "trait": "sales_acumen",
            "level": 3
          },
          {
            "trait": "communication",
            "level": 3
          }
        ],
        "textHi": "उत्पाद के बारे में फिर से समझाएंगे और उनके सवालों के जवाब देंगे।",
        "textBn": "পণ্যটি সম্পর্কে পুনরায় ব্যাখ্যা করবেন এবং তাদের প্রশ্নের উত্তর দেবেন।"
      },
      {
        "id": "d",
        "text": "Understand what they need, explain the right benefits, and help them decide.",
        "level": 5,
        "contributions": [
          {
            "trait": "sales_acumen",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 5
          },
          {
            "trait": "empathy",
            "level": 4
          },
          {
            "trait": "enterprising",
            "level": 5
          }
        ],
        "textHi": "उनकी ज़रूरत को समझेंगे, सही लाभ समझाएंगे और उन्हें निर्णय लेने में मदद करेंगे।",
        "textBn": "তাদের প্রয়োজন বুঝবেন, সঠিক সুবিধাগুলি ব্যাখ্যা করবেন এবং সিদ্ধান্ত নিতে সাহায্য করবেন।"
      },
      {
        "id": "e",
        "text": "Ask about their needs and suggest a suitable product.",
        "level": 4,
        "contributions": [
          {
            "trait": "sales_acumen",
            "level": 4
          },
          {
            "trait": "customer_service",
            "level": 4
          }
        ],
        "textHi": "उनकी ज़रूरतों के बारे में पूछेंगे और एक उपयुक्त उत्पाद का सुझाव देंगे।",
        "textBn": "তাদের চাহিদা সম্পর্কে জানতে চাইবেন এবং উপযুক্ত কোনো পণ্যের পরামর্শ দেবেন।"
      }
    ],
    "categoryHi": "बिक्री कौशल (Sales Skills)",
    "categoryBn": "বিক্রয় দক্ষতা (Sales Skills)",
    "questionHi": "एक ग्राहक किसी उत्पाद में रुचि रखता है लेकिन खरीदने के लिए तैयार नहीं है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "একজন গ্রাহক একটি পণ্যে আগ্রহী কিন্তু এখনই কিনতে প্রস্তুত নন। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 40,
    "sectionId": "skill_and_abilities",
    "category": "Accounting",
    "question": "You are checking financial records and notice that two numbers are different. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Choose the number that looks correct.",
        "level": 1,
        "contributions": [
          {
            "trait": "accounting_skills",
            "level": 1
          }
        ],
        "textHi": "वह संख्या चुन लेंगे जो सही दिखती है।",
        "textBn": "যে সংখ্যাটি সঠিক মনে হয় তা বেছে নেবেন।"
      },
      {
        "id": "b",
        "text": "Check the related records to find where the difference came from.",
        "level": 5,
        "contributions": [
          {
            "trait": "accounting_skills",
            "level": 5
          },
          {
            "trait": "analytical_thinking",
            "level": 5
          },
          {
            "trait": "quality_orientation",
            "level": 5
          },
          {
            "trait": "conventional",
            "level": 5
          }
        ],
        "textHi": "अंतर कहाँ से आया यह जानने के लिए संबंधित रिकॉर्ड की जांच करेंगे।",
        "textBn": "পার্থক্যটি কোথা থেকে এসেছে তা জানতে সংশ্লিষ্ট নথিপত্র পরীক্ষা করবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone else to check it.",
        "level": 2,
        "contributions": [
          {
            "trait": "accounting_skills",
            "level": 2
          }
        ],
        "textHi": "किसी अन्य व्यक्ति से इसकी जांच करने के लिए कहेंगे।",
        "textBn": "অন্য কাউকে এটি পরীক্ষা করতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Check the numbers again before making any change.",
        "level": 3,
        "contributions": [
          {
            "trait": "accounting_skills",
            "level": 3
          },
          {
            "trait": "structured_work",
            "level": 3
          }
        ],
        "textHi": "कोई भी बदलाव करने से पहले संख्याओं की दोबारा जांच करेंगे।",
        "textBn": "কোনো পরিবর্তন করার আগে সংখ্যাগুলি আবার যাচাই করবেন।"
      },
      {
        "id": "e",
        "text": "Compare the records and find the possible reason for the difference.",
        "level": 4,
        "contributions": [
          {
            "trait": "accounting_skills",
            "level": 4
          },
          {
            "trait": "numerical_reasoning",
            "level": 4
          }
        ],
        "textHi": "रिकॉर्ड की तुलना करेंगे और अंतर के संभावित कारण का पता लगाएंगे।",
        "textBn": "নথিপত্র তুলনা করবেন এবং অমিলের সম্ভাব্য কারণটি খুঁজে বের করবেন।"
      }
    ],
    "categoryHi": "लेखांकन कौशल (Accounting Skills)",
    "categoryBn": "হিসাবরক্ষণ দক্ষতা (Accounting Skills)",
    "questionHi": "आप वित्तीय रिकॉर्ड की जांच कर रहे हैं और देखते हैं कि दो संख्याएं अलग हैं। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনি আর্থিক হিসাব পরীক্ষা করছেন এবং লক্ষ্য করলেন দুটি সংখ্যা মিলছে না। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 41,
    "sectionId": "skill_and_abilities",
    "category": "Manual Dexterity",
    "question": "You need to use your hands to do a small, careful task. How would you usually work?",
    "options": [
      {
        "id": "a",
        "text": "Work quickly even if some small mistakes happen.",
        "level": 2,
        "contributions": [
          {
            "trait": "manual_dexterity",
            "level": 2
          }
        ],
        "textHi": "जल्दी-जल्दी काम करेंगे भले ही कुछ छोटी गलतियाँ हो जाएं।",
        "textBn": "ছোটখাটো কিছু ভুল হলেও দ্রুত কাজ করবেন।"
      },
      {
        "id": "b",
        "text": "Find it difficult to work with small objects.",
        "level": 1,
        "contributions": [
          {
            "trait": "manual_dexterity",
            "level": 1
          }
        ],
        "textHi": "छोटी वस्तुओं के साथ काम करना कठिन लगेगा।",
        "textBn": "ছোটখাটো জিনিস নিয়ে কাজ করা কঠিন মনে হবে।"
      },
      {
        "id": "c",
        "text": "Work slowly and carefully to keep the work accurate.",
        "level": 4,
        "contributions": [
          {
            "trait": "manual_dexterity",
            "level": 4
          },
          {
            "trait": "quality_orientation",
            "level": 4
          }
        ],
        "textHi": "काम को सटीक रखने के लिए धीरे-धीरे और सावधानी से काम करेंगे।",
        "textBn": "কাজটি নির্ভুল রাখতে ধীরেসুস্থে এবং সতর্কতার সাথে কাজ করবেন।"
      },
      {
        "id": "d",
        "text": "Work carefully, control your hand movements, and keep checking the result.",
        "level": 5,
        "contributions": [
          {
            "trait": "manual_dexterity",
            "level": 5
          },
          {
            "trait": "hand_eye_coordination",
            "level": 5
          },
          {
            "trait": "realistic",
            "level": 5
          }
        ],
        "textHi": "सावधानी से काम करेंगे, हाथों की गतिविधियों पर नियंत्रण रखेंगे और परिणाम की लगातार जांच करते रहेंगे।",
        "textBn": "সতর্কতার সাথে কাজ করবেন, হাতের নড়াচড়া নিয়ন্ত্রণে রাখবেন এবং নিয়মিত ফলাফল পরীক্ষা করবেন।"
      },
      {
        "id": "e",
        "text": "Take some time to get comfortable and then continue.",
        "level": 3,
        "contributions": [
          {
            "trait": "manual_dexterity",
            "level": 3
          }
        ],
        "textHi": "अभ्यस्त होने के लिए थोड़ा समय लेंगे और फिर जारी रखेंगे।",
        "textBn": "স্বচ্ছন্দ হতে কিছুটা সময় নেবেন এবং তারপর কাজ চালিয়ে যাবেন।"
      }
    ],
    "categoryHi": "हाथों की निपुणता (Manual Dexterity)",
    "categoryBn": "হাতের দক্ষতা (Manual Dexterity)",
    "questionHi": "आपको हाथों का उपयोग करके एक छोटा, सावधानी भरा काम करना है। आप आमतौर पर कैसे काम करेंगे?",
    "questionBn": "আপনাকে হাত ব্যবহার করে একটি সূক্ষ্ম ও সতর্কতার কাজ করতে হবে। আপনি সাধারণত কীভাবে কাজ করবেন?"
  },
  {
    "id": 42,
    "sectionId": "skill_and_abilities",
    "category": "Hand-Eye Coordination",
    "question": "You need to place or move small objects accurately while watching their position. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Do it quickly and correct mistakes afterward.",
        "level": 2,
        "contributions": [
          {
            "trait": "hand_eye_coordination",
            "level": 2
          }
        ],
        "textHi": "जल्दी से करेंगे और गलतियाँ बाद में ठीक करेंगे।",
        "textBn": "দ্রুত করে নেবেন এবং ভুল হলে পরে সংশোধন করবেন।"
      },
      {
        "id": "b",
        "text": "Watch carefully and control your hand movement as you work.",
        "level": 4,
        "contributions": [
          {
            "trait": "hand_eye_coordination",
            "level": 4
          },
          {
            "trait": "manual_dexterity",
            "level": 4
          }
        ],
        "textHi": "काम करते समय ध्यान से देखेंगे और अपने हाथ की गति को नियंत्रित रखेंगे।",
        "textBn": "কাজের সময় মনোযোগ দিয়ে পর্যবেক্ষণ করবেন এবং হাতের গতি নিয়ন্ত্রণ করবেন।"
      },
      {
        "id": "c",
        "text": "Ask someone else to do it.",
        "level": 1,
        "contributions": [
          {
            "trait": "hand_eye_coordination",
            "level": 1
          }
        ],
        "textHi": "किसी और से इसे करने के लिए कहेंगे।",
        "textBn": "অন্য কাউকে এটি করতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Practice the movement until you can do it smoothly and accurately.",
        "level": 5,
        "contributions": [
          {
            "trait": "hand_eye_coordination",
            "level": 5
          },
          {
            "trait": "manual_dexterity",
            "level": 5
          },
          {
            "trait": "persistence",
            "level": 4
          }
        ],
        "textHi": "तब तक अभ्यास करेंगे जब तक कि आप इसे सहज और सटीक रूप से न कर सकें।",
        "textBn": "যতক্ষণ না মসৃণ ও নির্ভুলভাবে করতে পারছেন ততক্ষণ নড়াচড়াটি অনুশীলন করবেন।"
      },
      {
        "id": "e",
        "text": "Take your time and try to keep the movement steady.",
        "level": 3,
        "contributions": [
          {
            "trait": "hand_eye_coordination",
            "level": 3
          }
        ],
        "textHi": "समय लेंगे और हाथ की गति को स्थिर रखने का प्रयास करेंगे।",
        "textBn": "সময় নেবেন এবং হাতের গতি স্থির রাখার চেষ্টা করবেন।"
      }
    ],
    "categoryHi": "हाथ-आँख समन्वय (Hand-Eye Coordination)",
    "categoryBn": "হাত ও চোখের সমন্বয় (Hand-Eye Coordination)",
    "questionHi": "छोटी वस्तुओं की स्थिति पर नज़र रखते हुए उन्हें सटीक रूप से रखना या हिलाना है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "ছোট বস্তুর অবস্থানের দিকে নজর রেখে সেগুলিকে সঠিকভাবে স্থাপন বা সরাতে হবে। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 43,
    "sectionId": "skill_and_abilities",
    "category": "Technical Troubleshooting",
    "question": "A machine or device suddenly stops working. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Try random things to make it work again.",
        "level": 2,
        "contributions": [
          {
            "trait": "troubleshooting",
            "level": 2
          }
        ],
        "textHi": "इसे फिर से चालू करने के लिए बिना सोचे-समझे अलग-अलग चीज़ें आज़माएंगे।",
        "textBn": "এটি আবার চালু করার জন্য উদ্দেশ্যহীনভাবে এলোমেলো জিনিস চেষ্টা করবেন।"
      },
      {
        "id": "b",
        "text": "Wait for someone else to fix it.",
        "level": 1,
        "contributions": [
          {
            "trait": "troubleshooting",
            "level": 1
          }
        ],
        "textHi": "किसी और के ठीक करने की प्रतीक्षा करेंगे।",
        "textBn": "অন্য কেউ ঠিক করার জন্য অপেক্ষা করবেন।"
      },
      {
        "id": "c",
        "text": "Check the basic things first.",
        "level": 3,
        "contributions": [
          {
            "trait": "troubleshooting",
            "level": 3
          }
        ],
        "textHi": "पहले बुनियादी चीज़ों की जांच करेंगे (जैसे बिजली/प्लग)।",
        "textBn": "প্রথমে প্রাথমিক বিষয়গুলি পরীক্ষা করবেন।"
      },
      {
        "id": "d",
        "text": "Check the system step by step, find the possible cause, and then fix the problem safely.",
        "level": 5,
        "contributions": [
          {
            "trait": "troubleshooting",
            "level": 5
          },
          {
            "trait": "logical_reasoning",
            "level": 5
          },
          {
            "trait": "computer_skills",
            "level": 4
          },
          {
            "trait": "realistic",
            "level": 4
          }
        ],
        "textHi": "सिस्टम की चरणबद्ध जांच करेंगे, संभावित कारण खोजेंगे और फिर समस्या को सुरक्षित रूप से ठीक करेंगे।",
        "textBn": "ধাপে ধাপে সিস্টেম পরীক্ষা করবেন, সম্ভাব্য কারণ খুঁজে বের করবেন এবং তারপর নিরাপদে সমস্যাটি সমাধান করবেন।"
      },
      {
        "id": "e",
        "text": "Check the main parts and try to find where the problem started.",
        "level": 4,
        "contributions": [
          {
            "trait": "troubleshooting",
            "level": 4
          },
          {
            "trait": "analytical_thinking",
            "level": 4
          }
        ],
        "textHi": "मुख्य भागों की जांच करेंगे और समस्या कहाँ से शुरू हुई यह पता लगाने की कोशिश करेंगे।",
        "textBn": "প্রধান অংশগুলি পরীক্ষা করবেন এবং समस्याটি কোথা থেকে शुरू হয়েছে তা খোঁজার চেষ্টা করবেন।"
      }
    ],
    "categoryHi": "तकनीकी समस्या निवारण (Troubleshooting)",
    "categoryBn": "কারিগরি সমস্যা সমাধান (Troubleshooting)",
    "questionHi": "कोई मशीन या उपकरण अचानक काम करना बंद कर देता है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "একটি মেশিন বা যন্ত্র হঠাৎ কাজ করা বন্ধ করে দিল। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 44,
    "sectionId": "skill_and_abilities",
    "category": "Customer Service",
    "question": "A customer has the same problem for the second time. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Tell them that the problem has already been handled.",
        "level": 1,
        "contributions": [
          {
            "trait": "customer_service",
            "level": 1
          },
          {
            "trait": "communication",
            "level": 1
          }
        ],
        "textHi": "उनसे कहेंगे कि समस्या पहले ही हल हो चुकी है।",
        "textBn": "তাদের বলবেন যে সমস্যাটি আগেই সমাধান করা হয়েছে।"
      },
      {
        "id": "b",
        "text": "Listen to the customer and try to solve the problem again.",
        "level": 4,
        "contributions": [
          {
            "trait": "customer_service",
            "level": 4
          },
          {
            "trait": "patience",
            "level": 4
          }
        ],
        "textHi": "ग्राहक की बात सुनेंगे और समस्या को फिर से हल करने का प्रयास करेंगे।",
        "textBn": "গ্রাহকের কথা শুনবেন এবং সমস্যাটি আবার সমাধান করার চেষ্টা করবেন।"
      },
      {
        "id": "c",
        "text": "Ask another person to handle it.",
        "level": 2,
        "contributions": [
          {
            "trait": "customer_service",
            "level": 2
          }
        ],
        "textHi": "किसी अन्य व्यक्ति से इसे संभालने के लिए कहेंगे।",
        "textBn": "অন্য কাউকে এটি সামলাতে বলবেন।"
      },
      {
        "id": "d",
        "text": "Listen carefully, understand the full problem, solve it, and make sure the customer knows what to do next.",
        "level": 5,
        "contributions": [
          {
            "trait": "customer_service",
            "level": 5
          },
          {
            "trait": "communication",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 4
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "ध्यान से सुनेंगे, पूरी समस्या समझेंगे, समाधान करेंगे और सुनिश्चित करेंगे कि ग्राहक को आगे क्या करना है यह पता हो।",
        "textBn": "মনোযোগ দিয়ে শুনবেন, পুরো সমস্যাটি বুঝবেন, সমাধান করবেন এবং নিশ্চিত করবেন যে গ্রাহক পরবর্তী করণীয় জানেন।"
      },
      {
        "id": "e",
        "text": "Check what was done before and try the same solution again.",
        "level": 3,
        "contributions": [
          {
            "trait": "customer_service",
            "level": 3
          },
          {
            "trait": "structured_work",
            "level": 3
          }
        ],
        "textHi": "देखेंगे कि पहले क्या किया गया था और उसी समाधान को फिर से आज़माएंगे।",
        "textBn": "আগে কী করা হয়েছিল তা দেখবেন এবং একই সমাধান আবার চেষ্টা করবেন।"
      }
    ],
    "categoryHi": "ग्राहक सेवा (Customer Service)",
    "categoryBn": "গ্রাহক সেবা (Customer Service)",
    "questionHi": "एक ग्राहक को दूसरी बार वही समस्या आ रही है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "একজন গ্রাহক দ্বিতীয়বার একই সমস্যার সম্মুখীন হয়েছেন। আপনি সবচেয়ে বেশি কী করবেন?"
  },
  {
    "id": 45,
    "sectionId": "skill_and_abilities",
    "category": "Leadership",
    "question": "You are responsible for a small group working on a task. One person is having difficulty completing their part. What would you most likely do?",
    "options": [
      {
        "id": "a",
        "text": "Take their work and finish it yourself.",
        "level": 2,
        "contributions": [
          {
            "trait": "leadership",
            "level": 2
          },
          {
            "trait": "independent_working",
            "level": 3
          }
        ],
        "textHi": "उनका काम ले लेंगे और खुद पूरा करेंगे।",
        "textBn": "তাদের কাজ নিজের হাতে নিয়ে নিজেই শেষ করবেন।"
      },
      {
        "id": "b",
        "text": "Ignore it because everyone is responsible for their own work.",
        "level": 1,
        "contributions": [
          {
            "trait": "leadership",
            "level": 1
          },
          {
            "trait": "teamwork",
            "level": 1
          }
        ],
        "textHi": "इसे अनदेखा करेंगे क्योंकि हर कोई अपने काम के लिए खुद जिम्मेदार है।",
        "textBn": "উপেক্ষা করবেন কারণ প্রত্যেকে নিজের কাজের জন্য নিজেই দায়ী।"
      },
      {
        "id": "c",
        "text": "Ask what problem they are facing and give some help.",
        "level": 4,
        "contributions": [
          {
            "trait": "leadership",
            "level": 4
          },
          {
            "trait": "teamwork",
            "level": 4
          },
          {
            "trait": "empathy",
            "level": 4
          }
        ],
        "textHi": "पूछेंगे कि उन्हें क्या समस्या आ रही है और कुछ मदद देंगे।",
        "textBn": "তারা কী সমস্যার মুখোমুখি হচ্ছেন তা জানতে চাইবেন এবং কিছু সাহায্য করবেন।"
      },
      {
        "id": "d",
        "text": "Understand the problem, guide the person, adjust the work if needed, and make sure the whole team reaches the goal.",
        "level": 5,
        "contributions": [
          {
            "trait": "leadership",
            "level": 5
          },
          {
            "trait": "problem_solving",
            "level": 4
          },
          {
            "trait": "team_coordination",
            "level": 5
          },
          {
            "trait": "target_orientation",
            "level": 5
          }
        ],
        "textHi": "समस्या को समझेंगे, व्यक्ति का मार्गदर्शन करेंगे, ज़रूरत पड़ने पर कार्य में समायोजन करेंगे और सुनिश्चित करेंगे कि पूरी टीम लक्ष्य तक पहुंचे।",
        "textBn": "সমস্যাটি বুঝবেন, ব্যক্তিকে পথনির্দেশ দেবেন, প্রয়োজনে কাজ পুনর্নির্ধারণ করবেন এবং পুরো দল যাতে লক্ষ্যে পৌঁছায় তা নিশ্চিত করবেন।"
      },
      {
        "id": "e",
        "text": "Tell them to try again and give them some time.",
        "level": 3,
        "contributions": [
          {
            "trait": "leadership",
            "level": 3
          },
          {
            "trait": "patience",
            "level": 3
          }
        ],
        "textHi": "उनसे फिर से प्रयास करने के लिए कहेंगे और उन्हें थोड़ा समय देंगे।",
        "textBn": "তাদের আবার চেষ্টা করতে বলবেন এবং তাদের কিছুটা সময় দেবেন।"
      }
    ],
    "categoryHi": "नेतृत्व (Leadership)",
    "categoryBn": "নেতৃত্ব (Leadership)",
    "questionHi": "आप किसी कार्य पर काम कर रहे एक छोटे समूह के लिए जिम्मेदार हैं। एक व्यक्ति को अपना हिस्सा पूरा करने में कठिनाई हो रही है। आप सबसे अधिक क्या करेंगे?",
    "questionBn": "আপনি একটি কাজে নিয়োজিত একটি ছোট দলের দায়িত্বে আছেন। একজন ব্যক্তির তার অংশ শেষ করতে সমস্যা হচ্ছে। আপনি সবচেয়ে বেশি কী করবেন?"
  }
];

module.exports = {
  QUESTION_BANK,
};
