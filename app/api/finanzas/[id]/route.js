import { db } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export async function DELETE(req, { params }) {
	try {
		const { id } = params;
		if (!id) {
			return new Response(JSON.stringify({ error: 'ID requerido' }), {
				status: 400,
			});
		}

		await deleteDoc(doc(db, 'ingresos', id));

		return new Response(
			JSON.stringify({ message: 'Ingreso eliminado correctamente' }),
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error al eliminar ingreso:', error);
		return new Response(
			JSON.stringify({ error: 'Error al eliminar ingreso' }),
			{ status: 500 }
		);
	}
}
