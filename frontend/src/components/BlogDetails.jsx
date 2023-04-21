import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import ButtonCmp from './ButtonCmp';

const BlogDetails = () => {

  const navigate = useNavigate()

  const id = useParams().id

  const [blog, setBlog] = useState()

  const [inputs, setInputs] = React.useState({})

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog)
      setInputs({ title: data.blog.title, desc: data.blog.desc })
    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      desc: inputs.desc
    })
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(()=> navigate("/myBlogs/"))
  }

  return (
    <React.Fragment>
      {inputs && <Paper elevation={20} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5, margin: '2rem' }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Edit your blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Title
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  id="title"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                  label="Title"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Description
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="outlined-multiline-static"
                  label="Content"
                  name='desc'
                  value={inputs.desc}
                  onChange={handleChange}
                  multiline
                  fullWidth
                  rows={4}
                />
              </Grid>
              {/* <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Image Url
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="outlined-multiline-static"
                  label="Content"
                  name='image'
                  value={inputs.imageUrl}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Img Upload
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input name='image' value={inputs.image} onChange={handleImageChange} hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
                {imageUrl && <img style={{ height: '5rem', width: '5rem' }} src={imageUrl} alt="Preview" />}
              </Grid> */}
              <Grid item xs={12} sm={4} />
              {/* <Grid item xs={12} sm={4} /> */}
              <Grid item xs={12} sm={4}>
                <ButtonCmp type='submit' sx={{ px: "6rem" }} props={'Submit'} />
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </form>
        </Box>
      </Paper>}
    </React.Fragment >
  )
}

export default BlogDetails