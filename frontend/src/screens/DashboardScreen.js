import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeBody } from '@uiball/loaders'


const DashboardScreen = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [received, setReceived] = useState(false);
    const viewReport = (result) => {
        navigate('/report', { state: { prediction: result } });
    }
    useEffect(async() => {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+'/scans', { withCredentials: true });
        setData(res.data.scans);
        setReceived(true);
        console.log(res.data.scans);
    },[]);

    
    return(
    <>
        <Header />
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl pb-3">
                <span className="block xl:inline">Scan</span>
                <span className="block text-yellow-400 xl:inline"> History</span>

            </h1>
            {!received && <><div className="grid place-items-center h-screen"><ThreeBody
                size={50}
                speed={1.1}
                color="black"
                style="content-center"
            /></div></>}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
               {received && <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Scan ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Diagnosis
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">View</span>
                        </th>
                    </tr>
                </thead> }
                <tbody>
                       
                    
                    {received  && data.map(item => (
                        <tr key={item._id.$oid.toString()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {item._id.$oid.toString()}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.result==false ? <span className="text-red-600">Negative</span> : <span className="text-green-600">Positive</span>}
                            </td>
                            <td className="px-6 py-4">
                                PNEUMONIA
                            </td>
                            <td className="px-6 py-4">
                                {item.timestamps['$date']}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button type='button' onClick={() => navigate('/report', { state: { prediction: item.result, name:item.name, id:item._id.$oid.toString(), timestamps:item.timestamps['$date'], userId:item.userId.$oid.toString(), img:item.originalImage, heatmap:item.heatmapImage, localized:item.localizedImage } })} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                            </td>
                        </tr>
                    ))
                             

                        } 
                    
                </tbody>
            </table>
        </div>

    </>)
}
    

export default DashboardScreen