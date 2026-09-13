/**
 * 45 Psychometric Career Assessment Questions - Calibrated 6 Sections Architecture
 * Clean UI options (No L1-L5 levels shown to candidates)
 */

export const ASSESSMENT_SECTIONS = [
  {
    "id": "aptitude",
    "order": 1,
    "title": "Aptitude",
    "title_hi": "योग्यता (Aptitude)",
    "title_bn": "যোগ্যতা (Aptitude)",
    "shortDesc": "Logic, problem-solving & reasoning",
    "description": "Assesses numerical reasoning, logical problem-solving, and systematic evaluation.",
    "icon": "🧠",
    "color": "blue"
  },
  {
    "id": "personality",
    "order": 2,
    "title": "Personality Traits",
    "title_hi": "व्यक्तित्व लक्षण (Personality)",
    "title_bn": "ব্যক্তিত্ব বৈশিষ্ট্য (Personality)",
    "shortDesc": "Confidence, adaptability & resilience",
    "description": "Explores behavioral traits, confidence, adaptability, and personal accountability.",
    "icon": "🎭",
    "color": "purple"
  },
  {
    "id": "work_style",
    "order": 3,
    "title": "Work Style",
    "title_hi": "कार्य शैली (Work Style)",
    "title_bn": "কাজের ধরন (Work Style)",
    "shortDesc": "Collaboration, autonomy & structure",
    "description": "Identifies preferences for teamwork, independent execution, and quality focus.",
    "icon": "💼",
    "color": "amber"
  },
  {
    "id": "career_interest",
    "order": 4,
    "title": "Career Interest",
    "title_hi": "करियर रुचि (Career Interest)",
    "title_bn": "পেশাগত আগ্রহ (Career Interest)",
    "shortDesc": "Realistic, investigative & enterprising interests",
    "description": "Maps innate passion toward technical, analytical, artistic, social, or commercial paths.",
    "icon": "🧭",
    "color": "emerald"
  },
  {
    "id": "emotional_intelligence",
    "order": 5,
    "title": "Emotional Intelligence",
    "title_hi": "भावनात्मक बुद्धिमत्ता (EQ)",
    "title_bn": "আবেগীয় বুদ্ধিমত্তা (EQ)",
    "shortDesc": "Self-control, empathy & composure",
    "description": "Measures interpersonal empathy, emotional self-regulation, and composure under pressure.",
    "icon": "❤️",
    "color": "rose"
  },
  {
    "id": "skill_and_abilities",
    "order": 6,
    "title": "Skills & Abilities",
    "title_hi": "कौशल एवं क्षमताएं (Skills)",
    "title_bn": "দক্ষতা ও সক্ষমতা (Skills)",
    "shortDesc": "Communication, computer, sales & leadership",
    "description": "Evaluates hands-on technical skills, communication, sales, and group leadership.",
    "icon": "🛠️",
    "color": "teal"
  }
];

export const ASSESSMENT_QUESTIONS = [
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
  }
];

export const TOTAL_ASSESSMENT_QUESTIONS = ASSESSMENT_QUESTIONS.length;

export function getLocalizedSection(sec, language = 'en') {
  if (!sec) return sec;
  if (language === 'hi') {
    return {
      ...sec,
      title: sec.title_hi || sec.title,
    };
  }
  if (language === 'bn') {
    return {
      ...sec,
      title: sec.title_bn || sec.title,
    };
  }
  return sec;
}

export function getLocalizedQuestion(q, language = 'en') {
  if (!q) return q;
  return q;
}

export default ASSESSMENT_QUESTIONS;
