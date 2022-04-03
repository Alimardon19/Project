import React, {useState, useEffect} from 'react';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../config/config';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useAuth, logout} from "../../config/config";
import request from "../../config/request";
import Loader from '../../component/loader/loader';
import {GetUsers} from "../../reducer/getUser/getUserReducer";

function Cabinet() {
    const currentUser = useAuth();
    const [Lesson, setLesson] = useState([]);
    const [selectTask, setSelectTask] = useState([]);
    const [selectTasks, setSelectTasks] = useState([]);
    const user = useSelector(state => state.GetUsers.thisUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        getLesson();
        dispatch(GetUsers());
    }, []);

    useEffect(()=> {
        AutoCompleteTask()
    }, [user]);

    async function AutoCompleteTask() {
        if (user) {
            if (user.task.length === 0) {
                const sortID = Lesson.sort((a, b) => {
                    return a.id - b.id
                })
                const m = doc(db, `users/${user.id}`);
                await updateDoc(m, {
                    task: arrayUnion(...sortID)
                });
                dispatch(GetUsers());
            }
        }
        console.log(user);
    }

    async function getLesson() {
        request.call("react_1-lesson").then(res => {
            setLesson(res);
        });

    }

    async function LogOut() {
        try {
            await logout();
            navigate('/');
        } catch  {
            alert("Error")
        }
    }
    function SelectLesson(item) {
        setSelectTask(item);
    }

    localStorage.setItem('email', currentUser.email);

    console.log(user);
    return (
        user ?
        <div>
            <div className="cabinet">
                <div className="left-box">
                    <h4> {user.fullName} </h4>
                    <h2> React.js darslari </h2>
                    <div className={'lessons'}>
                        {
                            user.task.map((item, index)=> <p key={index} onClick={()=> SelectLesson(item.tasks)}>
                                <b> {item.id} </b>
                                {item.lesson}
                            </p>)
                        }
                    </div>
                </div>
                <div className="right-box">
                    <div className={'header'}>
                        <h1> Vazifalar bo'limi </h1>
                        <button onClick={LogOut}> Hisobdan chiqish </button>
                    </div> <hr/>
                    <div className="tasksBox">
                        {
                            selectTask.map((item, index)=> <div
                                className={'taskBlock'}
                                key={index}
                                onClick={()=> setSelectTasks([{...item, id: index +1}])}
                            >
                                <div className="card">
                                    <h1> {index + 1} </h1>
                                </div>
                            </div>)
                        }

                    </div>
                    {
                        selectTasks.map((item, index)=> <h3>
                            <b>{item.id}</b>
                            <span> {item.v1} </span>
                            {
                                item.file ? <a href={item.file} download > Vazifani yuklab olish </a> : ''
                            }
                        </h3>)
                    }
                </div>
            </div>
        </div> : <Loader/>
    );
}

export default Cabinet;