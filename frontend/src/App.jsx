import ChatBox from "./components/Chatbox";
import UploadPDF from "./components/UploadPdf";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">RAG<strong>Chat</strong></span>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            Chat
          </button>
          <button className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Documents
          </button>
        </nav>

        <div className="sidebar-upload">
          <p className="upload-label">Upload a PDF to chat with</p>
          <UploadPDF />
        </div>

        <div className="sidebar-footer">
          <div className="avatar">AI</div>
          <div>
            <p className="avatar-name">RAG Assistant</p>
            <p className="avatar-status">● Online</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            <span className="topbar-icon">✦</span>
            AI Document Chat
          </div>
          <span className="topbar-badge">Powered by RAG</span>
        </header>

        <ChatBox />
      </main>
    </div>
  );
}
