import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;
    socketRef.current = socketRef.current = io(window.location.origin, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("🟢 Socket connected:", socketRef.current.id);
      setSocketReady(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      setSocketReady(false);
    });

    return () => {
      // ❌ do NOT disconnect in dev strict mode
      // socketRef.current?.disconnect();
    };
  }, []);

  /* ---------- AUTH ---------- */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const login = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userId", data._id);
      localStorage.setItem("usertype", data.usertype);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      navigate(`/${data.usertype}`);
    } catch {
      alert("Login failed");
    }
  };

  const register = async () => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
        usertype,
      });

      localStorage.setItem("userId", data._id);
      localStorage.setItem("usertype", data.usertype);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      navigate(`/${data.usertype}`);
    } catch {
      alert("Registration failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <GeneralContext.Provider
      value={{
        socket: socketRef.current,
        socketReady,
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
