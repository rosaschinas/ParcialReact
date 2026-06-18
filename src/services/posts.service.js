const API_URL = "https://jsonplaceholder.typicode.com/posts";

//Manejo de errores
const handleResponse = async (response) => {
    if (!response.ok) {
        const cError = await response.json().catch(() => ({error: 'Error de conexión'}))
        throw new Error(cError.error || `Error HTTP: ${response.status}`)
    }

    return response.json();
}

export const postsService = {

    //GET Mostrar todos los posts
    async getAll() {
        const response = await fetch(API_URL)
        return handleResponse(response);
    },

    //GETbyID Mostrar un post por id
    async getById(id) {
        const response = await fetch(`${API_URL}/${id}`)
        return handleResponse(response);
    },

    //DELETE Eliminar un post
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'})
        return handleResponse(response);
    },

    //POST Cerar un nuevo post
    async create(nuevoPost) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPost)
        })

        return handleResponse(response);
    },

    //PUT Editar un post
    async update(postEditado) {
        const response = await fetch(`${API_URL}/${postEditado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postEditado)
        })

        return handleResponse(response);
    }
}