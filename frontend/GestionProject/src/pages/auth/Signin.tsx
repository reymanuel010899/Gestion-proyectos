"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import type { FetchWithAuthProps } from "../../redux/actions/auth/Login"
import { login } from "../../redux/actions/auth/Login"
import { useDispatch } from "react-redux"


const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState<FetchWithAuthProps>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = data
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState: FetchWithAuthProps) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(data)(dispatch).then(() => {
      navigate("/")
    })
  }

  return (
    <div className="signin-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="signin-card"
      >
        <h2 className="signin-title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="signin-form">
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
              className="signin-input signin-input-password"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="signin-password-toggle">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="signin-button">
            Ingresar
          </button>
        </form>

        <div className="signin-links">
          <a href="#" className="signin-link">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="signin-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/sign-up" className="signin-link">
            Regístrate
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default SignIn
