import { TxtReader } from 'txt-reader';
import '../App.css';
import React, { useState } from 'react';
import Loading from './Loading'


const Home = () => {

    const [loading, setLoading] = useState("false")
    const [fileName, setFileName] = useState("")
    const [output, setOutput] = useState([])

    var reader = new TxtReader();

    const initiate = (file) => {
        setLoading("true")
        let linecount;
        setFileName(file.name)
        reader.loadFile(file)
            .then(function (response) {
                console.log(response)
                linecount = response.result.lineCount;
                console.log('Loading file completed in ' + response.timeTaken + 'ms, total lines: ' + response.result.lineCount);
            })
            .catch(function (reason) {
                console.log('Loading file failed with error: ' + reason);
            });
        reader.getLines(1, linecount)
            .then(function (response) {
                if(file.name.includes('errors')){
                    errorReader(response)
                }
                if(file.name.includes('log')){
                    logReader(response)
                }
            })
            .catch(function (reason) {
                console.log('Getting lines failed with error: ' + reason);
            });
    }
    
    reader.utf8decoder.decode(new Uint8Array(['a'.charCodeAt(0)])) === 'a' // true



    const logReader = (text) => {
        console.log("Log file")
        let t = text.result
        let output = [];
        var i = 0, len = t.length
        let details = [];
        while(i < len){
            let trimmed = t[i].trim();
            if(trimmed.includes('[info]') || trimmed.includes('[debug]') || trimmed.includes('[error]')){
                console.log("Normal Entry")
            }
            if(trimmed.includes('*** Log Data ***')){
                details.push(trimmed)
            }
            output.push(trimmed)
            i++
        }
        setOutput(output)
        setLoading("false")
    }

    const errorReader = (text) => {
        console.log("Error File")
        let t = text.result
        let output = [];
        var i = 0, len = t.length
        while(i < len){
            let trimmed = t[i].trim()
            output.push(trimmed)
            i++
        }
        setOutput(output)
        setLoading("false")
    }

    let out = output.map((e, i) => {
        return(
            <div key={i}>
                {e}
            </div>
        )
    })

    return(
        <div className='container'>
            <Loading loading={loading}/>
            <div className='left-panel'>
                <div className='file-input-area'>
                    <label htmlFor="file-input" className="custom-file-upload">
                        Select File
                    </label>
                    <input type='file' id='file-input' onChange={(e) => initiate(e.target.files[0])}/>
                    <p>File: {fileName}</p>
                    
                </div>
            </div>
            <div className='text-area'>
                {out}
            </div>
        </div>
    )
}

export default Home