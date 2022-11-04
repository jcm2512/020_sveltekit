import PrismaClientPkg from '@prisma/client';

// Prisma doesn't support ES Modules
const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();

export function randomUrl() {
	return Math.random().toString(16).slice(2);
}

// gets random time starting from now and
// going back one day whenever you seed the
// database in the future

export function randomDate() {
	const offset = 24 * 60 * 60 * 1000; // one full day

	const current = new Date().getTime();
	const random = Math.random() * offset;
	const difference = new Date(current - random);

	return difference.toISOString();
}

function getUsers() {
	return [
		{
			name: 'joey',
			handle: '@2512jcm',
			email: 'joe@example.com',
			avatar: '/profile/joey/avatar.webp',
			about: 'nothing',
			tweets: {
				create: [
					{
						url: randomUrl(),
						posted: randomDate(),
						content: 'Sveltekit is awesome',
						likes: 99
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: 'I love Svelte',
						likes: 10
					}
				]
			}
		},
		{
			name: 'bob',
			handle: '@bobross',
			email: 'bob@example.test',
			avatar: '/profile/bob/avatar.webp',
			about: 'Likes painting.',
			tweets: {
				create: [
					{
						url: randomUrl(),
						posted: randomDate(),
						content: 'Use your imagination.',
						likes: 10
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `The only thing I have control over is taking out the trash. 😂`,
						likes: 4
					}
				]
			}
		}
	];
}

async function seed() {
	const users = getUsers();

	for (const user of users) {
		await prisma.user.create({ data: user });
	}
}

seed();
