<div align="center">

**[Português 🇧🇷](#-versão-em-português) | [English 🌐](#-english-version)**

</div>

---

## 🇧🇷 Versão em Português

![Playwright](https://img.shields.io/badge/Teste%20com-Playwright-2EAD33?style=for-the-badge&logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 📖 Sobre o Projeto

Esta é uma suíte de testes de automação End-to-End (E2E) do meu portfólio, desenvolvida para o site [DemoBlaze](https://www.demoblaze.com/). Este projeto aprofunda os conhecimentos em Playwright, focando em interações de UI mais complexas e na validação de chamadas de API.

O objetivo é demonstrar o domínio de técnicas avançadas de automação, incluindo:
* Manipulação de eventos assíncronos (alertas/diálogos).
* Interceptação e validação de requisições de API (`page.route`).
* Resolução de problemas de sincronização ("Race Conditions").
* Arquitetura de testes robusta com Page Objects e Component Objects.

### ✨ Cenários de Teste Cobertos

A suíte de testes cobre os seguintes fluxos e validações avançadas:

* ✅ **Integridade da Home Page:**
    * Teste estrutural do carrossel para validar a contagem e a integridade do `src` de todas as imagens.
* ✅ **Autenticação e Modais:**
    * Cadastro de novo usuário com dados dinâmicos para garantir a independência dos testes.
    * Login de usuário existente com validação da mensagem de boas-vindas.
    * Validação do ciclo de vida de modais (abertura, visibilidade de conteúdo e fechamento), como no "About us".
* ✅ **Funcionalidade do Carrinho:**
    * Adição de item ao carrinho com validação do **alerta de confirmação** (`dialog`) do navegador.
* ✅ **Testes de Integração (API + UI):**
    * Teste parametrizado que valida o filtro de **categorias**, interceptando as chamadas de API (`/bycat`, `/entries`) e garantindo que o número de itens renderizados na UI corresponde aos dados recebidos do back-end.
* ✅ **Fluxo de Compra E2E com Múltiplos Itens:**
    * Adição de múltiplos produtos ao carrinho.
    * Validação da chamada de API (`/addtocart`) para cada item, inspecionando o payload da requisição.
    * Verificação da **soma do preço total** no carrinho.
    * Finalização da compra com preenchimento de formulário em modal.

### 🛠️ Tecnologias Utilizadas

* **Framework de Teste:** [Playwright](https://playwright.dev/)
* **Linguagem:** JavaScript
* **Padrão de Arquitetura:** Page Object Model (POM) & Component Objects
* **Ambiente de Execução:** Node.js

### 🚀 Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_DEMOBLAZE>
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd playwright-demoblaze
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Instale os navegadores do Playwright:**
    ```bash
    npx playwright install
    ```

### ▶️ Rodando os Testes

* **Rodar todos os testes em modo visual (padrão configurado):**
    ```bash
    npx playwright test
    ```

* **Rodar todos os testes em modo headless:**
    ```bash
    npx playwright test --headless
    ```

* **Abrir o Modo UI do Playwright para depuração interativa:**
    ```bash
    npx playwright test --ui
    ```

### 📊 Visualizando os Relatórios

Para abrir o relatório HTML gerado após a execução, use o comando:

```bash
npx playwright show-report
```

---

## 🇬🇧 English Version

![Playwright](https://img.shields.io/badge/Test%20with-Playwright-2EAD33?style=for-the-badge&logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### 📖 About The Project

This is the End-to-End (E2E) test automation suite in my portfolio, developed for the [DemoBlaze](https://www.demoblaze.com/) website. This project deepens the knowledge in Playwright, focusing on more complex UI interactions and API call validation.

The objective is to demonstrate mastery of advanced automation techniques, including:
* Handling asynchronous events (browser alerts/dialogs).
* Intercepting and validating API requests (`page.route`).
* Solving synchronization issues ("Race Conditions").
* Robust test architecture using Page Object Model (POM) and Component Objects.

### ✨ Test Scenarios Covered

The test suite covers the following advanced flows and validations:

* ✅ **Homepage Integrity:**
    * Structural test of the carousel to validate the count and `src` integrity of all images.
* ✅ **Authentication and Modals:**
    * New user sign-up using dynamic data to ensure test independence.
    * Existing user login with validation of the welcome message.
    * Validation of the modal lifecycle (open, content visibility, and close), as seen in the "About us" modal.
* ✅ **Shopping Cart Functionality:**
    * Adding an item to the cart with validation of the browser's confirmation **alert (`dialog`)**.
* ✅ **Integration Tests (API + UI):**
    * A parameterized test that validates the **category** filter by intercepting API calls (`/bycat`, `/entries`) and ensuring the number of items rendered on the UI matches the data received from the backend.
* ✅ **E2E Purchase Flow with Multiple Items:**
    * Adding multiple products to the cart.
    * Validation of the API call (`/addtocart`) for each item by inspecting the request payload.
    * Verification of the **total price sum** in the cart.
    * Completing the purchase by filling out a form in a modal.

### 🛠️ Technologies Used

* **Test Framework:** [Playwright](https://playwright.dev/)
* **Language:** JavaScript
* **Architectural Pattern:** Page Object Model (POM) & Component Objects
* **Runtime Environment:** Node.js

### 🚀 Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_DEMOBLAZE_REPOSITORY_URL>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd playwright-demoblaze
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Install Playwright's browsers:**
    ```bash
    npx playwright install
    ```

### ▶️ Running the Tests

* **Run all tests in headed mode (configured default):**
    ```bash
    npx playwright test
    ```

* **Run all tests in headless mode:**
    ```bash
    npx playwright test --headless
    ```

* **Open Playwright's UI Mode for interactive debugging:**
    ```bash
    npx playwright test --ui
    ```

### 📊 Viewing Reports

To open the HTML report generated after a test run, use the following command:

```bash
npx playwright show-report
```