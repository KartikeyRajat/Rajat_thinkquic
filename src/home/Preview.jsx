import React, { useState } from "react";
import styles from '../../styles/Home.module.css'


function Preview({header, data}){
    return (
        <div className={styles["preview-table"]}>
        <table >
            <thead >
                <tr > {header.map((headerName, key) => (
                     <th scope="col" key={key} className={styles["preview-head"]}>{headerName}</th>
                ))}
                   
                </tr>
            </thead>
            <tbody>
                {data.map((dataItem, index) => (
                    <tr key={index}>
                        {Object.keys(dataItem).map((dataItemCol, key) => 
                        
                        <td key={key} className={styles["preview-head"]}>{dataItem[header[key]]}</td>
)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Preview