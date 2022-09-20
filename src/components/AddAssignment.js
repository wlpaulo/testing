import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Button, } from '@mui/material';
import Radio from '@mui/material/Radio';
import { DataGrid } from '@mui/x-data-grid';
import { SERVER_URL } from '../constants.js'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddAssignment = () => {

    const [name, setname] = React.useState("")
    const [date, setDate] = React.useState("")
    const [course, setCourse] = React.useState("")

    const handleChangeName = (e) => {
        console.log("Hello", e.target.value)
        setname(e.target.value)

    }

    const handleChangeDate = (e) => {
        console.log("Date", e.target.value)

        setDate(e.target.value)
    }

    const handleChangeCourse = (e) => {
        console.log("course", e.target.value)

        setCourse(e.target.value)
    }

    const fetchAssignments = () => {
        console.log("Assignment.fetchAssignments");
        const token = Cookies.get('XSRF-TOKEN');
        fetch(`${SERVER_URL}/gradebook`,
            {
                method: 'GET',
                headers: { 'X-XSRF-TOKEN': token }
            })
            .then((response) => response.json())
            .then((responseData) => {
                if (Array.isArray(responseData.assignments)) {
                    //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table 
                    this.setState({ assignments: responseData.assignments.map((assignment, index) => ({ id: index, ...assignment })) });
                } else {
                    toast.error("Fetch failed.", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
            })
            .catch(err => console.error(err));
    }

    const addAssignment = () => {
        console.log("add assignment")
        const params = {
            name: name,
            duedate: date,
            //courseId: course
        };

        console.log(params);
        const options = {
            method: 'POST',
            body: JSON.stringify(params)
        };
        // fetch(`${SERVER_URL}/assignment?name=${name}&dueDate=${date}&course=${course}`, options)
        // fetch assignment     
        fetch(`${SERVER_URL}/assignment?name=${name}&dueDate=${date}`, options)
            .then(response => {

                return response.json()
            })
            .then(response => {
                // Do something with response.
                console.log(response);
            });

    }



    return (
        <div align="left" >


            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField type="text" name="name" label="Name" placeholder='Name' id="outlined-basic" variant="outlined" onChange={handleChangeName} />
                <TextField type="date" name="dueDate" label="" placeholder='' id="outlined-basic" variant="outlined" onChange={handleChangeDate} />
                <TextField type="text" name="course" label="course" placeholder='Course' id="outlined-basic" variant="outlined" onChange={handleChangeCourse} />
                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}

            </Box>

            <Button
                variant="outlined" color="primary" style={{ margin: 10 }}
                onClick={addAssignment}
            >
                Add assignment
            </Button>

            <ToastContainer autoClose={1500} />
        </div>
    )
}


export default AddAssignment;