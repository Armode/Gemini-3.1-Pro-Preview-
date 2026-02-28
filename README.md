<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9ba76648-b7ff-4400-9a17-9835075fd62d

## Run Locally

**Prerequisites:**  Node.js (v18 or newer)

1. Install dependencies:
   ```
   npm install
   ```
2. Create your local environment file from the example template:
   - **Windows:** `copy .env.local.example .env.local`
   - **Unix/Mac:** `cp .env.local.example .env.local`

   Then open `.env.local` and replace `your_gemini_api_key_here` with your actual [Gemini API key](https://aistudio.google.com/app/apikey).
3. Run the development server:
   ```
   npm run dev
   ```
4. Open your browser to **http://localhost:3000**

> **Note for Windows / AIServer users:** The dev server is configured to listen on `0.0.0.0:3000`, so it is reachable from any local network interface. If you are running through the AI Studio AIServer app, simply point it at `http://localhost:3000` after starting the server with `npm run dev`.
