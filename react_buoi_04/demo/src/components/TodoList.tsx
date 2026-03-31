import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import { Pencil, Save, Trash, X } from 'lucide-react';
export type TTodo = {
  id: number;
  todo: string;
  completed: boolean;
};
interface ITypeProp {
  todos: TTodo[];
}
const TodoList: React.FC<ITypeProp> = ({ todos }) => {
  const [todoList, setTodoList] = useState(todos);
  const [dataInput, setDataInput] = useState<string>('');
  const [fillter, setFillter] = useState(todos);
  const [openEdit, setOpentEdit] = useState(-1);
  const [dataEdit, setDataEdit] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { isDark } = useTheme();
  useEffect(() => {
    setTodoList(todos);
    setFillter(todos);
  }, [todos]);
  const clear = () => {
    setDataInput('');
    setSearchValue('');
    setFillter(todoList);
  };
  const add = () => {
    if (dataInput.trim() === '') return;
    const data: TTodo = {
      todo: dataInput.trim(),
      id: Date.now(),
      completed: false,
    };
    setFillter([...todos, data]);
    setTodoList([...todos, data]);
    clear();
  };
  const editCheckBox = (id: number) => {
    todoList.map((data, index) => {
      if (index === id - 1) {
        data.completed = !data.completed;
      }
    });
    setFillter([...todoList]);
  };
  const search = (value: string) => {
    const dataFillter = todoList.filter((data) =>
      data.todo.toLowerCase().includes(value.toLowerCase()),
    );
    setFillter(dataFillter);
  };
  const deleteData = (value: number) => {
    const newUser = todoList.filter((_, index) => index !== value);
    setTodoList(newUser);
    setFillter(newUser);
  };
  const editData = (index: number) => {
    setOpentEdit(-1);
    setOpentEdit(index);
  };
  const saveData = () => {
    todoList.map((data, index) => {
      if (index === openEdit) {
        data.todo = dataEdit;
      }
    });
    setFillter([...todoList]);
    setOpentEdit(-1);
    setDataEdit('');
  };
  return (
    <div>
      <div className={`${isDark ? 'text-black' : ' text-slate-100 '}`}>
        <div className="flex">
          <input
            className={`${isDark ? 'border-black' : ' border-l-indigo-50 '}  border-2 rounded-sm`}
            type="text"
            value={dataInput}
            onChange={(e) => {
              setDataInput(e.target.value);
            }}
            placeholder="your name"
          />
          <input
            className={`${isDark ? 'border-black' : ' border-l-indigo-50 '}  border-2 rounded-sm`}
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              search(e.target.value);
            }}
            placeholder="fillter"
          />
          <button
            className=" rounded-md border  cursor-pointer"
            onClick={clear}
          >
            <X />
          </button>
          <button
            className=" rounded-md border  cursor-pointer p-3"
            onClick={add}
          >
            Add
          </button>
        </div>

        <p>Preview: {dataInput}</p>
        <ul className="list-disc w-full space-x-36">
          {fillter.map((user, index) => (
            <li key={user.id} className="flex">
              <input
                type="checkbox"
                checked={user.completed}
                onClick={() => editCheckBox(user.id)}
              />
              {openEdit === index ? (
                <>
                  <input
                    type="text"
                    className="rounded-md border"
                    defaultValue={user.todo}
                    onChange={(e) => {
                      setDataEdit(e.target.value);
                    }}
                  />
                  <button
                    id={index + ''}
                    onClick={() => {
                      saveData();
                    }}
                    data-id={index}
                    className=" rounded-md border  cursor-pointer"
                  >
                    <Save />
                  </button>
                  <button
                    id={index + ''}
                    onClick={() => {
                      setDataEdit('');
                      setOpentEdit(-1);
                    }}
                    data-id={index}
                    className="rounded-md border  cursor-pointer"
                  >
                    <X />
                  </button>
                </>
              ) : (
                <div className="flex">
                  <p
                    className={`inline ${user.completed ? 'line-through' : ''}`}
                  >
                    {' '}
                    {user.todo}
                  </p>
                  <div className=" ms-5 pl-7 flex gap-6">
                    <button
                      id={index + ''}
                      onClick={() => editData(index)}
                      data-id={index}
                      className=" rounded-md border  cursor-pointer"
                    >
                      <Pencil />
                    </button>
                    <button
                      id={index + ''}
                      onClick={() => {
                        deleteData(index);
                      }}
                      data-id={index}
                      className="rounded-md border  cursor-pointer "
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
