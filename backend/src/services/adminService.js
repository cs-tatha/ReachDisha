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
          assessmentProgress: true,
          retakeCount: true,
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
      const progress = s.assessmentProgress || null;

      const resultAnswersMap = (latestResult?.answers && typeof latestResult.answers === 'object') ? latestResult.answers : {};
      const progressAnswersMap = (progress?.answers && typeof progress.answers === 'object') ? progress.answers : {};

      const resultAnswersCount = Object.keys(resultAnswersMap).length;
      const progressAnswersCount = Object.keys(progressAnswersMap).length || progress?.answeredCount || 0;

      // Active retake or active in-progress state:
      // When a student clicks retake, progress.isStarted is true and isCompleted is false.
      const isActivelyRetaking = Boolean(progress?.isStarted && !progress?.isCompleted);

      // Student is only considered completed if NOT actively retaking and either has progress.isCompleted or valid result
      const isCompleted = isActivelyRetaking ? false : Boolean(
        progress?.isCompleted ||
        (latestResult && resultAnswersCount > 0)
      );

      const totalQuestions = progress?.totalQuestions || 45;
      const answeredCount = isCompleted ? totalQuestions : (isActivelyRetaking ? progressAnswersCount : (progressAnswersCount || resultAnswersCount));
      const percentage = isCompleted ? 100 : Math.min(100, Math.round((answeredCount / totalQuestions) * 100));
      const status = isCompleted ? 'Completed' : (answeredCount > 0 ? 'In Progress' : 'Not Started');

      return {
        ...s,
        id: s.userId || `u-student-${s.id}`,
        dbId: s.id,
        mobile: s.phone,
        retakeCount: s.retakeCount || progress?.retakeCount || 0,
        assessment: {
          isCompleted,
          status,
          answeredCount,
          totalQuestions,
          leftCount: Math.max(0, totalQuestions - answeredCount),
          percentage,
          answers: isActivelyRetaking ? progressAnswersMap : (Object.keys(resultAnswersMap).length > 0 ? resultAnswersMap : progressAnswersMap),
          evaluatedAt: isActivelyRetaking ? (progress?.updatedAt || null) : (latestResult?.createdAt || progress?.updatedAt || null),
        },
        assessmentResult: isActivelyRetaking ? null : (latestResult ? {
          ...latestResult,
          evaluatedAt: latestResult.createdAt,
        } : null),
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
    const cleanId = String(userId || '').trim();
    const whereOr = [
      { userId: cleanId },
      { phone: cleanId },
    ];
    if (!isNaN(Number(cleanId))) {
      whereOr.push({ id: Number(cleanId) });
    }

    const student = await prisma.user.findFirst({
      where: {
        OR: whereOr,
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
        assessmentProgress: true,
        retakeCount: true,
        assessmentResults: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!student) {
      return null;
    }

    const isActivelyRetaking = Boolean(
      student.assessmentProgress?.isStarted && !student.assessmentProgress?.isCompleted
    );

    const latest = isActivelyRetaking ? null : (student.assessmentResults?.[0] || null);
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
        retakeCount: student.retakeCount || 0,
        isActivelyRetaking,
      },
      report: latest ? {
        ...latest,
        evaluatedAt: latest.createdAt,
      } : null,
    };
  }
}

module.exports = new AdminService();
