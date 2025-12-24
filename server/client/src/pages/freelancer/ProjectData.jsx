import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";

const ProjectData = () => {
  const { socket } = useContext(GeneralContext);
  const { id: projectId } = useParams();

  const freelancerId = localStorage.getItem("userId");

  const [project, setProject] = useState(null);
  const [clientId, setClientId] = useState("");

  const [proposal, setProposal] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const [projectLink, setProjectLink] = useState("");
  const [manualLink, setManualLink] = useState("");
  const [submissionDescription, setSubmissionDescription] = useState("");

  const [chats, setChats] = useState({ messages: [] });
  const [message, setMessage] = useState("");

  /* ---------------- FETCH PROJECT ---------------- */
  const fetchProject = useCallback(async () => {
    const { data } = await axios.get(`/api/projects/${projectId}`);
    setProject(data);
    setClientId(data.clientId);
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

    socket.emit("join-chat-room", { projectId, freelancerId });
    socket.on("message-from-user", fetchChats);

    return () => socket.off("message-from-user", fetchChats);
  }, [socket, projectId, freelancerId, fetchChats]);

  /* ---------------- SEND MESSAGE ---------------- */
  const handleMessageSend = () => {
    if (!message.trim()) return;

    socket.emit("new-message", {
      projectId,
      senderId: freelancerId,
      message,
      time: new Date(),
    });

    setMessage("");
  };

  /* ---------------- BID ---------------- */
  const handleBidding = async () => {
    await axios.post("/api/applications/bid", {
      clientId,
      freelancerId,
      projectId,
      proposal,
      bidAmount,
      estimatedTime,
    });

    setProposal("");
    setBidAmount("");
    setEstimatedTime("");
    fetchProject();
  };

  /* ---------------- SUBMIT ---------------- */
  const handleProjectSubmission = async () => {
    await axios.post("/api/projects/submit", {
      clientId,
      freelancerId,
      projectId,
      projectLink,
      manualLink,
      submissionDescription,
    });

    setProjectLink("");
    setManualLink("");
    setSubmissionDescription("");
    fetchProject();
  };

  if (!project) return null;

  const alreadyBid = project.bids.includes(freelancerId);

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
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="fw-bold mb-2">{project.title}</h3>
              <p className="text-muted">{project.description}</p>

              {/* Skills */}
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

              {/* Budget */}
              <div
                className="px-4 py-3 rounded-4 mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
                }}
              >
                <small className="fw-semibold">Budget</small>
                <h4 className="fw-bold mb-0">₹ {project.budget}</h4>
              </div>

              {/* BID */}
              {project.status === "Available" && (
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Send Proposal</h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control rounded-pill"
                        placeholder="Bid Amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control rounded-pill"
                        placeholder="Estimated Days"
                        value={estimatedTime}
                        onChange={(e) => setEstimatedTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <textarea
                    className="form-control mt-3 rounded-4"
                    rows="3"
                    placeholder="Write your proposal..."
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />

                  <button
                    className="btn mt-3 px-4 rounded-pill"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                    }}
                    disabled={alreadyBid}
                    onClick={handleBidding}
                  >
                    {alreadyBid ? "Already Applied" : "Submit Proposal"}
                  </button>
                </div>
              )}

              {/* SUBMISSION */}
              {project.freelancerId === freelancerId && (
                <>
                  <h5 className="fw-bold mb-3">Submit Project</h5>

                  {project.submissionAccepted ? (
                    <span className="badge bg-success px-3 py-2">
                      ✓ Completed
                    </span>
                  ) : (
                    <>
                      <input
                        className="form-control mb-2 rounded-pill"
                        placeholder="Project Link"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                      />
                      <input
                        className="form-control mb-2 rounded-pill"
                        placeholder="Manual Link"
                        value={manualLink}
                        onChange={(e) => setManualLink(e.target.value)}
                      />
                      <textarea
                        className="form-control mb-3 rounded-4"
                        rows="3"
                        placeholder="Work description"
                        value={submissionDescription}
                        onChange={(e) =>
                          setSubmissionDescription(e.target.value)
                        }
                      />
                      <button
                        className="btn px-4 rounded-pill"
                        style={{
                          background:
                            "linear-gradient(135deg, #c3ec52 0%, #0ba360 100%)",
                          color: "#fff",
                        }}
                        onClick={handleProjectSubmission}
                      >
                        Submit Work
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ================= CHAT ================= */}
          <div className="col-lg-5">
            <div
              className="d-flex flex-column rounded-5 shadow-sm h-100"
              style={{
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <div className="p-4 border-bottom">
                <h5 className="fw-bold">Chat with Client</h5>
                <small className="text-muted">Conversation</small>
              </div>

              <div className="flex-grow-1 px-4 py-3 overflow-auto">
                {chats.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${
                      msg.senderId === freelancerId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className="px-4 py-2 rounded-4"
                      style={{
                        maxWidth: "75%",
                        background:
                          msg.senderId === freelancerId
                            ? "linear-gradient(135deg, #c3ec52 0%, #0ba360 100%)"
                            : "#f1f5f9",
                        color: msg.senderId === freelancerId ? "#fff" : "#111",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3">
                <div className="d-flex gap-2">
                  <input
                    className="form-control rounded-pill"
                    placeholder="Message..."
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

export default ProjectData;
