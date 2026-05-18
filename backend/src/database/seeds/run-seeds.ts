import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'lutte_ebola',
    password: process.env.DB_PASSWORD || 'change_me_in_production',
    database: process.env.DB_NAME || 'lutte_ebola_db',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
  });

  await ds.initialize();
  console.log('Connected to database, seeding…');

  // ── Disease: Ebola Virus Disease ───────────────────────────────────────────
  const diseaseRepo = ds.getRepository('diseases');
  let disease = await diseaseRepo.findOne({ where: { code: 'EVD' } });
  if (!disease) {
    disease = await diseaseRepo.save({
      name: 'Ebola Virus Disease',
      code: 'EVD',
      description: 'Severe, often fatal illness caused by Ebolavirus. Transmitted through direct contact with body fluids of infected persons.',
      pathogen: 'Ebolavirus (Zaire strain)',
      incubationMinDays: 2,
      incubationMaxDays: 21,
      caseFatalityRate: 0.4,
      symptoms: ['fever', 'severe headache', 'muscle pain', 'weakness', 'fatigue', 'diarrhea', 'vomiting', 'abdominal pain', 'unexplained hemorrhage'],
      preventionMeasures: ['hand hygiene', 'PPE use', 'safe burial practices', 'isolation of cases', 'contact tracing', 'vaccination (rVSV-ZEBOV)'],
      isNotifiable: true,
      whoReferenceUrl: 'https://www.who.int/health-topics/ebola',
      status: 'ACTIVE',
    });
    console.log('Created disease: Ebola Virus Disease');
  }

  // ── Outbreak: Active 2024 outbreak ────────────────────────────────────────
  const outbreakRepo = ds.getRepository('outbreaks');
  let outbreak = await outbreakRepo.findOne({ where: { code: 'EVD-2024-DRC-14' } });
  if (!outbreak) {
    outbreak = await outbreakRepo.save({
      name: 'Épidémie Ebola 2024 — Nord-Kivu / Ituri',
      code: 'EVD-2024-DRC-14',
      diseaseId: disease.id,
      status: 'ACTIVE',
      severity: 'LEVEL_2',
      startDate: '2024-01-07',
      affectedProvinces: ['Nord-Kivu', 'Ituri'],
      totalCases: 336,
      totalDeaths: 88,
      totalRecovered: 210,
      isPheic: true,
      notes: 'Active surveillance zone. PHEIC declared by WHO.',
    });
    console.log('Created outbreak: EVD-2024-DRC-14');
  }

  // ── Zones ─────────────────────────────────────────────────────────────────
  const zoneRepo = ds.getRepository('zones');
  const zones = [
    { name: 'Zone de Santé de Mongbwalu', province: 'Ituri', territory: 'Djugu', riskLevel: 'CRITICAL', latitude: 1.9421, longitude: 30.0283, population: 320000 },
    { name: 'Zone de Santé de Bunia', province: 'Ituri', territory: 'Irumu', riskLevel: 'HIGH', latitude: 1.5605, longitude: 30.2480, population: 580000 },
    { name: 'Zone de Santé de Butembo', province: 'Nord-Kivu', territory: 'Lubero', riskLevel: 'HIGH', latitude: 0.1395, longitude: 29.2862, population: 1200000 },
    { name: 'Zone de Santé de Beni', province: 'Nord-Kivu', territory: 'Beni', riskLevel: 'MODERATE', latitude: 0.4953, longitude: 29.4689, population: 720000 },
    { name: 'Zone de Santé de Goma', province: 'Nord-Kivu', territory: 'Goma', riskLevel: 'MODERATE', latitude: -1.6792, longitude: 29.2287, population: 800000 },
  ];

  for (const z of zones) {
    const exists = await zoneRepo.findOne({ where: { name: z.name } });
    if (!exists) {
      await zoneRepo.save({ ...z, type: 'HEALTH_ZONE', isActive: true });
      console.log(`Created zone: ${z.name}`);
    }
  }

  // ── Super Admin user ───────────────────────────────────────────────────────
  const userRepo = ds.getRepository('users');
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@lutte-ebola.org';
  const existing = await userRepo.findOne({ where: { email: adminEmail } });
  if (!existing) {
    const password = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || 'Admin@12345', 12);
    await userRepo.save({
      fullName: 'System Administrator',
      email: adminEmail,
      password,
      role: 'SUPER_ADMIN',
      organization: 'OMS/WHO',
      location: 'Goma, RDC',
      isActive: true,
    });
    console.log(`Created super admin: ${adminEmail}`);
  }

  await ds.destroy();
  console.log('\nSeed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
