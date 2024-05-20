/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types';
// import React, { useState, useRef,useEffect} from 'react';
// import { motion } from 'framer-motion';
// import {Link} from 'react-router-dom';


// function Camera({ id,onClick, gridArea }) {
//     const mainCameraRef = useRef(null);
//     const payloadCameraRef=useRef(null);
//     const [clickCoordinates,setClickCoordinates] = useState({x:null,y:null});
//     // const getRelativeCoordinates = (event) => {
//     //     const mainCamera = mainCameraRef.current;
//     //     // console.log('ClientX:', event.clientX);
//     //     // console.log('ClientY:', event.clientY);
//     //     if (mainCamera && event.clientX !== undefined && event.clientY !== undefined) {
//     //         const mainCameraRect = mainCamera.getBoundingClientRect();
//     //        //  console.log('Main camera rect:', mainCameraRect);
//     //         // console.log('ClientX:', event.clientX);
//     //         // console.log('ClientY:', event.clientY);
//     //         // const clickX = event.clientX - mainCameraRect.left;
//     //         // const clickY = event.clientY - mainCameraRect.top;
//     //         const clickX = ((event.clientX - ((mainCameraRect.left) + (mainCameraRect.width) / 2)).toFixed(2));
//     //         const clickY = -(event.clientY - (mainCameraRect.top + mainCameraRect.height / 2));
//     //         console.log(`Clicked at (${clickX},${clickY})`);
//     //         return { x: clickX, y: clickY };
//     //     }
//     //    return null;
//     // };
//     const getRelativeCoordinates = (event) => {
//         const mainCamera = mainCameraRef.current;
//         if (mainCamera && event.clientX !== undefined && event.clientY !== undefined) {
//             const mainCameraRect = mainCamera.getBoundingClientRect();
//          //   console.log(mainCameraRect);
//             const rawX = event.clientX;
//             const rawY = event.clientY;
//             const relativeX = rawX - mainCameraRect.left;
//             const relativeY = rawY - mainCameraRect.top;
//             const centeredX = relativeX - mainCameraRect.width / 2;
//             const centeredY = -(relativeY - mainCameraRect.height / 2);
            
//           //  console.log('Raw:', { rawX, rawY });
//           //  console.log('Relative:', { relativeX, relativeY });
//            // console.log('Centered:', { centeredX, centeredY });
    
//             // Applying toFixed(2) consistently and converting to float
//             const clickX = parseFloat(centeredX);
//             const clickY = parseFloat(centeredY);
            
//             console.log(`Clicked at (${clickX}, ${clickY})`);
//             return { x: clickX, y: clickY };
//         }
//         return null;
//     };
//     const getRelativeCoordinates2 = (event) => {
//         const payloadCamera = payloadCameraRef.current;
//         // console.log('ClientX:', event.clientX);
//         // console.log('ClientY:', event.clientY);
//         if (payloadCamera && event.clientX !== undefined && event.clientY !== undefined) {
//             const payloadCameraRef = payloadCamera.getBoundingClientRect();
//             // console.log('Main camera rect:', payloadCameraRef);
//           //   console.log('ClientX:', event.clientX);
//             // console.log('ClientY:', event.clientY);
//             // const clickX = event.clientX - mainCameraRect.left;
//             // const clickY = event.clientY - mainCameraRect.top;
//             const clickX = (event.clientX - (payloadCameraRef.left + payloadCameraRef.width / 2.0));
//             const clickY = -(event.clientY - (payloadCameraRef.top + payloadCameraRef.height / 2));
//             console.log(`Clicked at (${clickX},${clickY})`);
//             return { x: clickX, y: clickY };
//         }
//         return null; 
//     };

//     useEffect(() => {
//     const mainCamera = mainCameraRef.current;
//     const payloadCamera = payloadCameraRef.current;
//     const handleClick = (event) => {
//         event.stopPropagation();
//         const coordinates = getRelativeCoordinates(event);
//         if (coordinates) {
//             setClickCoordinates(coordinates);
//             //console.log('Click');
//         }
//     };
//     const handleClick2 = (event) => {
//         event.stopPropagation();
//         const coordinates = getRelativeCoordinates2(event);
//         if (coordinates) {
//             setClickCoordinates(coordinates);
//             //console.log('Click');
//         }
//     };
//     if (id === 'main' && mainCamera && gridArea === '1 / 3 / 13 / 11') {
//        // console.log('Main Camera Element Found');
//         mainCamera.addEventListener('click', handleClick);
//         return () => {
//             mainCamera.removeEventListener('click', handleClick);
//         };
//     } else if (id === 'payload' && payloadCamera && gridArea === '1 / 3 / 13 / 11') {
//         //console.log('Payload Camera Element Found');
//         payloadCamera.addEventListener('click', handleClick2);
//         return () => {
//             payloadCamera.removeEventListener('click', handleClick2);
//         };
//     }
//     return () => {
//         if (mainCamera) {
//             mainCamera.removeEventListener('click', handleClick);
//         }
//         if (payloadCamera) {
//             payloadCamera.removeEventListener('click', handleClick2);
//         }
//     };
// }, [id, gridArea]);

