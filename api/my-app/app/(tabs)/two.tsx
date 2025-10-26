import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { getPosts, createPost } from "../../services/jsonplaceholder.fetch";

export default function ApiExample() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getPosts();
        setPosts(data.slice(0, 5));
        const created = await createPost({
          title: "Novo Post",
          body: "Conteúdo do post",
          userId: 1,
        });
        console.log("Criado:", created);
      } catch (e: any) {
        Alert.alert("Erro", e.message ?? "Falha na requisição");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando…</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      {/* Agora o preview é usado */}
      <PostsFetchPreview />

      <Text style={{ fontWeight: "700", marginBottom: 8 }}>Top 5 posts:</Text>
      {posts.map((p) => (
        <Text key={p.id}>• {p.title}</Text>
      ))}
    </View>
  );
}

function PostsFetchPreview() {
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setPosts(data.slice(0, 3));
      } catch (e: any) {
        setError(e?.message ?? "Falha na requisição (Fetch).");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ gap: 6, marginBottom: 8 }}>
      <Text style={{ fontWeight: "700", fontSize: 16 }}>Exemplo Fetch (JSONPlaceholder)</Text>
      {loading && <Text>Carregando…</Text>}
      {error && <Text style={{ color: "#e53935" }}>{error}</Text>}
      {!loading &&
        !error &&
        posts.map((p) => (
          <View key={p.id} style={{ borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 6, marginTop: 6 }}>
            <Text style={{ fontWeight: "700" }}>{p.title}</Text>
            <Text>{p.body}</Text>
          </View>
        ))}
    </View>
  );
}
