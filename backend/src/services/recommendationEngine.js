/**
 * Career Recommendation Engine (Multidimensional Scoring & Vocational Curriculum Matching)
 * 
 * Calibrated exclusively to ReachDisha / CCC's 11 Official Vocational Training Sectors,
 * Course Programs, and Mapped Job Roles.
 * 
 * Algorithm:
 * 1. Multi-Area Trait Accumulation: Extracts raw ordinal levels (1-5) from answers
 * 2. Proportional Competency Matching: Evaluates candidate against the 11 Vocational Sectors & Courses
 * 3. Top Three Selection: Strictly outputs candidate's top 3 recommended training domains
 * 4. Mapped Job Roles: Embeds the exact official curriculum job roles for each domain
 * 5. Strengths & Skill Gaps: Delivers targeted vocational developmental insights
 */

const { QUESTION_BANK } = require('../config/questionBank');

// 11 Official Vocational Training Sectors, Courses & Mapped Job Roles
const VOCATIONAL_DOMAINS = [
  {
    id: 'bfsi',
    sector: 'BFSI',
    courseName: 'Banking, Financial Services & Insurance',
    title: 'BFSI • Banking, Financial Services & Insurance',
    icon: '🏦',
    color: 'blue',
    description: 'Training in banking procedures, financial accounting, credit assessment, insurance advisory, and KYC/branch documentation operations.',
    mappedJobRoles: [
      'Banking Executive',
      'Banking Associate',
      'Customer Service Executive',
      'Relationship Executive',
      'Relationship Officer',
      'Sales Executive',
      'Field Sales Executive',
      'Insurance Executive',
      'Insurance Advisor',
      'Loan/Collection Executive',
      'Financial Services Associate',
    ],
    requiredTraits: {
      numerical_reasoning: 4.8,
      attention_to_detail: 4.6,
      conventional: 4.5,
      communication: 4.2,
      responsibility: 4.5,
    },
  },
  {
    id: 'it_digital_skills',
    sector: 'IT & Digital Skills',
    courseName: 'Basic Computer with Advanced Excel',
    title: 'IT & Digital Skills • Basic Computer with Advanced Excel',
    icon: '💻',
    color: 'indigo',
    description: 'Comprehensive computer literacy, advanced spreadsheet functions, MIS reporting, data entry management, and automated office workflows.',
    mappedJobRoles: [
      'Data Entry Operator',
      'Computer Operator',
      'MIS Executive',
      'MIS Assistant',
      'Back Office Executive',
      'Data Processing Executive',
      'Office Assistant',
      'Documentation Executive',
      'Computer Assistant',
      'Operations Executive',
    ],
    requiredTraits: {
      logical_reasoning: 4.8,
      problem_solving: 4.6,
      investigative: 4.5,
      computer_skills: 4.8,
      learning_ability: 4.5,
    },
  },
  {
    id: 'crm_customer_service',
    sector: 'CRM & Customer Service',
    courseName: 'Customer Relationship Management (Non-Voice)',
    title: 'CRM & Customer Service • Customer Relationship Management (Non-Voice)',
    icon: '💬',
    color: 'teal',
    description: 'Client relationship management, email and live chat support protocols, CRM ticket lifecycle handling, and digital customer escalation resolution.',
    mappedJobRoles: [
      'Customer Support Executive',
      'CRM Executive',
      'Customer Service Associate',
      'Customer Relationship Executive',
      'Back Office Executive',
      'Non-Voice Process Associate',
      'Chat Support Executive',
      'Email Support Executive',
      'Process Associate',
      'Client Support Executive',
    ],
    requiredTraits: {
      communication: 4.8,
      empathy: 4.8,
      customer_service: 4.8,
      social: 4.5,
      self_control: 4.5,
    },
  },
  {
    id: 'retail_management',
    sector: 'Retail Management',
    courseName: 'Retail Management',
    title: 'Retail Management • Retail Management',
    icon: '🛍️',
    color: 'amber',
    description: 'Retail floor operations, inventory merchandising, POS billing and cash counter operations, customer assistance, and store sales management.',
    mappedJobRoles: [
      'Retail Sales Associate',
      'Sales Executive',
      'Store Associate',
      'Store Executive',
      'Customer Service Associate',
      'Cashier',
      'Retail Associate',
      'Sales Promoter',
      'Store Assistant',
      'Visual Merchandising Assistant',
      'Stock Associate',
      'Department Associate',
    ],
    requiredTraits: {
      sales: 4.8,
      communication: 4.6,
      enterprising: 4.5,
      customer_service: 4.5,
      leadership: 4.5,
    },
  },
  {
    id: 'warehouse_logistics',
    sector: 'Warehouse & Logistics',
    courseName: 'Warehouse Associate',
    title: 'Warehouse & Logistics • Warehouse Associate',
    icon: '📦',
    color: 'orange',
    description: 'Catalog storage, inventory bin tracking, picking, packing, dispatch documentation, material handling safety, and supply chain logistics.',
    mappedJobRoles: [
      'Warehouse Associate',
      'Warehouse Executive',
      'Logistics Assistant',
      'Inventory Assistant',
      'Store Assistant',
      'Store Keeper',
      'Picker',
      'Packer',
      'Dispatch Executive',
      'Loading/Unloading Associate',
      'Inventory Executive',
      'Material Handling Associate',
      'Supply Chain Assistant',
    ],
    requiredTraits: {
      attention_to_detail: 4.6,
      realistic: 4.6,
      inventory_skills: 4.8,
      physical_coordination: 4.5,
      discipline: 4.5,
    },
  },
  {
    id: 'healthcare_gda',
    sector: 'Healthcare – GDA',
    courseName: 'General Duty Assistant',
    title: 'Healthcare – GDA • General Duty Assistant',
    icon: '🏥',
    color: 'emerald',
    description: 'Hospital patient care assistance, vital signs recording, ward hygiene management, bedside mobility support, and clinical nursing assistance.',
    mappedJobRoles: [
      'General Duty Assistant',
      'Patient Care Assistant',
      'Hospital Attendant',
      'Healthcare Assistant',
      'Patient Care Associate',
      'Nursing Assistant',
      'Home Care Assistant',
      'Ward Assistant',
      'Hospital Support Staff',
      'Clinical Support Assistant',
      'Caregiver',
    ],
    requiredTraits: {
      empathy: 4.8,
      patient_care: 4.8,
      responsibility: 4.6,
      social: 4.5,
      patience: 4.8,
    },
  },
  {
    id: 'electrical_technical',
    sector: 'Electrical & Technical Skills',
    courseName: 'Junior Electrician',
    title: 'Electrical & Technical Skills • Junior Electrician',
    icon: '⚡',
    color: 'yellow',
    description: 'Industrial and domestic wiring, electrical switchgear maintenance, appliance troubleshooting, circuit installations, and electrical safety codes.',
    mappedJobRoles: [
      'Junior Electrician',
      'Electrical Assistant',
      'Electrical Technician',
      'Maintenance Assistant',
      'Maintenance Technician',
      'Field Technician',
      'Service Technician',
      'Wiring Technician',
      'Installation Assistant',
      'Electrical Helper',
      'Facility Technician',
    ],
    requiredTraits: {
      logical_reasoning: 4.8,
      problem_solving: 4.6,
      realistic: 4.8,
      technical_skills: 4.8,
      safety: 4.8,
    },
  },
  {
    id: 'beauty_wellness',
    sector: 'Beauty & Wellness',
    courseName: 'Advanced Beautician',
    title: 'Beauty & Wellness • Advanced Beautician',
    icon: '✨',
    color: 'pink',
    description: 'Professional skincare therapies, bridal makeup artistry, salon treatment hygiene, hair styling, client aesthetic consultations, and spa wellness.',
    mappedJobRoles: [
      'Beautician',
      'Beauty Therapist',
      'Salon Assistant',
      'Beauty Consultant',
      'Makeup Artist',
      'Hair Stylist Assistant',
      'Skin Care Therapist',
      'Nail Care Assistant',
      'Spa Assistant',
      'Bridal Makeup Assistant',
      'Salon Executive',
      'Beauty Advisor',
    ],
    requiredTraits: {
      artistic: 4.8,
      social: 4.6,
      creativity: 4.6,
      customer_service: 4.6,
      manual_dexterity: 4.5,
    },
  },
  {
    id: 'apparel_tailoring',
    sector: 'Apparel & Tailoring',
    courseName: 'Tailoring',
    title: 'Apparel & Tailoring • Tailoring',
    icon: '✂️',
    color: 'rose',
    description: 'Custom pattern drafting, fabric measurement, cutting, bespoke garment alteration, boutique tailoring, and hand-stitching finishing methods.',
    mappedJobRoles: [
      'Tailor',
      'Tailoring Assistant',
      'Sewing Assistant',
      'Garment Worker',
      'Boutique Assistant',
      'Alteration Assistant',
      'Stitching Assistant',
      'Production Assistant',
      'Garment Finishing Assistant',
      'Self-Employed Tailor',
    ],
    requiredTraits: {
      manual_dexterity: 4.8,
      attention_to_detail: 4.6,
      realistic: 4.6,
      pattern_recognition: 4.8,
      patience: 4.5,
    },
  },
  {
    id: 'apparel_garment_production',
    sector: 'Apparel & Garment Production',
    courseName: 'Sewing Machine Operator',
    title: 'Apparel & Garment Production • Sewing Machine Operator',
    icon: '🧵',
    color: 'purple',
    description: 'Industrial sewing machinery operations, factory assembly line garment stitching, speed seam execution, quality checking, and defect inspection.',
    mappedJobRoles: [
      'Sewing Machine Operator',
      'Sewing Operator',
      'Garment Production Assistant',
      'Garment Worker',
      'Stitching Operator',
      'Production Operator',
      'Sewing Assistant',
      'Finishing Assistant',
      'Quality Checking Assistant',
      'Garment Factory Worker',
    ],
    requiredTraits: {
      routine_work: 4.8,
      realistic: 4.6,
      manual_dexterity: 4.8,
      quality_orientation: 4.8,
      discipline: 4.5,
    },
  },
  {
    id: 'facility_management',
    sector: 'Facility Management',
    courseName: 'Facility Management',
    title: 'Facility Management • Facility Management',
    icon: '🏢',
    color: 'slate',
    description: 'Commercial facility upkeep, corporate housekeeping operations, office maintenance support, property safety oversight, and hygiene maintenance.',
    mappedJobRoles: [
      'Facility Assistant',
      'Facility Executive',
      'Housekeeping Associate',
      'Housekeeping Assistant',
      'Maintenance Assistant',
      'Cleaning Associate',
      'Facility Support Staff',
      'Office Support Assistant',
      'Property Maintenance Assistant',
      'Facility Operations Assistant',
    ],
    requiredTraits: {
      problem_solving: 4.8,
      responsibility: 4.6,
      practical_skills: 4.6,
      teamwork: 4.5,
      safety: 4.8,
    },
  },
];

