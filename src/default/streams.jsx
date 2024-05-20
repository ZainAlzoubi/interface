// import React, { useState, useEffect } from 'react';

// export default function VideoPlayer() {
//   const [videoStream, setVideoStream] = useState('');

//   useEffect(() => {
//     const ws = new WebSocket('ws://10.3.1.12:5000');

//     ws.onmessage = (event) => {
//       const streamData = event.data;
      
//       const binaryData = atob(streamData);
     
//       const uint8Array = new Uint8Array(binaryData.length);
//       for (let i = 0; i < binaryData.length; i++) {
//         uint8Array[i] = binaryData.charCodeAt(i);
//       }
     
//       const blob = new Blob([uint8Array], { type: 'video/mp4' });
     
//       const url = URL.createObjectURL(blob);
   
//       setVideoStream(url);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div>
//       <video src={videoStream} controls autoPlay />
//     </div>
//   );

