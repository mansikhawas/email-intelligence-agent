
import { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Professional");
  const [darkMode, setDarkMode] = useState(false);
  const [emailType, setEmailType] = useState("General");

  const generateReply = async () => {

    if (!email) {
      alert("Please paste an email first");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-reply",
        null,
        {
          params: {
            email_text: `Type: ${emailType}\nTone: ${tone}\n\n${email}`
          }
        }
      );

      setReply(response.data.reply);

    } catch (error) {

      setReply("Unable to generate reply.");

    }

    setLoading(false);
  };

  const clearAll = () => {
    setEmail("");
    setReply("");
  };

  const copyReply = () => {
    navigator.clipboard.writeText(reply);
    alert("Reply copied!");
  };

  const theme = darkMode ? darkStyles : lightStyles;

  return (

    <div style={theme.page}>

      <div style={theme.navbar}>

        <h2 style={theme.logo}>✉ Email Intelligence Agent</h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={theme.modeButton}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

      <div style={theme.heroSection}>

        <h1 style={theme.heading}>
          Smart AI Email Reply Generator
        </h1>

        <p style={theme.subheading}>
          Generate fast, professional, and contextual replies instantly.
        </p>

      </div>

      <div style={theme.card}>

        <div style={theme.toolbar}>

          <div>
            <label style={theme.label}>Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={theme.select}
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Formal</option>
              <option>Apologetic</option>
              <option>Confident</option>
            </select>
          </div>

          <div>
            <label style={theme.label}>Email Type</label>
            <select
              value={emailType}
              onChange={(e) => setEmailType(e.target.value)}
              style={theme.select}
            >
              <option>General</option>
              <option>Interview</option>
              <option>Leave Request</option>
              <option>Meeting</option>
              <option>Customer Support</option>
            </select>
          </div>

        </div>

        <textarea
          rows="11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Paste your email here..."
          style={theme.textarea}
        />

        <div style={theme.statsBar}>
          <span>Characters: {email.length}</span>
          <span>Words: {email.trim() ? email.trim().split(/\s+/).length : 0}</span>
        </div>

        <div style={theme.buttonRow}>

          <button
            onClick={generateReply}
            style={theme.generateButton}
          >
            {loading ? "Generating Reply..." : "Generate AI Reply"}
          </button>

          <button
            onClick={clearAll}
            style={theme.clearButton}
          >
            Clear
          </button>

        </div>

        {reply && (

          <div style={theme.replyBox}>

            <div style={theme.replyHeader}>

              <h2>Generated Reply</h2>

              <button
                onClick={copyReply}
                style={theme.copyButton}
              >
                Copy Reply
              </button>

            </div>

            <p style={theme.replyText}>
              {reply}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

const commonStyles = {

  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  logo: {
    fontSize: "24px"
  },

  modeButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  heroSection: {
    textAlign: "center",
    marginBottom: "35px"
  },

  heading: {
    fontSize: "46px",
    marginBottom: "12px"
  },

  subheading: {
    fontSize: "18px"
  },

  card: {
    width: "850px",
    borderRadius: "24px",
    padding: "35px"
  },

  toolbar: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold"
  },

  select: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },

  textarea: {
    width: "100%",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #d1d5db",
    resize: "none",
    fontSize: "16px",
    boxSizing: "border-box",
    marginBottom: "15px"
  },

  statsBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    color: "gray"
  },

  buttonRow: {
    display: "flex",
    gap: "15px"
  },

  generateButton: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  clearButton: {
    width: "140px",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  replyBox: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "18px"
  },

  replyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  copyButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  replyText: {
    lineHeight: "1.9",
    whiteSpace: "pre-line",
    fontSize: "16px"
  }
};

const lightStyles = {
  ...commonStyles,

  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #dbeafe, #eff6ff)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial"
  },

  card: {
    ...commonStyles.card,
    backgroundColor: "white",
    boxShadow: "0px 10px 35px rgba(0,0,0,0.12)"
  },

  heading: {
    ...commonStyles.heading,
    color: "#111827"
  },

  subheading: {
    ...commonStyles.subheading,
    color: "#6b7280"
  },

  generateButton: {
    ...commonStyles.generateButton,
    backgroundColor: "#2563eb"
  },

  clearButton: {
    ...commonStyles.clearButton,
    backgroundColor: "#ef4444"
  },

  modeButton: {
    ...commonStyles.modeButton,
    backgroundColor: "#111827",
    color: "white"
  },

  replyBox: {
    ...commonStyles.replyBox,
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb"
  },

  copyButton: {
    ...commonStyles.copyButton,
    backgroundColor: "#10b981"
  }
};

const darkStyles = {
  ...commonStyles,

  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #111827, #1f2937)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial",
    color: "white"
  },

  card: {
    ...commonStyles.card,
    backgroundColor: "#1f2937",
    boxShadow: "0px 10px 35px rgba(0,0,0,0.35)"
  },

  heading: {
    ...commonStyles.heading,
    color: "white"
  },

  subheading: {
    ...commonStyles.subheading,
    color: "#d1d5db"
  },

  textarea: {
    ...commonStyles.textarea,
    backgroundColor: "#111827",
    color: "white",
    border: "1px solid #374151"
  },

  select: {
    ...commonStyles.select,
    backgroundColor: "#111827",
    color: "white",
    border: "1px solid #374151"
  },

  generateButton: {
    ...commonStyles.generateButton,
    backgroundColor: "#3b82f6"
  },

  clearButton: {
    ...commonStyles.clearButton,
    backgroundColor: "#ef4444"
  },

  modeButton: {
    ...commonStyles.modeButton,
    backgroundColor: "white",
    color: "black"
  },

  replyBox: {
    ...commonStyles.replyBox,
    backgroundColor: "#111827",
    border: "1px solid #374151"
  },

  copyButton: {
    ...commonStyles.copyButton,
    backgroundColor: "#10b981"
  },

  replyText: {
    ...commonStyles.replyText,
    color: "#e5e7eb"
  }
};

export default App;
