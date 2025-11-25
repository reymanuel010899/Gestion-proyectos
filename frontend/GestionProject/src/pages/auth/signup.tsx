import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate} from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { register } from "@/redux/actions/auth/register";
import { useDispatch } from "react-redux";

interface IDataSignUp {
  name: string;
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}



const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Debe contener al menos una letra mayúscula.";
    }
    if (!/[a-z]/.test(password)) {
        return "Debe contener al menos una letra minúscula.";
    }
    if (!/[0-9]/.test(password)) {
        return "Debe contener al menos un número.";
    }
    return null;
};


const SignUp: React.FC = () => {
  const navigate = useNavigate() 
  const dispatch = useDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [formData, setFormData] = useState<IDataSignUp>({
    name: "",
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const {name, username, email, password, repeat_password} = formData;
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null); 
    setPasswordError(null); 
    setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    
    setErrorMessage(null);
    setPasswordError(null);


    if (password !== repeat_password) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }


    const validationResult = validatePassword(password);
    if (validationResult) {
        setPasswordError(validationResult);
        return;
    }

    setLoading(true);

    register(formData)(dispatch).then(() => {
        setLoading(false);
        navigate("/sign-in");
    })
  };

  return (
    <div className="signin-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="signin-card" 
      >
        <h2 className="signin-title">
          Crear Cuenta
        </h2>


        {(errorMessage || passwordError) && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm" role="alert">
                <p>{errorMessage || passwordError}</p>
                {passwordError && (
                     <ul className="mt-2 list-disc list-inside text-xs">
                        <li>Mínimo 8 caracteres</li>
                        <li>Una mayúscula</li>
                        <li>Una minúscula</li>
                        <li>Un número</li>
                    </ul>
                )}
            </div>
        )}

        <form onSubmit={handleSubmit} className="signin-form"> 
          <div className="signin-input-wrapper">
            <User className="signin-input-icon" />
            <input
              type="text"
              placeholder="Nombre completo" 
              name="name"
              value={name}
              onChange={onChange}
              className="signin-input"
              required
              disabled={loading}
            />
          </div>

          <div className="signin-input-wrapper">
            <User className="signin-input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario" 
              value={username}
              onChange={onChange}
              className="signin-input"
              required
              disabled={loading}
            />
          </div>

          <div className="signin-input-wrapper">
            <Mail className="signin-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico" 
              value={email}
              onChange={onChange}
              className="signin-input"
              required
              disabled={loading}
            />
          </div>

          <div className="signin-input-wrapper">
            <Lock className="signin-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña" 
              name="password"
              value={password}
              onChange={onChange}
              className={`signin-input signin-input-password ${passwordError ? 'border-red-500' : ''}`}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="signin-password-toggle"
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="signin-input-wrapper">
            <Lock className="signin-input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="repeat_password"
              placeholder="Confirmar contraseña" 
              value={repeat_password}
              onChange={onChange}
              className={`signin-input signin-input-password ${errorMessage && password === repeat_password ? 'border-red-500' : ''}`}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="signin-password-toggle"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className={`signin-button mt-4 ${loading ? 'submit-loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span> 
            ) : (
              "Registrarse" 
            )}
          </button>
        </form>
        <div className="signin-footer">
          ¿Ya tienes una cuenta?{" "} 
          <Link to={'/sign-in'} className="signin-link">
            Inicia sesión 
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;