import { useQuery, useMutation } from 'react-query';
import request from './request';

/**
 * Get all students on the system.
 */
export const useGetAllStudents = () =>
  useQuery('all_students', () => request.get('/students'));

/**
 * Get student by their session ID.
 */
export const useGetStudent = (session) =>
  useQuery(['student', session], () =>
    request.get(`/student${session ? '?session=' + session : ''}`)
  );

/**
 * Create student record.
 */
export const usePostStudent = () =>
  useMutation((data) => request.post(`student`, data));

/**
 * Get all sessions.
 */
export const useGetSession = () =>
  useQuery('sessions', () => request.get('/session'));

/**
 * Get all faculties.
 */
export const useGetFaculties = () =>
  useQuery('faculties', () => request.get(`/faculty`));

/**
 * Get faculty by ID.
 * @param {int} id
 */
export const useGetFacultyById = (id) =>
  useQuery(['departments', id], () => request.get(`/faculty/${id}`));

/**
 * Get all departments.
 */
export const useGetDepartments = () =>
  useQuery('departments', () => request.get(`/department`));

/**
 * Get all users.
 */
export const useGetUsers = () => useQuery('users', () => request.get(`/user`));

/**
 * Create a new user.
 */
export const usePostUser = () =>
  useMutation((data) => request.post(`user`, data));

/**
 * Get all API keys for third-party
 */
export const useGetKeys = () => useQuery('keys', () => request.get(`/key`));

/**
 * Get overall system statistics.
 */
export const useGetStatistics = () =>
  useQuery('statistics', () => request.get('/statistics'));

/**
 * Search for students
 * @param {string} query
 */
export const useGetSearch = (query) =>
  useQuery(['search', query], () => request.get(`/search?q=${query}`), {
    enabled: !!query,
  });
