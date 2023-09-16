
import React, { useEffect, useState } from 'react'
import './Styles/taskList.css'
import { Heading, Button, Input, Checkbox, Flex, Center, Spacer, useToast, Box, textDecoration } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewIcon, } from '@chakra-ui/icons'






const TaskList = () => {



    const [task, setTask] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [isChecked, setIsChecked] = useState("");
    const [editIndex, setEditindex] = useState(null);

    const toast = useToast()



    const handleSubmit = () => {
        if (taskInput.trim() !== "") {
            let obj = {
                text: taskInput,
                isCompleted: false
            }
            setTask([...task, obj])
            setTaskInput("")

        } else {
            toast({
                title: `invalid task`,
                status: 'error',
                isClosable: true,
                position: 'top'
            })
        }

    }

    const handleDelete = (index) => {
        let updatedArr = [...task]
        updatedArr.splice(index, 1);
        setTask(updatedArr)
        toast({
            position: 'top',
            render: () => (
                <Box rounded='lg' color='white' p={3} bg='red.500'>
                    Your task has been deleted
                </Box>
            ),
            duration: 1000
        })

    }


    const handleCheckbox = (index) =>{
        let updatedTasks = [...task];
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTask(updatedTasks);
    }

    const editTask = (index, newText) => {
        const updatedTasks = [...task];
        updatedTasks[index].text = newText;
        setTask(updatedTasks);
      };


    return (
        <div className='parentDiv'>
            <div className='taskList'>
                <Heading mt='10px' mb='15px'>Task-List App</Heading>
                <div className='addTask'>
                    <Input placeholder='Add Task...' size='sm' width='auto' value={taskInput} onChange={(e) => setTaskInput(e.target.value)}></Input>
                    <Button bg='blue.300' onClick={handleSubmit}>Submit</Button>
                </div>
                <div className='displayTask'>


                    {
                        task.map((ele, index) => {

                            return (editIndex === index) ?
                                (
                                    <div className='tasks' key={index}>
                                       
                                    </div>
                                ) : (
                                    <div className='tasks' key={index}>
                                        <div>
                                            <Heading  size='md'><span style={{textDecoration: (ele.isCompleted) ? "line-through" : "none"}}>{ele.text}</span></Heading>
                                        </div>
                                       
                                        <div>
                                            <Flex gap='5'>
                                                <Checkbox colorScheme='green' isChecked={ele.isCompleted} onChange={() => handleCheckbox(index)} size='lg' />
                                                <EditIcon onClick={() => {
                                                    const newText = prompt('Edit task:', ele.text);
                                                    if (newText !== null) {
                                                        editTask(index, newText);
                                                    }
                                                }} className='pointer' boxSize={6} color='green.500'></EditIcon>
                                                <DeleteIcon onClick={() => handleDelete(index)} className='pointer' boxSize={6} color='red.500'></DeleteIcon>
                                            </Flex>
                                        </div>
                                    </div>
                                )
                        })
                    }

                </div>
            </div>
        </div>
    )

}

export default TaskList