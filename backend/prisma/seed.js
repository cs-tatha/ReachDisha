const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { QUESTION_BANK } = require('../src/config/questionBank');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with updated 45-question bank and admins...');

  // 1. Seed Admins
  const adminPasswordHash = await bcrypt.hash('admin123', 10);

  const admin1 = await prisma.user.upsert({
    where: { phone: '9876543210' },
    update: { password: adminPasswordHash, role: 'admin' },
    create: {
      userId: 'u-admin-1',
      fullName: 'Head Administrator (ReachDisha)',
      phone: '9876543210',
      password: adminPasswordHash,
      role: 'admin',
      education: 'Master of Technology',
    },
  });

  const admin2 = await prisma.user.upsert({
    where: { phone: '9876543211' },
    update: { password: adminPasswordHash, role: 'admin' },
    create: {
      userId: 'u-admin-2',
      fullName: 'System Administrator (CCC)',
      phone: '9876543211',
      password: adminPasswordHash,
      role: 'admin',
      education: 'Postgraduate',
    },
  });

  console.log('Admins verified by phone:', admin1.phone, admin2.phone);

  // 2. Clear old questions to prevent ID collision and cleanly seed 45 questions
  await prisma.option.deleteMany({});
  await prisma.question.deleteMany({});

  console.log(`Seeding ${QUESTION_BANK.length} calibrated questions...`);

  for (const q of QUESTION_BANK) {
    const questionRecord = await prisma.question.create({
      data: {
        id: q.id,
        questionId: `q-${q.id}`,
        sectionId: q.sectionId,
        category: q.category,
        categoryHi: q.categoryHi || null,
        categoryBn: q.categoryBn || null,
        question: q.question,
        questionHi: q.questionHi || null,
        questionBn: q.questionBn || null,
      },
    });

    for (let idx = 0; idx < q.options.length; idx++) {
      const opt = q.options[idx];
      await prisma.option.create({
        data: {
          questionId: questionRecord.id,
          optionKey: opt.id,
          option: opt.text,
          optionHi: opt.textHi || null,
          optionBn: opt.textBn || null,
          option_level: opt.level,
          option_related_to: q.category,
          contributions: opt.contributions,
        },
      });
    }
  }

  console.log('All 45 questions and 225 options successfully seeded into MySQL!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
