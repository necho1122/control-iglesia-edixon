import { db, collection, getDocs } from '@/lib/firebase';

export async function GET() {
	try {
		// Referencia a la colección 'productos'
		const productosCollection = collection(db, 'donacion');

		// Obtener los documentos de la colección
		const productosSnapshot = await getDocs(productosCollection);

		// Convertir los documentos a un arreglo de objetos
		const productosList = productosSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		// Devolver los datos como JSON
		return new Response(JSON.stringify(productosList), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'Error al obtener los productos',
				error: error.message,
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}
