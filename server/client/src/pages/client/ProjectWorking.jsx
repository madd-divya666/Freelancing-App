import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";

const ProjectWorking = () => {
  const { socket } = useContext(GeneralContext);
  const { id: projectId } = useParams();
  const userId = localStorage.getItem("userId");

  const [project, setProject] = useState(null);
  const [chats, setChats] = useState({ messages: [] });
  const [message, setMessage] = useState("");

  /* ---------------- FETCH PROJECT ---------------- */
  const fetchProject = useCallback(async () => {
    const { data } = await axios.get(`/api/projects/${projectId}`);
    setProject(data);
  }, [projectId]);

  /* ---------------- FETCH CHATS ---------------- */
  const fetchChats = useCallback(async () => {
    const { data } = await axios.get(`/api/chats/${projectId}`);
    setChats(data || { messages: [] });
  }, [projectId]);

  useEffect(() => {
    fetchProject();
    fetchChats();
  }, [fetchProject, fetchChats]);

  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    if (!socket) return;

    socket.emit("join-chat-room", { projectId });
    socket.on("message-from-user", fetchChats);

    return () => socket.off("message-from-user", fetchChats);
  }, [socket, projectId, fetchChats]);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleMessageSend = () => {
    if (!message.trim() || !socket) return;

    socket.emit("new-message", {
      projectId,
      senderId: userId,
      message,
      time: new Date(),
    });

    setMessage("");
  };

  if (!project) return null;

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div className="container">
        <div className="row g-4">
          {/* ================= PROJECT CARD ================= */}
          <div className="col-lg-7">
            <div
              className="p-4 rounded-5 shadow-sm"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="fw-bold mb-2">{project.title}</h3>
              <p className="text-muted">{project.description}</p>

              <div className="mb-3">
                <small className="text-uppercase text-muted fw-semibold">
                  Required Skills
                </small>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-pill"
                      style={{
                        background: "#f1f5f9",
                        fontSize: "0.85rem",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="px-4 py-3 rounded-4 mt-4"
                style={{
                  background:
                    "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
                }}
              >
                <span className="fw-semibold">Budget</span>
                <h4 className="fw-bold mb-0">₹ {project.budget}</h4>
              </div>

              {project.submissionAccepted && (
                <span className="badge bg-success mt-3 px-3 py-2">
                  ✓ Project Completed
                </span>
              )}
            </div>
          </div>

          {/* ================= CHAT CARD ================= */}
          <div className="col-lg-5">
            <div
              className="d-flex flex-column rounded-5 shadow-sm h-100"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Header */}
              <div className="p-4 border-bottom">
                <h5 className="fw-bold mb-1">Project Chat</h5>
                <small className="text-muted">Calm, focused conversation</small>
              </div>

              {/* Messages */}
              <div
                className="flex-grow-1 px-4 py-3 overflow-auto"
                style={{ background: "#fafafa" }}
              >
                {chats.messages.length === 0 && (
                  <p className="text-center text-muted mt-5">
                    Start the conversation ✨
                  </p>
                )}

                {chats.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${
                      msg.senderId === userId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className="px-4 py-2 rounded-4"
                      style={{
                        maxWidth: "75%",
                        background:
                          msg.senderId === userId
                            ? "linear-gradient(135deg, #c3ec52 0%, #0ba360 100%)"
                            : "#ffffff",
                        color: msg.senderId === userId ? "#fff" : "#111",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div>{msg.text}</div>
                      <small
                        className="d-block text-end opacity-75"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {new Date(msg.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3">
                <div
                  className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                  style={{
                    background: "#f1f5f9",
                  }}
                >
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Message...."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
                  />
                  <button
                    className="btn rounded-circle"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                      width: "42px",
                      height: "42px",
                    }}
                    onClick={handleMessageSend}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorking;
