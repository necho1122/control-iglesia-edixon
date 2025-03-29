import { db, collection, addDoc } from '@/lib/firebase';

export async function POST(req) {
	try {
		const body = await req.json();

		// Validar datos obligatorios
		if (!body.cantidad || !body.articulo || !body.fecha) {
			return new Response(
				JSON.stringify({ message: 'Todos los campos son obligatorios' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Agregar a Firebase
		const docRef = await addDoc(collection(db, 'donacion'), body);

		return new Response(
			JSON.stringify({ message: 'Ingreso agregado', id: docRef.id }),
			{ status: 201, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Error al agregar ingreso',
				error: error.message,
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