// Semantic trait aliases for robust ontology matching
const TRAIT_ALIASES = {
  learning_ability: ['adaptability', 'curiosity', 'growth_mindset', 'self_confidence'],
  self_control: ['emotional_self_control', 'emotional_stability', 'patience'],
  inventory_skills: ['inventory_operations', 'structured_work', 'data_precision', 'excel_skills'],
  physical_coordination: ['hand_eye_coordination', 'manual_dexterity'],
  discipline: ['self_discipline', 'quality_orientation', 'routine_work'],
  patient_care: ['healthcare_skills', 'customer_service', 'empathy', 'social'],
  technical_skills: ['troubleshooting', 'computer_skills', 'logical_reasoning'],
  safety: ['safety_skills', 'quality_orientation', 'responsibility', 'structured_work'],
  practical_skills: ['troubleshooting', 'hands_on', 'manual_dexterity', 'realistic', 'problem_solving'],
  sales: ['sales_acumen', 'enterprising'],
  conventional: ['conventional', 'data_precision', 'structured_work', 'accounting_skills'],
  realistic: ['realistic', 'hands_on', 'manual_dexterity', 'hand_eye_coordination'],
  social: ['social', 'communication', 'empathy', 'customer_service'],
  investigative: ['investigative', 'analytical_thinking', 'critical_thinking', 'research_aptitude'],
  enterprising: ['enterprising', 'leadership', 'sales_acumen'],
  artistic: ['artistic', 'creativity', 'visual_thinking'],
  attention_to_detail: ['quality_orientation', 'precision', 'analytical_thinking'],
};

