import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"



export const getPlacesData = async (sw, ne) => {
    try {
        const {data: { data }} = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '95f2000851msh4e3963bf1f4fc24p18fc8fjsn63e60212a2ad'
            }
          })
        //deconstructed data 
        return data

    } catch (error){
        console.log("error: ",error)
    }

}