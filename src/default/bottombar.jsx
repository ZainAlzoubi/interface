/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */

//import AppBar from '@mui/material/AppBar';
import { useState } from 'react';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import { VolumeUp, VolumeOff, Mic, MicOff } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, MenuItem, Menu, Fade } from '@mui/material';
export default function ButtonAppBar() {




  const [volumeOn, setVolumeOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleVolumeToggle = () => {
    setVolumeOn((prevState) => !prevState);
  };

  const handleMicToggle = () => {
    setMicOn((prevState) => !prevState);
  };
  // const handleMicToggle = () => {
  //   setMicOn((prevState) => {
  //     // Send control command to mute/unmute audio stream
  //     if (ws && ws.readyState === WebSocket.OPEN) {
  //       ws.send(prevState ? 'mute' : 'unmute');
  //     }
  //     return !prevState;
  //   });
  // };
  const handleMenuToggle = (event) => {
    setMenuOpen(!menuOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const iconButtonSx = {
    padding: '0.1rem',
    margin: 0,
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    outline: 'none', 
    boxShadow: 'none',
  };

  const volumeButtonStyles = (volumeOff,volumeOn) => ({
    
    '&:hover': {
      backgroundColor: volumeOff ? '#eb6359' : ' #52ab6a',   
    },
    '&:hover': {
      backgroundColor: volumeOn ? '#52ab6a' : ' #eb6359',   
    },
  });
  
  const micButtonStyles = (micOff,micOn) => ({
   // backgroundColor: micOff ? '#eb6359' : '#52ab6a',
    '&:hover': {
      backgroundColor: micOff ? '#eb6359' : '#52ab6a',
    },
    '&:hover': {
      backgroundColor: micOn ? '#52ab6a' : '#eb6359',
    },
  });

  return (
    <div
      style={{
        backgroundColor: '#111111',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        borderRadius: '50px',
        position: 'relative',
        top: '14px',
        width: '100%',
        maxWidth: '66vw',
        maxHeight: '10vh',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.37%',
        gap: '1.2%',
      }}
    >
  <div
      style={{
        // filter : isHovered ? 'brightness(80%)' : 'none',
        position: 'absolute',
        left: '10px',
        backgroundColor: '#0d0d0d',
        borderRadius: '50%',
        height: '35px',
        width: '35px',
        outline: 'none',
        boxShadow: 'none',
      }}
    >
      <IconButton
        disableRipple
       // onClick={handleMenuToggle}
        sx={iconButtonSx}
      >
        <MenuIcon style={{ color: 'white', fontSize: '1.4rem' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: '#0d0d0d',
              borderRadius: '5px',
              width: '150px', 
              position: 'absolute',
              top: '60px', 
              left: '10%', 
              transform: 'translateY(-50%)', 
              zIndex: '999',
              textAlign: 'center',
            },
          },
        }}
      >
        {/* Add your menu items here */}
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
        <MenuItem onClick={handleClose}>Option 3</MenuItem>
      </Menu>

     
    </div>

      <div
        style={{
          backgroundColor: volumeOn ? '#4CAF50' : '#F44336',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px',
          width: '35px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <IconButton disableRipple color="inherit" onClick={handleVolumeToggle} sx={{ ...iconButtonSx, ...volumeButtonStyles(VolumeOff,volumeOn)}}>
          {volumeOn ? <VolumeUp style={{ color: 'white', fontSize: '1.4rem' }} /> : <VolumeOff style={{ color: 'white', fontSize: '1.4rem' }} />}
        </IconButton>
      </div>

      <div
        style={{
          backgroundColor: micOn ? '#4CAF50' : '#F44336',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px',
          width: '35px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: micOn ? '#388E3C' : '#D32F2F', // Slightly darker green or red on hover
          },
        }}
      >
        <IconButton disableRipple color="inherit" onClick={handleMicToggle} sx={{ ...iconButtonSx, ...micButtonStyles(MicOff,micOn) }}>
          {micOn ? <Mic style={{ color: 'white', fontSize: '1.4rem' }} /> : <MicOff style={{ color: 'white', fontSize: '1.4rem' }} />}
        </IconButton>
      </div>
    </div>
  );
}
// export default function ButtonAppBar() {
//   const [volumeOn, setVolumeOn] = useState(false); 
//   const [micOn, setMicOn] = useState(false); 

//   const handleVolumeToggle = () => {
//     setVolumeOn((prevState) => !prevState);
//   };

//   const handleMicToggle = () => {
//     setMicOn((prevState) => !prevState);
//   };
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuToggle = (event) => {
//     setMenuOpen(!menuOpen);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setMenuOpen(false);
//   };
//   const buttonStyle = {
//     backgroundColor: '#dc433b',
//     borderRadius: '50%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '35px',
//     width: '35px'
//   };

//   const iconButtonSx = {
//     padding: '0.1rem',
//     margin: 0,
//     borderRadius: '50%',
//     height: '100%',
//     width: '100%',
//     outline: 'none', // Remove outline on focus
//     boxShadow: 'none',
//     '&:focus': {
//       backgroundColor: 'transparent'
//     },
//     '&:active': {
//       backgroundColor: 'transparent'
//     },
//     '&:hover': {
//       backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light transparent layer on hover
//     },
//     '&:focus-visible': {
//       backgroundColor: 'transparent'
//     }
//   };
//   const centerButtonHoverStyles = {
//     '&:hover': {
//       filter: 'brightness(80%)' // Apply brightness reduction only on hover
//     }
//   };
//   return (
//     <div 
//       style={{ 
//         backgroundColor: '#111111',
//         display: 'flex',
//         justifyContent: 'center',
//         margin: '0 auto',
//         borderRadius: '50px',
//         position: 'relative',
//         top: '15px', 
//         width: '100%',
//         maxWidth: '66vw',
//         maxHeight: '10vh',
//         height: '100%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: '0.35%',
//         gap: '1.2%'
//       }}>
//     <div style={{ 
//       position: 'absolute', 
//       left: '10px',
//       backgroundColor: '#0d0d0d',
//       borderRadius: '50%',
//       height: '35px',
//       width: '35px',
//       outline: 'none', 
//       boxShadow: 'none',
//       }} 
//       disableRipple
//       >
//       <IconButton  
//           disableRipple
//           onClick={handleMenuToggle} 
//           sx={iconButtonSx}>
//           <MenuIcon style={{ color: 'white', fontSize: '1.4rem' }} />
//         </IconButton>
//       {menuOpen && (
//         <div style={{
//           position: 'absolute',
//           top: '-60px', 
//           backgroundColor: '#0d0d0d',
//           borderRadius: '5px', 
//           width: '200px',
//           height: '50 px', 
//           zIndex: '999', 
//           textAlign: 'center' 
//         }}>
//           {/* Add your content here */}
//         </div>
//       )}
//     </div>
//       <div style={{
//         backgroundColor: volumeOn ? '#4CAF50' : '#F44336', 
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '35px',
//         width: '35px',
//         transition: 'background-color 0.3s ease',
//       }}>
//         <IconButton  disableRipple
//           color="inherit" 
//           onClick={handleVolumeToggle} 
//           sx={{ ...iconButtonSx, ...(centerButtonHoverStyles) }}>
//           {volumeOn ? <VolumeUp style={{ color: 'white', fontSize: '1.4rem' }} /> : <VolumeOff style={{ color: 'white', fontSize: '1.4rem' }} />}
//         </IconButton>
//       </div>

//       <div style={{
//         backgroundColor: micOn ? '#4CAF50' : '#F44336', // Green if on, Red if off
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '35px',
//         width: '35px',
//         transition: 'background-color 0.3s ease',
//          '&:hover': {
//           backgroundColor: micOn ? '#388E3C' : '#D32F2F', // Slightly darker green or red on hover
//         },
//       }}>
//         <IconButton disableRipple
//           color="inherit" 
//           onClick={handleMicToggle} 
//           sx={{ ...iconButtonSx, ...(centerButtonHoverStyles) }}>
//           {micOn ? <Mic style={{ color: 'white', fontSize: '1.4rem' }} /> : <MicOff style={{ color: 'white', fontSize: '1.4rem' }} />}
//         </IconButton>     
//       </div>
//     </div>
//   );
// }


// .btn{

// font-family: Roboto, sans-serif;
// font-weight: 0;
// font-size: 14px;
// color: #fff;
// background-color: #d62828;
// padding: 12px 12px;
// border: solid #0066cc 0px;
// box-shadow: none;
// border-radius: 50px;
// transition : 1390ms;
// transform: translateY(0);
// display: flex;
// flex-direction:row-reverse;
// align-items: center;
// cursor: pointer;
// }

// .btn:hover{

// transition : 1390ms;
// padding: 10px 13px;
// transform : translateY(-0px);
// background-color: #d62828;
// color: #00ccaa00;
// border: solid 0px #0066cc;
// }