class RecommendationEngine {
  /**
   * Main recommendation pipeline
   * @param {Record<number|string, string>} answers - Map of questionId -> selectedOptionId ('a'-'e')
   */
  calculateRecommendation(answers = {}) {
    // 1. Accumulate Trait Scores from Multi-Area Contributions
    const traitScoresMap = {};

    QUESTION_BANK.forEach((q) => {
      const selectedOptionKey = answers[q.id] || answers[String(q.id)];
      if (!selectedOptionKey) return;

      const option = q.options.find(
        (opt) => opt.id.toLowerCase() === selectedOptionKey.toLowerCase()
      );
      if (!option) return;

      // Base category level contribution
      const baseCategoryTrait = this._sanitizeTraitKey(q.category);
      if (!traitScoresMap[baseCategoryTrait]) traitScoresMap[baseCategoryTrait] = [];
      traitScoresMap[baseCategoryTrait].push(option.level);

      // Multi-area contributions
      if (Array.isArray(option.contributions)) {
        option.contributions.forEach((contrib) => {
          const tKey = contrib.trait;
          if (!traitScoresMap[tKey]) traitScoresMap[tKey] = [];
          traitScoresMap[tKey].push(contrib.level);
        });
      }
    });

    // Compute average level (1 - 5) and percentage (0 - 100%) for each trait
    const normalizedTraits = {};
    Object.keys(traitScoresMap).forEach((trait) => {
      const arr = traitScoresMap[trait];
      const avg = arr.reduce((acc, val) => acc + val, 0) / arr.length;
      normalizedTraits[trait] = {
        level: Number(avg.toFixed(2)),
        percentage: Math.round((avg / 5) * 100),
      };
    });

    // 2. Evaluate Candidate Against All 11 Official Vocational Training Sectors
    const scoredDomains = VOCATIONAL_DOMAINS.map((domain) => {
      const reqTraits = domain.requiredTraits;
      let matchSum = 0;
      let maxPossible = 0;

      const domainTraits = [];
      const strengths = [];
      const skillGaps = [];

      Object.entries(reqTraits).forEach(([traitKey, requiredLevel]) => {
        const userLevel = this._resolveTraitScore(normalizedTraits, traitKey);
        const diff = userLevel - requiredLevel;

        const weight = requiredLevel;
        const fulfillment = userLevel >= requiredLevel
          ? 1.0
          : Math.max(0.15, userLevel / requiredLevel);

        matchSum += fulfillment * weight;
        maxPossible += weight;

        const formattedTraitName = this._formatTraitName(traitKey);
        const traitPercentage = Math.round((userLevel / 5) * 100);

        domainTraits.push({
          trait: formattedTraitName,
          level: userLevel,
          percentage: traitPercentage,
        });

        if (diff >= -0.25) {
          strengths.push({
            trait: formattedTraitName,
            userLevel,
            requiredLevel,
            description: `Strong aptitude demonstrated in ${formattedTraitName} (${traitPercentage}%), meeting vocational course benchmark.`,
          });
        } else {
          skillGaps.push({
            trait: formattedTraitName,
            userLevel,
            requiredLevel,
            gapPercent: Math.round(((requiredLevel - userLevel) / 5) * 100),
            recommendation: `Building proficiency in ${formattedTraitName} will strengthen readiness for the ${domain.courseName} program.`,
          });
        }
      });

      const matchScore = Math.min(99, Math.round((matchSum / maxPossible) * 100));
      domainTraits.sort((a, b) => b.percentage - a.percentage);

      return {
        id: domain.id,
        sector: domain.sector,
        courseName: domain.courseName,
        title: `${domain.sector} • ${domain.courseName}`,
        icon: domain.icon,
        color: domain.color,
        description: domain.description,
        mappedJobRoles: domain.mappedJobRoles,
        typicalRoles: domain.mappedJobRoles, // Backward compatibility
        domain: domain.sector,
        matchScore,
        scorePercentage: matchScore,
        percentage: matchScore,
        topTraits: domainTraits.slice(0, 3),
        strengths: strengths.slice(0, 3),
        skillGaps: skillGaps.slice(0, 3),
      };
    });

    // 3. Sort by Match Score Descending & Extract Strictly TOP THREE
    scoredDomains.sort((a, b) => b.matchScore - a.matchScore);

    const topThreeDomains = scoredDomains.slice(0, 3).map((domain, rank) => ({
      rank: rank + 1,
      ...domain,
    }));

    // 4. Global Top Strengths & Skill Gaps across candidate profile
    const allStrengths = [];
    const allGaps = [];
    Object.entries(normalizedTraits).forEach(([trait, data]) => {
      const formatted = this._formatTraitName(trait);
      if (data.percentage >= 75) {
        allStrengths.push({ trait: formatted, percentage: data.percentage });
      } else if (data.percentage <= 55) {
        allGaps.push({ trait: formatted, percentage: data.percentage });
      }
    });

    allStrengths.sort((a, b) => b.percentage - a.percentage);
    allGaps.sort((a, b) => a.percentage - b.percentage);

    return {
      topSkillDomains: topThreeDomains,
      allSkillDomains: scoredDomains,
      recommendedCareers: topThreeDomains, // Strictly mapped to top 3 vocational courses
      allCareers: scoredDomains,
      topStrengths: allStrengths.slice(0, 5),
      skillGaps: allGaps.slice(0, 5),
      normalizedTraits,
      totalQuestionsEvaluated: Object.keys(answers).length,
      evaluatedAt: new Date().toISOString(),
    };
  }

  _sanitizeTraitKey(categoryName) {
    return String(categoryName || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  _formatTraitName(traitKey) {
    return String(traitKey || '')
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  _resolveTraitScore(normalizedTraits, traitKey) {
    const sanitizedKey = this._sanitizeTraitKey(traitKey);

    // 1. Direct match with sanitized key
    if (normalizedTraits[sanitizedKey]) {
      return normalizedTraits[sanitizedKey].level;
    }

    // 2. Direct match with raw key
    if (normalizedTraits[traitKey]) {
      return normalizedTraits[traitKey].level;
    }

    // 3. Check alias list
    const aliases = TRAIT_ALIASES[sanitizedKey] || TRAIT_ALIASES[traitKey];
    if (Array.isArray(aliases)) {
      for (const alias of aliases) {
        if (normalizedTraits[alias]) {
          return normalizedTraits[alias].level;
        }
      }
    }

    // 4. Default benchmark baseline
    return 2.5;
  }
}

module.exports = new RecommendationEngine();
