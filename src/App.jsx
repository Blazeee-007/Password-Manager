import React, { useState, useEffect } from 'react';
    import { v4 as uuidv4 } from 'uuid';

    function App() {
      const [passwords, setPasswords] = useState([]);
      const [newSite, setNewSite] = useState('');
      const [newUsername, setNewUsername] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [showPassword, setShowPassword] = useState({});
      const [errors, setErrors] = useState({});
      const [darkMode, setDarkMode] = useState(false);

      useEffect(() => {
        const storedPasswords = localStorage.getItem('passwords');
        if (storedPasswords) {
          setPasswords(JSON.parse(storedPasswords));
        }

        const storedMode = localStorage.getItem('darkMode');
        if (storedMode) {
          setDarkMode(JSON.parse(storedMode));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwords));
      }, [passwords]);

      useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.classList.toggle('dark-mode', darkMode);
        document.body.classList.toggle('light-mode', !darkMode);
      }, [darkMode]);

      const handleSiteChange = (event) => {
        setNewSite(event.target.value);
      };

      const handleUsernameChange = (event) => {
        setNewUsername(event.target.value);
      };

      const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
      };

      const validateForm = () => {
        let formErrors = {};
        if (!newSite.trim()) {
          formErrors.site = 'Site name is required';
        }
        if (!newUsername.trim()) {
          formErrors.username = 'Username is required';
        }
        if (!newPassword.trim()) {
          formErrors.password = 'Password is required';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };

      const addPassword = () => {
        if (validateForm()) {
          const passwordEntry = {
            id: uuidv4(),
            site: newSite,
            username: newUsername,
            password: newPassword,
          };
          setPasswords([...passwords, passwordEntry]);
          setNewSite('');
          setNewUsername('');
          setNewPassword('');
          setErrors({});
        }
      };

      const deletePassword = (id) => {
        setPasswords(passwords.filter((password) => password.id !== id));
      };

      const toggleShowPassword = (id) => {
        setShowPassword((prevShowPassword) => ({
          ...prevShowPassword,
          [id]: !prevShowPassword[id],
        }));
      };

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

      return (
        <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className="mode-toggle" onClick={toggleDarkMode}>
            <div className={`slider ${darkMode ? 'dark-mode' : 'light-mode'}`}></div>
            <span className={darkMode ? 'dark-mode' : 'light-mode'}>
              {darkMode ? 'Dark' : 'Light'}
            </span>
          </div>
          <div className={`container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <h1 className={darkMode ? 'dark-mode' : 'light-mode'}>Password Manager</h1>
            <div className="password-form">
              <label className={darkMode ? 'dark-mode' : 'light-mode'}>Site Name</label>
              <input
                type="text"
                value={newSite}
                onChange={handleSiteChange}
                placeholder="Enter Site Name"
                className={darkMode ? 'dark-mode' : 'light-mode'}
              />
              {errors.site && <div className={`error-message ${darkMode ? 'dark-mode' : 'light-mode'}`}>{errors.site}</div>}
              <label className={darkMode ? 'dark-mode' : 'light-mode'}>Username</label>
              <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                placeholder="Enter Username"
                className={darkMode ? 'dark-mode' : 'light-mode'}
              />
              {errors.username && <div className={`error-message ${darkMode ? 'dark-mode' : 'light-mode'}`}>{errors.username}</div>}
              <label className={darkMode ? 'dark-mode' : 'light-mode'}>Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                className={darkMode ? 'dark-mode' : 'light-mode'}
              />
              {errors.password && <div className={`error-message ${darkMode ? 'dark-mode' : 'light-mode'}`}>{errors.password}</div>}
              <button onClick={addPassword} className={darkMode ? 'dark-mode' : 'light-mode'}>Add Password</button>
            </div>
            <ul className="password-list">
              {passwords.map((password) => (
                <li key={password.id} className={`password-item ${darkMode ? 'dark-mode' : 'light-mode'}`}>
                  <p className={darkMode ? 'dark-mode' : 'light-mode'}>
                    <span className="password-text">
                      <strong>{password.site}:</strong> {password.username} /{' '}
                      <span
                        className={showPassword[password.id] ? '' : 'masked'}
                      >
                        {showPassword[password.id] ? password.password : '•'.repeat(password.password.length)}
                      </span>
                    </span>
                    <button onClick={() => toggleShowPassword(password.id)} className={darkMode ? 'dark-mode' : 'light-mode'}>
                      {showPassword[password.id] ? 'Hide' : 'Show'}
                    </button>
                  </p>
                  <button onClick={() => deletePassword(password.id)} className={darkMode ? 'dark-mode' : 'light-mode'}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    export default App;
