import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

/** <<< Lista de UFs >>> */
const UFS = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" },
];

type Form = {
  nome: string;
  dataNascimento: string; // DD/MM/AAAA
  senha: string;
  numeroCalcado: string;  // manter string no input e converter na validação
  estadoUF: string;       // 2 letras
  cidade: string;
};

type Errors = Partial<Record<keyof Form, string>>;

function parseDateBR(s: string): Date | null {
  // Espera DD/MM/AAAA
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  // checagem extra para datas inválidas tipo 31/02
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) return null;
  return d;
}

function getAge(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
  return age;
}

/** <<< Dropdown de UF >>> */
function UFSelector({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (uf: string) => void;
  error?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ gap: 6 }}>
      <Text style={styles.label}>Estado (UF) *</Text>

      {/* Campo clicável que abre o modal */}
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.input,
          error && styles.inputError,
          { justifyContent: "space-between", flexDirection: "row" },
        ]}
      >
        <Text style={{ fontSize: 16 }}>{value || "Selecione a UF"}</Text>
        <Text style={{ opacity: 0.6 }}>▼</Text>
      </Pressable>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {/* Modal com a lista de estados */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecione o estado</Text>

            <ScrollView style={{ maxHeight: 360 }}>
              {UFS.map((item) => {
                const selected = item.uf === value;
                return (
                  <Pressable
                    key={item.uf}
                    onPress={() => {
                      onChange(item.uf);
                      setOpen(false);
                    }}
                    style={[styles.ufItem, selected && styles.ufItemSelected]}
                  >
                    <Text style={[styles.ufUF, selected && styles.ufUFSelected]}>{item.uf}</Text>
                    <Text style={[styles.ufNome, selected && styles.ufNomeSelected]}>{item.nome}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable onPress={() => setOpen(false)} style={[styles.button, { marginTop: 12 }]}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function Formulario() {
  const [form, setForm] = useState<Form>({
    nome: "",
    dataNascimento: "",
    senha: "",
    numeroCalcado: "",
    estadoUF: "",
    cidade: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (field: keyof Form, value: string) => {
    // Removemos a normalização automática da UF; o UFSelector já fornece o valor correto.
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const e: Errors = {};

    // nome
    if (!form.nome || form.nome.trim().length < 3) {
      e.nome = "Informe um nome com pelo menos 3 caracteres.";
    }

    // data de nascimento
    const d = parseDateBR(form.dataNascimento);
    if (!d) {
      e.dataNascimento = "Use o formato DD/MM/AAAA.";
    } else {
      const age = getAge(d);
      if (age < 13) e.dataNascimento = "Idade mínima: 13 anos.";
    }

    // senha
    if (!form.senha || form.senha.length < 6) {
      e.senha = "A senha deve ter ao menos 6 caracteres.";
    }

    // número do calçado
    const n = Number(form.numeroCalcado);
    if (!form.numeroCalcado || Number.isNaN(n) || !Number.isInteger(n)) {
      e.numeroCalcado = "Informe um número inteiro.";
    } else if (n < 20 || n > 50) {
      e.numeroCalcado = "Use um valor entre 20 e 50.";
    }

    // estado (UF)
    if (!/^[A-Z]{2}$/.test(form.estadoUF)) {
      e.estadoUF = "Selecione uma UF válida.";
    }

    // cidade
    if (!form.cidade || form.cidade.trim().length < 2) {
      e.cidade = "Informe uma cidade válida.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      setShowModal(true);
    } else {
      Alert.alert("Corrija os campos", "Verifique os avisos em vermelho.");
    }
  };

  const maskedPassword = useMemo(() => "•".repeat(form.senha.length), [form.senha]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Formulário com Validação</Text>

          {/* Nome */}
          <View style={styles.field}>
            <Text style={styles.label}>Nome *</Text>
            <TextInput
              value={form.nome}
              onChangeText={(t) => handleChange("nome", t)}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              style={[styles.input, errors.nome && styles.inputError]}
              returnKeyType="next"
            />
            {!!errors.nome && <Text style={styles.error}>{errors.nome}</Text>}
          </View>

          {/* Data de nascimento */}
          <View style={styles.field}>
            <Text style={styles.label}>Data de nascimento (DD/MM/AAAA) *</Text>
            <TextInput
              value={form.dataNascimento}
              onChangeText={(t) => handleChange("dataNascimento", t)}
              placeholder="31/12/2000"
              keyboardType={Platform.select({ ios: "numbers-and-punctuation", android: "numeric" }) as any}
              inputMode="numeric"
              maxLength={10}
              style={[styles.input, errors.dataNascimento && styles.inputError]}
              returnKeyType="next"
            />
            {!!errors.dataNascimento && <Text style={styles.error}>{errors.dataNascimento}</Text>}
          </View>

          {/* Senha (secureTextEntry + toggle) */}
          <View style={styles.field}>
            <Text style={styles.label}>Senha *</Text>
            <View style={[styles.input, styles.inputRow, errors.senha && styles.inputError]}>
              <TextInput
                style={{ flex: 1 }}
                value={form.senha}
                onChangeText={(t) => handleChange("senha", t)}
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="done"
              />
              <Pressable onPress={() => setShowPassword((v) => !v)}>
                <Text style={styles.eye}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
              </Pressable>
            </View>
            {!!errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
          </View>

          {/* Número do calçado (numérico) */}
          <View style={styles.field}>
            <Text style={styles.label}>Número do calçado *</Text>
            <TextInput
              value={form.numeroCalcado}
              onChangeText={(t) => handleChange("numeroCalcado", t.replace(/[^0-9]/g, ""))}
              placeholder="Ex.: 38"
              keyboardType="numeric"
              inputMode="numeric"
              maxLength={2}
              style={[styles.input, errors.numeroCalcado && styles.inputError]}
              returnKeyType="next"
            />
            {!!errors.numeroCalcado && <Text style={styles.error}>{errors.numeroCalcado}</Text>}
          </View>

          {/* Estado (UF) — dropdown */}
          <View style={styles.field}>
            <UFSelector
              value={form.estadoUF}
              onChange={(uf) => handleChange("estadoUF", uf)}
              error={errors.estadoUF}
            />
          </View>

          {/* Cidade */}
          <View style={styles.field}>
            <Text style={styles.label}>Cidade *</Text>
            <TextInput
              value={form.cidade}
              onChangeText={(t) => handleChange("cidade", t)}
              placeholder="Ex.: São Paulo"
              autoCapitalize="words"
              style={[styles.input, errors.cidade && styles.inputError]}
              returnKeyType="done"
            />
            {!!errors.cidade && <Text style={styles.error}>{errors.cidade}</Text>}
          </View>

          {/* Botão Enviar */}
          <Pressable onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>

          <Text style={styles.note}>
            * Campos obrigatórios. Este exemplo usa{" "}
            <Text style={{ fontWeight: "600" }}>secureTextEntry</Text> na senha e{" "}
            <Text style={{ fontWeight: "600" }}>keyboardType</Text> apropriado para cada campo.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de sucesso com os dados digitados */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Dados enviados</Text>
            <View style={styles.row}>
              <Text style={styles.k}>Nome:</Text>
              <Text style={styles.v}>{form.nome}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.k}>Nascimento:</Text>
              <Text style={styles.v}>{form.dataNascimento}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.k}>Senha:</Text>
              <Text style={styles.v}>{maskedPassword}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.k}>Nº calçado:</Text>
              <Text style={styles.v}>{form.numeroCalcado}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.k}>UF:</Text>
              <Text style={styles.v}>{form.estadoUF}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.k}>Cidade:</Text>
              <Text style={styles.v}>{form.cidade}</Text>
            </View>

            <Pressable onPress={() => setShowModal(false)} style={[styles.button, { marginTop: 16 }]}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputError: {
    borderColor: "#e53935",
  },
  eye: {
    fontSize: 14,
    fontWeight: "600",
  },
  error: {
    color: "#e53935",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#0a84ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  k: {
    width: 110,
    color: "#444",
    fontWeight: "600",
  },
  v: {
    flex: 1,
    color: "#111",
  },

  /** <<< Estilos extras do dropdown de UF >>> */
  ufItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eaeaea",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  ufItemSelected: {
    borderColor: "#0a84ff",
    backgroundColor: "#EFF6FF",
  },
  ufUF: {
    width: 36,
    fontWeight: "800",
    fontSize: 14,
  },
  ufUFSelected: {
    color: "#0a84ff",
  },
  ufNome: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  ufNomeSelected: {
    color: "#0a84ff",
    fontWeight: "600",
  },
});
