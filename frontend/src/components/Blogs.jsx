import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Grid from '@mui/joy/Grid';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Blog from './Blog';
import { Box } from '@mui/material';

const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blog")
      .catch(err => console.log(err))
    const data = await res.data
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
  }));

  return (
    <Box sx={{ margin: '2rem' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {blogs && blogs.map((blog, index) => (
          <Grid xs={12}>
            <Item>
              <Blog id={blog._id} isUser={localStorage.getItem("userId")=== blog.user._id} title={blog.title} desc={blog.desc} imageUrl={blog.image} userName={blog.user.name} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Blogs
