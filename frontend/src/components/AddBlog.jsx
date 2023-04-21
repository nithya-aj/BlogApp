import React from 'react'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import ButtonCmp from './ButtonCmp';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = React.useState(null)
  const [imageUrl, setImageUrl] = React.useState(null)

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0])
  }

  const [inputs, setInputs] = React.useState({
    title: "", desc: "", image: ""
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/blog/add', {
      title: inputs.title,
      desc: inputs.desc,
      image: inputs.image,
      user: localStorage.getItem("userId")
    })
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"))
  }

  return (
    <React.Fragment>
      <Paper elevation={20} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5, margin: '2rem' }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Post your blog
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
              <Grid item xs={12} sm={2}>
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
                  id="outlined-multiline-static"
                  label="Content"
                  name='image'
                  value={inputs.image}
                  onChange={handleChange}
                  fullWidth
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
                <ButtonCmp type='submit' sx={{ px: "6rem" }} props={'Add Blog'} />
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </form>
        </Box>
      </Paper>
    </React.Fragment >
  )
}

export default AddBlog
