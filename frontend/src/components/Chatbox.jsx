import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/api";
import "./Chatbox.css";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await sendMessage(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: res.Answer }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't reach the server. Please try again." },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-root">
      {/* ── Message list ── */}
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="empty-icon">✦</div>
            <h3>Ask me anything about your document</h3>
            <p>Upload a PDF from the sidebar, then start a conversation.</p>
            <div className="empty-suggestions">
              {["Summarise the document", "What are the key points?", "Explain the main topic"].map(s => (
                <button
                  key={s}
                  className="suggestion-chip"
                  onClick={() => { setMessage(s); inputRef.current?.focus(); }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chat-row ${msg.role}`}>
            {msg.role === "bot" && (
              <div className="bubble-avatar bot-avatar" aria-hidden="true">✦</div>
            )}
            <div className={`bubble ${msg.role}`}>
              <p>{msg.text}</p>
            </div>
            {msg.role === "user" && (
              <div className="bubble-avatar user-avatar" aria-hidden="true">U</div>
            )}
          </div>
        ))}

        {loading && (
          <div className="chat-row bot">
            <div className="bubble-avatar bot-avatar" aria-hidden="true">✦</div>
            <div className="bubble bot typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="chat-inputbar">
        <div className="input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something about your document…"
            rows={1}
            aria-label="Message input"
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!message.trim() || loading}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="input-hint">Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line</p>
      </div>
    </div>
  );
}
