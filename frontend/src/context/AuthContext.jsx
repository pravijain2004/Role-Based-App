import { createContext,useState,useContext,useEffect} from 'react';
import api from '../utils/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async() =>{
      try{
        const {data} = await api.get("/api/auth/me");
        setUser(data.user);
      }catch (error){
        setUser(null);
      }finally{
        setLoading(false);
      }
    };
    
    checkAuth();
  },[]);


  const register = async(name,email,password,role = "user") => {
    const {data}  = await api.post('/api/auth/register',{
      name,email,password,role
    });

    setUser(data.user);
  };

  const login = async(email,password) => {
    const {data} = await api.post("/api/auth/login",{
      email,
      password,
    });

    setUser(data.user);
  };

  const logout = async () =>{
    await api.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login , register,logout,loading,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);