import { Pencil, Save, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

export interface IUser {
  firstName: string;
}
interface ListUserProps {
  userData: IUser[]; // Props là một object có thuộc tính userData kiểu mảng
}
const InputDemo: React.FC<ListUserProps> = ({ userData }) => {
  const { isDark } = useTheme();
  const [dataInput, setDataInput] = useState<string>('');
  const [users, setUsers] = useState(userData);
  const [fillter, setFillter] = useState(userData);
  const [openEdit, setOpentEdit] = useState(-1);
  const [dataEdit, setDataEdit] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Sync local state when async data from parent changes.
  useEffect(() => {
    setUsers(userData);
    setFillter(userData);
  }, [userData]);

  const clear = () => {
    setDataInput('');
    setSearchValue('');
    setFillter(users);
  };
  const add = () => {
    if (dataInput.trim() === '') return;
    const data: IUser = { firstName: dataInput.trim() };
    setFillter([...users, data]);
    setUsers([...users, data]);
    clear();
  };
  const search = (value: string) => {
    const dataFillter = users.filter((data) =>
      data.firstName.toLowerCase().includes(value.toLowerCase()),
    );
    setFillter(dataFillter);
  };
  const deleteData = (value: number) => {
    const newUser = users.filter((_, index) => index !== value);
    setUsers(newUser);
    setFillter(newUser);
  };
  const editData = (index: number) => {
    setOpentEdit(-1);
    setOpentEdit(index);
  };
  const saveData = () => {
    users.map((data, index) => {
      if (index === openEdit) {
        data.firstName = dataEdit;
      }
    });
    setFillter([...users]);
    setOpentEdit(-1);
    setDataEdit('');
  };
  return (
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
        <button className=" rounded-md border  cursor-pointer" onClick={clear}>
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
      <ul className="list-disc w-full">
        {fillter.map((user, index) => (
          <li key={index}>
            {openEdit === index ? (
              <>
                <input
                  type="text"
                  className="rounded-md border"
                  defaultValue={user.firstName}
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
              <>
                {user.firstName}
                <div className="inline ms-5">
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
                    className="rounded-md border  cursor-pointer"
                  >
                    <Trash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputDemo;
