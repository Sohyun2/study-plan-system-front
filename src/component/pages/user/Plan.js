import './Plan.css'

import React, { useState } from 'react'
import axios from 'axios';

import PlanItem from './PlanItem'
import PlanTable from './PlanTable'

function Plan () {
    const columns = [
        {
            title: '학년',
            dataIndex: 'year',
            key: 'year',
            width: 70
        },
        {
            title: '학기',
            dataIndex: 'semester',
            key: 'semester',
            width: 70
        },
        {
            title: '과목',
            dataIndex: 'subject',
            key: 'subject',
            width: 70
        },
        {
            title: '내용',
            dataIndex: 'content',
            key: 'content2'
        }
    ]
    const [selectedRow, setSelectedRow] = useState([]);
    const [planDate, setPlanDate] = useState(new Date().toISOString().slice(0,10));
    const [planList, setPlanList] = useState([]);

    const handleDateChange = (value) => {
        setPlanDate(value);
    }

    const handlePlanList = (plan) => {
        setPlanList(planList.concat(plan));
    }
    
    const handleDeleteClick = async () => {
        if(selectedRow.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        let newList = planList;
        await selectedRow.map(({key}) => {
            newList = newList.filter(item => item.key !== key);
        });
        
        setPlanList(newList);
        setSelectedRow([]);
    }

    const handleCompleteClick = async() => {
        if(planDate === '') {
            alert('계획일자가 선택되지 않았습니다.');
            return;
        } else if(planList.length === 0) {
            alert('저장할 계획이 없습니다.');
            return;
        }
        
        const userInfo = JSON.parse(localStorage.getItem("loginInfo")).user;
        // axios에서 [, ]가 들어가면 400 error 뜸.. 왜지
        const list = JSON.stringify(planList).replaceAll('[', '').replaceAll(']','');
        await axios.post('/plan/save', null, {
            params: {
                no_emp: userInfo.NO_EMP,
                dt_plan: planDate,
                planList: list
            }
        })
        .then(async function(response) {
            if(!response.data.status) {
                alert(response.data.errMsg);
            } else {
                alert('계획작성이 완료되었습니다.');
                setPlanList([]);
            }

        })
        .catch(function(e) {
            console.error(e.response);
        });
    }

    const handleRowChecked = (checkedRows) => {
        setSelectedRow(checkedRows);
    }

    return(
        <div className="main">
            <PlanItem planDate={planDate}
                onDateChange={handleDateChange}
                onAddPlanList={handlePlanList} 
                onDeleteClick={handleDeleteClick}
                onCompleteClick={handleCompleteClick}
            />
            <PlanTable columns={columns}
                list={planList}
                onRowChecked={handleRowChecked} />
        </div>
    )
}

export default Plan