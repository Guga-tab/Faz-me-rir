# 💸 FazMeRir - Controle de Gastos Gamificado

O FazMeRir é um aplicativo mobile de controle financeiro desenvolvido em React Native (Expo) com foco em gamificação. O objetivo é ajudar o usuário a manter-se dentro do limite de gastos diário, transformando a economia em um desafio divertido com níveis e conquistas (XP e Achievements).

## ✨ Funcionalidades Principais

* **Controle Diário:** Definição e monitoramento de um limite diário de gastos.
* **Histórico Completo:** Visualização e filtragem de todas as transações realizadas.
* **Edição e Exclusão:** Capacidade de editar e deletar transações específicas.
* **Gamificação (XP e Nível):** O usuário ganha pontos por registrar gastos e completar desafios.
* **Persistência de Dados:** Todos os dados (transações, limite e XP) são salvos localmente no dispositivo (AsyncStorage).

## 🚀 Tecnologias Utilizadas

O projeto é construído sobre o ecossistema React Native utilizando o framework Expo.

| Categoria | Tecnologia | Uso Principal |
| :--- | :--- | :--- |
| **Framework** | React Native | Desenvolvimento Mobile Multiplataforma. |
| **Plataforma** | Expo | Gerenciamento de Assets e Build. |
| **Navegação** | React Navigation | Gerenciamento de telas e fluxo de usuário. |
| **Armazenamento** | AsyncStorage | Persistência local de transações e configurações. |
| **Componentes** | @react-native-community/slider | Slider para ajuste de limite. |
| **Ícones** | @expo/vector-icons | Ícones utilizados nas categorias e navegação. |

## 🛠️ Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o FazMeRir em seu ambiente local.

### Pré-requisitos

Você precisará ter o **Node.js** e o **Expo CLI** instalados em sua máquina.

1.  **Node.js:** Verifique se você tem uma versão LTS do Node.js instalada.
2.  **Expo CLI:** Instale o cliente globalmente:

```bash
npm install -g expo-cli
```

## Tutorial de execução
```bash
# Clone
git clone [LINK_DO_REPOSITORIO]

# Acesse
cd FazMeRir

# Instale dependências
npm install
# ou
yarn install

# Execute o projeto
npm start
# ou
npx expo start
