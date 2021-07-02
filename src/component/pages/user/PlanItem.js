import './PlanItem.css'
import "antd/dist/antd.css"

import React, {useState} from 'react'
import { Button, Select, DatePicker, Input } from 'antd'
import moment from 'moment';

function PlanItem({ planDate, onDateChange, onAddPlanList, onDeleteClick, onCompleteClick }) {    
    const [planKey, setPlanKey] = useState(0);
    const [year, setYear] = useState('none');
    const [semester, setSemester] = useState('none');
    const [subject, setSubject] = useState('none');
    const [content, setContent] = useState('');
    
    const handleDateChange = (e, s) => {
        onDateChange(s);
    }

    const handleYearChange = (v, a) => {
        setYear(a.children);
    }

    const handleSemesterChange = (v, a) => {
        setSemester(a.children);
    }

    const handleSubjectChange = (v, a) => {
        setSubject(a.children);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleAddClick = async () => {
        if(year === '') {
            alert('학년이 선택되지 않았습니다.');
            return;
        } else if (semester === '') {            
            alert('학기가 선택되지 않았습니다.');
            return;
        } else if (subject === '') {            
            alert('과목이 선택되지 않았습니다.');
            return;
        } else if (content === '') {            
            alert('계획 내용이 없습니다.');
            return;
        }
        setPlanKey(planKey+1)
        const plan = {
            key: planKey,
            year: year,
            semester: semester,
            subject: subject,
            content: content
        }
        setYear('none');
        setSemester('none');
        setSubject('none');
        setContent('');

        onAddPlanList(plan);
    }

    return (
        <div>
            <div className='plan-form-button'>             
                <Button className='plan-form-button-i' name='btnAdd' onClick={handleAddClick}>추가</Button>
                <Button className='plan-form-button-i' name='btnDelete' onClick={onDeleteClick}>삭제</Button>
                <Button className='plan-form-button-i' name='btnComplete' onClick={onCompleteClick}>완료</Button>
            </div>
            <div className='plan-form'>
                <DatePicker className="plan-form-item" defaultValue={moment(planDate, 'YYYY-MM-DD')} onChange={handleDateChange} />       
                <Select value={year} className='plan-form-item' name="year" defaultValue="none" onChange={handleYearChange}>
                    <Select.Option value="none">** 학년선택 **</Select.Option>
                    <Select.Option value="001">1학년</Select.Option>
                    <Select.Option value="002">2학년</Select.Option>
                    <Select.Option value="003">3학년</Select.Option>
                </Select> 
                <Select value={semester} className='plan-form-item' name="semester" defaultValue="none" onChange={handleSemesterChange}>
                    <Select.Option value="none">** 학기선택 **</Select.Option>
                    <Select.Option value="01">1학기</Select.Option>
                    <Select.Option value="02">2학기</Select.Option>
                </Select> 
                <Select value={subject} className='plan-form-item' name="subject" defaultValue="none" onChange={handleSubjectChange}>
                    <Select.Option value="none">** 과목선택 **</Select.Option>
                    <Select.Option value="kor">국어</Select.Option>
                    <Select.Option value="eng">영어</Select.Option>
                    <Select.Option value="math">수학</Select.Option>
                </Select>
            </div>
            <div className="plan-form-content">
                <Input placeholder="계획을 입력해주세요." value={content} onChange={handleContentChange} />
            </div>
         </div>
    )
}

export default PlanItem;