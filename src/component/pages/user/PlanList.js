import './Plan.css'

import React, { useState } from 'react'
import axios from 'axios';
import { Button, Select, DatePicker } from 'antd'
import moment from 'moment';

import PlanTable from './PlanTable'

function PlanList () {
    const columns = [
        {
            title: '계획일',
            dataIndex: 'DT_PLAN',
            key: 'DT_PLAN',
            width: 120
        },
        {
            title: '학년',
            dataIndex: 'CD_YEAR',
            key: 'CD_YEAR',
            width: 70
        },
        {
            title: '학기',
            dataIndex: 'CD_SEMESTER',
            key: 'CD_SEMESTER',
            width: 70
        },
        {
            title: '과목',
            dataIndex: 'CD_SUBJECT',
            key: 'CD_SUBJECT',
            width: 70
        },
        {
            title: '완료여부',
            dataIndex: 'YN_COMPLETE',
            key: 'YN_COMPLETE',
            width: 100
        },
        {
            title: '내용',
            dataIndex: 'NM_PLAN',
            key: 'NM_PLAN'
        }
    ]
    const userInfo = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [planDate, setPlanDate] = useState(new Date().toISOString().slice(0,10));
    const [selectedRow, setSelectedRow] = useState([]);
    const [planList, setPlanList] = useState([]);

    const handleDateChange = async (e, s) => {
        setPlanDate(s);
    }

    const handleRowChecked = (checkedRows) => {
        setSelectedRow(checkedRows);
    }

    const handleSearchClick = async () => {
        if(planDate === '') {
            alert('계획일자가 선택되지 않았습니다.');
            return;
        }
        
        await axios.post('/plan/search', null, {
            params: {
                no_emp: userInfo.NO_EMP,
                dt_plan: planDate
            }
        })
        .then(async function(response) {
            if(response.data.result.length === 0) {
                alert('해당 일자에 등록된 계획이 없습니다.');
                return;
            }
            setPlanList(response.data.result);
        })
        .catch(function(e) {
            console.error(e.response);
        });
    }

    const handleDeleteClick = async () => {
        if(selectedRow.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        const list = JSON.stringify(selectedRow).replaceAll('[', '').replaceAll(']','');        
        await axios.post('/plan/delete', null, {
            params: {
                deletedList: list
            }
        })
        .then(async function(response) {
            let newList = planList;
            await selectedRow.map(({key}) => {
                newList = newList.filter(item => item.key !== key);
            });        
            
            setPlanList(newList);
            setSelectedRow([]);
            
            alert('계획을 삭제하였습니다.');
        })
        .catch(function(e) {
            console.error(e.response);
        });
    }

    const handleCompleteClick = async () => {
        if(selectedRow.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        const list = JSON.stringify(selectedRow).replaceAll('[', '').replaceAll(']','');        
        await axios.post('/plan/complete', null, {
            params: {
                yn_complete: 'Y',
                list: list
            }
        })
        .then(async function(response) {
            if(response.data.status) {
                handleSearchClick();
            }

            alert('선택한 계획들을 완료처리하였습니다.');
        })
        .catch(function(e) {
            console.error(e.response);
        });
    }
    
    return(
        <div className="main">
            <div className='plan-form-button'>             
                <Button className='plan-form-button-i' name='btnAdd' onClick={handleSearchClick}>조회</Button>
                {userInfo.FG_GRANT === 'U' || userInfo.FG_GRANT === 'A' ? (
                    <div>
                        <Button className='plan-form-button-i' name='btnDelete' onClick={handleDeleteClick}>삭제</Button>
                        <Button className='plan-form-button-i' name='btnDelete' onClick={handleCompleteClick}>완료처리</Button>
                    </div>
                ) : (<div></div>)}
            </div>
            <div className='plan-form'>
                <DatePicker className="plan-form-item" defaultValue={moment(planDate, 'YYYY-MM-DD')} onChange={handleDateChange} />    
            </div>
            <PlanTable columns={columns} list={planList} onRowChecked={handleRowChecked} />
        </div>
    )
}

export default PlanList