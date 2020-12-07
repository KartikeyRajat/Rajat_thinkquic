import React, { useState } from "react";
import styles from '../../styles/Home.module.css'
import SmallLoader from "../common/SmallLoader";
import Preview from "./Preview";

function Draggable({ header, data }) {
    const [currentColumn, setCurrenColumn] = useState('');
    const [showData, setShowData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isDropped, setIsDropped] = useState(false);

    const onDragStart = (event, column) => {
        event.stopPropagation();
        event.dataTransfer.setData('text/html', column);
        setCurrenColumn(column);
        setLoader(true);
        setIsDropped(false)
    }

    const onDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const onDragEnd = (event) => {
        event.preventDefault();
        setLoader(false)
    }

    const onDrop = (e) => {
        if (currentColumn && typeof currentColumn == 'string') {
            let showDataUpdated = data.map((dataItem) => {
                return dataItem[currentColumn]
            })
            setShowData(showDataUpdated);
        } else {
            setShowData(data);
        }

        setLoader(false)
        setIsDropped(true)

    }
    return (
        <section>
            <h4 className={styles.dragTitle}>
                Drag and Drop the column and see the data for dragged columns
            </h4>

            <div className={styles.grid} style={{ alignItems: 'unset' }}>

                <ul className={styles["column-list"]} draggable
                    draggable
                    onDragStart={(e) => onDragStart(e, header)}
                    onDragEnd={e => onDragEnd(e)}
                    title="Drag all the columns"
                >
                    {header.map((headerName, key) => (
                        <li key={key} className={styles["column-list-item"]}
                            title={"Drag the column " + headerName}

                            draggable
                            onDragStart={(e) => onDragStart(e, headerName)}
                            onDragEnd={e => onDragEnd(e)}>{headerName}</li>
                    ))}
                </ul>
                <div className={styles['dragged_col_data_wrap']}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e)}

                >
                    {loader && <SmallLoader />}
                    {currentColumn && typeof currentColumn == 'string' ?
                    <table>
                        {isDropped && <> <thead><tr><th> {currentColumn}</th></tr>

                        </thead>
                            <tbody>
                                {showData.map((colData, key) => <tr key={key}><td>{colData}</td></tr>)}
                            </tbody> </>}
                    </table> : isDropped && <Preview header={header} data={showData}/> }
                </div>
            </div>
        </section>
    );
}

export default Draggable;