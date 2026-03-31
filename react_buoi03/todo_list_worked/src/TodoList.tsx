import { SearchSlash ,CirclePlus, CircleX, MessageCircleX, Pencil, Search} from 'lucide';
import React, { useState } from 'react';

const initJobs = [
    { id: 1, name: 'Hoc' },
    { id: 2, name: 'An' },
    { id: 3, name: 'Ngu' },
    { id: 4, name: 'Bida' }
];

const TodoList: React.FC = () => {
    const [jobs, setJobs] = useState(initJobs);
    const [search, setSearch] = useState("");
    const [activeSearchTerm, setActiveSearchTerm] = useState("");
    const [newJob, setNewJob] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');

    const handleSearch = () => {
        setActiveSearchTerm(search);
    };

    const filterJob = jobs.filter((job) => {
        return job.name.toLowerCase().includes(activeSearchTerm.toLowerCase());
    });

    const StartAddJob = () => {
        if (!newJob.trim()) return;
        const newJobObj = {
            id: Date.now(),
            name: newJob
        };
        setJobs([...jobs, newJobObj]);
        setNewJob('');
    };

    const deleteJob = (id: number) => {
        setJobs(jobs.filter((job) => job.id !== id));
    };

    const startEdit = (id: number, currentName: string) => {
        setEditingId(id);
        setEditName(currentName);
    };


    const saveEdit = (id: number) => {
        if (!editName.trim()) return; // Tránh lưu tên rỗng
        const updatedJobs = jobs.map(job => 
            job.id === id ? { ...job, name: editName } : job
        );
        setJobs(updatedJobs);
        setEditingId(null);
    };

    const cancelEdit = () => setEditingId(null);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Todo List</h2>
            <div>
                <input 
                    type="text"
                    placeholder='Search job...'
                    style={{ width: "200px", marginRight: '10px' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}><Search size={16}/></button>
                <br /><br />
                <input 
                    type="text"
                    placeholder='Add new job...'
                    style={{ width: "200px", marginRight: '10px' }}
                    value={newJob}
                    onChange={(e) => setNewJob(e.target.value)}
                />
                <button onClick={StartAddJob}><CirclePlus/></button>
            </div>

            <ol style={{ marginTop: '20px' }}>
                {filterJob.map((job) => (
                    <li key={job.id} style={{ marginBottom: '10px' }}>
                        {editingId === job.id ? (
                            <>
                                <input 
                                    value={editName} 
                                    onChange={(e) => setEditName(e.target.value)} 
                                />
                                <button onClick={() => saveEdit(job.id)} style={{ margin: '0 10px' }}>Lưu</button>
                                <button onClick={cancelEdit}><MessageCircleX size={16}/></button>
                            </>
                        ) : (
                            <>
                                <span style={{ display: 'inline-block', minWidth: '100px' }}>{job.name}</span>
                                <button onClick={() => startEdit(job.id, job.name)} style={{ margin: '0 10px' }}><Pencil size={16}/></button>
                                <button onClick={() => deleteJob(job.id)}><CircleX size={16}/></button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;