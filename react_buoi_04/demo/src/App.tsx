import { useEffect, useState } from 'react';

import './App.css';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './components/ThemeContext';
import type { TTodo } from './components/TodoList';
import TodoList from './components/TodoList';

interface IApiResponse {
  todos: TTodo[]; // Mảng các user mà bạn đã định nghĩa trước đó
}
function App() {
  const [dataAPi, setDataAPI] = useState<IApiResponse>({ todos: [] });
  const { isDark, toggleTheme } = useTheme();
  const data: TTodo[] = dataAPi.todos;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos?limit=5');
        const result = await response.json();
        setDataAPI(result);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="relative">
        <div
          className={` justify-end absolute h-screen w-full p-6 transition-colors flex gap-3 ${isDark ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 text-slate-100 '}`}
        >
          <h1 className="mb-4 text-3xl font-bold">Change theme</h1>
          <div className="">
            <button
              className="flex gap-3 rounded-md border px-4 py-2 cursor-pointer"
              onClick={() => {
                toggleTheme();
              }}
            >
              {isDark ? (
                <>
                  <Moon /> DARK
                </>
              ) : (
                <>
                  <Sun /> LIGHT
                </>
              )}
            </button>
          </div>
        </div>
        <div className="absolute ps-7 py-3">
          <TodoList todos={data} />
        </div>
      </div>
    </>
  );
}

export default App;