//     const [isHovered, setIsHovered] = useState(false);
//     const handleMouseEnter = () => {
//         setIsHovered(true);
//     };
//     const handleMouseLeave = () => {
//         setIsHovered(false);
//     };
  
//     return (
//         <>
//     {id === 'main' ? (
//     <motion.div
//         layout
//        // transition={{ type: "spring", stiffness: 90, duration: 0.1 }}
//         style={{
//             display:'block',
//             gridArea,
//             borderRadius: '10px',
//             cursor: 'pointer',
//             transition: 'width 0.5s, height 0.5s, margin 0.5s',
//             backgroundColor: '#1d2938',
//             position: 'relative',
//         }}
//         gridArea={gridArea}
//         onClick={() => onClick(id)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         tabIndex={0}
//         role="button"
//         ref={mainCameraRef} 
//     >
//         <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
//             <source src="" type="video/mp4" />
//             <track src="captions.vtt" kind="captions" label="English Captions" />
//         </video>
//         {isHovered && (
//             <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
//                 {id === 'payload' ? (
//                     <Link to="/Payload" style={{ color: 'white', textDecoration: 'none' }}><div>{id}</div></Link>
//                 ) : (
//                     <div>{id}</div>
//                 )}
//             </div>
//         )}
//     </motion.div>
// ) : id === 'payload' ? (
//     <motion.div
//         layout
//       // transition={{ type: "spring", stiffness: 90, duration: 0.1 }}
//         style={{
//             display: 'block',
//             gridArea,
//             borderRadius: '10px',
//             cursor: 'pointer',
//             transition: 'width 0.5s, height 0.5s, margin 0.5s',
//             backgroundColor: '#1d2938',
//             position: 'relative',
//         }}
//         gridArea={gridArea}
//         onClick={() => onClick(id)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         tabIndex={0}
//         role="button"
//         ref={payloadCameraRef}
//     >
//         <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
//             <source src="" type="video/mp4" />
//             <track src="captions.vtt" kind="captions" label="English Captions" />
//         </video>
//         {isHovered && (
//             <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
//                 <Link to="/Payload" style={{ color: 'white', textDecoration: 'none' }}><div>{id}</div></Link>
//             </div>
//         )}
//     </motion.div>
// ) : (
//     <motion.div
//         layout
//       //  transition={{ type: "spring", stiffness: 90, duration: 0.1 }}
//         style={{
//             display: gridArea === '1 / 1 / 1 / 1' ? 'none' : 'block',
//             gridArea,
//             borderRadius: '10px',
//             cursor: 'pointer',
//             transition: 'width 0.5s, height 0.5s, margin 0.5s',
//             backgroundColor: '#1d2938',
//             position: 'relative',
           
//         }}
//         gridArea={gridArea}
//         onClick={() => onClick(id)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         tabIndex={0}
//         role="button"
//     >
//         <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
//             <source src="" type="video/mp4" />
//             <track src="captions.vtt" kind="captions" label="English Captions" />
//         </video>
//         {isHovered && (
//             <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
//                 <div>{id}</div>
//             </div>
//         )}
//     </motion.div>

// )}

// </>

// );
// }
// Camera.propTypes = {
//     id: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired,
//    // isExpanded: PropTypes.bool.isRequired,
//     gridArea: PropTypes.string.isRequired,
// };
// export default Camera; 




