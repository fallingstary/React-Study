import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerAdd(addProps) {
    const [addData, setAddData] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: ''
    });
    useEffect(() => {

    })
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer();
        setAddData({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
    }

    const handleFileChange = (e) => {
        setAddData({
            ...addData,
            file: e.target.files[0],
            fileName: e.target.value
        });
    }
    const handleValueChange = (e) => {
        setAddData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const addCustomer = async () => {
        const url = '/api/customers';
        const formData = new FormData();
        let formatBirthday = convertDateFormat(addData.birthday);
        formData.append('image', addData.file);
        formData.append('userName', addData.userName);
        formData.append('birthday', formatBirthday);
        formData.append('gender', addData.gender);
        formData.append('job', addData.job);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('서버응답: ', response.data);
            addProps.stateRefresh();
        } catch (error) {
            console.log('서버 요청 실패: ', error);
        }
    }

    const convertDateFormat = (inputDate) => {
        console.log(inputDate);
        // 입력된 날짜 문자열을 '-'로 분리하여 배열로 저장
        const dateArray = inputDate.split('-');

        // 각 부분을 가져와서 'YYMMDD' 형식으로 조합
        const formattedDate = dateArray[0].substring(2) + dateArray[1] + dateArray[2];
        console.log(formattedDate);
        return formattedDate;
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            프로필 이미지: <input type="file" name="file" file={addData.file} value={addData.fileName} onChange={handleFileChange}></input><br />
            이름: <input type="text" name="userName" value={addData.userName} onChange={handleValueChange}></input><br />
            생년월일: <input type="date" name="birthday" value={addData.birthday} onChange={handleValueChange}></input><br />
            성별: <input type="text" name="gender" value={addData.gender} onChange={handleValueChange}></input><br />
            직업: <input type="text" name="job" value={addData.job} onChange={handleValueChange}></input><br />
            <button type="submit">추가하기</button>
        </form>
    );
}

export default CustomerAdd;