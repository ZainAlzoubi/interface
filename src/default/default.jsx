/* eslint-disable no-unused-vars */
import '../polyfills';
import { useState,useEffect,useRef} from 'react';
import ButtonAppBar from './bottombar';
import  Box  from "@mui/material/Box";
import Camera from "./Cameras";
import SimplePeer from 'simple-peer';

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
  const videoRefs = {
    payload: useRef(null),
    left: useRef(null),
    main: useRef(null),
    right: useRef(null),
    rear: useRef(null),
  };

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.230.100:30000');
    const ws2 = new WebSocket('ws://192.168.230.100:30001');

    const peers = {};

    const createPeerConnection = (ws, videoRef) => {
      console.log('Creating peer connection');
      const peer = new SimplePeer({ initiator: false, trickle: false });

      peer.on('signal', (data) => {
        console.log('Peer signal data:', data);
        ws.send(JSON.stringify(data));
      });

      peer.on('stream', (stream) => {
        console.log('Received stream:', stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });

      ws.onmessage = (event) => {
        console.log('Received WebSocket message:', event.data);
        const data = JSON.parse(event.data);
        peer.signal(data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
      };

      return peer;
    };

    const setupPeerConnections = () => {
      console.log('Setting up peer connections');
      peers.payload = createPeerConnection(ws, videoRefs.payload);
      peers.main = createPeerConnection(ws2, videoRefs.main);
    };

    const handleWebSocketOpen = () => {
      if (ws.readyState === WebSocket.OPEN && ws2.readyState === WebSocket.OPEN) {
        setupPeerConnections();
      }
    };

    const handleWebSocketErrorOrClose = (e) => {
      // console.error('WebSocket connection failed or closed', e);
      console.log("No connection was established")
      ws.close();
      ws2.close();
    };

    ws.addEventListener('open', handleWebSocketOpen);
    ws2.addEventListener('open', handleWebSocketOpen);

    ws.addEventListener('error', handleWebSocketErrorOrClose);
    ws2.addEventListener('error', handleWebSocketErrorOrClose);

    ws.addEventListener('close', handleWebSocketErrorOrClose);
    ws2.addEventListener('close', handleWebSocketErrorOrClose);

    const connectionTimeout = setTimeout(() => {
      if (ws.readyState !== WebSocket.OPEN || ws2.readyState !== WebSocket.OPEN) {
        handleWebSocketErrorOrClose(new Error('WebSocket connection timeout'));
      }
    }, 5000); // 5 seconds timeout for connection establishment

    return () => {
      console.log('Cleaning up peer connections and WebSockets');
      clearTimeout(connectionTimeout);
      Object.values(peers).forEach((peer) => {
        console.log('Destroying peer:', peer);
        peer.destroy();
      });
      ws.close();
      ws2.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };
//     ws2.open = () => {
//       console.log('WebSocket connection established');
//     };
//     ws.onmessage = async (event) => {
//       try {
//         const blob = event.data;
//           const objectURL = URL.createObjectURL(blob);
//           setVideoStreams((prevStreams) => ({
//             ...prevStreams,
//             payload: objectURL, 
//           }));
//       } catch (error) {
//         console.error('Error processing message:', error);
//       }
//     };
//     ws2.onmessage = async (event) => {
//       try {
//         const blob = event.data;
//           const objectURL = URL.createObjectURL(blob);
//           setVideoStreams((prevStreams) => ({
//             ...prevStreams,
//             main: objectURL, 
//           }));
//       } catch (error) {
//         console.error('Error processing message:', error);
//       }
// };
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = (event) => {
//       if (event.wasClean) {
//         console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
//       } else {
//         console.error('WebSocket connection died');
//       }
//     };
//     ws2.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws2.onclose = (event) => {
//       if (event.wasClean) {
//         console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
//       } else {
//         console.error('WebSocket connection died');
//       }
//     };
//     return () => {
//       ws.close();
//     };
//   }, []);
  // const decompressStream = async (compressedStream) => {
  //   const binaryString = atob(compressedStream);
  //   const binaryLength = binaryString.length;
  //   const bytes = new Uint8Array(binaryLength);
  //   for (let i = 0; i < binaryLength; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   const decompressed = pako.inflate(bytes);
  //   return URL.createObjectURL(new Blob([decompressed.buffer], { type: 'image/jpeg' }));
  // };
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

