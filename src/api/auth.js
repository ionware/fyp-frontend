import request from './request';
import { useMutation } from 'react-query';

/**
 * Make authentication request (Login)
 */
export const useAuth = () =>
  useMutation((data) => request.post('/auth/login', data));
