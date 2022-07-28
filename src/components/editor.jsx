import React, { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import "react-mde/lib/styles/css/react-mde-all.css";
import { Link } from 'react-router-dom';
import manipulateData from '../api/ManipulateData';
import "../css/post.css";

const MDEditor = props => {
    const [sent, setSent] = useState(false);
    const [successful, setSuccessful] = useState(false);

    function loadSuggestions(text) {
        return new Promise((accept, reject) => {
          setTimeout(() => {
            const suggestions = [
              {
                preview: "Andre",
                value: "@andre"
              },
              {
                preview: "Angela",
                value: "@angela"
              },
              {
                preview: "David",
                value: "@david"
              },
              {
                preview: "Louise",
                value: "@louise"
              }
            ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
            accept(suggestions);
          }, 250);
        });
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const handleSubmit = () => {
      manipulateData.saveArticle(props.title, value, props.category)
      .then( response => {
        setSent(true);
        setSuccessful(true);
      } ).catch( () => {
        setSent(true);
      } )
    }

    const [value, setValue] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("write");

    const styleForMD = {
        boxSizing:"border-box",
        fontSize:"1em",
        fontFamily:"sans-serif",
        lineHeight:"1.15",
        width:"90%",
        height:"60vh",
        padding:"10px",
        display:"inline-block",
        textAlign:"justify"
    }

    return ( 
        <React.Fragment>
            <div style={{textAlign:"center"}}>
            {sent? (successful? <div className="alert alert-success" style = {{margin:"2em"}}> sent! </div>:<div className="alert alert-danger" style = {{margin:"2em"}}> failed! </div>):<></>}
                <div className="mdContainer" style = {styleForMD}>
                    <ReactMde
                        value={value}
                        onChange={setValue}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={markdown =>
                        Promise.resolve(converter.makeHtml(markdown))
                        }
                        loadSuggestions={loadSuggestions}
                        childProps={{
                        writeButton: {
                            tabIndex: -1
                        }
                        }}
                    />
                    <div style={{textAlign:"right"}}>
                      <Link className='btn btn-danger' style={{marginTop:"1em", marginRight:"1em", borderRadius:"50%"}} to="../"> back </Link>
                      <button type="button" className='btn btn-primary' style={{marginTop:"1em", borderRadius:"50%"}} onClick={handleSubmit}> Post </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default MDEditor;