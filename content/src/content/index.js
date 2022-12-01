import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { micromovieFrontend, microsharedActionCounter } from "../action/micro-action";
import PaginationRounded from "./pagination";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function Content() {
    const dispatch = useDispatch();
    const { data, genres, page } = useSelector(state => state.microfrontendState);
    useEffect(() => {
        dispatch(micromovieFrontend())
    }, []);
    const [inputName, setInput] = useState("")
    return (
        <div className='my-4' style={{ padding: "20px", height: "100%", marginTop: "4rem" }}>
            <div style={{ display: "flex", padding: 16, justifyContent: "space-between" }}>
                <FormControl style={{ width: "30%" }}>
                    <InputLabel size="small" id="demo-simple-select-label">Genre</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={inputName}
                        onChange={(e, select) => {
                            setInput(select.props.children)
                            dispatch(micromovieFrontend(select.props.value))
                        }}
                    >
                        {
                            genres?.map((item, index) => {
                                return (<MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                            })
                        }
                    </Select>
                </FormControl>
                {page > 0 && <PaginationRounded />}
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))",
                gap: "1rem"
            }}>
                {/* {
                    data.length === 0 && <div>Not Found</div>
                } */}
                {
                    data.map((item, index) => {
                        return (
                            <Card key={index} sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={`https://image.tmdb.org/t/p/w500` + item.poster_path}
                                    alt="green iguana"
                                />
                                <Typography className="color-vote" component="span">
                                    {item.vote_average}
                                </Typography>
                                <CardContent style={{ paddingTop: 0 }}>
                                    <Typography fontSize={"1rem"} gutterBottom variant="h5" component="div">
                                        {item.original_title}
                                    </Typography>
                                    <Typography style={{ height: "91px" }} variant="body2" color="text.secondary">
                                        {item.overview?.substring(0, 150) + "..."}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => {
                                        dispatch(microsharedActionCounter({ movie: item }))
                                    }} color="primary" variant="outlined" fullWidth size="small">Add To Download</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    );
}
