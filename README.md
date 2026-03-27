# AppFobos

App mobile de finanças pessoais feito com **Expo + React Native + TypeScript**, usando **Expo Router** para navegação e **Firebase (Auth + Firestore + Storage)** para autenticação e persistência de transações.

## Como rodar

Requisitos: **Node.js** (com `npm`) e um ambiente para executar o Expo (emulador ou dispositivo com **Expo Go**).

1. Instale as dependências:
```bash
npm install
```
2. Inicie o app:
```bash
npm run start
```
3. (Opcional) Rode por plataforma:
```bash
npm run android
npm run ios
npm run web
```

## Observações

- A navegação e o layout raiz ficam em `app/_layout.tsx`.
- O acesso ao Firebase (Auth/Firestore/Storage) está em `src/services/firebase.ts`.
