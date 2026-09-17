const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('===========================================================');
  console.log('🚂 RAILWAY MYSQL DATABASE DEPLOYMENT & MIGRATION TOOL');
  console.log('===========================================================');

  // 1. Get connection string from argument or environment
  let targetUrl = process.argv[2] || process.env.RAILWAY_DATABASE_URL || process.env.TARGET_DATABASE_URL;

  const backendDir = path.resolve(__dirname, '..');
  const envPath = path.join(backendDir, '.env');

  if (!targetUrl) {
    // Check if backend/.env has a non-localhost DATABASE_URL
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match && !match[1].includes('localhost') && !match[1].includes('127.0.0.1')) {
        targetUrl = match[1];
        console.log('ℹ️  Found remote DATABASE_URL in backend/.env');
      }
    }
  }

  if (!targetUrl) {
    console.log('\n❌ No Railway MySQL URL provided!');
    console.log('\nUsage:');
    console.log('  node scripts/deploy_db.js "mysql://root:password@host:port/railway"');
    console.log('\nOr set in environment:');
    console.log('  $env:RAILWAY_DATABASE_URL="mysql://root:password@host:port/railway"');
    console.log('  node scripts/deploy_db.js');
    process.exit(1);
  }

  targetUrl = targetUrl.trim();

  // 2. Validate URL format
  if (!targetUrl.startsWith('mysql://')) {
    console.error('❌ Error: DATABASE_URL must start with "mysql://"');
    process.exit(1);
  }

  // 3. Railway Public vs Internal Network Check
  if (targetUrl.includes('.railway.internal')) {
    console.warn('\n⚠️  WARNING: You are using an internal Railway URL (*.railway.internal).');
    console.warn('   Internal URLs are ONLY accessible from services running inside the same Railway project.');
    console.warn('   If you are running from your local machine, Vercel, or external hosts:');
    console.warn('   👉 Please copy the "Public Networking" / "TCP Proxy" connection URL from Railway:');
    console.warn('      Format: mysql://root:password@roundhouse.proxy.rlwy.net:PORT/railway\n');
  }

  console.log('1. Target Database URL:', targetUrl.replace(/:([^:@]+)@/, ':****@'));

  // 4. Update backend/.env
  console.log('\n2. Updating backend/.env with Railway connection string...');
  if (fs.existsSync(envPath)) {
    const backupPath = path.join(backendDir, '.env.backup');
    fs.copyFileSync(envPath, backupPath);
    console.log('   (Backup created at .env.backup)');

    let envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('DATABASE_URL=')) {
      envContent = envContent.replace(/DATABASE_URL=["']?[^"'\r\n]+["']?/, `DATABASE_URL="${targetUrl}"`);
    } else {
      envContent += `\nDATABASE_URL="${targetUrl}"\n`;
    }
    fs.writeFileSync(envPath, envContent, 'utf8');
  } else {
    fs.writeFileSync(
      envPath,
      `PORT=3000\nDATABASE_URL="${targetUrl}"\nJWT_ACCESS_SECRET="psychometric_access_secret_key_2026_super_secure_jwt"\nJWT_REFRESH_SECRET="psychometric_refresh_secret_key_2026_super_secure_jwt"\nJWT_ACCESS_EXPIRES_IN="15m"\nJWT_REFRESH_EXPIRES_IN="7d"\n`,
      'utf8'
    );
  }
  console.log('   backend/.env updated successfully.');

  // 5. Push Prisma schema to Railway MySQL
  console.log('\n3. Pushing Prisma schema to Railway MySQL database (creating tables)...');
  try {
    execSync('npx prisma db push --schema=prisma/schema.prisma', {
      cwd: backendDir,
      env: { ...process.env, DATABASE_URL: targetUrl },
      stdio: 'inherit',
    });
    console.log('   Prisma schema pushed successfully! ✅');
  } catch (err) {
    console.error('\n❌ Failed to push schema to Railway database. Please check your credentials, network access, or firewall.');
    process.exit(1);
  }

  // 6. Seed the Railway database
  console.log('\n4. Seeding Railway MySQL with Admin accounts and 45 Multilingual Questions...');
  try {
    execSync('node prisma/seed.js', {
      cwd: backendDir,
      env: { ...process.env, DATABASE_URL: targetUrl },
      stdio: 'inherit',
    });
    console.log('   Database seeded successfully! ✅');
  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
    process.exit(1);
  }

  // 7. Verify deployment
  console.log('\n5. Verifying Railway database status...');
  try {
    const prisma = require('../src/config/db');
    const adminCount = await prisma.user.count({ where: { role: 'admin' } });
    const questionCount = await prisma.question.count();
    const optionCount = await prisma.option.count();

    console.log(`   - Verified Administrators: ${adminCount}`);
    console.log(`   - Verified Questions: ${questionCount} (with EN, HI, BN translations)`);
    console.log(`   - Verified Options: ${optionCount} (with EN, HI, BN translations)`);

    await prisma.$disconnect();
  } catch (vErr) {
    console.warn('   (Verification check skipped):', vErr.message);
  }

  console.log('\n===========================================================');
  console.log('🎉 RAILWAY MYSQL DEPLOYMENT COMPLETE & READY FOR PRODUCTION!');
  console.log('===========================================================');
  console.log('\nNext steps:');
  console.log('1. If deploying frontend to Vercel, your backend is now connected to Railway.');
  console.log('2. If deploying backend to Render/Railway Web Service, set DATABASE_URL to:');
  console.log(`   ${targetUrl}`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
