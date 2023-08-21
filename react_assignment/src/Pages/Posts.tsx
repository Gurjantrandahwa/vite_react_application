import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button, Container, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

interface Post {
    id: number;
    title: string;
    body: string;
}

const Posts = () => {
    const [postData, setPostData] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data: Post[]) => setPostData(data));
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Title', width: 300},
        {field: 'body', headerName: 'Body', width: 500},
    ];

    return <Container
        sx={{
            height: 400,
            width: '100%',
            marginTop: "30px"
        }}
    >
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Button
                variant={"outlined"}
                onClick={() => navigate(-1)}
            >
                <ArrowBack sx={{marginRight: "5px"}}/> Back
            </Button>

            <Button variant={"contained"}>
                <Link to={"/departments"}>
                    Departments
                </Link>
            </Button>
        </Box>
        <Typography
            variant="h4"
            textAlign={"center"}
            marginBottom={"30px"}
            color={"secondary"}
            fontWeight={"bold"}
        >
            Posts
        </Typography>
        <DataGrid rows={postData} columns={columns}/>
    </Container>
};

export default Posts;
