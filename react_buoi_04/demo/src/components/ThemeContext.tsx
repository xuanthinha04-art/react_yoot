import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

// 1. Định nghĩa "hình dáng" của dữ liệu trong Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// 2. Tạo Context (Khởi tạo là undefined để bắt lỗi nếu quên bọc Provider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Tạo Provider - "Cái hộp" chứa dữ liệu để bao bọc ứng dụng
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Custom Hook để các component con gọi dùng cho nhanh
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được dùng bên trong ThemeProvider');
  }
  return context;
};
