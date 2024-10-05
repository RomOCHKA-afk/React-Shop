import { INestApplication } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect(); // Connect to the database when the module is initialized
    }

    async enableShutdownHooks(app: INestApplication) {
        // Enable shutdown hooks to close the application gracefully
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
