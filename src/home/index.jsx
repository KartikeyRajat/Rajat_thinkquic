import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from '../../styles/Home.module.css'
import Draggable from './Draggable';
import Loader from '../common/Loader';
import Preview from './Preview';

function Home() {
    const [data, setData] = useState([]);
    const [header, setHeader] = useState([]);
    const [loader, setLoader] = useState(false);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                const header = []
                for (let key in ws) {
                    let regEx = new RegExp("^\(\\w\)\(1\){1}$");
                    if (regEx.test(key) == true) {
                        header.push(ws[key].v);
                    }
                }

                
                resolve({ data, header });
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then(({data, header}) => {
            setLoader(false)
            setData(data);
            setHeader(header)
        }).catch(err=>{
            setLoader(false)
        })
    };

    const handleFile = (e) =>{
        const file = e.target.files[0];
        if(file){
            setLoader(true)
            readExcel(file);
        }else{
            setData([]);
            setHeader([])
        }
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>
                Upload an Excel file:
            </h1>

            <p className={styles.description}>
                <label htmlFor="file-upload">Get started by uploading a Excel file{' '}</label>
                <input id="file-upload"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => handleFile(e)}
                />
            </p>

            <div className={styles.grid}>
                { loader ? <Loader/> : null}

                <Preview header={header} data={data}/>
                <div className={styles["drag-content"]}>
                {header && header.length ? <Draggable header={header} data={data}/> 
                : null }
                </div>
            </div>
        </main>
    );
}

export default Home;