// ExampleComponent.js
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';

const ExampleComponent = () => {
  const { theme, toggleTheme, themeStyles } = useContext(ThemeContext);

  const containerStyles = {
    ...themeStyles[theme],
    padding: '1rem',
  };

  return (
    <div style={containerStyles}>
      <h2>Example Component</h2>
      <p>This is an example component with theme styles.</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ExampleComponent;
