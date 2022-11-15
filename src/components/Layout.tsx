import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Footer from "./Footer";
import Header from "./Header";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(initialValue));
    } catch (error) {
      currentValue = initialValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

interface Props {
  children: JSX.Element;
}

const defaultMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function Layout({ children }: Props) {
  const [theme, setTheme] = useLocalStorage("wpm-app-darkmode", defaultMode ? "dark" : "light");

  const handleThemeMode = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className='d-flex flex-column vh-100'>
      <Header handleThemeMode={handleThemeMode} theme={theme} />
      <main className='flex-shrink-0 main'>
        <div className='container'>{children}</div>
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default Layout;
