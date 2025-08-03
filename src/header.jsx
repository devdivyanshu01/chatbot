import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <>
      <header style={{ ...styles.header }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            ...styles.title,
            fontSize: isMobile ? "1rem" : styles.title.fontSize
          }}>
            TimeWaste_bot
          </div>
          <svg xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? "20" : "25"}
            height={isMobile ? "20" : "25"}
            fill="currentColor"
            className="bi bi-chat-dots-fill"
            viewBox="0 0 16 16"
            style={{ marginLeft: "10px" }}>
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width={isMobile ? "20" : "22"}
            height={isMobile ? "20" : "22"}
            fill="white"
            className="bi bi-person"
            viewBox="0 0 16 16"
            onClick={() => navigate('/signin')}
            style={{ cursor: 'pointer' }}>
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>

          <button style={styles.menuButton} onClick={() => setMenuOpen(true)}>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
          </button>
        </div>
      </header>

      <div style={{
        ...styles.sideMenu,
        width: isMobile ? "220px" : "250px",
        right: menuOpen ? 0 : `-${isMobile ? "220px" : "250px"}`
      }}>
        <button style={{
          ...styles.closeButton,
          fontSize: isMobile ? "1.5rem" : styles.closeButton.fontSize
        }} onClick={() => setMenuOpen(false)}>×</button>

        <nav style={styles.nav}>
          <a href='/' style={{
            ...styles.navItem,
            fontSize: isMobile ? "0.9rem" : styles.navItem.fontSize
          }}>Home</a>
          <a href="https://divyansh01.netlify.app" style={{
            ...styles.navItem,
            fontSize: isMobile ? "0.9rem" : styles.navItem.fontSize
          }}>About</a>
          <Link to="#" style={{
            ...styles.navItem,
            fontSize: isMobile ? "0.9rem" : styles.navItem.fontSize
          }}>Contact</Link>
          {isMobile && (
  <div
    onClick={() => {
      setMenuOpen(false); // Close the side menu
    }}
  >
    <Link
      to="/mobilehistory"
      style={{
        ...styles.navItem,
        fontSize: "0.9rem",
        display: "block"
      }}
    >
      Chat History
    </Link>
  </div>
)}

          <div style={styles.social}><a href="https://gtihub.com/devdivyanshu01">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-github" viewBox="0 0 16 16" onMouseOver={e => e.currentTarget.style.opacity='1'} onMouseOut={e => e.currentTarget.style.opacity='0.5'}>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg></a>
            <a href="mailto:divyanshudhiman51@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-envelope" viewBox="0 0 16 16" onMouseOver={e => e.currentTarget.style.opacity='1'} onMouseOut={e => e.currentTarget.style.opacity='0.5'}>
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
            </svg></a>
            <a href="www.linkedin.com/in/divyanshuu01"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-linkedin" viewBox="0 0 16 16" onMouseOver={e => e.currentTarget.style.opacity='1'} onMouseOut={e => e.currentTarget.style.opacity='0.5'}>
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg></a>
          </div>
          <span style={{
            ...styles.authBox,
            fontSize: isMobile ? "0.8rem" : styles.authBox.fontSize
          }}>
            <a href="/signup" style={{
              ...styles.navItem,
              fontSize: isMobile ? "0.85rem" : styles.navItem.fontSize
            }}
            onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={e => e.currentTarget.style.textDecoration = "none"}>SignUp</a>
            <span>or</span>
            <a href="/signin" style={{
              ...styles.navItem,
              fontSize: isMobile ? "0.85rem" : styles.navItem.fontSize
            }}
            onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={e => e.currentTarget.style.textDecoration = "none"}>Signin</a>
          </span>
        </nav>
      </div>

      {menuOpen && (
        <div style={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#222",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: "6px",
    height: "45px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginLeft: "0.7rem",
  },
  menuButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  bar: {
    width: "24px",
    height: "3px",
    background: "#fff",
    borderRadius: "2px",
  },
  sideMenu: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    background: "#333",
    color: "#fff",
    boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
    transition: "right 0.3s ease",
    zIndex: 10,
    paddingTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.7rem",
    alignSelf: "flex-end",
    marginRight: "1rem",
    cursor: "pointer",
  },
  nav: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    paddingLeft: "1.5rem",
    gap: "1rem",
  },
  navItem: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
  social:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    gap: '0.5rem',
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    zIndex: 5,
  },
  authBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
    fontSize: "1rem",
  },
};

export default Header;
