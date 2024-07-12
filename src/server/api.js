
import axios from "axios";;

export const apiTableData = async(dataOrder, offset)=>{

    try {
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${offset}&order_by=${dataOrder}`)
         return response
    }catch (error) {
        console.error("Error:", error.message); // Log the error message
        
        
        throw error; // Optional: rethrow the error for handling further up the call stack
    }
}

