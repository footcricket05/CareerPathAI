import os
from langchain_community.chat_models import ChatOpenAI  # Corrected import for ChatOpenAI
from langchain.agents import initialize_agent
from langchain.memory import ConversationBufferMemory
from tools import tools  # Import tools from tools.py
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Ensure OpenAI API key is loaded
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is missing in the .env file.")

# Initialize OpenAI Chat LLM
llm = ChatOpenAI(
    temperature=0,
    model="gpt-4",
    openai_api_key=OPENAI_API_KEY
)

# Add memory for conversational context
memory = ConversationBufferMemory(memory_key="chat_history")

# Create LangChain agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="conversational-react-description",
    memory=memory,
    verbose=True  # Logs reasoning for debugging
)
