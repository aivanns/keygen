# 🔑 Key Generator

This project is a key generation application developed using React, TypeScript, and Vite. The application supports Hot Module Replacement (HMR) and uses ESLint to ensure code quality.

## ✨ Main Features

- **🔐 Key Generation**: The application allows generating keys using various hashing algorithms such as SHA-1, SHA-256, and SHA-3.
- **🗂️ Key Management**: Generated keys are stored in `localStorage` and can be exported to the clipboard.
- **🖥️ User Interface**: The application features a user-friendly interface using components from the Ant Design library.
- **⚙️ Configurable Setup**: Supports extended ESLint configuration for strict type checking and code style enforcement.

## 🚀 Installation and Running

1. Ensure you have Node.js installed.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the project in development mode:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173`.

## 📜 Scripts

- `npm run dev`: Run the project in development mode.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check the code.
- `npm run preview`: Preview the built project.

## 🛠️ Configuration

The project uses the following configuration files:

- `tsconfig.app.json`: TypeScript configuration for the application.
- `tsconfig.node.json`: TypeScript configuration for Node.js.
- `eslint.config.js`: ESLint configuration for code checking.

## 📦 Dependencies

The main dependencies of the project include:

- `react`: A library for building user interfaces.
- `react-dom`: A package for working with the DOM in React.
- `antd`: UI components.
- `crypto-js`: A library for working with cryptographic algorithms.

## 🧑‍💻 Development

For development, it is recommended to use a code editor with TypeScript and ESLint support, such as Visual Studio Code
