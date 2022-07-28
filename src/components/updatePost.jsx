import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import "react-mde/lib/styles/css/react-mde-all.css";
import { Link } from 'react-router-dom';
import manipulateData from '../api/ManipulateData';
import "../css/post.css";


const UpdatePost = props => {
    let data = useLocation();
    const [title, setTitle] = useState(data.state.title);
    let content = data.state.content;
    let postId = data.state.postId;
    const [sent, setSent] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const handleChange = event => {
        setTitle(event.target.value);
    }


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
      manipulateData.updatePost(title, value, postId)
      .then( response => {
            setSent(true);
            setSuccessful(true);
      } ).catch( error => {
            setSent(true);
      } )
    }

    const [value, setValue] = React.useState(content);
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
            <div style={{marginTop:"7em"}}></div>
            <h1 style={{textAlign:"center", margin:"1em", fontFamily:"fantasy", fontSize:"2.5em"}}> <i>Update</i> </h1>

            <div style={{textAlign:"center"}}>
                <label style={{width:"100%", display:"inline-block"}}> <span style={{fontWeight:"bold", fontSize:"1.5em"}}>Title: </span> 
                    <div></div>
                    <input value={title} onChange={event => handleChange(event)} style={{width:"50%", height:"2em", padding:"1em", margin:"1em 0em 1em"}}/>
                </label>
            </div>

            <div style={{margin:"1em 0em 5em 0em"}}>
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
            </div>
        </React.Fragment> 
    );
}
 
export default UpdatePost;