import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Camera({ id, onClick, gridArea,stream}) {
    const mainCameraRef = useRef(null);
    const payloadCameraRef = useRef(null);
    const [clickCoordinates, setClickCoordinates] = useState({ x: null, y: null });
    const [isVisible, setIsVisible] = useState(true);

    const getRelativeCoordinates = (event) => {
        const mainCamera = mainCameraRef.current;
        if (mainCamera && event.clientX !== undefined && event.clientY !== undefined) {
            const mainCameraRect = mainCamera.getBoundingClientRect();
            const rawX = event.clientX;
            const rawY = event.clientY;
            const relativeX = rawX - mainCameraRect.left;
            const relativeY = rawY - mainCameraRect.top;
            const centeredX = relativeX - mainCameraRect.width / 2;
            const centeredY = -(relativeY - mainCameraRect.height / 2);
            const clickX = parseFloat(centeredX);
            const clickY = parseFloat(centeredY);
            console.log(`Clicked at (${clickX}, ${clickY})`);
            return { x: clickX, y: clickY };
        }
        return null;
    };

    const getRelativeCoordinates2 = (event) => {
        const payloadCamera = payloadCameraRef.current;
        if (payloadCamera && event.clientX !== undefined && event.clientY !== undefined) {
            const payloadCameraRect = payloadCamera.getBoundingClientRect();
            const clickX = (event.clientX - (payloadCameraRect.left + payloadCameraRect.width / 2.0));
            const clickY = -(event.clientY - (payloadCameraRect.top + payloadCameraRect.height / 2));
            console.log(`Clicked at (${clickX},${clickY})`);
            return { x: clickX, y: clickY };
        }
        return null;
    };

    useEffect(() => {
        const mainCamera = mainCameraRef.current;
        const payloadCamera = payloadCameraRef.current;

        const handleClick = (event) => {
            event.stopPropagation();
            const coordinates = getRelativeCoordinates(event);
            if (coordinates) {
                setClickCoordinates(coordinates);
            }
        };

        const handleClick2 = (event) => {
            event.stopPropagation();
            const coordinates = getRelativeCoordinates2(event);
            if (coordinates) {
                setClickCoordinates(coordinates);
            }
        };

        if (id === 'main' && mainCamera && gridArea === '1 / 3 / 13 / 11') {
            mainCamera.addEventListener('click', handleClick);
            return () => {
                mainCamera.removeEventListener('click', handleClick);
            };
        } else if (id === 'payload' && payloadCamera && gridArea === '1 / 3 / 13 / 11') {
            payloadCamera.addEventListener('click', handleClick2);
            return () => {
                payloadCamera.removeEventListener('click', handleClick2);
            };
        }

        return () => {
            if (mainCamera) {
                mainCamera.removeEventListener('click', handleClick);
            }
            if (payloadCamera) {
                payloadCamera.removeEventListener('click', handleClick2);
            }
        };
    }, [id, gridArea]);

    useEffect(() => {
        if (gridArea === '1 / 1 / 1 / 1') {
            setTimeout(() => setIsVisible(false), 500); // 500ms transition duration
        } else {
            setIsVisible(true);
        }
    }, [gridArea]);

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            {id === 'main' ? (
                <motion.div
                    layout
                    initial={{ opacity: 1, height: 'auto' }}
                    animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: isVisible ? 'block' : 'none',
                        gridArea,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#1d2938',
                        position: 'relative',
                    }}
                    onClick={() => onClick(id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    role="button"
                    ref={mainCameraRef}
                >
                    <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
                        <source src={stream} type="video/mp4" />
                        <track src="captions.vtt" kind="captions" label="English Captions" />
                    </video>
                    {isHovered && (
                        <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
                            {id === 'payload' ? (
                                <Link to="/Payload" style={{ color: 'white', textDecoration: 'none' }}><div>{id}</div></Link>
                            ) : (
                                <div>{id}</div>
                            )}
                        </div>
                    )}
                </motion.div>
            ) : id === 'payload' ? (
                <motion.div
                    layout
                    initial={{ opacity: 1, height: 'auto' }}
                    animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: isVisible ? 'block' : 'none',
                        gridArea,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#1d2938',
                        position: 'relative',
                    }}
                    onClick={() => onClick(id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    role="button"
                    ref={payloadCameraRef}
                >
                    <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
                        <source src={stream} type="video/mp4" />
                        <track src="captions.vtt" kind="captions" label="English Captions" />
                    </video>
                    {isHovered && (
                        <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
                            <Link to="/Payload" style={{ color: 'white', textDecoration: 'none' }}><div>{id}</div></Link>
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    layout
                    initial={{ opacity: 1, height: 'auto' }}
                    animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? 'auto' : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        display: isVisible ? 'block' : 'none',
                        gridArea,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        backgroundColor: '#1d2938',
                        position: 'relative',
                    }}
                    onClick={() => onClick(id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                    role="button"
                >
                    <video loop id={`camera-${id}`} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}>
                        <source src={stream} type="video/mp4" />
                        <track src="captions.vtt" kind="captions" label="English Captions" />
                    </video>
                    {isHovered && (
                        <div style={{ position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>
                            <div>{id}</div>
                        </div>
                    )}
                </motion.div>
            )}
        </>
    );
}

Camera.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    gridArea: PropTypes.string.isRequired,
};

export default Camera;


