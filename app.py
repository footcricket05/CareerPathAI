import streamlit as st
from tools import generate_resume_from_template, fetch_job_roles, send_email_with_resume_and_jobs

st.title("CareerPathAI")

# Input form for user data
st.header("Generate Resume and Find Job Roles")
name = st.text_input("Name")
email = st.text_input("Email")
role = st.text_input("Role")
skills = st.text_area("Skills (comma-separated)").split(",")
summary = st.text_area("Professional Summary")

# Generate resume
if st.button("Generate Resume"):
    user_data = {
        "name": name,
        "email": email,
        "role": role,
        "skills": skills,
        "summary": summary,
    }
    resume = generate_resume_from_template(user_data)
    st.text("Generated Resume:")
    st.text(resume)

# Fetch job roles
if st.button("Fetch Job Roles"):
    query = f"Job roles for {role} with skills {', '.join(skills)}"
    job_roles = fetch_job_roles(query)
    st.text("Top Job Roles:")
    st.text(job_roles)

# Send email with resume and job roles
if st.button("Send Email"):
    user_data = {
        "name": name,
        "email": email,
        "role": role,
        "skills": skills,
        "summary": summary,
    }
    response = send_email_with_resume_and_jobs(str(user_data))
    st.text(response)
