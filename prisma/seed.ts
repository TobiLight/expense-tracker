import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
    return await db.user.create({
        data: {
            username: 'tobi',
            passwordHash: '$2a$12$7KysFWAz6flEBEstPhtyB.0AHKBiZQns1g3HkgtACZVRhp8px/5ZW',

        }
    })

    // let expense = await db.expense.create({
    //     data: {
    //         description: 'Order from client - Tosin',
    //         type: 'CREDIT',
    //         category: 'CAKE',
    //         amount: 13500,
    //         userId: tobi.id
    //     }
    // })

    // return await db.account.create({
    //     data: {
    //         userId: tobi.id,
    //         income: 0,
    //         savings: 0
    //     }
    // })
}

seed().catch((e) => {
    console.log(e);
    throw e
})
    .finally(async () => {
        // await db.$disconnect()
    })