import { NextResponse } from 'next/server';
import { db } from '@/db/dbconfig';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
	try {
		const { name } = await req.json();
		const id = uuidv4();

		const normalizedName = name.trim().toUpperCase();

		const existing = await db('Guests').whereRaw('UPPER(name) = ?', [normalizedName]).first();

		if (existing) {
			return NextResponse.json({
				success: false,
				message: 'Usted ya se encuentra en la lista de invitados.',
			});
		}

		await db('Guests').insert({
			id,
			name: normalizedName,
		});

		return NextResponse.json({
			success: true,
			message: '¡Gracias por confirmar tu asistencia!',
		});
	} catch (error) {
		console.error('Error creating guest:', error);
		return NextResponse.json({ success: false, error }, { status: 500 });
	}
}

export async function GET() {
	try {
		const guests = await db('Guests').select('*').orderBy('create_at', 'asc');

		return NextResponse.json({ success: true, guests });
	} catch (error) {
		console.error('Error fetching guests:', error);
		return NextResponse.json({ success: false, error }, { status: 500 });
	}
}
