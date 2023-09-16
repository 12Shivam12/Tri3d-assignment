
import React, { useEffect, useState } from 'react'
import './Styles/taskList.css'
import { Heading, Button, Input, Checkbox, Flex, Center, Spacer, useToast, Box, textDecoration, Select } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewIcon, } from '@chakra-ui/icons'






const TaskList = () => {



    const [task, setTask] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [isChecked, setIsChecked] = useState("");
    const [editIndex, setEditindex] = useState(null);
    const [filterValue,setfilterValue] = useState("");
    const [origninalTask,setOriginalTask] = useState([]);

    const toast = useToast()


    useEffect(() =>{
        applyFilter();
    },[filterValue])

    const handleSubmit = () => {
        if (taskInput.trim() !== "") {
            let obj = {
                text: taskInput,
                isCompleted: false
            }
            setTask([...task, obj])
            setOriginalTask([...task,obj])
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

    const applyFilter = () =>{
        let filteredArr = [...origninalTask]
        if(filterValue === "completed"){
             filteredArr = filteredArr.filter((value) => value.isCompleted === true)
            
        }else if(filterValue === "incompleted"){
             filteredArr = filteredArr.filter((value) => value.isCompleted === false)
            
        }
        setTask(filteredArr)
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


    const handleCheckbox = (index) => {
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
          <Heading mt='10px' mb='30px' color={"red.400"} fontSize={['xl', '2xl', '3xl']}>Task-List App</Heading>
          <div className='addTask'>
            <div>
              <Input
                placeholder='Add Task...'
                textColor={"blue.600"}
                fontWeight={"xl"}
                size={['xs', 'sm', 'md']} // Adjust size for different screen sizes
                width={['100%', 'auto']} // Adjust width for different screen sizes
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              ></Input>
              <Button size={['xs', 'sm']} bg='blue.300' onClick={handleSubmit}>Submit</Button> {/* Adjust button size */}
            </div>
            <div>
              <Select
                placeholder='Select option'
                value={filterValue}
                onChange={(e) => setfilterValue(e.target.value)}
                size={['xs', 'sm']} // Adjust size for different screen sizes
              >
                <option value='all'>All</option>
                <option value='completed'>Completed</option>
                <option value='incompleted'>Incompleted</option>
              </Select>
            </div>
          </div>
          <div className='displayTask'>
            <ul>
              {
                task.map((ele, index) => (
                  (editIndex === index) ?
                    (
                      <div className='tasks' key={index}></div>
                    ) : (
                      <div className='tasks' key={index}>
                        <div>
                          <Heading size={['sm', 'md']}><span style={{ textDecoration: (ele.isCompleted) ? "line-through" : "none" }}>{ele.text}</span></Heading>
                        </div>
                        <div>
                          <Flex gap={['2', '5']}>
                            <Checkbox colorScheme='green' isChecked={ele.isCompleted} onChange={() => handleCheckbox(index)} size={['sm', 'lg']} /> {/* Adjust checkbox size */}
                            <EditIcon color="blue.600" onClick={() => {
                              const newText = prompt('Edit task:', ele.text);
                              if (newText !== null) {
                                editTask(index, newText);
                              }
                            }} className='pointer' boxSize={['4', '6']} /> {/* Adjust icon size */}
                            <DeleteIcon onClick={() => handleDelete(index)} className='pointer' boxSize={['4', '6']} color='red.600' /> {/* Adjust icon size */}
                          </Flex>
                        </div>
                      </div>
                    )
                ))
              }
            </ul>
          </div>
        </div>
      </div>

    )

}

export default TaskList