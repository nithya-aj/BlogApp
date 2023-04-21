import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Blog = ({ title, desc, imageUrl, userName, isUser, id }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEdit = () => {
        navigate(`/myBlogs/${id}`)
    }

    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`)
            .catch(err => console.log(err))
        const data = await res.data
        return data
    }

    const handleDelete = () => {
        handleClose()
        deleteRequest().then(() => navigate('/')).then(() => navigate('/blogs'))
    }

    return (
        <Card
            variant="outlined"
            sx={{
                minWidth: 300,
                '--Card-radius': (theme) => theme.vars.radius.xs,
                width: "50%",
                margin: 'auto',
                mt: 2,
                padding: 2
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            m: '-2px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                        },
                    }}
                >
                    <Avatar
                        size="sm"
                        src="/static/logo.png"
                        sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                    />
                </Box>
                <Typography fontWeight="lg">{userName}</Typography>
                {isUser && <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                    <MoreHoriz
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEdit}>Edit post</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete post</MenuItem>
                    </Menu>
                </IconButton>}
            </Box>
            <CardOverflow>
                <AspectRatio>
                    <img src={imageUrl} alt="blog_image" loading="lazy" />
                </AspectRatio>
            </CardOverflow>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <FavoriteBorder />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <ModeCommentOutlined />
                    </IconButton>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <SendOutlined />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                    {[...Array(5)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                borderRadius: '50%',
                                width: `max(${6 - index}px, 3px)`,
                                height: `max(${6 - index}px, 3px)`,
                                bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                            }}
                        />
                    ))}
                </Box>
                <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                    <IconButton variant="plain" color="neutral" size="sm">
                        <BookmarkBorderRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
            {/* <Link
                component="button"
                underline="none"
                fontSize="sm"
                fontWeight="lg"
                textColor="text.primary"
            >
                8.1M Likes
            </Link> */}
            <Typography fontSize="sm">
                <Link
                    component="button"
                    color="neutral"
                    fontWeight="lg"
                    textColor="text.primary"
                >
                    {title}
                </Link>{' '}
                {desc}
            </Typography>
            {/* <Link
                component="button"
                underline="none"
                fontSize="sm"
                startDecorator="…"
                sx={{ color: 'text.tertiary' }}
            >
                more
            </Link> */}
            {/* <Link
                component="button"
                underline="none"
                fontSize="10px"
                sx={{ color: 'text.tertiary', my: 0.5 }}
            >
                2 DAYS AGO
            </Link> */}
            {/* <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                    <Face />
                </IconButton>
                <Input
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                />
                <Link disabled underline="none" role="button">
                    Post
                </Link>
            </CardOverflow> */}
            {/* <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card>
    )
}

export default Blog