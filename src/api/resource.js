import { useQuery } from 'react-query';
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
 * Get all sessions.
 */
export const useGetSession = () =>
  useQuery('sessions', () => request.get('/session'));

/**
 * Get all users.
 */
export const useGetUsers = () => useQuery('users', () => request.get(`/user`));

/**
 * Get all API keys for third-party
 */
export const useGetKeys = () => useQuery('keys', () => request.get(`/key`));

/**
 * Get overall system statistics.
 */
export const useGetStatistics = () =>
  useQuery('statistics', () => request.get('/statistics'));
