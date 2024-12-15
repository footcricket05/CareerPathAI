from langchain.tools import Tool
from duckduckgo_search import DDGS
from messaging import send_email
from jinja2 import Template
import ast  # Import for safely parsing string inputs

# Resume Generator Tool
def generate_resume_from_template(data):
    """
    Generates a resume using the provided template and user data.
    """
    # Ensure all necessary keys are present
    required_keys = ["name", "email", "role", "skills", "summary"]
    for key in required_keys:
        if key not in data:
            raise ValueError(f"Missing required field: {key}")

    # Define the resume template
    template_str = """
    Name: {{ name }}
    Email: {{ email }}
    Role: {{ role }}
    
    Skills:
    {% for skill in skills %}
    - {{ skill }}
    {% endfor %}
    
    Professional Summary:
    {{ summary }}
    """

    # Create and render the template
    template = Template(template_str)
    resume = template.render(
        name=data["name"],
        email=data["email"],
        role=data["role"],
        skills=data["skills"],
        summary=data["summary"]
    )
    return resume

resume_tool = Tool(
    name="Resume Generator",
    func=generate_resume_from_template,
    description="Generates a resume using the provided template and user data."
)

# Job Roles Fetcher Tool
def fetch_job_roles(query: str) -> str:
    """Searches for job roles using DuckDuckGo."""
    with DDGS() as ddgs:
        results = ddgs.text(query, safesearch="Moderate", max_results=5)
        results = list(results)  # Convert generator to list

    if not results:
        return "No job roles found."

    # Format the results
    response = "Top Job Roles:\n"
    for i, result in enumerate(results, 1):
        response += f"{i}. {result['title']} - {result['href']}\n"
    return response

job_roles_tool = Tool(
    name="Job Roles Fetcher",
    func=fetch_job_roles,
    description="Fetches job roles based on user query."
)

# Tool to Send Job Roles via Email
def send_job_roles_via_email(data: str) -> str:
    """Fetches job roles and sends them to the user's email."""
    try:
        data = ast.literal_eval(data)  # Convert string to dictionary
    except (ValueError, SyntaxError) as e:
        return f"Error parsing input data: {e}"

    # Check required fields
    if not all(key in data for key in ['role', 'skills', 'email', 'name']):
        return "Error: Missing required fields (role, skills, email, name)."

    # Fetch job roles
    job_query = f"Job roles for {data.get('role', '')} with skills {', '.join(data.get('skills', []))}"
    job_roles = fetch_job_roles(job_query)

    # Format email content
    recipient = data.get('email')
    subject = f"Job Roles for {data.get('role', 'N/A')}"
    body = f"""
Hi {data.get('name', 'User')},

Based on your skills and desired role, here are some job roles that might interest you:

{job_roles}

We hope you find this helpful in your career journey!

Best regards,  
CareerPathAI Team
    """
    return send_email(recipient, subject, body)

job_roles_email_tool = Tool(
    name="Send Job Roles via Email",
    func=send_job_roles_via_email,
    description="Fetches job roles and emails them to the user."
)

# Function to Generate Resume, Fetch Jobs, and Send via Email
def send_email_with_resume_and_jobs(data: str) -> str:
    """
    Generates a resume, fetches job roles, and sends them via email.
    """
    try:
        data = ast.literal_eval(data)  # Convert string to dictionary
    except (ValueError, SyntaxError) as e:
        return f"Error parsing input data: {e}"

    # Ensure all necessary keys are present
    required_keys = ["name", "email", "role", "skills", "summary"]
    for key in required_keys:
        if key not in data:
            return f"Error: Missing required field: {key}"

    # Generate the resume
    try:
        resume = generate_resume_from_template(data)
    except Exception as e:
        return f"Error generating resume: {e}"

    # Fetch job roles
    job_query = f"Job roles for {data['role']} with skills {', '.join(data['skills'])}"
    job_roles = fetch_job_roles(job_query)

    # Format the email content
    recipient = data["email"]
    subject = f"Resume and Job Roles for {data['role']}"
    body = f"""
Hi {data['name']},

Attached is your generated resume based on the provided information.

Additionally, based on your skills and desired role, here are some job roles that might interest you:

{job_roles}

We hope this helps you in your career journey!

Best regards,  
CareerPathAI Team
    """
    # Send the email with the resume as an attachment
    try:
        return send_email(recipient, subject, body, attachment=resume)
    except Exception as e:
        return f"Error sending email: {e}"

# Tool to send email with resume and job roles
email_with_resume_and_jobs_tool = Tool(
    name="Send Email with Resume and Jobs",
    func=send_email_with_resume_and_jobs,
    description="Generates a resume, fetches job roles, and sends them via email to the user."
)

# Update the tools list to include the new tool
tools = [job_roles_tool, job_roles_email_tool, email_with_resume_and_jobs_tool]
