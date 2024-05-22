/* eslint-disable no-unused-vars */
import  React, { useState,useEffect} from 'react';
//import { makeStyles } from '@mui/material';
import ButtonAppBar from './bottombar';
import  Box  from "@mui/material/Box";
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import Camera from "./Cameras";
import pako from "pako"

export default function AppView() {
  const [expandedCameraId, setExpandedCameraId] = useState(null);
  const [initialGridAreas] = useState({
    payload: '1 / 11 / 7 / 13',
    left: '1 / 1 / 7 / 3',
    main: '1 / 3 / 13 / 11',
    right: '7 / 1 / 13 / 3',
    rear: '7 / 11 / 13 / 13',
  });
  const [videoStreams, setVideoStreams] = useState({
    payload: null,
    left: null,
    main: null,
    right: null,
    rear: null,
  });

  // useEffect(() => {
  //   const ws = new WebSocket('wss://192.168.230.100:30000');

  //   ws.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };

  //   ws.onmessage = async (event) => {
  //     try {
  //       const { id, stream } = JSON.parse(event.data);
  //       const decompressedStream = await decompressStream(stream);
  //       setVideoStreams((prevStreams) => ({
  //         ...prevStreams,
  //         [id]: decompressedStream,
  //       }));
  //     } catch (error) {
  //       console.error('Error processing message:', error);
  //     }
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   ws.onclose = (event) => {
  //     if (event.wasClean) {
  //       console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  //     } else {
  //       console.error('WebSocket connection died');
  //     }
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);
  const decompressStream = async (compressedStream) => {
    const binaryString = atob(compressedStream);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decompressed = pako.inflate(bytes);
    return URL.createObjectURL(new Blob([decompressed.buffer], { type: 'image/jpeg' }));
  };
  const [gridAreas, setGridAreas] = useState(initialGridAreas);

  const handleCameraClick = (cameraId) => {
    setExpandedCameraId((prevId) => {
      const newExpandedCameraId = prevId === cameraId ? null : cameraId;
      
      setGridAreas((prevGridAreas) => {
        const newGridAreas = { ...prevGridAreas };
        if (newExpandedCameraId === null) {
          return initialGridAreas;
        }

        switch (cameraId) {
          case 'main':
            newGridAreas.payload = initialGridAreas.payload;
            newGridAreas.left = initialGridAreas.left;
            newGridAreas.main = initialGridAreas.main;
            newGridAreas.right = initialGridAreas.right;
            newGridAreas.rear = initialGridAreas.rear;
            break;
          case 'left':
            newGridAreas.payload = '1 / 1 / 1 / 1';
            newGridAreas.left = '1 / 1 / 13 / 5';
            newGridAreas.main = '1 / 5 / 13 / 13';
            newGridAreas.right = '1 / 1 / 1 / 1';
            newGridAreas.rear = '1 / 1 / 1 / 1';
            break;
          case 'right':
            newGridAreas.payload = '1 / 1 / 1 / 1';
            newGridAreas.left = '1 / 1 / 1 / 1';
            newGridAreas.main = '1 / 5 / 13 / 13';
            newGridAreas.right = '1 / 1 / 13 / 5';
            newGridAreas.rear = '1 / 1 / 1 / 1';
            break;
          case 'payload':
            newGridAreas.payload = '1 / 3 / 13 / 11';
            newGridAreas.left = '1 / 1 / 7 / 3';
            newGridAreas.main = '1 / 11 / 7 / 13';
            newGridAreas.right = '7 / 1 / 13 / 3';
            newGridAreas.rear = '7 / 11 / 13 / 13';
            break;
          case 'rear':
            newGridAreas.payload = '1 / 1 / 1 / 1';
            newGridAreas.left = '1 / 1 / 1 / 1';
            newGridAreas.main = '1 / 1 / 13 / 9';
            newGridAreas.right = '1 / 1 / 1 / 1';
            newGridAreas.rear = '1 / 9 / 13 / 13';
            break;
          default:
            break;
        }
        return newGridAreas;
      });

      return newExpandedCameraId;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxHeight: '100vh', height: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(12, 1fr)',
          gridTemplateColumns: 'repeat(12, 1fr)',
          position: 'relative',
          top: '8px',
          bottom: '5px',
          height: '90vh',
          width: '100%',
          gridColumnGap: '8px',
          gridRowGap: '8px',
          maxHeight: '98vh',
          margin: '0 auto',
          maxWidth: '98vw',
        }}
      >
      <Camera
        gridArea={gridAreas.payload}
        id="payload"
        onClick={() => handleCameraClick("payload")}
        {...(videoStreams.payload ? { stream: videoStreams.payload } : {})}
      />
      <Camera
        gridArea={gridAreas.left}
        id="left"
        onClick={() => handleCameraClick("left")}
        {...(videoStreams.left ? { stream: videoStreams.left } : {})}
      />
      <Camera
        gridArea={gridAreas.main}
        id="main"
        onClick={() => handleCameraClick("main")}
        {...(videoStreams.main ? { stream: videoStreams.main } : {})}
      />
      <Camera
        gridArea={gridAreas.right}
        id="right"
        onClick={() => handleCameraClick("right")}
        {...(videoStreams.right ? { stream: videoStreams.right } : {})}
      />
      <Camera
        gridArea={gridAreas.rear}
        id="rear"
        onClick={() => handleCameraClick("rear")}
        {...(videoStreams.rear ? { stream: videoStreams.rear } : {})}
      />
      </Box>
      <ButtonAppBar />
    </div>
  );
}


