// services/jsonplaceholder.fetch.ts

const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Faz uma requisição GET para buscar posts
 */
export async function getPosts() {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    // Fetch não lança erro automático em status 4xx/5xx
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data; // retorna o array de posts
  } catch (err) {
    // Tratamento genérico
    console.error("Erro ao buscar posts:", err);
    throw err;
  }
}

/**
 * Faz uma requisição GET por ID específico
 */
export async function getPostById(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Post não encontrado (404).");
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar post:", err);
    throw err;
  }
}

/**
 * Faz uma requisição POST para criar um novo post
 */
export async function createPost(payload: { title: string; body: string; userId: number }) {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(payload),
    });

    // JSONPlaceholder retorna status 201 em sucesso
    if (res.status !== 201) {
      throw new Error(`Falha ao criar (status ${res.status})`);
    }

    const data = await res.json();
    return data; // retorna o post criado (fake)
  } catch (err) {
    console.error("Erro ao criar post:", err);
    throw err;
  }
}
