import React from 'react';
import { useForm } from 'react-hook-form';
import { UserData } from '../types';
import { generateResume, fetchJobRoles, sendEmail } from '../api';

export default function CareerForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserData>();
  const [status, setStatus] = React.useState<{ type: 'success' | 'error' | ''; message: string }>({
    type: '',
    message: '',
  });

  const onSubmit = async (data: UserData) => {
    try {
      setStatus({ type: '', message: '' });
      
      // Convert skills string to array
      const formattedData = {
        ...data,
        skills: data.skills.toString().split(',').map(skill => skill.trim()),
      };

      // Generate resume
      const resumeResponse = await generateResume(formattedData);
      if (!resumeResponse.success) {
        throw new Error(resumeResponse.message);
      }

      // Fetch job roles
      const jobsResponse = await fetchJobRoles(formattedData);
      if (!jobsResponse.success) {
        throw new Error(jobsResponse.message);
      }

      // Send email
      const emailResponse = await sendEmail(formattedData);
      if (!emailResponse.success) {
        throw new Error(emailResponse.message);
      }

      setStatus({
        type: 'success',
        message: 'Resume generated and sent to your email along with job recommendations!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Desired Role
        </label>
        <input
          type="text"
          id="role"
          {...register('role', { required: 'Role is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          id="skills"
          {...register('skills', { required: 'Skills are required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="React, TypeScript, Node.js"
        />
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <textarea
          id="summary"
          rows={4}
          {...register('summary', { required: 'Summary is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.summary && (
          <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>
        )}
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-md ${
            status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Processing...' : 'Generate Resume & Find Jobs'}
      </button>
    </form>
  );
}