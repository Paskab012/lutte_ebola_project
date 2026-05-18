import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 3001);
  const apiPrefix = config.get<string>('app.apiPrefix', 'api/v1');
  const corsOrigins = config.get<string>('app.corsOrigins', 'http://localhost:3000');

  // Global prefix & versioning
  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({ type: VersioningType.URI });

  // CORS
  app.enableCors({
    origin: corsOrigins.split(',').map((o) => o.trim()),
    credentials: true,
  });

  // Global pipes / filters / interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ─── Swagger ──────────────────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lutte Ebola API')
    .setDescription(
      `## Humanitarian Disease Management System\n\n` +
      `Real-time epidemic case management, outbreak surveillance, and emergency alert system. ` +
      `Built to support field response operations against Ebola and configurable for other diseases.\n\n` +
      `### Authentication\n` +
      `Use **POST /auth/login** to obtain an access token, then click **Authorize** and paste ` +
      `\`Bearer <token>\`.\n\n` +
      `### Roles\n` +
      `| Role | Description |\n` +
      `|------|-------------|\n` +
      `| SUPER_ADMIN | Full access, can manage users and system config |\n` +
      `| ADMIN | Manage outbreaks, cases, zones, reports |\n` +
      `| EPIDEMIOLOGIST | Create/update cases and reports |\n` +
      `| VIEWER | Read-only access |`,
    )
    .setVersion('1.0.0')
    .setContact('OMS/WHO Goma Sub-Office', '', 'contact@cfnk.org')
    .setLicense('MIT', '')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addTag('auth', 'Authentication & session management')
    .addTag('users', 'User account management')
    .addTag('diseases', 'Disease registry (multi-disease support)')
    .addTag('outbreaks', 'Active outbreak declarations')
    .addTag('cases', 'Individual case management')
    .addTag('zones', 'Geographic health zones')
    .addTag('alerts', 'Emergency alert system')
    .addTag('reports', 'Epidemiological reports')
    .addTag('analytics', 'Dashboard analytics & statistics')
    .addTag('symptom-submissions', 'Public symptom checker submissions')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Lutte Ebola API Docs',
  });

  await app.listen(port);
  console.log(`\n🚀 API running at http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 Swagger docs at http://localhost:${port}/docs\n`);
}

bootstrap();
