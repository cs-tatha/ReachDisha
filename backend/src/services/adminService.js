const prisma = require('../config/db');

class AdminService {
  /**
   * Retrieves paginated students with search and filtering
   * Uses LIMIT and OFFSET (skip & take) and explicit column projection (no SELECT *)
   * @param {object} params
   * @param {number} params.page
   * @param {number} params.limit
   * @param {string} params.search
   */
  async getPaginatedStudents({ page = 1, limit = 10, search = '' }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Filter by student role and optional search query
    const where = {
      role: 'student',
    };

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { fullName: { contains: q } },
        { phone: { contains: q } },
        { city: { contains: q } },
      ];
    }

    // Run count and paginated query in parallel using a transaction
    const [total, students] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        // Architectural Best Practice: Explicit column selection, preventing `SELECT *`
        select: {
          id: true,
          userId: true,
          fullName: true,
          firstName: true,
          middleName: true,
          lastName: true,
          phone: true,
          dob: true,
          age: true,
          fatherName: true,
          motherName: true,
          state: true,
          city: true,
          pincode: true,
          address: true,
          education: true,
          role: true,
          avatar: true,
          createdAt: true,
          assessmentResults: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              id: true,
              answers: true,
              traitScores: true,
              topSkillDomains: true,
              recommendedCareers: true,
              strengths: true,
              skillGaps: true,
              createdAt: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);
    const hasMore = pageNum < totalPages;

    // Map to student format expected by frontend
    const formatted = students.map((s) => {
      const latestResult = s.assessmentResults && s.assessmentResults[0] ? s.assessmentResults[0] : null;
      const answersMap = latestResult?.answers || {};
      const rawCount = Object.keys(answersMap).length;
      const isCompleted = Boolean(latestResult && rawCount > 0);
      const answeredCount = isCompleted ? Math.max(rawCount, 45) : rawCount;

      return {
        ...s,
        id: s.userId || `u-student-${s.id}`,
        dbId: s.id,
        mobile: s.phone,
        assessment: {
          isCompleted,
          status: isCompleted ? 'Completed' : answeredCount > 0 ? 'In Progress' : 'Not Started',
          answeredCount: isCompleted ? 45 : answeredCount,
          totalQuestions: 45,
          leftCount: Math.max(0, 45 - (isCompleted ? 45 : answeredCount)),
          percentage: isCompleted ? 100 : Math.round((answeredCount / 45) * 100),
          evaluatedAt: latestResult?.createdAt || null,
        },
        assessmentResult: latestResult ? {
          ...latestResult,
          evaluatedAt: latestResult.createdAt,
        } : null,
      };
    });

    return {
      students: formatted,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasMore,
      },
    };
  }

  /**
   * Retrieves full assessment report for a specific student
   * @param {string} userId
   */
  async getStudentAssessmentReport(userId) {
    const student = await prisma.user.findFirst({
      where: {
        OR: [
          { userId },
          { phone: userId },
        ],
      },
      select: {
        id: true,
        userId: true,
        fullName: true,
        phone: true,
        dob: true,
        age: true,
        fatherName: true,
        motherName: true,
        education: true,
        city: true,
        state: true,
        pincode: true,
        address: true,
        createdAt: true,
        assessmentResults: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!student) {
      return null;
    }

    const latest = student.assessmentResults?.[0] || null;
    return {
      student: {
        id: student.userId,
        userId: student.userId,
        fullName: student.fullName,
        phone: student.phone,
        mobile: student.phone,
        dob: student.dob,
        age: student.age,
        fatherName: student.fatherName,
        motherName: student.motherName,
        education: student.education,
        city: student.city,
        state: student.state,
        pincode: student.pincode,
        address: student.address,
        createdAt: student.createdAt,
      },
      report: latest ? {
        ...latest,
        evaluatedAt: latest.createdAt,
      } : null,
    };
  }
}

module.exports = new AdminService();
