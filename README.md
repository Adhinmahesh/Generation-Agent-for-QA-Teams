# AI Test Case Generation Agent

Autonomous QA testing for Java/Spring Boot using LLMs. Built for the [Hackathon Name].

## ⚙️ Tech Stack
* **Backend:** Python, FastAPI, LangChain, OpenAI (GPT-4o)
* **Frontend:** React, Vite

## 🛠️ How to Run Locally

### 1. Start the Backend
Navigate to the backend folder and start the FastAPI server:
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY="your_api_key_here"
uvicorn main:app --reload
\`\`\`

### 2. Start the Frontend
Navigate to the frontend folder and start the React dev server:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Open \`http://localhost:5173\` in your browser to view the agent UI.
