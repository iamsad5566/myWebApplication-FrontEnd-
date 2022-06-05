// import React from 'react';
// import ReactMde from 'react-mde';
// import * as Showdown from 'showdown';
// import "react-mde/lib/styles/css/react-mde-all.css";
// import ReactMarkdown from 'react-markdown';


// const Test = () => {
//     function loadSuggestions(text) {
//         return new Promise((accept, reject) => {
//           setTimeout(() => {
//             const suggestions = [
//               {
//                 preview: "Andre",
//                 value: "@andre"
//               },
//               {
//                 preview: "Angela",
//                 value: "@angela"
//               },
//               {
//                 preview: "David",
//                 value: "@david"
//               },
//               {
//                 preview: "Louise",
//                 value: "@louise"
//               }
//             ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
//             accept(suggestions);
//           }, 250);
//         });
//     }

//     const converter = new Showdown.Converter({
//         tables: true,
//         simplifiedAutoLink: true,
//         strikethrough: true,
//         tasklists: true
//     });

//     const [value, setValue] = React.useState("**Hello world!!!**");
//     const [selectedTab, setSelectedTab] = React.useState("write");

//     const styleForMD = {
//         boxSizing:"border-box",
//         fontSize:"14px",
//         fontFamily:"sans-serif",
//         lineHeight:"1.15",
//         width:"100%",
//         height:"60vh",
//         padding:"10px"
//     }

//     return ( 
//         <React.Fragment>
//             <div className="mdContainer" style = {styleForMD}>
//                 <ReactMde
//                     value={value}
//                     onChange={setValue}
//                     selectedTab={selectedTab}
//                     onTabChange={setSelectedTab}
//                     generateMarkdownPreview={markdown =>
//                     Promise.resolve(converter.makeHtml(markdown))
//                     }
//                     loadSuggestions={loadSuggestions}
//                     childProps={{
//                     writeButton: {
//                         tabIndex: -1
//                     }
//                     }}
//                 />
//             </div>
            
//             <ReactMarkdown>{value}</ReactMarkdown>
            
//         </React.Fragment>
//      );
// }
 
// export default Test;