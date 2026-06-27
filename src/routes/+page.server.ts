import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.token) {
		throw redirect(307, '/home');
	}

	return {};
}