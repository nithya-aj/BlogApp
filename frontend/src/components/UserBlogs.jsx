import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Blog from './Blog';
import { Box } from '@mui/material';

const UserBlogs = () => {
  const id = localStorage.getItem("userId")
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    console.log(data.blogs, 'blogs in data');
    return data
  }
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  }, [])
  console.log(blogs);

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }))

  return (
    <Box sx={{ margin: '2rem' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {blogs && blogs.map((blog, index) => (
          <Grid xs={4}>
            <Item>
              <Blog title={blog.title} desc={blog.desc} imageUrl={blog.imageUrl} userName={blog.user.name} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default UserBlogs