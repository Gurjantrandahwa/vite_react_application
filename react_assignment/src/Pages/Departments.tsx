import React, {useState} from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    Button, Container,
} from '@mui/material';
import {ArrowBack, ExpandMore, ChevronRight} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const Departments = () => {
    const [expanded, setExpanded] = useState({});
    const [checkedSubDepts, setCheckedSubDepts] = useState({}); // New state for checked sub-departments
    const navigate = useNavigate();

    const handleToggle = (departmentId) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [departmentId]: !prevExpanded[departmentId],
        }));
    };

    const handleSubDeptToggle = (subDeptId) => {
        setCheckedSubDepts((prevChecked) => ({
            ...prevChecked,
            [subDeptId]: !prevChecked[subDeptId],
        }));
    };

    const data = [
        {
            id: 1,
            name: 'Customer Service',
            subDepartments: [
                {id: 101, name: 'Support'},
                {id: 102, name: 'Customer Success'},
            ],
        },
        {
            id: 2,
            name: 'Design',
            subDepartments: [
                {id: 201, name: 'Graphic Design'},
                {id: 202, name: 'Product Design'},
                {id: 203, name: 'Web Design'},
            ],
        },
    ];

    return <Container
        sx={{marginTop: "30px"}}
    >
        <List>
            <Button sx={{marginBottom: "15px"}}
                    variant="outlined"
                    onClick={() => navigate(-1)}>
                <ArrowBack sx={{marginRight: '5px'}}/>
                Back
            </Button>

            {data.map((department) => (
                <React.Fragment key={department.id}>
                    <ListItem button onClick={() => handleToggle(department.id)}>
                        <ListItemIcon>
                            {expanded[department.id] ? <ExpandMore/> : <ChevronRight/>}
                        </ListItemIcon>
                        <ListItemText primary={department.name}/>
                    </ListItem>
                    <Collapse
                        in={expanded[department.id]}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {department.subDepartments.map((subDept) => (
                                <ListItem key={subDept.id} button>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checkedSubDepts[subDept.id] || false}
                                            onChange={() => handleSubDeptToggle(subDept.id)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={subDept.name}/>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    </Container>
}

export default Departments;