// export default function AppView() {

//   const [expandedCameraId, setExpandedCameraId] = useState(null);
//   const [initialGridAreas,setInitialgridAreas] = useState({   
//         payload: '1 / 11 / 7 / 13',
//         left : '1 / 1 / 7 / 3',
//         main: '1 / 3 / 13 / 11',
//         right:'7 / 1 / 13 / 3',
//         rear:'7 / 11 / 13 / 13'
// });

//   const [gridAreas,setGridAreas] = useState(initialGridAreas);

//   const handleCameraClick = (cameraId,event) => {

//     setExpandedCameraId((prevId) => (prevId === cameraId ? null : cameraId));
//     setGridAreas((prevGridAreas) => {
//       const newGridAreas = { ...prevGridAreas };
//     if (expandedCameraId === cameraId) {
//         newGridAreas.payload=initialGridAreas.payload;
//         newGridAreas.left=initialGridAreas.left;
//         newGridAreas.main=initialGridAreas.main;
//         newGridAreas.right=initialGridAreas.right;
//         newGridAreas.rear=initialGridAreas.rear;
//     }
//     else{
//       switch(cameraId){
//         case 'main' :
//         {
//             newGridAreas.payload = initialGridAreas.payload;
//             newGridAreas.left = initialGridAreas.left;
//             newGridAreas.main = initialGridAreas.main;
//             newGridAreas.right = initialGridAreas.right;
//             newGridAreas.rear = initialGridAreas.rear;
//         }
//         break;
//         case 'left':
//           {
//             newGridAreas.payload='1 / 1 / 1 / 1';
//             newGridAreas.left='1 / 1 / 13 / 5';
//             newGridAreas.main='1 / 5 / 13 / 13';
//             newGridAreas.right='1 / 1 / 1 / 1';
//             newGridAreas.rear='1 / 1 / 1 / 1';
//           }
//           break;
//           case 'right':
//             {
//               newGridAreas.payload='1 / 1 / 1 / 1';
//               newGridAreas.left='1 / 1 / 1 / 1';
//               newGridAreas.main='1 / 5 / 13 / 13';
//               newGridAreas.right='1 / 1 / 13 / 5';
//               newGridAreas.rear='1 / 1/ 1 / 1';
//             }
//             break;
//             case 'payload':
//               {
//               newGridAreas.payload='1 / 3 / 13 / 11';
//                newGridAreas.left='1 / 1 / 7 / 3';
//               newGridAreas.main='1 / 11 / 7 / 13';
//                newGridAreas.right='7 / 1 / 13 / 3';
//                newGridAreas.rear='7 / 11 / 13 / 13';
//               }
//               break;
//               case 'rear':
//                 {
//                   newGridAreas.payload='1/1/1/1';
//                   newGridAreas.left='1/1/1/1';
//                   newGridAreas.main='1 / 1 / 13 / 9';
//                   newGridAreas.right='1/1/1/1';
//                   newGridAreas.rear='1 / 9 / 13 / 13';
//                 }
//                 break;
//       }
//    } 
//    return newGridAreas;
//   });
// };


//   return (
//     <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',maxHeight:'100vh',height:'100%'}}>
//       <Box sx={{ 
//       display: 'grid',
//       gridTemplateRows:'repeat(12,1fr)',
//       gridTemplateColumns:'repeat(12,1fr)',
//       position: 'relative', 
//       top: '8px', 
//       bottom: '5px',
//       height:'90vh',
//       width:'100%',
//       gridColumnGap: '8px', 
//       gridRowGap: '8px', 
//       maxHeight: '98vh',
//       margin:'0 auto',
//       maxWidth:'98vw'
//       }}>
//           <Camera
//             gridArea={gridAreas.payload}
//             id="payload"
//             onClick={() => handleCameraClick("payload")}
//            // isExpanded={expandedCameraId === "payload"}
//           />
//           <Camera
//             gridArea={gridAreas.left}
//             id="left"
//             onClick={() => handleCameraClick("left")}
//            // isExpanded={expandedCameraId === "left"}
//           />
//           <Camera
//             gridArea={gridAreas.main}
//             id="main"
//             onClick={() => handleCameraClick("main")}
//             //isExpanded={expandedCameraId === "main"}
//             // onClick={(event) => handleCameraClick("main", event)}
//           />
//           <Camera
//             gridArea={gridAreas.right}
//             id="right"
//             onClick={() => handleCameraClick("right")}
//             //isExpanded={expandedCameraId === "right"}
//           />
//           <Camera
//             gridArea={gridAreas.rear}
//             id="rear"
//             onClick={() => handleCameraClick("rear")}
//            // isExpanded={expandedCameraId === "rear"}
//           />
//     </Box>
//     <ButtonAppBar/>
//   </div>
//   );
// }

