import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    Button,
    Container,
} from '@mui/material';
import { Add, ArrowBack, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
}

interface SubDepartment {
    id: number;
    name: string;
}

const Departments = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [checkedDepartments, setCheckedDepartments] = useState<{
        [key: number]: boolean;
    }>({});
    const [checkedSubDepts, setCheckedSubDepts] = useState<{
        [key: number]: boolean;
    }>({});

    const handleToggle = (departmentId: number) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [departmentId]: !prevExpanded[departmentId],
        }));
    };

    const handleDepartmentToggle = (departmentId: number) => {
        const isDepartmentChecked = !checkedDepartments[departmentId];
        setCheckedDepartments((prevChecked) => ({
            ...prevChecked,
            [departmentId]: isDepartmentChecked,
        }));

        setCheckedSubDepts((prevChecked) => {
            const updatedCheckedSubDepts = { ...prevChecked };
            const subDepartments = data.find(
                (department) => department.id === departmentId
            )?.subDepartments;

            if (subDepartments) {
                subDepartments.forEach((subDept) => {
                    updatedCheckedSubDepts[subDept.id] = isDepartmentChecked;
                });
            }

            return updatedCheckedSubDepts;
        });
    };

    const handleSubDeptToggle = (subDeptId: number) => {
        const isSubDeptChecked = !checkedSubDepts[subDeptId];
        setCheckedSubDepts((prevChecked) => ({
            ...prevChecked,
            [subDeptId]: isSubDeptChecked,
        }));

        const departmentId = data.find((department) =>
            department.subDepartments.some((subDept) => subDept.id === subDeptId)
        )?.id;

        if (departmentId) {
            const allSubDeptsChecked = data
                .find((department) => department.id === departmentId)
                ?.subDepartments.every(
                    (subDept) => checkedSubDepts[subDept.id] || isSubDeptChecked
                );

            setCheckedDepartments((prevChecked) => ({
                ...prevChecked,
                [departmentId]: allSubDeptsChecked || false,
            }));
        }
    };

    const data: Department[] = [
        {
            id: 1,
            name: 'Customer Service',
            subDepartments: [
                { id: 101, name: 'Support' },
                { id: 102, name: 'Customer Success' },
            ],
        },
        {
            id: 2,
            name: 'Design',
            subDepartments: [
                { id: 201, name: 'Graphic Design' },
                { id: 202, name: 'Product Design' },
                { id: 203, name: 'Web Design' },
            ],
        },
        {
            id: 3,
            name: 'Agriculture & Fishing',
            subDepartments: [
                { id: 301, name: 'Agriculture' },
                { id: 302, name: 'Crops' },
                { id: 303, name: 'Farming Animals & Livestock' },
                { id: 304, name: 'Fishing' },
                { id: 305, name: 'Ranching' },
            ],
        },
        {
            id: 4,
            name: 'Business Services',
            subDepartments: [
                { id: 401, name: 'Accounting & Accounting services' },
                { id: 402, name: 'Auctions' },
                { id: 403, name: 'Business Services' },
                { id: 404, name: 'Career Planning' },
                { id: 405, name: 'Career' },
            ],
        },
    ];

    return (
        <Container sx={{ marginTop: '30px' }}>
            <List sx={{ maxWidth: '35%', height: '90vh', overflowY: 'scroll' }}>
                <Button
                    sx={{ marginBottom: '15px' }}
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack sx={{ marginRight: '5px' }} />
                    Back
                </Button>

                {data.map((department) => (
                    <React.Fragment key={department.id}>
                        <ListItem button onClick={() => handleToggle(department.id)}>
                            <ListItemIcon>
                                {expanded[department.id] ? <Remove /> : <Add />}
                            </ListItemIcon>
                            <Checkbox
                                checked={checkedDepartments[department.id] || false}
                                onChange={() => handleDepartmentToggle(department.id)}
                            />
                            <ListItemText primary={department.name} />
                        </ListItem>
                        <Collapse
                            in={expanded[department.id]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List
                                component="div"
                                disablePadding
                                sx={{ marginLeft: '80px' }}
                            >
                                {department.subDepartments.map((subDept) => (
                                    <ListItem key={subDept.id} button>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={checkedSubDepts[subDept.id] || false}
                                                onChange={() => handleSubDeptToggle(subDept.id)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={subDept.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );
};

export default Departments;
