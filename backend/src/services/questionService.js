const prisma = require('../config/db');

class QuestionService {
  /**
   * Fetches questions from MySQL with their calibrated options
   * Can filter by specific section (e.g., 'aptitude') or return all
   * @param {object} filter
   * @param {string} [filter.sectionId]
   * @param {string} [filter.category]
   */
  async getQuestions({ sectionId, category }) {
    const where = {};

    if (sectionId && sectionId !== 'all') {
      where.sectionId = sectionId;
    }

    if (category) {
      where.category = category;
    }

    const questions = await prisma.question.findMany({
      where,
      orderBy: { id: 'asc' },
      include: {
        options: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            questionId: true,
            optionKey: true,
            option: true,
            optionHi: true,
            optionBn: true,
            option_related_to: true,
            option_level: true,
          },
        },
      },
    });

    // Map to frontend expectation format
    return questions.map((q) => ({
      id: q.id,
      questionId: q.questionId || `q-${q.id}`,
      sectionId: q.sectionId,
      category: q.category,
      category_hi: q.categoryHi,
      category_bn: q.categoryBn,
      question: q.question,
      question_hi: q.questionHi,
      question_bn: q.questionBn,
      options: q.options.map((opt) => ({
        id: opt.optionKey,
        dbId: opt.id,
        text: opt.option,
        text_hi: opt.optionHi,
        text_bn: opt.optionBn,
        option_related_to: opt.option_related_to,
        option_level: opt.option_level,
      })),
    }));
  }

  /**
   * Adds a new question with options into the database
   */
  async addQuestion({ sectionId = 'aptitude', category, question, options }) {
    return prisma.$transaction(async (tx) => {
      const newQuestion = await tx.question.create({
        data: {
          sectionId,
          category: category.trim(),
          question: question.trim(),
        },
      });

      if (Array.isArray(options)) {
        for (let idx = 0; idx < options.length; idx++) {
          const opt = options[idx];
          await tx.option.create({
            data: {
              questionId: newQuestion.id,
              optionKey: opt.id || String.fromCharCode(97 + idx),
              option: opt.text.trim(),
              option_related_to: category.trim(),
              option_level: idx + 1,
            },
          });
        }
      }

      return this.getQuestionById(newQuestion.id, tx);
    });
  }

  /**
   * Fetches single question by ID
   */
  async getQuestionById(id, dbClient = prisma) {
    const q = await dbClient.question.findUnique({
      where: { id: Number(id) },
      include: { options: true },
    });

    if (!q) return null;

    return {
      id: q.id,
      sectionId: q.sectionId,
      category: q.category,
      question: q.question,
      options: q.options.map((opt) => ({
        id: opt.optionKey,
        dbId: opt.id,
        text: opt.option,
        option_level: opt.option_level,
      })),
    };
  }

  /**
   * Deletes a question and its cascading options
   */
  async deleteQuestion(id) {
    await prisma.question.delete({
      where: { id: Number(id) },
    });
    return { success: true };
  }
}

module.exports = new QuestionService();
