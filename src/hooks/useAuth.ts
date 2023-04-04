import { useContext } from 'react';
import { AuthContext, Context } from 'contexts/AuthProvider';

export default function useAuth(): AuthContext {
  return useContext(Context);
}
