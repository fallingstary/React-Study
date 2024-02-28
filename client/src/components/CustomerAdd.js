import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';

function CustomerAdd(addProps) {
    const [openDialog, setDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null);
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

    const handleOpenDialog = () => {
        setDialog(true);
    };
    const handleCloseDialog = () => {
        setDialog(false);
        setAddData({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        setSelectedFile(null);
    };
    const handleFormSubmit = (e) => {
        addCustomer();
        setAddData({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        setSelectedFile(null);
    }
    const handleClickProfile = () => {
        // input 파일 엘리먼트를 클릭하여 파일 선택 다이얼로그를 엽니다.
        inputRef.current.click();
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
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
        <React.Fragment>
            <Button variant='contained' onClick={handleOpenDialog}>고객 추가</Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={
                    {
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            handleFormSubmit();
                            handleCloseDialog();
                        },
                    }
                }
            >
                <DialogTitle>
                    고객 추가
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                        alt="프로필 사진"
                        src={selectedFile && URL.createObjectURL(selectedFile)}
                        sx={{ width: 128, height: 128, cursor: 'pointer' }}
                        onClick={handleClickProfile}
                    />
                    <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    {/* <TextField label="프로필 이미지" type="file" name="file" file={addData.file} value={addData.fileName} onChange={handleFileChange}></TextField><br /> */}
                    <TextField label="이름" type="text" name="userName" value={addData.userName} onChange={handleValueChange} fullWidth variant="standard"></TextField><br />
                    <TextField style={{ marginTop: '16px' }} type="date" name="birthday" value={addData.birthday} onChange={handleValueChange} fullWidth variant="standard"></TextField><br />
                    <TextField label="성별" type="text" name="gender" value={addData.gender} onChange={handleValueChange} fullWidth variant="standard"></TextField><br />
                    <TextField label="직업" type="text" name="job" value={addData.job} onChange={handleValueChange} fullWidth variant="standard"></TextField><br />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' type="submit">추가</Button>
                    <Button variant='contained' color='secondary' onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default CustomerAdd;