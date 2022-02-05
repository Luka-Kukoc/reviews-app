import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, ListItem } from "@material-ui/core";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import { getPlacesData } from "./api";


const App = () => {
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordiantes] = useState({})
    const [bounds, setBounds] = useState({sw: {lat: 0, lng: 0}, ne: {lat: 0, lng: 0}})
    //lifted state
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordiantes({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        console.log("coordinates and bounds in use eff", coordinates, bounds)
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data)
                setPlaces(data)
                setIsLoading(false)
            })
    },[bounds, coordinates])

    return(
        <>  
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List places={places} childClicked={childClicked} isLoading={isLoading}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordiantes={setCoordiantes}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}/>
                    
                </Grid>
            </Grid>
        </>
    )
}

export default App